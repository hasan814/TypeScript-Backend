import { DecoratorRouter } from "../decorators/router.decorators";
import { Router } from "express";

const router: Router = Router()
router.use(DecoratorRouter)

export default router