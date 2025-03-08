import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { 
    createTestUser,
    removeTestUser,
    createTestCompany,
    removeTestCompany
} from "./test-until.js";
import { deleteOldImage } from "../src/middleware/delete-image-middleware.js";

describe('POST /admin/company/create', function () {
    beforeAll(async() => {
        await createTestUser();
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it('Create fail 1', async () => {
        const result = await supertest(web)
        .post("/admin/company/create")
        .set('Authorization', 'test')
        .send({
            name: "test",
            icon: "",
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
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    it('Create fail 2', async () => {
        const result = await supertest(web)
        .post("/admin/company/create")
        .set('Authorization', 'test')
        .send({
            name: "",
            icon: "",
            aboutUs: "",
            termsAndConditions: "",
            linkGMap: "",
            phoneNumber: "",
            email: "",
            facebook: "",
            twitter:"",
            instagram: "",
            linkedIn: "",
            youtube:"",
            shopee: "",
            lazada: "",
            tokoPedia: ""
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 3', async () => {
        const result = await supertest(web)
        .post("/admin/company/create")
        .set('Authorization', 'test')
        .send({
            name: 123123,
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
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create fail 4', async () => {
        await createTestCompany();
        const result = await supertest(web)
        .post("/admin/company/create")
        .set('Authorization', 'test')
        .send({
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
        });

        logger.info(result.body);

        expect(result.status).toBe(405);
        expect(result.body.errors).toBeDefined();
        await removeTestCompany();
    });

    it('Create fail 5', async () => {
        const result = await supertest(web)
            .post("/admin/company/create")
            .attach('image', 'test/test-image/JSGD.png') // Unggah gambar
            .set('Authorization', 'test')
            .field('name', 'test')
            .field('aboutUs', 'test aboutUs')
            .field('termsAndConditions', 'test T&C')
            .field('linkGMap', '')
            .field('phoneNumber', '+628123213642')
            .field('email', 'testgmailtest@gmail.com')
            .field('facebook', '')
            .field('twitter', '')
            .field('instagram', '')
            .field('linkedIn', '')
            .field('youtube', '')
            .field('shopee', '')
            .field('lazada', '')
            .field('tokoPedia', '');
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Create successfully 1', async () => {
        const result = await supertest(web)
        .post("/admin/company/create")
        .set('Authorization', 'test')
        .send({
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
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTestCompany();
    });

    it('Create successfully 2', async () => {
        const result = await supertest(web)
            .post("/admin/company/create")
            .attach('image', 'test/test-image/JSGD.png')
            .set('Authorization', 'test')
            .field('name', 'test')
            .field('aboutUs', 'test aboutUs')
            .field('termsAndConditions', 'test T&C')
            .field('linkGMap', 'http://testlink.com')
            .field('phoneNumber', '+628123213642')
            .field('email', 'testgmailtest@gmail.com')
            .field('facebook', 'http://testlink.com')
            .field('twitter', 'http://testlink.com')
            .field('instagram', 'http://testlink.com')
            .field('linkedIn', 'http://testlink.com')
            .field('youtube', 'http://testlink.com')
            .field('shopee', 'http://testlink.com')
            .field('lazada', 'http://testlink.com')
            .field('tokoPedia', 'http://testlink.com');
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await removeTestCompany();
        await deleteOldImage(result.body.data.icon);
    });
});

describe('PATCH /admin/company/update', function () {
    beforeAll(async () => {
        await createTestUser();
        await createTestCompany();
    });

    afterAll(async () => {
        await removeTestUser();
        await removeTestCompany();
    });

    it('Update fail 1', async () => {
        const result = await supertest(web)
        .patch("/admin/company/update")
        .set('Authorization', 'test')
        .send({
            name: "test",
            icon: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
            aboutUs: "",
            termsAndConditions: "",
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
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 2', async () => {
        const result = await supertest(web)
        .patch("/admin/company/update")
        .set('Authorization', 'test')
        .send({
            name: "",
            icon: "",
            aboutUs: "",
            termsAndConditions: "",
            linkGMap: "",
            phoneNumber: "",
            email: "",
            facebook: "",
            twitter:"",
            instagram: "",
            linkedIn: "",
            youtube:"",
            shopee: "",
            lazada: "",
            tokoPedia: ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        const result = await supertest(web)
        .patch("/admin/company/update")
        .set('Authorization', 'test')
        .send({
            name: 123123,
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
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 4', async () => {
        const result = await supertest(web)
        .patch("/admin/company/update")
        .set('Authorization', '=')
        .send({
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
        });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
            .patch("/admin/company/update")
            .attach('image', 'test/test-image/JSGD.png') // Unggah gambar
            .set('Authorization', 'test')
            .field('name', 'test')
            .field('aboutUs', 'test aboutUs')
            .field('termsAndConditions', 'test T&C')
            .field('linkGMap', '')
            .field('phoneNumber', '+628123213642')
            .field('email', 'testgmailtest@gmail.com')
            .field('facebook', '')
            .field('twitter', '')
            .field('instagram', '')
            .field('linkedIn', '')
            .field('youtube', '')
            .field('shopee', '')
            .field('lazada', '')
            .field('tokoPedia', '');
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully 1', async () => {
        const result = await supertest(web)
        .patch("/admin/company/update")
        .set('Authorization', 'test')
        .send({
            name: "test34234234",
            aboutUs: "test aboutUs1232142431423",
            termsAndConditions: "test T&C",
            linkGMap: "http://testlink.com",
            phoneNumber: "+628123213642",
            email: "testgmailtest@gmail.com",
            facebook: "http://testlink.com",
            youtube:"http://testlink.com",
            shopee: "http://testlink.com",
            lazada: "http://testlink.com",
            tokoPedia: "http://testlink.com"
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
    });

    it('Update successfully 2', async () => {
        const result = await supertest(web)
            .patch("/admin/company/update")
            .attach('image', 'test/test-image/JSGD.png') // Unggah gambar
            .set('Authorization', 'test')
            .field('name', 'test')
            .field('aboutUs', 'test aboutUs')
            .field('termsAndConditions', 'test T&C')
            .field('linkGMap', 'http://testlink.com')
            .field('phoneNumber', '+628123213642')
            .field('email', 'testgmailtest@gmail.com')
            .field('facebook', 'http://testlink.com')
            .field('twitter', 'http://testlink.com')
            .field('instagram', 'http://testlink.com')
            .field('linkedIn', 'http://testlink.com')
            .field('youtube', 'http://testlink.com')
            .field('shopee', 'http://testlink.com')
            .field('lazada', 'http://testlink.com')
            .field('tokoPedia', 'http://testlink.com');
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        await deleteOldImage(result.body.data.icon);
    });
});