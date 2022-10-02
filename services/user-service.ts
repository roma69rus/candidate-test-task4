import userController from "../controllers/userController"
import { User } from "../models/user-model"
import bcrypt from 'bcrypt'
import TokenService from './token-service'
import { UserDto } from "../dtos/user-dto"
import { ApiError } from "../middleware/api-error"
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')


class UserService {
  async registration(id: string, password: string): Promise<any> {
    const candidate = await User.findOne({ where: { id } })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с таким id ${id} уже существует`, [])
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await User.create({ id, password: hashPassword })

    const userDto = new UserDto(user) //id
    const tokens = TokenService.generateTokens({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login(id: string, password: string) {
    const user = await User.findOne({ where: { id } })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден', []) 
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль', []);
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({where: {id: userData.id}});
    const userDto = new UserDto(user as User);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto }
  }

  async info(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken); 
    return {id: userData.id.toString()} 
  }

}

export default new UserService()