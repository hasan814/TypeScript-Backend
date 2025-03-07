import dotenv from 'dotenv'
dotenv.config()

import { Application, NextFunction, Request, Response } from 'express'
import { ResponseMethod } from './types/public.types'
import { Server } from 'http'

import express from 'express'
import http from 'http'

const PORT = process.env.PORT
const app: Application = express()
const server: Server = http.createServer()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use((req: Request, res: Response, next: NextFunction) => {
  const response: ResponseMethod = {
    statusCode: 404,
    message: "NotFoundPage"
  }
  res.status(404).json(response)
})

server.listen(PORT, () => {
  console.log(`Server run on:localhost:${PORT}`)
})