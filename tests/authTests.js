// tests/authTests.js
import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  let token;

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "testuser@example.com",
        password: "password123",
        name: "Test User",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // Save the token for later tests
  });

  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123",
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });

  // Additional tests can go here
});
