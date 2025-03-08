import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { deleteOldImage } from "../src/middleware/delete-image-middleware.js";
import { createAllPromo,removePromo2, createAllPromo2, createTestUser, removeAllPromo, removePromo1, removeTestUser } from "../test/test-until.js";


describe ('POST /admin/promo/create', function() {
    beforeAll(async()=> {
        await createTestUser();
    });

    afterAll(async()=> {
        await removeTestUser();
    });

    it('Create fail 1', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 2', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "FreeShipping",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 4', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]', 1)
        .field('dayRentDiscount[discount]', 30);
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 5', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[minDay]', 1)
        .field('freeShipping[discountModel]', "RateDiscount")
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 6', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[discount]', 30)
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 7', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });


    it('Create fail 8', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                discountModel: "RateDiscount",
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 9', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 10', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            description: "test Des",
            image: "https://imagestest.com",
            type: "FreeShipping",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 11', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]', 1)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 12', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[minDay]', 1)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 13', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 14', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', '')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully 1', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                discountModel: "RateDiscount",
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create fail 15', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                discountModel: "RateDiscount",
                discount: 30
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        await removePromo1("test");
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 16', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully 2', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30
            })
        });
        await removePromo1("test");
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create successfully 3', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .send({
            title: "test",
            description: "test Des",
            image: "https://imagestest.com",
            type: "FreeShipping",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        await removePromo1("test");
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create successfully 4', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]', 1)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        await removePromo1("test");
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create successfully 5', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[minDay]', 1)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        await removePromo1("test");
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create successfully 6', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        await removePromo1("test");
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Create successfully 7', async () => {
        const result = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        await removePromo1("test");
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

});

describe('PATCH /admin/promo/update/:id', function() {
    beforeAll(async()=> {
        await createTestUser();
        
    });

    afterAll(async()=> {
        await removeTestUser();
        
    });

    beforeEach(async() => {
        await createAllPromo("test", 1);
    });

    afterEach(async() => {
        await removeAllPromo(1);
    });

    // 1 -Discount
    // 2 -DayRentDiscount
    // 3 -FreeShipping
    it('Update fail 1', async() => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization','test')
        .send({
            title: "test 2",
            description: "Des discount",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 40000,
                minPrice: 1000,
                discountModel: "RateDiscount",
                discount: 20
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', '')
        .send({
            title: "Update DayRentDiscount",
            description: "Des Update DayRentDiscount",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 3000,
                minPrice: 1000,
                minDay: 3,
                discountModel: "RateDiscount",
                discount: 50
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/4')
        .set('Authorization', 'test')
        .send({
            title: "Update FreeShipping",
            description: "Des FreeShipping",
            image: "https://imagestest.com",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 4', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/asdxzc')
        .set('Authorization', 'test')
        .send({
            title: "Update FreeShipping",
            description: "Des FreeShipping",
            image: "https://imagestest.com",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization', 'test')
        .field('title', "test 2")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]', 1)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 6', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', '')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[minDay]', 1)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 7', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/4')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[discount]', 20);
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 8', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/asdmknzxc')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[discount]', 20);
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async() => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization','test')
        .send({
            title: "Update discount",
            description: "Des discount",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 40000,
                minPrice: 1000,
                discountModel: "RateDiscount",
                discount: 20
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update discount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 2', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', 'test')
        .send({
            title: "Update DayRentDiscount",
            description: "Des Update DayRentDiscount",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 3000,
                minPrice: 1000,
                minDay: 3,
                discountModel: "RateDiscount",
                discount: 50
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update DayRentDiscount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 3', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .send({
            title: "Update FreeShipping",
            description: "Des FreeShipping",
            image: "https://imagestest.com",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update FreeShipping");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 4', async() => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization','test')
        .send({
            title: "Update discount",
            description: "Des discount",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 40000,
                minPrice: 1000,
                discountModel: "RateDiscount",
                discount: 20
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update discount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 5', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', 'test')
        .send({
            title: "Update DayRentDiscount",
            description: "Des Update DayRentDiscount",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 3000,
                minPrice: 1000,
                minDay: 3,
                discountModel: "RateDiscount",
                discount: 50
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update DayRentDiscount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 6', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .send({
            title: "Update FreeShipping",
            description: "Des FreeShipping",
            image: "https://imagestest.com",
            type: "FreeShipping",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update FreeShipping");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 7', async() => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization','test')
        .send({
            title: "Update FreeShipping",
            description: "Des FreeShipping",
            image: "https://imagestest.com",
            type: "FreeShipping",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            freeShipping: ({
                maximumDiscount: 300000000,
                minPrice: 10000,
                minDay: 2,
                discountModel: "RateDiscount",
                discount: 30,
                maxDistance: 1000
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update FreeShipping");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 8', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .send({
            title: "Update DayRentDiscount",
            description: "Des Update DayRentDiscount",
            image: "https://imagestest.com",
            type: "DayRentDiscount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            dayRentDiscount : ({
                maximumDiscount: 3000,
                minPrice: 1000,
                minDay: 3,
                discountModel: "RateDiscount",
                discount: 50
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update DayRentDiscount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 9', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .send({
            title: "Update discount",
            description: "Des discount",
            image: "https://imagestest.com",
            type: "Discount",
            promoEndDate: "2024-12-31T00:00:00.000Z",
            discount : ({
                maximumDiscount: 40000,
                minPrice: 1000,
                discountModel: "RateDiscount",
                discount: 20
            })
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update discount");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 10', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]', 1)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 11', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[maximumDiscount]', 300000000)
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[minDay]', 1)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 12', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[discount]', 20)
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 13', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/1')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[minDay]',2)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 14', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/2')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });

    it('Update successfully 15', async () => {
        const result = await supertest(web)
        .patch('/admin/promo/update/3')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "FreeShipping")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('freeShipping[minPrice]', 10000)
        .field('freeShipping[discountModel]', "RateDiscount")
        .field('freeShipping[discount]', 30)
        .field('freeShipping[maxDistance]', 3000);
        await deleteOldImage(result.body.data.image);
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.Discount).toBeDefined();
        expect(result.body.data.DayRentDiscount).toBeDefined();
        expect(result.body.data.FreeShipping).toBeDefined();
    });
});

describe ('Delete /admin/promo/delete/:id', function () {
    beforeAll(async() => {
        await createTestUser();
        await createAllPromo("test",1);
    });

    afterAll(async () => {
        await removeTestUser();
    });
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete/5')
            .set('Authorization', 'test');
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete/1')
            .set('Authorization', '');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete/aiunsdi')
            .set('Authorization', 'test');

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);

        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = create.body.data.id;
        
        const result = await supertest(web)
            .delete(`/admin/promo/delete/${id}`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

    it('Delete successfully 2', async () => {
        const result = await supertest(web)
            .delete(`/admin/promo/delete/1`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

    it('Delete successfully 3', async () => {
        const result = await supertest(web)
            .delete(`/admin/promo/delete/2`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
    it('Delete successfully 3', async () => {
        const result = await supertest(web)
            .delete(`/admin/promo/delete/3`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe ('Delete /admin/promo/delete', function () {
    beforeAll(async() => {
        await createTestUser();
        await createAllPromo("test",1);
    });

    afterAll(async () => {
        await removeTestUser();
    });
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,15]
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', '')
            .send({
                ids: [1,2,3,4,5]
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', 'test')
            .send({
                ids: ["asdasd"]
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 4', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', 'test')

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 5', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', 'test')
            .send({
                ids: []
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);

        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = create.body.data.id;

        const create1 = await supertest(web)
        .post('/admin/promo/create')
        .set('Authorization', 'test')
        .field('title', "test abc")
        .field('description', "test Des")
        .attach('image', 'test/test-image/JSGD.png')
        .field('type', "DayRentDiscount")
        .field('promoEndDate', "2024-12-31T00:00:00.000Z")
        .field('dayRentDiscount[maximumDiscount]', 300000000)
        .field('dayRentDiscount[minPrice]', 10000)
        .field('dayRentDiscount[discountModel]', "RateDiscount")
        .field('dayRentDiscount[discount]', 30);

        expect(create1.status).toBe(200);
        expect(create1.body.data).toHaveProperty('id');
        const id1 = create1.body.data.id;
        
        const result = await supertest(web)
            .delete(`/admin/promo/delete`)
            .set('Authorization', 'test')
            .send({
                ids: [id, id1] 
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
    

    it('Delete successfully 2', async () => {
        const result  = await supertest(web)
            .delete('/admin/promo/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3]
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/promo/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createAllPromo2("promo", 1, 15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removePromo2(45);
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', '')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });

    it('Pagination fail 2', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "",
            sortOrder: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.error).toBeDefined();
    });

    it('Pagination fail 3', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            page:10,
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Pagination successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 2', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            page:2,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 3', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:10,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:45,
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 5', async () => {
        const result = await supertest(web)
        .get("/admin/promo/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "title"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });


});

describe('GET /admin/promo/search', function () {
    beforeAll(async() => {
        await createTestUser();
        await createAllPromo2("promo", 1, 15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removePromo2(45);
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', '')
        .send({
            search: "3",
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 2', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "",
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 3', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 4', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "3",
            page:4,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Search successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "1",
            page:1,
            dataRequest: 5,
            sortBy: "title",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 2', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "3",
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 3', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "Test",
            page:1,
            dataRequest: 5,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/promo/search")
        .set('Authorization', 'test')
        .send({
            search: "Test",
            page:1,
            dataRequest: 4,
            sortBy: "title"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
});

