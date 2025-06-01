import express from 'express';
import multer from 'multer';
import AuthController from './auth_controller.js';

const upload = multer({ dest: 'uploads/' }); // Thư mục lưu file tạm

const router = express.Router();

router.post('/users/register', AuthController.register);
router.post('/users/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.get('/users/:userid', AuthController.getuserbyid);
router.patch('/users/:userid', AuthController.updatemyuser);
router.post('/users/:userid/updateimage', upload.single('image'), AuthController.updateimageprofile);

export default router;