import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequilize from './db';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import coockieParser from 'cookie-parser'
import routes from './router/router';
import path from 'path'
import { ErrorMiddleware } from './middleware/error-middleware';


dotenv.config();
const PORT = process.env.PORT || 5000;

//Middleware
const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(coockieParser())
app.use(fileUpload({}))
app.use(express.static('public'));
app.use('/', routes)

// LAST middleware  
app.use(ErrorMiddleware)


const start = async function start() {
  try {
    await sequilize.authenticate()
    console.log('Connection has been established successfully.');
    await sequilize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start();

