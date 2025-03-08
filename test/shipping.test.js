import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createShipping, createTestUser, removeShipping, removeTestUser} from "../test/test-until.js";

describe ('POST /admin/shipping/create', function() {
    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async() => {
        await removeTestUser();
    });

    it('Create fail 1',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            type: "FixedPrice",
            distance: 1000
        });
        logger.info(result.body);
        expect(result.status).toBe(400);    
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 2',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            price: 100000,
            distance: 1000
        });
        logger.info(result.body);
        expect(result.status).toBe(400);    
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            type: "FixedPrice",
            price: 100000
        });
        logger.info(result.body);
        expect(result.status).toBe(400);    
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 4',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            type: "",
            price: "",
            distance: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);    
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 5',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', '')
        .send({
            type: "FixedPrice",
            price: 100000,
            distance: 1000
        });
        logger.info(result.body);
        expect(result.status).toBe(401);    
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully', async() => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            type: "FixedPrice",
            price: 100000,
            distance: 1000
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.type).toBe("FixedPrice");
        expect(result.body.data.price).toBe(100000);
        expect(result.body.data.distance).toBe(1000);
    });

    it('Create fail 6',async () => {
        const result = await supertest(web)
        .post('/admin/shipping/create')
        .set('Authorization', 'test')
        .send({
            type: "FixedPrice",
            price: 100000,
            distance: 1000
        });
        logger.info(result.body);
        expect(result.status).toBe(405);    
        expect(result.body.errors).toBeDefined();
        await removeShipping();
    });
});

describe ('PATCH /admin/shipping/update', function() {
    beforeAll(async() => {
        await createTestUser();
        await createShipping();
    });

    afterAll(async() => {
        await removeTestUser();
    });

    it('Update fail 1', async() => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            price:  1000,
            distance: 20000,
            type: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async() => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            price:  1000,
            distance: "test string",
            type: "FixedPrice"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async() => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','')
        .send({
            price:  1000,
            distance: 20000,
            type: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Successfully 1', async () => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            price:  1000,
            distance: 20000,
            type: "PriceDistance"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.price).toBe(1000);
        expect(result.body.data.distance).toBe(20000);
        expect(result.body.data.type).toBe("PriceDistance");
    });

    it('Update Successfully 2', async () => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            distance: 210000,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.price).toBe(1000);
        expect(result.body.data.distance).toBe(210000);
        expect(result.body.data.type).toBe("PriceDistance");
    });

    it('Update Successfully 3', async () => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            price:  11000
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.price).toBe(11000);
        expect(result.body.data.distance).toBe(210000);
        expect(result.body.data.type).toBe("PriceDistance");
    });

    it('Update Successfully 4', async () => {
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            type: "FixedPrice"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.price).toBe(11000);
        expect(result.body.data.distance).toBe(210000);
        expect(result.body.data.type).toBe("FixedPrice");
    });

    it('Update fail 3', async() => {
        await removeShipping();
        const result = await supertest(web)
        .patch('/admin/shipping/update')
        .set('Authorization','test')
        .send({
            price:  1000,
            distance: 20000,
            type: "FixedPrice"
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
});


describe ('GET /admin/shipping',function() {
    beforeAll(async() => {
        await createTestUser();
        await createShipping();
    });

    afterAll(async() => {
        await removeTestUser();
        await removeShipping();
    });

    it('Get Successfully', async () => {
        const result = await supertest(web)
        .get('/admin/shipping')
        .set('Authorization', 'test');
        logger.info(result.body);
    });
});
