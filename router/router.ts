import { Router } from "express";
import userController from "../controllers/userController";
import fileRouter from './fileRouter'
import { body } from 'express-validator'
import { AuthMiddleware } from "../middleware/auth-middleware";

const router = Router();

router.post('/signin',
  body('id').isLength({min: 6, max: 32}),
  body('password').isLength({min: 3, max: 32}),
  userController.signin)

router.post('/signin/new_token', userController.new_token)
router.post('/signup', userController.signup)

router.use('/file', fileRouter)

router.get('/info', AuthMiddleware, userController.info)
router.post('/logout', AuthMiddleware, userController.logout)



export default router;