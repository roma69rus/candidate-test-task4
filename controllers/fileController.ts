import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/api-error';
import fileService from '../services/file-service';
import userService from '../services/user-service';


class FileController {

  constructor() {
  }

  async upload(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { file } = req.files as any;
      const { refreshToken } = req.cookies;

      const {id} = await userService.info(refreshToken)

      const fileOptions = await fileService.createFile(file, id.toString())

      return res.json(fileOptions)
      
    } catch (error) { 
      next(error)
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {list_size = 10, page = 1} = req.query

      return res.json(await fileService.getList(Number(list_size), Number(page)))

    } catch (error) {
      next (error)
    }
  }
  async getFileById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {id} = req.params

      return res.json(await fileService.getFileById(Number(id)))

    } catch (error) {
      next (error)
    }
  }
  
  async downloadFileById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {id} = req.params
      const filePath = await fileService.downloadFile(Number(id))
      res.download(filePath); 
    } catch (error) {
      next (error)
    }
  }

  async updateFileById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {id} = req.params
      const {file} = req.files as any
      const updatedFile = await fileService.updateFile(Number(id), file)
      return res.json(updatedFile)
    } catch (error) {
      next (error)
    }
  }
  async deleteFileById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const {id} = req.params
      await fileService.deleteFileById(Number(id))
      return res.json("Файл удален")

    } catch (error) {
      next (error)
    }
  }
}

export default new FileController();