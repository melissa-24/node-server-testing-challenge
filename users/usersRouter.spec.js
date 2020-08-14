const request = require("supertest");
const server = require("../server.js");
const db = require("../database/db-config.js");


// Token copied from console after login on with valid user
const token = "ytHhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImNhbHZhcmV6IiwiY3JlYXRlZF9hdCI6MTU5NzM3MjQ3MzEyOCwiaWF0IjoxNTk3MzcyNDczLCJleHAiOjE1OTczNzYwNzN9.Gu8uOmyldN8fh4HUFpmIP-ANvJhrki3_w_EM1ylM0qk";

describe("Users Router", () => {
    describe("GET /api/users", () => {
        let res = {};
        beforeAll(async () => {
            const [post, get] = await Promise.all([
                request(server).post("/api/auth/register")
                    .send({
                        "firstName": "Melissa",
                        "lastName": "Longenberger",
                        "email": "melissa-longenberger@lambdastudents.com",
                        "username": "mlongenberger",
                        "password": "pa55word"
                    }),
                request(server).get("/api/users").auth(token, { type: "bearer" })
            ]);

            res = get;
        });

        test("should get status 200 OK", () => {
            expect(res.status).toEqual(200);
        });

        test("should return an array", () => {
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    describe("DELETE /api/users/:id", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).delete("/api/users/1").auth(token, { type: "bearer" });
        });

        test("should get status 204 No Content", () => {
            expect(res.status).toBe(204);
        });

        test("cleans the users table", async () => {
            await db("users").truncate();
        })

    });
});