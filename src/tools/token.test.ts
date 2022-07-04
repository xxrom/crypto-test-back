import { generateTokens, jwtVerifyAsync } from "./token";

describe("generateTokens", () => {
  it("create accessToken + refreshToken", async () => {
    const userInfo = { username: "testUserName" };
    const tokens = await generateTokens(userInfo);

    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
  });
});
describe("jwtVerifyAsync", () => {
  it("create and verify accessToken", async () => {
    const username = "testUserName";
    const tokens = await generateTokens({ username });

    expect(tokens).toHaveProperty("accessToken");

    const decoded = await jwtVerifyAsync(tokens.accessToken);
    console.info(decoded);

    expect(decoded).toHaveProperty("username");
    expect(decoded.username).toEqual(username);
  });

  it("create/verify + validate trim username", async () => {
    const username = "  testUserName  ";
    const tokens = await generateTokens({ username });

    expect(tokens).toHaveProperty("accessToken");

    const decoded = await jwtVerifyAsync(tokens.accessToken);
    console.info(decoded);

    expect(decoded).toHaveProperty("username");
    expect(decoded.username).toEqual(username.trim());
  });
});
