
import { Express, NextFunction, Response, Request } from "express";
import TokenService from "../services/token-service";
import { ApiError } from "./api-error";


export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.body.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError())
  }


}