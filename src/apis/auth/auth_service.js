import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import UserRepository from '../../repositories/user.repositories.js';
import UserModel from '../../model/user.model.js';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import jwt from 'jsonwebtoken';
import path from 'path' 
cloudinary.config({
    cloud_name:'dvfhyxnke',
    api_key:'173672421639628',
    api_secret:'PHCZEt9JSNrAapRUTwgd5JL89Mg'
})
dotenv.config(); // Đảm bảo dotenv được cấu hình để sử dụng biến môi trường
const userRepo = new UserRepository();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class AuthService {
  async register(username, email, password) {
    const existingUser = await userRepo.getOneByEmail(email);
    if (existingUser) {
      throw new Error('Email đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.create({
      name: username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
  async login(email,password){
      
      const user = await userRepo.getOneByEmail(email);
      if (!user) {
        throw new Error('Email không tồn tại');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Mật khẩu không đúng');
      }
      const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
      };
  }
  async forgotPassword(email) {
    try {
      const user = await UserModel.findOne({email});
      if (!user) {
        console.log(`Yêu cầu reset password cho: ${email}`);
        return { success: true }; 
      }

      const resetToken = crypto.randomBytes(8).toString('hex');
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 phút
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = expiresAt;
      await user.save();
      // await this.sendResetTokenEmail(user.email, resetToken, expiresAt);
      const mailOptions = {
        from: `"Hệ thống" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Mã đặt lại mật khẩu',
        text: ` Mã của bạn là: ${resetToken} (hết hạn lúc ${new Date(expiresAt).toLocaleTimeString()})`,
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`Đã gửi token đến ${email}`);
      return { 
        success: true,
        expiresAt: new Date(expiresAt).toISOString() 
      };
    } catch (error) {
      console.error('Lỗi forgotPassword:', error);
      throw new Error('Không thể xử lý yêu cầu');
    }
  }

  async sendResetTokenEmail(email, token, expiresAt) {
    const mailOptions = {
      from: `"Hệ thống" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Mã đặt lại mật khẩu',
      text: ` Mã của bạn là: ${token} (hết hạn lúc ${new Date(expiresAt).toLocaleTimeString()})`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Đã gửi token đến ${email}`);
  }
  async resetPassword(token,newPassword){
    // const user= await userRepo.getOneByResetToken(token);
    const user = await UserModel.findOne({ resetPasswordToken: token });
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    } 
    if (!user||!user.resetPasswordExpires||user.resetPasswordExpires<Date.now()){
      throw new Error ('Token không hợp lệ hoặc hết hạn');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return {
    message: 'Đặt lại mật khẩu thành công'
  };
  }
  
  async updatemyuser(userId, updates) {
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Chỉ cập nhật những trường hợp lệ, loại bỏ các trường nhạy cảm (nếu cần)
    const allowedFields = ['name', 'email', 'password'];
    const filteredUpdates = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, select: '-password' }
    );
    return updatedUser;
  }
  async updateimageprofile(userId, imagePath) {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'profile_images',
        use_filename: true,
        unique_filename: false,
      });

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { avatarUrl: result.secure_url },
        { new: true, select: '-password' }
      );

      // Xóa tệp tạm thời sau khi upload lên Cloudinary
      fs.unlinkSync(imagePath);

      return updatedUser;
    } catch (error) {
      console.error('Error updating profile image:', error);
      throw new Error('Không thể cập nhật ảnh đại diện');
    }
  }
  async getuserbyid(userId) {
    const user = await userRepo.getOneById(userId);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }
    return user;
  }
}

export default new AuthService();