// HomeController.ts
import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../decorators/router.decorators";
import { HashString } from "../../utils/helperFunctions";
import { UserModel } from "../../models/user.model";

@Controller("/auth")
export class AuthController {
  @Post("/register")
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullName, email, mobile } = req.body;

      // Validate required fields
      if (!username || !password || !fullName) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      // Check if the user already exists
      const existUser = await UserModel.findOne({ username });
      if (existUser) {
        return res.status(400).json({ message: "This user already exists" });
      }

      // Hash the password
      const newPassword = await HashString(password);

      // Create new user
      const user = await UserModel.create({
        username,
        fullName,
        password: newPassword,
        email,
        mobile
      });

      res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
      next(error);
    }
  }
}
