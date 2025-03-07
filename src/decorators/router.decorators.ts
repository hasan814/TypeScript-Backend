// router.decorators.ts
import { Router } from "express"

export const DecoratorRouter: Router = Router()

export function Get(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    DecoratorRouter.get(path || "/", descriptor.value)
  }
}

export function Controller(controllerPath?: string | undefined) {
  return function (target: any) {
    if (controllerPath?.[0] !== "/") controllerPath = "/" + controllerPath
    const path = controllerPath ? controllerPath : '/'
    DecoratorRouter.use(path, DecoratorRouter)
    return class extends target { }
  }
}