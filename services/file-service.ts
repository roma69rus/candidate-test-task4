import { UploadedFile } from "express-fileupload";
import path from "path";
import { ApiError } from "../middleware/api-error";
import { FileModel, IFileInput } from "../models/file-model";
import fs from "fs"
import { where } from "sequelize";

class FileService {
  async createFile(file: UploadedFile, userId: string): Promise<FileModel> {

    const checkFile = await FileModel.findOne({ where: { name: file.name } })

    if (checkFile) {
      throw ApiError.BadRequest(`Файл с таким именем ${file.name} уже загружен`, [])
    }

    const createFileOptions = await FileModel.create({
      name: file.name,
      extension: file.name.split('.').pop() as string,
      MIME_type: file.mimetype,
      size: file.size.toString() + " bytes",
      user: userId,
    })
    file.mv(path.resolve(__dirname, '..', 'static', file.name));

    return createFileOptions;
  }

  async getList(list_size: number, page: number) {
    const offset = (page - 1 ) * list_size;
    return await FileModel.findAll({ limit: list_size, offset })
  }
  async getFileById(id: number) {
    return await FileModel.findOne({ where: {id} })
  }
  async deleteFileById(id: number) {
    const file = await FileModel.findOne({where: {id}})
    if (!file){
      throw ApiError.BadRequest(`Файл не найден ${id}`, [])
    }
    const fileName = file?.name;

    fs.unlink(path.resolve(__dirname, '..', 'static', fileName), (err) => {
      if (err) {
        throw ApiError.BadRequest(`Ошибка при удалении файла${fileName} с диска`, [])
      }
      FileModel.destroy({where: {name: fileName}})
    })
  }


  async downloadFile(id: number) {
    const file = await FileModel.findOne({where: {id}})
    if (!file){
      throw ApiError.BadRequest(`Файл не найден ${id}`, [])
    }
    return path.resolve(__dirname, '..', 'static', file.name)
  } 

  async updateFile(id: number, file: UploadedFile) {
    const checkfile = await FileModel.findOne({where: {id}})
    if (!checkfile){
      throw ApiError.BadRequest(`Файл не найден по id: ${id}`, [])
    }

    fs.unlink(path.resolve(__dirname, '..', 'static', checkfile.name), (err) => {
      if (err) {
        throw ApiError.BadRequest(`Ошибка при удалении файла${checkfile.name} с диска`, [])  
      }
      file.mv(path.resolve(__dirname, '..', 'static', file.name))
    })


    
    await FileModel.update({
      name: file.name,
      extension: file.name.split('.').pop() as string, 
      MIME_type: file.mimetype,
      size: file.size.toString() + " bytes"
    }, {where: {id}})

    const result = await FileModel.findOne({where: {id}}) 

    return result
  } 


}

export default new FileService()