import { UserDto } from "../dtos/user-dto"
import { Token } from "../models/token-model"

const jwt = require('jsonwebtoken')



class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' })
    const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(UserId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { user: UserId } })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save();
    }

    const token = await Token.create({ user: UserId, refreshToken })
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({ where: { refreshToken } })
    return tokenData;
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ where: { refreshToken } })
    return tokenData;
  }



}

export default new TokenService()