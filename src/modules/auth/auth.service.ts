import { errorHandler, HashString } from "../../utils/helperFunctions";
import { validateSync } from "class-validator";
import { RegisterDTO } from "./auth.dto";
import { UserModel } from "../../models/user.model";
import { IUser } from "../../types/user.types";

export class AuthService {
  async register(userDto: RegisterDTO): Promise<IUser> {
    const errors = validateSync(userDto)
    const checkedErrors = errorHandler(errors)
    if (checkedErrors.length > 0) throw { status: 400, errors: checkedErrors, message: "Validation Error!" }
    const existUser = await UserModel.findOne({ username: userDto.username });
    if (existUser) throw { status: 404, message: "This user already exists" };
    const newPassword = HashString(userDto.password);
    userDto.password = newPassword
    const user: IUser = await UserModel.create(userDto);
    return user
  }
}
