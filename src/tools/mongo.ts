import mongoose, { HydratedDocument } from "mongoose";
import { IUser, User } from "../models";
import { EnvType, NODE_ENV } from "./env";

const mongodbCommon = "mongodb://192.168.3.15:27017";
const getMongoUrl = (env: EnvType) => {
  switch (env) {
    case "PROD":
      return `${mongodbCommon}/prod_0`;

    case "TEST":
      return `${mongodbCommon}/test_0`;

    case "DEV":
    default:
      return `${mongodbCommon}/dev_0`;
  }
};
export const MONGO_URL = getMongoUrl(NODE_ENV);

export const mockAdminUser: IUser = {
  email: "admin@admin.com",
  password: "admin!@#$!@#$",
};

export const addMockAdmin = async () => {
  const mockAdmin: IUser[] = await User.find({
    email: mockAdminUser.email,
  }).exec();

  if (mockAdmin.length > 0) {
    console.log("Mock Admin: exists");
    // We found mock admins
    return;
  }

  // Don't have mock admins in DB => add mock new one
  const admin: HydratedDocument<IUser> = new User({
    ...mockAdminUser,
  });

  await admin.save().catch((err) => {
    console.log("Mock admin: error saving data", err);

    return err;
  });
};

export const connectToDB = async () => {
  try {
    console.log("Start connecting to Mongo");

    await mongoose.connect(MONGO_URL);

    console.log(`MongoDB - connected: ${MONGO_URL}`);
  } catch (error) {
    console.error("Error: MongoDB: ", error.message);
  }
};
