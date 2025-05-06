import { Router } from "express";
import { allUsers, loginController, signupController } from "../auth/AuthController.js";
import User from "../model/UserModel.js";


const router = Router()

router.get('/allusers', allUsers)
router.post('/signup', signupController)

router.post('/login', loginController)

export default router;