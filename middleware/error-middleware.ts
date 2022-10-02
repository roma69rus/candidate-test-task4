import { Express, NextFunction, Response, Request } from "express";
import { ApiError } from "./api-error";


export function ErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.log("[_ERROR]: ", err)
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json({message: 'Непредвиденная ошибка'})
}