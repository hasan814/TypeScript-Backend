// router.decorators.ts
import { Router } from "express"

export const DecoratorRouter: Router = Router()

export function Get(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const router = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey
    DecoratorRouter.get(`${router}`, descriptor.value)
  }
}
export function Post(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const router = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey
    DecoratorRouter.post(`${router}`, descriptor.value)
  }
}
export function Put(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const router = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey
    DecoratorRouter.put(`${router}`, descriptor.value)
  }
}
export function Patch(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const router = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey
    DecoratorRouter.patch(`${router}`, descriptor.value)
  }
}
export function Delete(path?: string | undefined) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const router = path ? (path[0] == "/" ? path : "/" + path) : "/" + propertyKey
    DecoratorRouter.delete(`${router}`, descriptor.value)
  }
}

export function Controller(controllerPath?: string | undefined) {
  return function (target: any) {
    if (controllerPath?.[0] !== "/") controllerPath = "/" + controllerPath
    const path = controllerPath ? controllerPath : '/'
    DecoratorRouter.use(path, DecoratorRouter)
  }
}