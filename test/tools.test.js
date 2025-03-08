import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { 
    createTestUser,
    removeTestUser,
    createTestModel1,
    removeTestModel1,
    createTestType1,
    removeTestType1,
    removeColor1,
    createColor1,
    createTool1,
    removeTool1,
    createTool2,
    removeTool2
} from "./test-until.js";
import { deleteOldImage } from "../src/middleware/delete-image-middleware.js";
import { error } from "winston";

describe('POST /admin/tool/create', function () {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });
    it('Create fail 1', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "",
            image: "",
            description: "",
            price: "",
            modelName: "",
            colorName: "",
            typeName: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 2', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', '')
        .send({
            name: "test",
            image: "test.com",
            description: "test des",
            price: 132,
            modelName: "test",
            colorName: "test 2",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            image: "https:\\test.com",
            description: "test des",
            price: "132123123asdads",
            modelName: "test",
            colorName: "test 2",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            image: "https:\\test.com",
            description: "test des",
            price: "132123123asdads",
            modelName: "test",
            colorName: "test 3",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 4', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('price', 123)
        .field('modelName', 'test 2')
        .field('typeName', 'test')
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 5', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            image: "https:\\test.com",
            description: "test des",
            price: 132123123,
            modelName: "test",
            colorName: "test 3",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully 1', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            image: "test.com",
            description: "test des",
            price: 132,
            modelName: "test",
            colorName: "test 2",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTool1("test");
        
    });
    it('Create successfully 2', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            image: "test.com",
            price: 132,
            modelName: "test",
            colorName: "test 2",
            typeName: "test"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTool1("test");
    });
    it('Create successfully 3', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('name', 'test')
        .field('price', 123)
        .field('modelName', 'test 2')
        .field('typeName', 'test')
        .field('colorName', 'test 2')
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTool1("test");
        await deleteOldImage(result.body.data.image);
    });

    it('Create successfully 4', async() => {
        const result = await supertest(web)
        .post("/admin/tool/create")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('name', 'test')
        .field('price', 123)
        .field('modelName', 'test 2')
        .field('typeName', 'test')
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTool1("test");
        await deleteOldImage(result.body.data.image);
    });
    
});

describe('PATCH /admin/tool/update', function () {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
        await createTool1("test", 1,2,2,2);
        await createTool1("test2", 2,2,2,2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTool1("test");
        await removeTool1("test2");
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });

    it('Update fial 1', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .send({
            id: "",
            name: "",
            description: "",
            price: "",
            modelName: "",
            colorName: "",
            typeName: "",
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fial 2', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', '')
        .send({
            id: 1,
            name: "ggwp",
            description: "ggwp",
            price: 1234,
            modelName: "test",
            colorName: "test",
            typeName: "test",
        });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async() => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('id', 1)
        .field('modelName', 'test 3');
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
        
    });

    it('Create fail 4', async() => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('name', 'test2')
        .field('price', 123)
        .field('modelName', 'test 2')
        .field('typeName', 'test');
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .send({
            id: 1,
            name: "test3",
            image:"image.com",
            description: "ttteesst",
            price: 123456,
            modelName: "test 2",
            colorName: "test 2",
            typeName: "test 2",
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).not.toBe("test");
        expect(result.body.data.name).toBe("test3");
    });

    it('Update successfully 2', async () => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .send({
            id: 1,
            price: 10000,
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Create successfully 3', async() => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('id', 1)
        .field('name', 'test')
        .field('price', 123)
        .field('modelName', 'test')
        .field('typeName', 'test')
        .field('colorName', 'test');
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.errors).not.toBeDefined();
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe("test");
        await deleteOldImage(result.body.data.image);
    });

    it('Create successfully 4', async() => {
        const result = await supertest(web)
        .patch("/admin/tool/update")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png')
        .field('id', 1)
        .field('price', 123)
        .field('colorName', 'test 2');
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.errors).not.toBeDefined();
        expect(result.body.data).toBeDefined();
        await deleteOldImage(result.body.data.image);
    });
    
});

describe('DELETE /admin/tool/delete/:id', function() {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
        await createTool1("test", 1,2,2,2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });


    it('Delete fail 1', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/delete/2")
        .set('Authorization', 'test') ;

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 2', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/delete/1")
        .set('Authorization', '') ;

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/delete/1")
        .set('Authorization', 'test') ;

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});
describe('DELETE /admin/tool/delete', function() {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
        await createTool2(10,2,2,2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });

    it('Delete fail 1', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/delete")
        .set('Authorization', 'test')
        .send({
            ids: [11]
        });

        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete fail 2', async () => {
        const result = await supertest(web)
        .delete("/admin/tool/delete")
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
        .delete("/admin/tool/delete")
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
        .delete("/admin/tool/delete")
        .set('Authorization', 'test')
        .send({
            ids: [1,2,3,4,5,6,7,8,9,10]
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/tool/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
        await createTool2(15,2,2,2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTool2(15);
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
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
        .get("/admin/tool/pagination")
        .set('Authorization', 'test')
        .send({
            sortBy:"price",
            dataRequest: 15
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });


    it('Pagination successfully 3', async () => {
        const result = await supertest(web)
        .get("/admin/tool/pagination")
        .set('Authorization', 'test')
        .send({
            sortBy:"modelTools",
            dataRequest: 15
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/tool/pagination")
        .set('Authorization', 'test')
        .send({
            sortBy:"typeTools",
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

 });

 describe('GET /admin/tool/search', function() {
    beforeAll(async() => {
        await createTestUser();
        await createTestModel1("test", 1);
        await createTestType1("test", 1);
        await createColor1("test", 1)
        await createTestModel1("test 2", 2);
        await createTestType1("test 2", 2);
        await createColor1("test 2", 2)
        await createTool2(15,2,2,2);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTool2(15);
        await removeTestModel1("test");
        await removeTestType1("test"); 
        await removeColor1("test");
        await removeTestModel1("test 2");
        await removeTestType1("test 2"); 
        await removeColor1("test 2");
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
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
        .get("/admin/tool/search")
        .set('Authorization', 'test')
        .send({
            search: "test",
            page:1,
            dataRequest: 5,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/tool/search")
        .set('Authorization', 'test')
        .send({
            search: "2",
            page:1,
            dataRequest: 15,
            sortBy: "typeTools"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
 });