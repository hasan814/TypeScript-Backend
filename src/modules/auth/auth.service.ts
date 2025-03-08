import { RegisterDTO } from "./auth.dto";
import { HashString } from "../../utils/helperFunctions";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../types/user.types";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    const existUser = await UserModel.findOne({ username: userDto.username });
    if (existUser) throw { status: 404, message: "This user already exists" };
    const newPassword = HashString(userDto.password);
    userDto.password = newPassword
    const user: IUser = await UserModel.create(userDto);
    return user
  }
}
