import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { deleteOldImage } from "../src/middleware/delete-image-middleware.js";
import { createNews1, createNews2, createTestUser, removeNews1, removeNews2, removeTestUser } from "../test/test-until.js";

describe('POST /admin/news/create', function() {
    beforeAll(async()=> {
        await createTestUser();
    });

    afterAll(async()=> {
        await removeTestUser();
    });

    it('Create Fail 1', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .send({
            news: "Test News",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 2', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 3', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            news: "Test News",
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Fail 4', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', '')
        .send({
            title: "Test Title",
            news: "Test News",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Create Successfully 1', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            news: "Test News",
            image: "https://Testimage.com"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Test Title");
        expect(result.body.data.news).toBe("Test News");
        
    });

    it('Create Fail 5', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            news: "Test News",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        await removeNews1("Test Title");
    });

    it('Create Successfully 2', async ()=> {
        const result= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .field('title', 'Test Title')
        .field('news','Test News')
        .attach('image', 'test/test-image/JSGD.png') ;

        logger.info(result.body);
        expect(result.status).toBe(200);
        await removeNews1("Test Title");
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Test Title");
        expect(result.body.data.news).toBe("Test News");
        await deleteOldImage(result.body.data.image);
    });
});

describe('PATCH /admin/news/update/:id', function() {
    beforeAll(async()=> {
        await createTestUser();
        await createNews1("Test News",1);
        await createNews1("Test News 1",2);
    });

    afterAll(async()=> {
        await removeTestUser();
        await removeNews1("Test Title");
        await removeNews1("Test News 1");
    });

    it('Update Fail 1', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/abcde")
        .set('Authorization', 'test')
        .send({
            news: "Test News",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 2', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/1")
        .set('Authorization', 'test')
        .send({
            title: "Test News 1",
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 3', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/3")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            news: "Test News",
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 4', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/1")
        .set('Authorization', '')
        .send({
            title: "Test Title",
            news: "Test News",
            image: "https://Testimage.com"
        });
        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Successfully 1', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/1")
        .set('Authorization', 'test')
        .send({
            title: "Test Title",
            news: "Test News",
            image: "https://Testimage.com"
        });
        
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.title).toBe("Test Title");
        expect(result.body.data.news).toBe("Test News");
        
    });

    it('Update Successfully 2', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/1")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png') ;
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await deleteOldImage(result.body.data.image);
    });

    it('Update Successfully 3', async ()=> {
        const result= await supertest(web)
        .patch("/admin/news/update/1")
        .set('Authorization', 'test')
        .attach('image', 'test/test-image/JSGD.png') ;
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await deleteOldImage(result.body.data.image);
    });
});

describe ('Delete /admin/news/delete/:id', function () {
    beforeAll(async() => {
        await createTestUser();
        await createNews2(2);
    });

    afterAll(async () => {
        await removeTestUser();
    });
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete/5')
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete/1')
            .set('Authorization', '');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete/aiunsdi')
            .set('Authorization', 'test');

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .field('title', 'Test Title')
        .field('news','Test News')
        .attach('image', 'test/test-image/JSGD.png') ;

        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = create.body.data.id;
        
        const result = await supertest(web)
            .delete(`/admin/news/delete/${id}`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

    it('Delete successfully 2', async () => {
        const result = await supertest(web)
            .delete(`/admin/news/delete/1`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

    it('Delete successfully 3', async () => {
        const result = await supertest(web)
            .delete(`/admin/news/delete/2`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe ('Delete /admin/news/delete', function () {
    beforeAll(async() => {
        await createTestUser();
        await createNews2(5);
    });

    afterAll(async () => {
        await removeTestUser();
    });
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,15]
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', '')
            .send({
                ids: [1,2,3,4,5]
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', 'test')
            .send({
                ids: ["asdasd"]
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 4', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', 'test')

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 5', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', 'test')
            .send({
                ids: []
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .field('title', 'Test Title 1112323')
        .field('news','Test News')
        .attach('image', 'test/test-image/JSGD.png') ;

        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = create.body.data.id;

        const create1= await supertest(web)
        .post("/admin/news/create")
        .set('Authorization', 'test')
        .field('title', 'Test Title 111')
        .field('news','Test News')
        .attach('image', 'test/test-image/JSGD.png') ;

        expect(create1.status).toBe(200);
        expect(create1.body.data).toHaveProperty('id');
        const id1= create1.body.data.id;
        
        const result = await supertest(web)
            .delete(`/admin/news/delete`)
            .set('Authorization', 'test')
            .send({
                ids: [id, id1] 
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
    

    it('Delete successfully 2', async () => {
        const result  = await supertest(web)
            .delete('/admin/news/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,5]
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/news/pagination', function () {
    beforeAll(async() => {
        await createTestUser();
        await createNews2(15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeNews2(15);
    });

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/news/pagination")
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
        .get("/admin/news/pagination")
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
        .get("/admin/news/pagination")
        .set('Authorization', 'test')
        .send({
            page:4,
        });
        logger.info(result.body);
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it('Pagination successfully 1', async () => {
        const result = await supertest(web)
        .get("/admin/news/pagination")
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
        .get("/admin/news/pagination")
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
        .get("/admin/news/pagination")
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
        .get("/admin/news/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:15,
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 5', async () => {
        const result = await supertest(web)
        .get("/admin/news/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "news"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });


});

describe('GET /admin/news/search', function () {
    beforeAll(async() => {
        await createTestUser();
        await createNews2(15);
    });

    afterAll(async () => {
        await removeTestUser();
        await removeNews2(15);
    });

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
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
        .get("/admin/news/search")
        .set('Authorization', 'test')
        .send({
            search: "Test",
            page:1,
            dataRequest: 5,
            sortBy: "news"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
});

