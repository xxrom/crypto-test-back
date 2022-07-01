import { server } from "../main";
import supertest from "supertest";

const requestWithSupertest = supertest(server);

describe("User Endpoints", () => {
  it("GET /user should show error 403", async () => {
    const res = await requestWithSupertest.get("/auth");

    expect(res.status).toEqual(403);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("err");
  });
});
