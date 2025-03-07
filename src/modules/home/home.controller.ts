// HomeController.ts
import { NextFunction, Request, Response } from "express";
import { Controller, Get } from "../../decorators/router.decorators";

@Controller("/users")
export class HomeController {
  @Get("")
  GetHomeInfo(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: "Home Info" });
    } catch (error) {
      next(error);
    }
  }
}