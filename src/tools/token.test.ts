import { generateTokens, jwtVerifyAsync } from "./token";

describe("generateTokens", () => {
  it("create accessToken + refreshToken", async () => {
    const userInfo = { email: "testUserName" };
    const tokens = await generateTokens(userInfo);

    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
  });
});

describe("jwtVerifyAsync", () => {
  it("create and verify accessToken", async () => {
    const email = "testUserName";
    const tokens = await generateTokens({ email });

    expect(tokens).toHaveProperty("accessToken");

    const decoded = await jwtVerifyAsync(tokens.accessToken);
    console.info(decoded);

    expect(decoded).toHaveProperty("email");
    expect(decoded.email).toEqual(email);
  });

  it("create/verify + validate trim username", async () => {
    const email = "  testUserName  ";
    const tokens = await generateTokens({ email });

    expect(tokens).toHaveProperty("accessToken");

    const decoded = await jwtVerifyAsync(tokens.accessToken);
    console.info(decoded);

    expect(decoded).toHaveProperty("email");
    expect(decoded.email).toEqual(email.trim());
  });
});
