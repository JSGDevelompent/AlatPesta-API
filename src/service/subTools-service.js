import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    createValidation,
    updateValidation,
    deleteSelectionValidation,
    deleteValidation,
    searchValidation,
    paginationValidation,
    getValidation
} from "../validation/subTools-validation.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
import dotenv from 'dotenv';
dotenv.config();

const create = async (request) => {
    const dataSubTools = validate(createValidation, request.body);

    // Gunakan Set dengan lowercase untuk mencegah duplikasi nama yang case-insensitive
    const nameSet = new Set();
    for (const image of dataSubTools.images) {
        const imageName = image.name.toLowerCase(); // Normalisasi ke lowercase
        if (nameSet.has(imageName)) {
            throw new ResponseError(400, `Duplicate name found in images: ${image.name}`);
        }
        nameSet.add(imageName);
    }

    // Cari tool berdasarkan nama
    const tool = await prismaClient.tools.findFirst({
        where: { name: dataSubTools.toolName }
    });
    if (!tool) {
        throw new ResponseError(404, `Tool ${dataSubTools.toolName} not found`);
    }

    const data = [];
    for (const item of dataSubTools.images || []) {    
        const imageValue = getImageValue(item, request.cloudinary);

        const entry = {
            name: item.name || undefined,
            image: imageValue || undefined,
            colors: item.colors || undefined
        };

        // Hapus properti yang null/undefined
        Object.keys(entry).forEach(key => entry[key] === undefined && delete entry[key]);
        console.log(entry);
        // Validasi apakah ada field yang kosong
        if (!entry.name || !entry.image || !entry.colors) {
            throw new ResponseError(400, "Data image not valid");
        }

        data.push(entry);
    }

    // Simpan data ke database
    const createdSubTool = await prismaClient.subTools.create({
        data: {
            name: dataSubTools.name,
            price: dataSubTools.price,
            toolsId: tool.id,
            images: {
                create: data.map(dataImage => ({ ...dataImage }))
            }
        },
        include: { images: true, tools: true }
    });

    return createdSubTool;
};



const update = async (request) => {
    // Validasi input dan parsing data dari request
    const dataSubTools = validate(updateValidation, request.body);
  
    // Jika dataSubTools.images tidak ada atau kosong, kita pastikan mengirim array kosong
    const imagesToUpdate = dataSubTools.images || [];
  
    // Ambil data sub tool yang sudah ada (gunakan imagesToUpdate || [] agar tidak error)
    const existingSubTool = await fetchExistingSubTool(dataSubTools.id, imagesToUpdate);
  
    // Jika toolName disediakan, cari tool berdasarkan nama dan tetapkan toolsId
    if (dataSubTools.toolName) {
      const tool = await prismaClient.tools.findFirst({
        where: { name: dataSubTools.toolName }
      });
      if (!tool) {
        throw new ResponseError(404, `Tool ${dataSubTools.toolName} not found`);
      }
      dataSubTools.toolsId = tool.id;
    }
  
    // Proses update gambar hanya jika ada gambar yang dikirimkan
    let idUpdateImage = [];
    if (imagesToUpdate.length > 0) {
      const existingImageIds = existingSubTool.images.map(image => image.id);
      const { data, idUpdateImage: ids } = await prepareData(imagesToUpdate, existingImageIds, request.cloudinary);
      idUpdateImage = ids;
      await deleteOldImages(idUpdateImage);
      await processImageUpdates(data, existingSubTool.id);
    }
  
    await updateSubTool(existingSubTool.id, dataSubTools);
  
    return prismaClient.subTools.findUnique({
      where: { id: existingSubTool.id },
      include: { images: true, tools: true }
    });
  };
  
  const fetchExistingSubTool = async (id, imagesToUpdate) => {
    try {
      const subTool = await prismaClient.subTools.findUnique({
        where: { id },
        include: { images: true }
      });
  
      if (!subTool) {
        throw new ResponseError(404, `Sub Tool not found`);
      }
  
      // Validasi nama gambar duplikat antara data yang sudah ada dan data baru (jika ada)
      const nameSti = new Set();
      for (const image of subTool.images) {
        nameSti.add(image.name);
      }
      for (const image of imagesToUpdate || []) {
        if (nameSti.has(image.name)) {
          throw new ResponseError(400, `Duplicate name found in images: ${image.name}`);
        }
        nameSti.add(image.name);
      }
  
      return subTool;
    } catch (error) {
      console.error(error);
      throw new ResponseError(500, 'Server Error');
    }
  };
  
  const prepareData = async (images, existingImageIds, files) => {
    try {
        const data = [];
        const idUpdateImage = [];

        for (const item of images || []) {
            validateImageItem(item, existingImageIds);

            // **Pastikan `name` tidak undefined**
            const itemName = item.name || `image_${item.id}`;
            console.log(`Processing image: ${itemName}`);

            const imageValue = getImageValue({ ...item, name: itemName }, files);

            const entry = {
                id: item.id || undefined,
                name: item.name || undefined,
                image: imageValue, // Pastikan imageValue ada
                colors: item.colors || undefined
            };

            cleanEntry(entry);

            if (entry.id && entry.image) {
                console.log(`Updating image ${entry.id} with new image:`, entry.image);
                idUpdateImage.push(entry.id);
            }

            data.push(entry);
        }

        console.log("Prepared Data for Update:", data);
        return { data, idUpdateImage };
    } catch (error) {
        console.error("Error in prepareData:", error);
        throw new ResponseError(500, "Server Error");
    }
};


  const processImageUpdates = async (data, subToolsId) => {
    console.log("Updating images in database:", data);

    const updatesSTI = data.map(item => {
        if (item.id) {
            console.log(`Updating image with ID: ${item.id}`, item);
            const { id, ...updateData } = item;
            return prismaClient.subToolsImage.update({
                where: { id },
                data: { ...updateData }
            });
        } else {
            console.log(`Creating new image:`, item);
            return prismaClient.subToolsImage.create({
                data: {
                    ...item,
                    subToolsId
                }
            });
        }
    });

    await Promise.all(updatesSTI);
};

  const updateSubTool = async (id, dataSubTools) => {
    // Hilangkan properti yang tidak diperlukan (seperti images dan toolName) sebelum update
    const { id: _, images, toolName, ...updateData } = dataSubTools;
    await prismaClient.subTools.update({
      where: { id },
      data: { ...updateData }
    });
  };
  
  const deleteOldImages = async (idUpdateImage) => {
    for (const id of idUpdateImage) {
      const image = await prismaClient.subToolsImage.findUnique({ where: { id } });
      if (image) {
        await deleteCloudinaryFile(image.image);
      }
    }
  };
  


const validateImageItem = (item, existingImageIds) => {
    if (item.id && !existingImageIds.includes(item.id)) {
        throw new ResponseError(404, `Image with ID ${item.id} not found`);
    }
};

const getImageValue = (item, cloudinaryFiles, Updatebool = false) => {
    if (!Array.isArray(cloudinaryFiles)) {
        console.log("No Cloudinary files provided, using existing image:", item.image);
        return item.image || undefined;
    }

    const itemName = item.name ? item.name.toLowerCase().replace(/\s+/g, '') : '';
    const matchingFile = cloudinaryFiles.find(file => {
        if (!file.public_id) return false;

        const parts = file.public_id.split('-');
        const extractedName = parts[1] ? parts[1].toLowerCase() : '';
        console.log(`Comparing ${extractedName} with ${itemName}`);

        return extractedName === itemName;
    });

    console.log(`Matching file for ${itemName}:`, matchingFile?.secure_url);
    return matchingFile?.secure_url || item.image || undefined;
};
  
const cleanEntry = (entry) => {
    for (const key in entry) {
        if (entry[key] === null || entry[key] === undefined) {
            delete entry[key];
        }
    }
};



const get = async (request) => {
    const data = validate(getValidation, request);
    const subTool = await prismaClient.subTools.findUnique({
        where: { id: data },
        include: { images: true }
    });

    if (!subTool) {
        throw new ResponseError(404, `Sub Tool not found`);
    }

    return subTool;
}

const getAll = async() => {
    return prismaClient.subTools.findMany({
        include: { images: true, tools: true }
    });
}


const remove = async (request) => {
    const data = validate(deleteValidation,request);

    const existingSubTool = await prismaClient.subTools.findUnique({
        where: { id: data },
        include: { images: true }
    });

    if (!existingSubTool) {
        throw new ResponseError(404, `Sub Tool not found`);
    }

    for (const image of existingSubTool.images) {
        await deleteCloudinaryFile(image.image);
    }

    await prismaClient.subTools.delete({
        where: { id: data }
    });

    return `Sub Tool ${existingSubTool.name} has been deleted successfully.`;
}


const removeSTI = async (request) => {
    const data = validate(deleteValidation,request);

    const existingSubTool = await prismaClient.subToolsImage.findUnique({
        where: { id: data }
    });

    if (!existingSubTool) {
        throw new ResponseError(404, `Sub Tool not found`);
    }

    await deleteCloudinaryFile(existingSubTool.image);

    await prismaClient.subToolsImage.delete({
        where: { id: data }
    });

    return `Sub Tool with ID ${existingSubTool.name} has been deleted successfully.`;
}

const removeManySTI = async (request) => {
    const data = validate(deleteSelectionValidation, request);

    const existingSubToolsImage = await prismaClient.subToolsImage.findMany({
        where: { id: { in: data.ids } }
    });

    if (existingSubToolsImage.length !== data.ids.length) {
        throw new ResponseError(404, `No SubToolsImage found with the provided IDs`);
    }

    for (const subTool of existingSubToolsImage) {
            try {
                await deleteCloudinaryFile(subTool.image);
            } catch (error) {
                console.error(`Failed to delete old image: ${subTool.image}`, error);
            }
        
    }

    await prismaClient.subToolsImage.deleteMany({
        where: { id: { in: data.ids } }
    });

    return `SubToolsImage with names [${existingSubToolsImage.map(subToolImage => subToolImage.name).join(', ')}] have been deleted successfully.` ;

}


const removeMany = async (request) => {
    const data = validate(deleteSelectionValidation, request);

    const existingSubTools = await prismaClient.subTools.findMany({
        where: { id: { in: data.ids } },
        include: { images: true }
    });

    if (existingSubTools.length !== data.ids.length) {
        throw new ResponseError(404, `No SubTools found with the provided IDs`);
    }

    for (const subTool of existingSubTools) {
        for (const image of subTool.images) {
            try {
                await deleteCloudinaryFile(image.image);
            } catch (error) {
                console.error(`Failed to delete old image: ${image.image}`, error);
            }
        }
    }

    await prismaClient.subTools.deleteMany({
        where: { id: { in: data.ids } }
    });

    return `SubTools with names [${existingSubTools.map(subTool => subTool.name).join(', ')}] have been deleted successfully.`;
}

const pagination = async (request) => {
    const pagination = validate(paginationValidation, request);
    const skip = (pagination.page - 1) * pagination.dataRequest;

    let subTools;
    if (pagination.sortBy === 'STI') {
        subTools = await prismaClient.subTools.findMany({
            skip: skip,
            take: pagination.dataRequest,
            include: {
                images: true
            }
        });
        subTools = subTools.map((subTool) => {
            subTool.images = subTool.images.sort((a, b) => {
                if (pagination.sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            return subTool;
        });
    } else {
        subTools = await prismaClient.subTools.findMany({
            skip: skip,
            take: pagination.dataRequest,
            orderBy: {
                [pagination.sortBy]: pagination.sortOrder
            },
            include: {
                images: true
            }
        });
    }

    const totalData = await prismaClient.subTools.count();

    if (subTools.length === 0) {
        throw new ResponseError(404, `Sub Tools Not Found`);
    }

    return {
        data: subTools,
        totalData: totalData,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalData / pagination.dataRequest)
    };
};

const search = async (request) => {
    const search = validate(searchValidation, request);
    const price = !isNaN(parseInt(search.search)) ? parseInt(search.search) : 999999999;
    const skip = (search.page - 1) * search.dataRequest;

    let subTools;
    if (search.sortBy === 'STI') {
        subTools = await prismaClient.subTools.findMany({
            where: {
                OR: [
                    { name: { contains: search.search.toLowerCase() } },
                    { price: price},
                    {
                        images: {
                            some: {
                                name: {
                                    contains: search.search.toLowerCase()
                                }
                            }
                        }
                    }
                ]
            },
            skip: skip,
            take: search.dataRequest,
            include: {
                images: true
            }
        });
        subTools = subTools.map((subTool) => {
            subTool.images = subTool.images.sort((a, b) => {
                if (search.sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            return subTool;
        });
    } else {
        subTools = await prismaClient.subTools.findMany({
            where: {
                OR: [
                    { name: { contains: search.search.toLowerCase() } },
                    { price: price},
                    {
                        images: {
                            some: {
                                name: {
                                    contains: search.search.toLowerCase()
                                }
                            }
                        }
                    }
                ]
            },
            skip: skip,
            take: search.dataRequest,
            orderBy: {
                [search.sortBy]: search.sortOrder
            },
            include: {
                images: true
            }
        });
    }

    const totalData = await prismaClient.subTools.count({
        where: {
            OR: [
                { name: { contains: search.search.toLowerCase() } },
                { price: price },
                {
                    images: {
                        some: {
                            name: {
                                contains: search.search.toLowerCase()
                            }
                        }
                    }
                }
            ]
        }
    });

    if (subTools.length === 0) {
        throw new ResponseError(404, `No Sub Tools data about "${search.search}"`);
    }

    return {
        data: subTools,
        totalData: totalData,
        currentPage: search.page,
        totalPages: Math.ceil(totalData / search.dataRequest)
    };
};

export default {
    create,
    update,
    remove,
    removeMany,
    removeManySTI,
    removeSTI,
    search,
    pagination,
    get,
    getAll
}
