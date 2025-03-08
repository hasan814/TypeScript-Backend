import { ObjectId } from "mongoose";
import { IUser } from "./user.types";

export type ResponseMethod = {
  statusCode: number;
  message?: string | undefined;
  data?: object | undefined
}

export type TFindUser = IUser & { _id: ObjectId } | null