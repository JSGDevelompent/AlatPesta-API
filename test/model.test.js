import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, createTestModel1, createTestModel2, removeTestModel1, removeTestModel2 } from "./test-until.js";

describe('POST /admin/model/create', function() {
    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Create fail 1', async () => {
        const result = await supertest(web)
        .post("/admin/model/create")
        .set('Authorization', 'test')
        .send({
            name: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 2', async () => {
        const result = await supertest(web)
        .post("/admin/model/create")
        .set('Authorization', '')
        .send({
            name: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async () => {
        await createTestModel1("test", 1);
        const result = await supertest(web)
        .post("/admin/model/create")
        .set('Authorization', 'test')
        .send({
            name: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        await removeTestModel1("test");
    });

    it('Create fail 2', async () => {
        const result = await supertest(web)
        .post("/admin/model/create")
        .set('Authorization', 'test')
        .send({
            name: 123123
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully', async () => {
        const result = await supertest(web)
        .post("/admin/model/create")
        .set('Authorization', 'test')
        .send({
            name: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.name).not.toBe("test");
        await removeTestModel1("test");
    });
});

describe('PATCH / admin/model/update/:id', function() {
    afterAll(async () => {
        await removeTestUser();
        await removeTestModel1("test1");
    });

    beforeAll(async () => {
        await createTestModel1("test", 1);
        await createTestUser();
    })

    it('Update fail 1', async () => {
        const result = await supertest(web)
        .patch("/admin/model/update/1")
        .set('Authorization', 'test')
        .send({
            name: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async () => {
        const result = await supertest(web)
        .patch("/admin/model/update/1")
        .set('Authorization', '')
        .send({
            name: "test1"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        await createTestModel1("test1", 2);
        const result = await supertest(web)
        .patch("/admin/model/update/1")
        .set('Authorization', 'test')
        .send({
            name: "test1"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        await removeTestModel1("test1");
    });

    it('Update fail 4', async () => {
        const result = await supertest(web)
        .patch("/admin/model/update/12")
        .set('Authorization', 'test')
        .send({
            name: "test1"
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
        .patch("/admin/model/update/test")
        .set('Authorization', 'test')
        .send({
            name: "test1"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully', async () => {
        const result = await supertest(web)
        .patch("/admin/model/update/1")
        .set('Authorization', 'test')
        .send({
            name: "test1"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.name).not.toBe("test1");
    });
});

describe('DELETE /admin/model/delete/:id', function() {

    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Delete fail 1', async () => {
        await createTestModel1("test", 1);
        const result = await supertest(web)
        .delete("/admin/model/delete/1")
        .set('Authorization', '');
        expect(result.status).toBe(401);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
        await removeTestModel1("test");
    });

    it('Delete fail 2', async () => {
        await createTestModel1("test", 1);
        const result = await supertest(web)
        .delete("/admin/model/delete/12")
        .set('Authorization', 'test');
        expect(result.status).toBe(404);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
        await removeTestModel1("test");
    });
    it('Delete successfully', async () => {
        await createTestModel1("test", 1);
        const result = await supertest(web)
        .delete("/admin/model/delete/1")
        .set('Authorization', 'test');
        expect(result.status).toBe(200);
        logger.info(result.body);
        expect(result.body.message).toBeDefined();
    });
});

describe('DELETEMany /admin/model/delete', function() {

    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('DeleteMany fail 1', async () => {
        await createTestModel2(4);
        const result = await supertest(web)
        .delete("/admin/model/delete")
        .set('Authorization', '')
        .send({
            ids: [1,2,3,4]
        });

        expect(result.status).toBe(401);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
        await removeTestModel2(4);
    });

    it('DeleteMany fail 2', async () => {
        await createTestModel2(4);
        const result = await supertest(web)
        .delete("/admin/model/delete")
        .set('Authorization', 'test')
        .send({
            ids: []
        });

        expect(result.status).toBe(400);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
        await removeTestModel2(4);
    });

    it('DeleteMany fail 3', async () => {
        const result = await supertest(web)
        .delete("/admin/model/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,4]
        });

        expect(result.status).toBe(404);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
    });

    it('DeleteMany successfully', async () => {
        await createTestModel2(4);
        const result = await supertest(web)
        .delete("/admin/model/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,4]
        });

        expect(result.status).toBe(200);
        logger.info(result.body);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/model/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel2(10);
    });

    afterAll(async () => {
        await removeTestUser();
        removeTestModel2(10);
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/model/pagination")
        .set('Authorization', '')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
    });

    it('Pagination fail 2', async () => {
        const result = await supertest(web)
        .get("/admin/model/pagination")
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
        .get("/admin/model/pagination")
        .set('Authorization', 'test')
        .send({
            page:3,
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Pagination successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/model/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 2', async () => {
        const result = await supertest(web)
        .get("/admin/model/pagination")
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
        .get("/admin/model/pagination")
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
        .get("/admin/model/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:20,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

});

describe('GET /admin/model/search', function () {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel2(10);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestModel2(10);
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
        .set('Authorization', '')
        .send({
            search: "3",
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 2', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
        .set('Authorization', 'test')
        .send({
            search: "",
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 3', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Search fail 4', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
        .set('Authorization', 'test')
        .send({
            search: "3",
            page:3,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Search successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
        .set('Authorization', 'test')
        .send({
            search: "1",
            page:1,
            dataRequest: 5,
            sortBy: "name",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 2', async () => {
        const result = await supertest(web)
        .get("/admin/model/search")
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
        .get("/admin/model/search")
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
});



