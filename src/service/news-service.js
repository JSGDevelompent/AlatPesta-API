import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
import {
    createValidation,
    updateValidation,
    getValidation,
    deleteValidation,
    deleteSelectionValidation,
    paginationValidation,
    searchValidation
} from "../validation/news-validation.js";
import dotenv from 'dotenv';
dotenv.config();

const create = async (request) => {
    const data = validate(createValidation, request.body);
    const news = await prismaClient.news.findFirst({
        where: {
            title: data.title
        }
    });
    if (request.file) {
        data.image = request.cloudinary.secure_url;
    }
    if (!data.image) {
        throw new ResponseError(400, "image is required")
    }
    if (news) {
        throw new ResponseError(401, `${data.title} title already exists`);
    }
    return prismaClient.news.create({
        data: data
    });
}

const update = async (request) => {
    const data = validate(updateValidation, request.body);
    const news = await prismaClient.news.findFirst({
        where: {
            id: data.id
        },
        select: {
            image: true
        }
    });

    if (!news) {
        throw new ResponseError(404, `News not found`)
    }
    if (data.title){
        const newsExists = await prismaClient.news.findFirst({
            where: {title : data.title}
        });
    
        if (newsExists){
            throw new ResponseError(401, `${data.title} already exixsts`)
        }    
    }

    if(data.image) {
        await deleteCloudinaryFile(news.image);
    }
    
    if (request.file) {
        await deleteCloudinaryFile(news.image);
        data.image = request.cloudinary.secure_url;
    }

    return prismaClient.news.update({
        where: {id:data.id},
        data: data
    });
}

const remove = async (request) => {
    const data = validate(deleteValidation, request);
    const news = await prismaClient.news.findFirst({
        where:{id:data},
        select:{
            title: true,
            image: true
        }
    });

    if (!news){
        throw new ResponseError(404, `${data.title} news not exists`);
    }

    await deleteCloudinaryFile(news.image);

    await prismaClient.news.delete({
        where: {
            id:data
        }
    });

    return {
        message: `Remove ${news.title} news successfully`
    }
}

const removeMany = async (request) => {
    const data = validate(deleteSelectionValidation, request);
    const news = await prismaClient.news.findMany({
        where: {
            id: {
                in:data.ids
            }
        },
        select: {
            title: true,
            image: true
        }
    });

    if (news.length !== data.ids.length){
        throw new ResponseError(404, `There is missing data`);
    }

    for(const newsImage of news){
        await deleteCloudinaryFile(newsImage.image);
    }

    const deleteNews = await prismaClient.news.deleteMany({
        where: {
            id: {
                in:data.ids
            }
        }
    });

    return {
        message: `${deleteNews.count} news successfully deleted: ${news.map(newss => newss.title).join(', ')}`
    }
}

const get = async (request) => {
    const data = validate(getValidation,request);
    const news = await prismaClient.news.findFirst({
        where: {id: data}
    });

    if(!news){
        throw new ResponseError(404, `news not exists`);
    }

    return news;

}

const getAll = async () => {
    const news = await prismaClient.news.findMany();

    if (news.length === 0){
        throw new ResponseError(404, `news data not exists`);
    }

    return news;
}


const pagination = async (request) => {
    const data = validate(paginationValidation, request);

    const skip = (data.page - 1) * data.dataRequest;

    const news = await prismaClient.news.findMany({
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy] : data.sortOrder
        }
    });

    const totalData = await prismaClient.news.count();

    if(news.length === 0) {
        throw new ResponseError(404, `News Not Exists`);
    }

    return {
        data: news,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData/data.dataRequest)
    }
}

const search = async (request) => {
    const data = validate(searchValidation, request);
    const skip = (data.page - 1) * data.dataRequest;
    const news = await prismaClient.news.findMany({
        where: {
            OR: [
                {   title: {contains: data.search.toLowerCase() }},
                {   news: {contains: data.search.toLowerCase() }}
            ]
        },
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy] : data.sortOrder
        }
    });

    const totalData = await prismaClient.news.count();

    if(news.length === 0) {
        throw new ResponseError(404, `${data.search}News Not Exists`);
    }

    return {
        data: news,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData/data.dataRequest)
    }
}

export default {
    create,
    update,
    remove,
    removeMany,
    pagination,
    search,
    get,
    getAll
}