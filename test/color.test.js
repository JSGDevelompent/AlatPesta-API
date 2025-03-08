import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { 
    createTestUser,
    removeTestUser,
    createColor1,
    createColor2,
    removeColor1,
    removeColor2

 } from "./test-until.js";

 describe('POST /admin/tool/color/create', function () {
    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it ('Create Fail 1', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "",
            options: "",
            colors: "",
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Create Fail 2', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', '')
        .send ({
            name: "test color",
            options: 2,
            colors: ['#b52218', '#2018f5', '#2018f5'],
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Create Fail 3', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "test color",
            colors: ['#b52218', '#2018f5', '#2018f5'],
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Create Fail 4', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "test color",
            options: 2,
            colors: [],
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Create Fail ', async () => {
        await createColor1("test color", 1);
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "test color",
            options: 2,
            colors: ['#b52218', '#2018f5', '#2018f5'],
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        await removeColor1("test color")
    });

    it ('Create successfully 1', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "test color",
            options: 2,
            colors: ['#b52218', '#2018f5', '#2018f5'],
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test color");
        expect(result.body.data.options).toBe(2);
        expect(result.body.data.colors).toEqual(['#b52218', '#2018f5', '#2018f5']);
        await removeColor1("test color")
    });

    it ('Create successfully 2', async () => {
        const result = await supertest(web)
        .post("/admin/tool/color/create")
        .set('Authorization', 'test')
        .send ({
            name: "test color",
            options: 1,
            colors: ['#b52218', '#2018f5', '#2018f5'],
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test color");
        expect(result.body.data.options).toBe(1);
        expect(result.body.data.colors).toEqual(['#b52218', '#2018f5', '#2018f5']);
        await removeColor1("test color")
    });

 });

 describe ('PATCH /admin/tool/color/update', function() {
    beforeAll(async() => {
        await createTestUser();
        await createColor1("test", 1);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeColor1("test 2");
    });


    it('Update fail 1', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            name: "",
            options: "",
            colors: []
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            name: "test 1",
            options: "",
            colors: []
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', '') 
        .send({
            id: 1,
            name: "test 1",
            options: 1,
            colors: ['#b52218']
        });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 4', async () => {
        await createColor1('test 1', 2);
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            name: "test 1",
            options: 1,
            colors: ['#b52218']
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        await removeColor1('test 1');
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 2,
            name: "test 1",
            options: 1,
            colors: ['#b52218']
        });

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            name: "test 1",
            options: 1,
            colors: ['#b52218']
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test 1");
        expect(result.body.data.options).toBe(1);
        expect(result.body.data.colors).toEqual(['#b52218']);
    });

    it('Update successfuly 2', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            name: "test 2"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe("test 2"); 
    });

    it('Update successfuly 4', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            options: 1
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.options).toBe(1);
    });

    it('Update successfully 5', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/color/update")
        .set('Authorization', 'test') 
        .send({
            id: 1,
            colors: ['#b52218']
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.colors).toEqual(['#b52218']);
    });
 });

 describe ('DELETE /admin/tool/color/delete/:id', function () {
    beforeAll(async() => {
        await createTestUser();
        await createColor1("test", 1);
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Delete fail 1', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete/2")
        .set('Authorization', 'test') ;

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 2', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete/1")
        .set('Authorization', '') ;

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete/1")
        .set('Authorization', 'test') ;

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
 });

 describe ('DELETE /admin/tool/color/delete', function () {
    beforeAll(async() => {
        await createTestUser();
        await createColor2(5);
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Delete fail 1', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete")
        .set('Authorization', 'test')
        .send({
            ids: [6]
        });

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 2', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete")
        .set('Authorization', '')
        .send({
            ids: [1,2,3,4,5]
        });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 3', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete")
        .set('Authorization', 'test')
        .send({
            ids: "ggwp"
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/color/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,4,5]
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
 });

 describe('GET /admin/tool/color/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createColor2(15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeColor2(15);
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/pagination")
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
        .get("/admin/tool/color/pagination")
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
        .get("/admin/tool/color/pagination")
        .set('Authorization', 'test')
        .send({
            page:4,
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Pagination fail 4', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "nameee",
            sortOrder: "desc"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Pagination successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/pagination")
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
        .get("/admin/tool/color/pagination")
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
        .get("/admin/tool/color/pagination")
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
        .get("/admin/tool/color/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:20,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 2', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/pagination")
        .set('Authorization', 'test')
        .send({
            sortBy:"options",
            dataRequest: 15
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

 });

 describe('GET /admin/tool/color/search', function() {
    beforeAll(async() => {
        await createTestUser();
        await createColor2(15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeColor2(15);
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
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
        .get("/admin/tool/color/search")
        .set('Authorization', 'test')
        .send({
            search: "Colors",
            page:1,
            dataRequest: 5,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/tool/color/search")
        .set('Authorization', 'test')
        .send({
            search: "2",
            page:1,
            dataRequest: 15,
            sortBy: "options"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
 });