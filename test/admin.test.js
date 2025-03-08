import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser } from "./test-until.js";

describe('POST /register', function () {

    afterEach(async () => {
        await removeTestUser();
    });

    it('Register fail 1', async () => {
        const result = await supertest(web)
            .post('/register')
            .send({
                username: '',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Register fail 2', async () => {
        const result = await supertest(web)
            .post('/register')
            .send({
                username: '',
                password: 'confidential'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Register fail 3', async () => {
        const result = await supertest(web)
            .post('/register')
            .send({
                username: 'test',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Register fail 4', async () => {
        await createTestUser();

        const result = await supertest(web)
            .post('/register')
            .send({
                username: 'test1',
                password: 'confidential'
            });

        expect(result.status).toBe(405);
        expect(result.body.errors).toBeDefined();
    });

    it('Register successfully', async () => {
        const result = await supertest(web)
            .post('/register')
            .send({
                username: 'test',
                password: 'confidential'
            });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.username).not.toBe('test');
        expect(result.body.data.password).not.toBe('confidential');
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });
});


describe('POST /login', function () {

    afterEach(async () => {
        await removeTestUser();
    });

    it('Login fail 1', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: '',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Login fail 2', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: 'test',
                password: ''
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Login fail 3', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: '',
                password: 'confidential'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Login fail 4', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: 'test',
                password: 'confidentialaaa'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Login fail 5', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: 'testtt',
                password: 'confidential'
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Login successfully', async () => {
        await createTestUser();
        const result = await supertest(web)
            .post('/login')
            .send({
                username: 'test',
                password: 'confidential'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });
});

describe('PATCH /admin/update/password', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    });

    it('Update fail 1', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .send({
            newPassword: "",
            oldPassword: "",
        });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
    it('Update fail 2', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .set("Authorization", "test")
        .send({
            newPassword: "",
            oldPassword: "confidential",
        });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 3', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .set("Authorization", "test")
        .send({
            newPassword: "test",
            oldPassword: "",
        });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 4', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .set("Authorization", "test")
        .send({
            newPassword: "test",
            oldPassword: "test111",
        });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update fail 5', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .set("Authorization", "test")
        .send({
            newPassword: "confidential",
            oldPassword: "confidential",
        });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully', async () => {
        const result = await supertest(web)
        .patch("/admin/update/password")
        .set("Authorization", "test")
        .send({
            newPassword: "test",
            oldPassword: "confidential",
        });
        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });
});

describe('PATCH /admin/update/username', function () {
    afterEach(async () => {
        await removeTestUser();
    });

    beforeEach(async () => {
        await createTestUser();
    });

    it('Update Fail 1', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "",
            password: ""
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 2', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "etas",
            password: ""
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 3', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "",
            password: "asdads"
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
    it('Update Fail 4', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "",
            password: "confidential"
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 5', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "test",
            password: "confidential"
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Update Fail 6', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "testtest",
            password: "confidentialll"
        });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Update successfully', async () => {
        const result = await supertest(web)
        .patch("/admin/update/username")
        .set("Authorization", "test")
        .send({
            username: "testtest",
            password: "confidential"
        });

        expect(result.status).toBe(200);
        expect(result.body.message).toBeDefined();
    });

});
