import { Router } from "express";
import fileController from "../controllers/fileController";
import { AuthMiddleware } from "../middleware/auth-middleware";

const router = Router(); 
router.post('/upload', AuthMiddleware, fileController.upload)
router.get('/list', AuthMiddleware, fileController.list) 
router.delete('/delete/:id', AuthMiddleware, fileController.deleteFileById)
router.get('/:id', AuthMiddleware, fileController.getFileById)
router.get('/download/:id', AuthMiddleware, fileController.downloadFileById)
router.put('/update/:id', AuthMiddleware, fileController.updateFileById)



export default router;