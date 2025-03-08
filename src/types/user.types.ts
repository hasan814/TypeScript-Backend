import { ObjectId } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  password: string;
  accessToken?: string;
  email?: string;
  mobile?: string;
  avatar?: string
}


export type TFindUser = IUser & { _id: ObjectId } | null