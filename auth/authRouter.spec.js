const request = require("supertest");
const server = require("../server.js");
const db = require("../database/db-config.js");

describe("Auth Router", () => {
    describe("POST /api/auth/register", () => {
        let res = {};
        beforeAll(async () => {
            try {
                res = await request(server)
                            .post("/api/auth/register")
                            .send({
                                "firstName": "Melissa",
                                "lastName": "Longenberger",
                                "email": "melissa-longenberger@lambdastudents.com",
                                "username": "mlongenberger",
                                "password": "pa55word"
                            });
            } catch (err) {
                console.log(`Error ${err}`);
            }
            
        });

        test("should return a status 201 Created", () => {
            expect(res.status).toEqual(201);
        });

        test("should return an object that has the username of the user created", () => {
            expect(res.body.username).toEqual("mlongenberger");
        });

        
    });

    describe("POST /api/auth/login", () => {
        let res = {};
        beforeAll(async () => {
            try {
                res = await request(server)
                            .post("/api/auth/login")
                            .send({username: "mlongenberger", password: "pa55word"});
            } catch (err) {
                console.log(`Error ${err}`);
            }
            
        });

        test("should return a status 200 OK", () => {
            expect(res.status).toEqual(200);
        });

        test("should return an object that has the username of the user logged on", () => {
            expect(res.body).toHaveProperty("username");
        });

        test("should fail with status 403 Forbidden", async () => {
            let res = await request(server).post("/api/auth/login")
                        .send({username: "honeybee", password: "pa55word"});
            expect(res.status).toEqual(403);
        });

        test("cleans out the database after all tests", async () => {
            await db("users").truncate();
        });
    });
})