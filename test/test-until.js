import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.admin.deleteMany({
        where: {
           id: 1
        }
    })
}

export const createTestUser = async () => {
    const tokenLimit = new Date();
    tokenLimit.setHours(tokenLimit.getHours() + 336);
    const limit = tokenLimit;
    await prismaClient.admin.create({
        data: {
            id: 1,
            username: "test",
            password: await bcrypt.hash("confidential", 10),
            token: "test",
            limitToken: limit
        }
    });
}

export const removeTestCompany = async () => {
    await prismaClient.company.deleteMany({
        where: {
            name: "test"
        }
    });
}

export const createTestCompany = async () => {
    await prismaClient.company.create({
        data: {
            id: 1,
            name: "test",
            icon: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            aboutUs: "test aboutUs",
            termsAndConditions: "test T&C",
            linkGMap: "http://testlink.com",
            phoneNumber: "+628123213642",
            email: "testgmailtest@gmail.com",
            facebook: "http://testlink.com",
            twitter:"http://testlink.com",
            instagram: "http://testlink.com",
            linkedIn: "http://testlink.com",
            youtube:"http://testlink.com",
            shopee: "http://testlink.com",
            lazada: "http://testlink.com",
            tokoPedia: "http://testlink.com"
        }
    })
}

export const createTestModel1 = async (name, id) => {
    await prismaClient.modelTools.create({
        data: {
            id: id,
            name: name
        }
    })
}

export const removeTestModel1 = async (name) => {
    await prismaClient.modelTools.delete({
        where: {
            name: name
        }
    });
}

export const createTestModel2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `test ${i + 1}`,
    }));

    await prismaClient.modelTools.createMany({
        data,
        skipDuplicates: true, 
    });
};

export const removeTestModel2 = async (number) => {
    try {
        await prismaClient.modelTools.deleteMany({
            where: {
                id: {
                    gte: 1,
                    lte: number,
                },
            },
        });
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export const createTestType1 = async (name, id) => {
    await prismaClient.typeTools.create({
        data: {
            id: id,
            name: name
        }
    })
}

export const removeTestType1 = async (name) => {
    await prismaClient.typeTools.delete({
        where: {
            name: name
        }
    });
}

export const createTestType2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `test ${i + 1}`,
    }));

    await prismaClient.typeTools.createMany({
        data,
        skipDuplicates: true, 
    });
};

export const removeTestType2 = async (number) => {
    try {
        await prismaClient.typeTools.deleteMany({
            where: {
                id: {
                    gte: 1,
                    lte: number,
                },
            },
        });
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export const createToolsType1 = async (name, id) => {
    await prismaClient.typeTools.create({
        data: {
            id: id,
            name: name,
            description: "test des",
            price: 1000,
            modelId: 1,
            typeId: 1,
        }
    })
}

export const removeToolsType1 = async (name) => {
    await prismaClient.typeTools.delete({
        where: {
            name: name
        }
    });
}

export const createToolsType2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `Tools ${i + 1}`,
        description: "test des",
        price: 1000,
        modelId: Math.floor(Math.random() * 2) + 1, 
        typeId: Math.floor(Math.random() * 2) + 1,  
    }));

    await prismaClient.typeTools.createMany({
        data,
        skipDuplicates: true,
    });
};


export const removeToolsType2 = async (number) => {
    try {
        await prismaClient.typeTools.deleteMany({
            where: {
                id: {
                    gte: 1,
                    lte: number,
                },
            },
        });
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export const createColor1 = async (name, id) => {
    await prismaClient.colorTools.create({
        data: {
            id: id,
            name: name,
            options: 2,
            colors: ['#b52218', '#2018f5', '#2018f5']
        }
    });
};

export const removeColor1 = async (name) => {
    await prismaClient.colorTools.deleteMany({
        where: { name: name }
    });
};

export const createColor2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `Colors ${i + 1}`,
        options: Math.floor(Math.random() * 2) + 1,
        colors: ['#b52218', '#2018f5', '#2018f5']
    }));

    await prismaClient.colorTools.createMany({
        data,
        skipDuplicates: true,
    });
};


export const removeColor2 = async (number) => {
    await prismaClient.colorTools.deleteMany({
        where : {
            id: {
                gte: 1,
                lte: number
            }
        }
    });
};

export const createTool1 = async (name, id, idtype, idmodel, idcolors) => {
    await prismaClient.tools.create({
        data: {
            id: id,
            name: name,
            image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            description: "test des",
            price: 123,
            modelId : idmodel,
            colorsId : idcolors,
            typeId: idtype
        }
    });
};

export const removeTool1 = async (name) => {
    await prismaClient.tools.deleteMany({
        where: {
            name: name
        }
    });
};


export const removeTool2 = async (number) => {
    await prismaClient.tools.deleteMany({
        where : {
            id: {
                gte: 1,
                lte: number
            }
        }
    });
};

export const createTool2 = async (number, idtype, idmodel, idcolors) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `Test ${i + 1}`,
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        description: "test des",
        price: 123,
        modelId : Math.floor(Math.random() * idmodel) + 1,
        colorsId : Math.floor(Math.random() * idcolors) + 1,
        typeId: Math.floor(Math.random() * idtype) + 1
    }));

    await prismaClient.tools.createMany({
        data:data,
        skipDuplicates: true,
    });
};

export const createSubTools1 = async (name, id, toolId) => {
    await prismaClient.subTools.create({
        data: {
            id : id,
            name: name,
            price: 123,
            toolsId: toolId,
            images: {
                create: {
                    id: 1,
                    image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
                    name: `${name} image`,
                    colors: ['#b52218', '#2018f5', '#2018f5']
                }
            }
        }
    });
};

export const createSubTools2 = async (number, toolId) => {
    const subToolsData = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `SubTool ${i + 1}`,
        price: 123,
        toolsId: Math.floor(Math.random() * toolId) + 1,
        images: {
            create: {
                id: i + 1,
                image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
                name: `SubTool ${i + 1} image`,
                colors: ['#b52218', '#2018f5', '#2018f5']
            }
        }
    }));

    for (const subTool of subToolsData) {
        await prismaClient.subTools.create({
            data: subTool
        });
    }
};


export const removeSubTools1 = async (name) => {
    await prismaClient.subTools.deleteMany({
        where: {name: name}
    });
};

export const removeSubTools2 = async (number) => {
    await prismaClient.subTools.deleteMany({
        where: {
            id: {
                gte: 1,
                lte: number
            }
        }
    })
}


export const createNews1 = async (title, id) => {
    await prismaClient.news.create({
        data: {
            id: id,
            title: title,
            image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            news: "test news"
        }
    });
};

export const removeNews1 = async (title) => {
    await prismaClient.news.deleteMany({
        where: {
            title: title
        }
    });
};


export const removeNews2 = async (number) => {
    await prismaClient.news.deleteMany({
        where : {
            id: {
                gte: 1,
                lte: number
            }
        }
    });
};

export const createNews2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        title: `Test ${i + 1}`,
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        news: "test news"
    }));

    await prismaClient.news.createMany({
        data:data,
        skipDuplicates: true,
    });
};


export const createAllPromo = async (title, id) => {
    await Promise.all([
        prismaClient.promo.create({
            data: {
                id: id,
                title: `${title} ${id}`,
                description: "test Des",
                image: "https://imagestest.com",
                type: "Discount",
                promoEndDate: "2024-12-31T00:00:00.000Z",
                Discount: {
                    create: {
                        maximumDiscount: 300000000,
                        minPrice: 10000,
                        discountModel: "RateDiscount",
                        discount: 30
                    }
                }
            }
        }),
        prismaClient.promo.create({
            data: {
                id: id + 1,
                title: `${title} ${id + 1}`,
                description: "test Des",
                image: "https://imagestest.com",
                type: "DayRentDiscount",
                promoEndDate: "2024-12-31T00:00:00.000Z",
                DayRentDiscount: {
                    create: {
                        maximumDiscount: 300000000,
                        minPrice: 10000,
                        minDay: 2,
                        discountModel: "RateDiscount",
                        discount: 30
                    }
                }
            }
        }),
        prismaClient.promo.create({
            data: {
                id: id + 2,
                title: `${title} ${id + 2}`,
                description: "test Des",
                image: "https://imagestest.com",
                type: "FreeShipping",
                promoEndDate: "2024-12-31T00:00:00.000Z",
                FreeShipping: {
                    create: {
                        maximumDiscount: 300000000,
                        minPrice: 10000,
                        minDay: 2,
                        discountModel: "RateDiscount",
                        discount: 30,
                        maxDistance: 1000
                    }
                }
            }
        })
    ]);
};

export const removeAllPromo = async (id) => {
    await prismaClient.promo.deleteMany({
        where: {
            id: {
                in: [id, id + 1, id + 2]
            }
        }
    });
};



export const removePromo2 = async (number) => {
    await prismaClient.promo.deleteMany({
        where : {
            id: {
                gte: 1,
                lte: number
            }
        }
    });
};

export const removePromo1= async(title) => {
    await prismaClient.promo.deleteMany({
        where: {title: title}
    });
}

export const createPromo2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        title: `Test ${i + 1}`,
        image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        news: "test news"
    }));

    await prismaClient.promo.createMany({
        data:data,
        skipDuplicates: true,
    });
};

export const createAllPromo2 = async (title, startId, count) => {
    const promoData = [];

    for (let i = 0; i < count; i++) {
        promoData.push(
            prismaClient.promo.create({
                data: {
                    id: startId + i * 3,
                    title: `${title} ${startId + i * 3}`,
                    description: "test Des",
                    image: "https://imagestest.com",
                    type: "Discount",
                    promoEndDate: "2024-12-31T00:00:00.000Z",
                    Discount: {
                        create: {
                            maximumDiscount: 300000000,
                            minPrice: 10000,
                            discountModel: "RateDiscount",
                            discount: 30
                        }
                    }
                }
            }),
            prismaClient.promo.create({
                data: {
                    id: startId + i * 3 + 1,
                    title: `${title} ${startId + i * 3 + 1}`,
                    description: "test Des",
                    image: "https://imagestest.com",
                    type: "DayRentDiscount",
                    promoEndDate: "2024-12-31T00:00:00.000Z",
                    DayRentDiscount: {
                        create: {
                            maximumDiscount: 300000000,
                            minPrice: 10000,
                            minDay: 2,
                            discountModel: "RateDiscount",
                            discount: 30
                        }
                    }
                }
            }),
            prismaClient.promo.create({
                data: {
                    id: startId + i * 3 + 2,
                    title: `${title} ${startId + i * 3 + 2}`,
                    description: "test Des",
                    image: "https://imagestest.com",
                    type: "FreeShipping",
                    promoEndDate: "2024-12-31T00:00:00.000Z",
                    FreeShipping: {
                        create: {
                            maximumDiscount: 300000000,
                            minPrice: 10000,
                            minDay: 2,
                            discountModel: "RateDiscount",
                            discount: 30,
                            maxDistance: 1000
                        }
                    }
                }
            })
        );
    }

    await Promise.all(promoData);
};

export const createQandA = async (title, id)=> {
    await prismaClient.questionsAndAnswers.create({
        data: {
            id: id,
            title: title,
            question: `${title} Question ${id}`,
            answer: `${title} Answer ${id}`
        } 
    });
}

export const removeQandA = async (title) => {
    await prismaClient.questionsAndAnswers.deleteMany({
        where: {
            title: title
        }
    });
}

export const createQandA2 = async (number) => {
    const data = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        title: `title ${i + 1}`,
        question: `Question ${i + 1}`,
        answer: `Answer ${i + 1}`
    }));

    await prismaClient.questionsAndAnswers.createMany({
        data,
        skipDuplicates: true, 
    });
};

export const removeQandA2 = async (number) => {
    try {
        await prismaClient.questionsAndAnswers.deleteMany({
            where: {
                id: {
                    gte: 1,
                    lte: number,
                },
            },
        });
    } catch (error) {
        console.error('Error deleting records:', error);
    }
};

export const removeShipping = async() => {
    await prismaClient.shippingPrice.delete({
        where: {
            id: 1
        }
    });
}

export const createShipping = async () => {
    await prismaClient.shippingPrice.create({
        data: {
            id: 1,
            type: "FixedPrice",
            price: 100000,
            distance: 1000
        }
    });
}