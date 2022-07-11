import { core } from "../core";
import supertest, { SuperAgentTest } from "supertest";
import { addMockAdmin, connectToDB, mockAdminUser } from "../tools/mongo";
import { User } from "../models";
import mongoose from "mongoose";

let server: any;
let api: SuperAgentTest;

describe("auth", () => {
  beforeAll(async () => {
    server = core.listen();
    api = supertest.agent(server);
    await connectToDB();

    // Dell all users
    //await User.deleteMany({});
    //await addMockAdmin();
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  it("/update-authenticate => POST => should show error status:403", async () => {
    const res = await api.post("/update-authenticate");

    expect(res.status).toEqual(403);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("err");
  });

  it("/authenticate => POST => get MockAdminUser (user/password) status:200", async () => {
    // https://javascript.plainenglish.io/unit-testing-node-js-mongoose-using-jest-106a39b8393d
    // TODO: maybe inmemory mongo for faster tests ????

    const res = await api.post("/authenticate").send(mockAdminUser);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("token");
    expect(res.body).not.toHaveProperty("err");
  });
});
