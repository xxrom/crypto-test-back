import { server } from "../main";
import supertest from "supertest";

const requestWithSupertest = supertest(server);

describe("Authenticate-update / Endpoints", () => {
  it("POST / should show error status:403", async () => {
    const res = await requestWithSupertest.post("/authenticate-update");

    expect(res.status).toEqual(403);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("err");
  });
});

describe("Authenticate / Endpoints", () => {
  it("POST /authenticate get with correct user/password status:200", async () => {
    const res = await requestWithSupertest
      .post("/authenticate")
      .send({
        email: "admin@gmail.com",
        password: "12341234",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("token");
    expect(res.body).not.toHaveProperty("err");
  });
});
