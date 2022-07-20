import mongoose from "mongoose";
import supertest, { SuperAgentTest } from "supertest";
import { core } from "../../core";
import { connectToDB, mockAdminUser } from "../../tools/mongo";
import { isAuthenticated } from "./isAuthenticated";

let server: any;

describe("isAuthenticated", () => {
  beforeAll(async () => {
    server = core.listen();
    supertest.agent(server);
    await connectToDB();
  });
  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  it("find user by email and password, should be valid", async () => {
    expect(isAuthenticated(mockAdminUser)).toBeTruthy();
  });
});
