import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, createQandA, removeQandA, createQandA2, removeQandA2 } from "../test/test-until.js";

describe ('POST /admin/qanda/create', function () {
    beforeAll(async () => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Create Fail 1', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            question: "test Question",
            answer: "test answer"
        });
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 2', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            title: "",
            question: "",
            answer: ""
        });
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 3', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', '')
        .send({
            title: "test title",
            question: "test Question",
            answer: "test answer"
        });
        logger.info(result.body);
        
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 4', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            title: "test title",
            answer: "test answer"
        });
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 5', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            title: "test title",
            question: "test Question"
        });
        logger.info(result.body);
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully 1', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            title: "test title",
            question: "test Question",
            answer: "test answer"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("test title");
        expect(result.body.data.question).toBe("test Question");
        expect(result.body.data.answer).toBe("test answer");
    });

    it('Create Fail 6', async() => {
        const result = await supertest(web)
        .post('/admin/qanda/create')
        .set('Authorization', 'test')
        .send({
            title: "test title",
            question: "test Question",
            answer: "test answer"
        });
        logger.info(result.body);
        await removeQandA("test title");
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe ('PATCH /admin/qanda/update/:id', function () {
    beforeAll(async () => {
        await createTestUser();
        await createQandA("test", 1);
        await createQandA("test2", 2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeQandA("test2");
    });

    it('Update fail 1', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "test2",
            question: "Update test Question",
            answer: "Update test answer"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/15')
        .set('Authorization', 'test')
        .send({
            question: "Update test Question",
            answer: "Update test answer"
        });
        logger.info(result.body);

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "",
            question: "",
            answer: ""
        });
        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', '')
        .send({
            title: "Update test title",
            question: "Update test Question",
            answer: "Update test answer"
        });
        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "Update test title",
            question: "Update test Question",
            answer: "Update test answer"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update test title");
        expect(result.body.data.question).toBe("Update test Question");
        expect(result.body.data.answer).toBe("Update test answer");
    });

    it('Update successfully 2', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "Update test title",
            question: "Update 2 test Question"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update test title");
        expect(result.body.data.question).toBe("Update 2 test Question");
        expect(result.body.data.answer).toBe("Update test answer");
    });

    it('Update successfully 3', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "Update test title",
            answer: "Update 3 test answer"
        });
        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update test title");
        expect(result.body.data.question).toBe("Update 2 test Question");
        expect(result.body.data.answer).toBe("Update 3 test answer");
    });

    it('Update successfully 4', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            title: "Update 4 test title",
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update 4 test title");
        expect(result.body.data.question).toBe("Update 2 test Question");
        expect(result.body.data.answer).toBe("Update 3 test answer");
    });

    it('Update successfully 5', async() => {
        const result = await supertest(web)
        .patch('/admin/qanda/update/1')
        .set('Authorization', 'test')
        .send({
            answer: "Update 5 test answer"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Update 4 test title");
        expect(result.body.data.question).toBe("Update 2 test Question");
        expect(result.body.data.answer).toBe("Update 5 test answer");
        await removeQandA("Update 4 test title");
    });

});

describe ('Delete /admin/qanda/delete/:id', function() {
    beforeAll(async () => {
        await createTestUser();
        await createQandA("test", 1);
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Delete fail 1', async () => {
        const result = await supertest(web)
        .delete('/admin/qanda/delete/12')
        .set('Authorization','test');
        
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });
    it('Delete fail 2', async () => {
        const result = await supertest(web)
        .delete('/admin/qanda/delete/asdj123')
        .set('Authorization','test');
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 3', async () => {
        const result = await supertest(web)
        .delete('/admin/qanda/delete/1')
        .set('Authorization','');
        
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 5', async () => {
        const result = await supertest(web)
        .delete('/admin/qanda/delete/asdj asd 123')
        .set('Authorization','test');
        
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete Successfully 1', async () => {
        const result = await supertest(web)
        .delete('/admin/qanda/delete/1')
        .set('Authorization','test');

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('DELETEMany /admin/qanda/delete', function() {

    beforeAll(async() => {
        await createTestUser();
        await createQandA2(5);
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('DeleteMany fail 1', async () => {
        const result = await supertest(web)
        .delete("/admin/qanda/delete")
        .set('Authorization', '')
        .send({
            ids: [1,2,3,4]
        });

        expect(result.status).toBe(401);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
    });

    it('DeleteMany fail 2', async () => {
        const result = await supertest(web)
        .delete("/admin/qanda/delete")
        .set('Authorization', 'test')
        .send({
            ids: []
        });

        expect(result.status).toBe(400);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
    });

    it('DeleteMany fail 3', async () => {
        const result = await supertest(web)
        .delete("/admin/qanda/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,45]
        });

        expect(result.status).toBe(404);
        logger.info(result.body);
        expect(result.body.errors).toBeDefined();
    });

    it('DeleteMany successfully 1', async () => {
        const result = await supertest(web)
        .delete("/admin/qanda/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,4, 5]
        });

        expect(result.status).toBe(200);
        logger.info(result.body);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/qanda/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createQandA2(10);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeQandA2(10);
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
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
        .get("/admin/qanda/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:20,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

});

describe('GET /admin/qanda/search', function () {
    beforeAll(async() => {
        await createTestUser();
        await createQandA2(10);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeQandA2(10);
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/qanda/search")
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
        .get("/admin/qanda/search")
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
        .get("/admin/qanda/search")
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
        .get("/admin/qanda/search")
        .set('Authorization', 'test')
        .send({
            search: "3",
            page:3,
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
        .get("/admin/qanda/search")
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
        .get("/admin/qanda/search")
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
        .get("/admin/qanda/search")
        .set('Authorization', 'test')
        .send({
            search: "Answer",
            page:1,
            dataRequest: 5,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
});


