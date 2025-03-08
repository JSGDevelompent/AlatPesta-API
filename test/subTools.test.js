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
    removeTool2,
    createSubTools1,
    createSubTools2,
    removeSubTools1,
    removeSubTools2
} from "./test-until.js";
import { deleteOldImage } from "../src/middleware/delete-image-middleware.js";

describe('POST /admin/tool/sub/create', function() {
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

    it ('Create fail 1', async () => {
        const result = await supertest(web)
        .post("/admin/tool/sub/create")
        .set('Authorization', '')
        .send({
            name: "Sample Tool",
            price: 123,
            toolName: "Example Tool Name",
            images: [
                {
                    name: "Sample Image",
                    image: "https://example.com/sample-image.jpg",
                    colors: ["#b52218", "#2018f5", "#ff5733"]
                }
            ]
        });
        logger.info(result.body);
        expect(result.status).toBe(401); 
        expect(result.body.errors).toBeDefined(); 
    });

    it ('Create fail 2', async () => {
        const result = await supertest(web)
        .post("/admin/tool/sub/create")
        .set('Authorization', 'test')
        .send({
            name: "Sample Tool",
            price: 123,
            toolName: "Example Tool Name",
            images: [
                {
                    name: "",
                    image: "",
                    colors: ["#b52218", "#2018f5", "#ff5733"]
                }
            ]
        });
        logger.info(result.body);
        expect(result.status).toBe(400); 
        expect(result.body.errors).toBeDefined(); 
    });

    it ('Create fail 3', async () => {
        const result = await supertest(web)
        .post("/admin/tool/sub/create")
        .set('Authorization', 'test')
        .send({
            name: "Sample Tool",
            price: 123,
            toolName: "Example Tool Name"
        });
        logger.info(result.body);
        expect(result.status).toBe(400); 
        expect(result.body.errors).toBeDefined(); 
    });

    it ('Create fail 4', async () => {
        const result = await supertest(web)
        .post("/admin/tool/sub/create")
        .set('Authorization', 'test')
        .send({
            name: "Sample Tool",
            images: [
                {
                    name: "",
                    image: "",
                    colors: ["#b52218", "#2018f5", "#ff5733"]
                }
            ]
        });
        logger.info(result.body);
        expect(result.status).toBe(400); 
        expect(result.body.errors).toBeDefined(); 
    });

    it ('Create fail 5', async () => {
        const result = await supertest(web)
        .post("/admin/tool/sub/create")
        .set('Authorization', 'test')
        .send({
            name: "Sample Tool",
            price: 123,
            toolName: "Example Tool Name",
            images: [
                {
                    name: "Sample Image",
                    image: "https://example.com/sample-image.jpg",
                    colors: ["#b52218", "#2018f5", "#ff5733"]
                }
            ]
        });
        logger.info(result.body);
        expect(result.status).toBe(404); 
        expect(result.body.errors).toBeDefined(); 
    });

    it('Create fail 6', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Image')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            expect(result.status).toBe(400); 
            expect(result.body.errors).toBeDefined();
            
    });

    it('Create fail 7', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('toolName', 'test')
            .field('price', 123)
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            expect(result.status).toBe(400); 
            expect(result.body.errors).toBeDefined();
            
    });

    it('Create successfully 1', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .send({
                name: "Sample Tool",
                price: 123,
                toolName: "test",
                images: [
                    {
                        name: "Sample Image",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            logger.info(result.body);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[0].name).toBe("Sample Image");
    });
    

    it('Create successfully 2', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .send({
                name: "Sample Tool",
                price: 123,
                toolName: "test",
                images: [
                    {
                        name: "Sample Image",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    },
                    {
                        name: "Sample Image 1",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    },
                    {
                        name: "Sample Image 2",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    },
                    {
                        name: "Sample Image 3",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            logger.info(result.body);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[0].name).toBe("Sample Image");
            expect(result.body.data.images[1].name).toBe("Sample Image 1");
            expect(result.body.data.images[2].name).toBe("Sample Image 2");
            expect(result.body.data.images[3].name).toBe("Sample Image 3");
    });

    it('Create successfully 3', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Image')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            await deleteOldImage(result.body.data.images[0].image);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[0].name).toBe("Sample Image");
    });

    it('Create successfully 4', async () => {
        const result = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Image')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Image 1')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
            await deleteOldImage(result.body.data.images[0].image);
            await deleteOldImage(result.body.data.images[1].image);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[0].name).toBe("Sample Image");
            expect(result.body.data.images[1].name).toBe("Sample Image 1");
    });

});

describe ('PATCH /admin/tool/sub/update', function() {
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
        await createSubTools2(2,1);
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

    it('Update fail 1', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .send({
                id: "",
                name: "",
                images: [
                    {
                        name: "Sample Image 5",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            expect(result.status).toBe(400); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', '')
            .send({
                id: 1,
                name: "Sample Tool",
                price: 1234,
                images: [
                    {
                        name: "Sample Image 5",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            expect(result.status).toBe(401); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .send({
                id: 1,
                name: "Sample Tool",
                price: 1234,
                toolName : "test2",
                images: [
                    {
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            expect(result.status).toBe(400); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update fail 4', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 1)
            .field('price', 123)
            .field('toolName', 'test90')
            .field('images[0][name]', 'Sample Image')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            expect(result.status).toBe(404); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 3)
            .field('name', 'test2')
            .field('price', 123)
            .field('toolName', 'test2')
            .field('images[0][id]',2)
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Image 1')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
            expect(result.status).toBe(404); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update fail 6', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 2)
            .field('images[0][id]',6)
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Image 1')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
            expect(result.status).toBe(404); 
            expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .send({
                id: 1,
                name: "Sample Tool",
                price: 1234,
                images: [
                    {
                        name: "Sample Image 2",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[1].name).toBe("Sample Image 2");
    });

    it('Update successfully 2', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .send({
                id: 1,
                name: "Sample Tool",
                price: 1234,
                toolName : "test2",
                images: [
                    {
                        name: "Sample Image 5",
                        image: "https://example.com/sample-image.jpg",
                        colors: ["#b52218", "#2018f5", "#ff5733"]
                    }
                ]
            });
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.toolsId).toBe(2);
            expect(result.body.data.images[2].name).toBe("Sample Image 5");
    });

    it('Update successfully 3', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 1)
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Image 34121')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            await deleteOldImage(result.body.data.images[3].image);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("Sample Tool");
            expect(result.body.data.images[3].name).toBe("Sample Image 34121");
    });

    it('Update successfully 4', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 2)
            .field('name', 'test2')
            .field('price', 123)
            .field('toolName', 'test2')
            .field('images[0][id]',2)
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Image 1')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
            await deleteOldImage(result.body.data.images[1].image);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("test2");
            expect(result.body.data.images[0].name).toBe("SubTool 2 image");
            expect(result.body.data.images[1].name).toBe("Sample Image 1");
    });

    it('Update successfully 5', async () => {
        const result = await supertest(web)
            .patch("/admin/tool/sub/update")
            .set('Authorization', 'test')
            .field('id', 2)
            .field('name', 'test2')
            .field('price', 123)
            .field('toolName', 'test2')
            .field('images[0][id]',2)
            .attach('images[0][image]', 'test/test-image/JSGD.png');
            await deleteOldImage(result.body.data.images[0].image);
            expect(result.status).toBe(200); 
            expect(result.body.data).toBeDefined();
            expect(result.body.data.name).toBe("test2");
            expect(result.body.data.images[0].name).toBe("SubTool 2 image");
            expect(result.body.data.images[1].name).toBe("Sample Image 1");
    });
});

describe ('Delete /admin/tool/sub/delete/:id', function () {
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
        await createSubTools1("test", 1, 1 );
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
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete/5')
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete/1')
            .set('Authorization', '');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete/aiunsdi')
            .set('Authorization', 'test');

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Imageasdas')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Imageasdas badas')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
        
        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = create.body.data.id;
        
        const result = await supertest(web)
            .delete(`/admin/tool/sub/delete/${id}`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

    it('Delete successfully 2', async () => {
        const result = await supertest(web)
            .delete(`/admin/tool/sub/delete/1`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe ('Delete /admin/tool/sub/sti/delete/:id', function () {
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
        await createSubTools1("test", 1, 1 );
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
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete/5')
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete/1')
            .set('Authorization', '');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete/aiunsdi')
            .set('Authorization', 'test');

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Imageasdas')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Imageasdas badas')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
        
        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const idSti = create.body.data.images[0].id;
        
        const result1 = await supertest(web)
            .delete(`/admin/tool/sub/sti/delete/${idSti}`)
            .set('Authorization', 'test');

        const result2 = await supertest(web)
            .delete(`/admin/tool/sub/sti/delete/${idSti + 1}`)
            .set('Authorization', 'test');
        expect(result1.status).toBe(200);
        expect(result1.body.message).toBeDefined();
        expect(result2.status).toBe(200);
        expect(result2.body.message).toBeDefined();
    });

    it('Delete successfully 2', async () => {
        const result = await supertest(web)
            .delete(`/admin/tool/sub/sti/delete/1`)
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe ('Delete /admin/tool/sub/delete', function () {
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
        await createSubTools2(5, 2);
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
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,15]
            });

        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', '')
            .send({
                ids: [1,2,3,4,5]
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', 'test')
            .send({
                ids: ["asdasd"]
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 4', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', 'test')

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 5', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', 'test')
            .send({
                ids: []
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Imageasdas')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Imageasdas badas')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
        
        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = parseInt(create.body.data.id);

        const create1 = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Imageasdas')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Imageasdas badas')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png');
        
        expect(create1.status).toBe(200);
        expect(create1.body.data).toHaveProperty('id');
        const id1 = parseInt(create1.body.data.id);
        
        const result1 = await supertest(web)
            .delete(`/admin/tool/sub/delete`)
            .set('Authorization', 'test')
            .send({
                ids: [id, id1] 
            });
        expect(result1.status).toBe(200);
        expect(result1.body.message).toBeDefined();
    });
    

    it('Delete successfully 2', async () => {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,5]
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe ('Delete /admin/tool/sub/sti/delete', function () {
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
        await createSubTools2(5, 2);
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
    
    it ('Delete fail 1', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,15]
            });
        expect(result.status).toBe(404);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 2', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', '')
            .send({
                ids: [1,2,3,4,5]
            });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 3', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', 'test')
            .send({
                ids: ["asdasd"]
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 4', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', 'test')

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it ('Delete fail 5', async ()=> {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', 'test')
            .send({
                ids: []
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Delete successfully 1', async () => {
        const create = await supertest(web)
            .post("/admin/tool/sub/create")
            .set('Authorization', 'test')
            .field('name', 'Sample Tool')
            .field('price', 123)
            .field('toolName', 'test')
            .field('images[0][name]', 'Sample Imageasdas')
            .field('images[0][colors][0]', '#b52218')
            .field('images[0][colors][1]', '#2018f5')
            .field('images[0][colors][2]', '#ff5733')
            .attach('images[0][image]', 'test/test-image/JSGD.png')
            .field('images[1][name]', 'Sample Imageasdas badas')
            .field('images[1][colors][0]', '#b52218')
            .field('images[1][colors][1]', '#2018f5')
            .field('images[1][colors][2]', '#ff5733')
            .attach('images[1][image]', 'test/test-image/JSGD.png')
            .field('images[2][name]', 'Sample Imageasdas 1')
            .field('images[2][colors][0]', '#b52218')
            .field('images[2][colors][1]', '#2018f5')
            .field('images[2][colors][2]', '#ff5733')
            .attach('images[2][image]', 'test/test-image/JSGD.png')
            .field('images[3][name]', 'Sample Imageasdas badas 1')
            .field('images[3][colors][0]', '#b52218')
            .field('images[3][colors][1]', '#2018f5')
            .field('images[3][colors][2]', '#ff5733')
            .attach('images[3][image]', 'test/test-image/JSGD.png');;
        
        expect(create.status).toBe(200);
        expect(create.body.data).toHaveProperty('id');
        const id = parseInt(create.body.data.images[0].id);
        const id1 = parseInt(create.body.data.images[1].id);
        const id2 = parseInt(create.body.data.images[2].id);
        const id3 = parseInt(create.body.data.images[3].id);
        
        const result1 = await supertest(web)
            .delete(`/admin/tool/sub/sti/delete`)
            .set('Authorization', 'test')
            .send({
                ids: [id, id1,id2, id3] 
            });
        expect(result1.status).toBe(200);
        expect(result1.body.message).toBeDefined();
    });
    

    it('Delete successfully 2', async () => {
        const result  = await supertest(web)
            .delete('/admin/tool/sub/sti/delete')
            .set('Authorization', 'test')
            .send({
                ids: [1,2,3,4,5]
            });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('GET /admin/tool/sub/pagination', function () {
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
        await createSubTools2(15, 2);
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

    it('Pagination fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
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
        .get("/admin/tool/sub/pagination")
        .set('Authorization', 'test')
        .send({
            dataRequest:15,
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Pagination successfully 5', async () => {
        const result = await supertest(web)
        .get("/admin/tool/sub/pagination")
        .set('Authorization', 'test')
        .send({
            page:1,
            dataRequest: 5,
            sortBy: "STI"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });


});

describe('GET /admin/tool/sub/search', function () {
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
        await createSubTools2(15, 2);
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

    it('Search fail 1', async () => {
        const result = await supertest(web)
        .get("/admin/tool/sub/search")
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
        .get("/admin/tool/sub/search")
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
        .get("/admin/tool/sub/search")
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
        .get("/admin/tool/sub/search")
        .set('Authorization', 'test')
        .send({
            search: "3",
            page:4,
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
        .get("/admin/tool/sub/search")
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
        .get("/admin/tool/sub/search")
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
        .get("/admin/tool/sub/search")
        .set('Authorization', 'test')
        .send({
            search: "SubTool",
            page:1,
            dataRequest: 5,
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Search successfully 4', async () => {
        const result = await supertest(web)
        .get("/admin/tool/sub/search")
        .set('Authorization', 'test')
        .send({
            search: "SubTool",
            page:1,
            dataRequest: 5,
            sortBy: "STI"
        });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });
});




