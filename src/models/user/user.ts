import Router from "koa-router";
import mongoose from "mongoose";

export const userRouter = new Router();

const { Schema } = mongoose;

export interface IUser {
  email: string;
  password: string;
}

// Schema for user
const userDataSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Init inside mongoose
export const User = mongoose.model<IUser>("User", userDataSchema);
