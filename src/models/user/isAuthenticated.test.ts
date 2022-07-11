import {
  addMockAdmin,
  disconnectFromDB,
  mockAdminUser,
} from "../../tools/mongo";
import { isAuthenticated } from "./isAuthenticated";
import { User } from "./user";

describe("isAuthenticated", () => {
  beforeEach(async () => {
    //await User.deleteMany({});
    //await addMockAdmin();
  });
  afterEach(async () => {
    //await disconnectFromDB();
  });

  it("find user by email and password, should be valid", async () => {
    expect(isAuthenticated(mockAdminUser)).toBeTruthy();
  });
});
