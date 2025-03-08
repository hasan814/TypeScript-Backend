import dotenv from 'dotenv'
dotenv.config()

import { Application, NextFunction, Request, Response } from 'express'
import { ResponseMethod } from './types/public.types'
import { Server } from 'http'

import AppRouter from './routes/index.routes'
import connectDB from './utils/connectDB'
import express from 'express'
import http from 'http'

import './app.module'

const PORT = process.env.PORT
const app: Application = express()
const server: Server = http.createServer(app)

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(AppRouter)


// ============= 404 ================
app.use((req: Request, res: Response, next: NextFunction) => {
  const response: ResponseMethod = {
    statusCode: 404,
    message: "NotFoundPage"
  }
  res.status(404).json(response)
})

// ============= Error ================
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = +error?.status || 500
  const message: string = error?.message || "InternalServerError"
  const response: ResponseMethod = { statusCode, message }
  res.status(statusCode).json(response)
})

server.listen(Number(PORT), () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});