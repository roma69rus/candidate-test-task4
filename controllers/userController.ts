import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { ApiError } from '../middleware/api-error';
// import ApiError from '../error/ApiError';
// const jwt = require('jsonwebtoken')
import { User } from '../models/user-model';
import userService from '../services/user-service';
import UserService from '../services/user-service';


class UserController {

  constructor() {
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
      }
      const { id, password } = req.body
      const userData = await UserService.registration(id, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async new_token(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (error) {
      next(error)
    }
  }
  async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id, password } = req.body
      const userData = await userService.login(id, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async info(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { refreshToken } = req.cookies;
      const id = await userService.info(refreshToken)
      return res.json(id)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();