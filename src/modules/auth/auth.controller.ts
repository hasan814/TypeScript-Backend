// HomeController.ts
import { NextFunction, Request, Response } from "express";
import { Controller, Post } from "../../decorators/router.decorators";

@Controller("/auth")
export class AuthController {
  @Post("")
  register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, fullName } = req.body
      res.json({ message: "Data Transform Successfully!", user: { username, password, fullName } });
    } catch (error) {
      next(error);
    }
  }
}