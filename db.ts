import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { User } from "./models/user-model";
import { Token } from "./models/token-model";
import { FileModel } from "./models/file-model";
// import {User}                   from './models/user'

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
  dialect: 'mysql',
  host: process.env.DB_HOST as string,
  port: 3306,
  logging: console.log, 
  models: [User, Token, FileModel]
});

export default sequelize;