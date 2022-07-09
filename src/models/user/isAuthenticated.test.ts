import { addMockAdmin, mockAdminUser } from "../../tools/mongo";
import { isAuthenticated } from "./isAuthenticated";
import { User } from "./user";

describe("isAuthenticated", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    await addMockAdmin();
  });

  it("find user by email and password, should be valid", async () => {
    expect(isAuthenticated(mockAdminUser)).toBeTruthy();
  });
});
