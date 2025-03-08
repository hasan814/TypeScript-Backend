import { compareHashString, HashString, jwtGenerator } from "../../utils/helperFunctions";
import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../decorators/router.decorators";
import { UserModel } from "../../models/user.model";
import { TFindUser } from "../../types/public.types";

@Controller("/auth")
export class AuthController {
  @Post()
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullName, email, mobile } = req.body;

      if (!username || !password || !fullName) return res.status(400).json({ message: "All required fields must be provided" });

      const existUser = await UserModel.findOne({ username });
      if (existUser) {
        return res.status(400).json({ message: "This user already exists" });
      }

      const newPassword = HashString(password);

      const user = await UserModel.create({
        email,
        mobile,
        username,
        fullName,
        password: newPassword,
      });

      res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
      next(error);
    }
  }
  @Post()
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) return res.status(400).json({ message: "All required fields must be provided" });

      const existUser: TFindUser = await UserModel.findOne({ username });
      if (!existUser) return res.status(401).json({ message: "Username or Password is incorrect!" });

      const isValidUser: boolean = compareHashString(password, existUser.password);
      if (!isValidUser) return res.status(401).json({ message: "Username or Password is incorrect!" });

      const accessToken = await jwtGenerator({ username, id: existUser._id })
      const user = await UserModel.findById(existUser._id, { __v: 0, password: 0 })
      res.status(201).json({ statusCode: 200, data: { accessToken, user } });
    } catch (error) {
      next(error);
    }
  }
}
