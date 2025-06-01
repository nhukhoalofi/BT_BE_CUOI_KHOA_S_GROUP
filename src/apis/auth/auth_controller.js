//	Nhận request từ router, xử lý dữ liệu đầu vào và gọi auth_service để xử lý nghiệp vụ
import AuthService from './auth_service.js';

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log('Request data:', req.body); 
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email and password are required'
        });
      }

      const newUser = await AuthService.register(name, email, password);

      return res.status(201).json({
        success: true,
        message: 'Đăng ký thành công',
        data: newUser
      });
    } catch (err) {
      console.error('Error during registration:', err); 
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        success: false,
        message: err.message || 'Đã xảy ra lỗi'
      });
    }
  }
  async login(req,res){
    try {
      const {email,password}=req.body;
      if (!email || !password){
        return res.status(400).json({
          success: false,
          message: 'Email, password are required'
        })
      }
      const newUser= await AuthService.login(email,password);
      return res.status(200).json({
        success: true,
        message: 'Login success',
        data: newUser
      })
    }
    catch(err){
    console.error('Error during login:', err); 
    const statusCode = err.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Đã xảy ra lỗi'
    });
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required'
        });
      }
      const resetToken = await AuthService.forgotPassword(email);
  
      return res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (err) {
      console.error('Error during forgot password:', err);
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        success: false,
        message: err.message || 'Đã xảy ra lỗi'
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'bạn đã nhập thiếu token hoặc newPassword'
        });
      }

      await AuthService.resetPassword(token, newPassword);
  
      return res.status(200).json({
        success: true,
        message: 'Đặt lại mật khẩu thành công'
      });
    } catch (err) {
      console.error('Error during reset password:', err);
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        success: false,
        message: err.message || 'Đã xảy ra lỗi'
      });
    }
  }
  async updateimageprofile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Không có tệp nào được tải lên'
        });
      }

      const userId = req.params.userid; // Lấy ID người dùng từ tham số URL
      const updatedUser = await AuthService.updateimageprofile(userId, req.file.path);

      return res.status(200).json({
        success: true,
        message: 'Cập nhật ảnh đại diện thành công',
        data: updatedUser
      });
    } catch (err) {
      console.error('Error during update image profile:', err);
      const statusCode = err.statusCode || 400;
      return res.status(statusCode).json({
        success: false,
        message: err.message || 'Đã xảy ra lỗi'
      });
    }
  }
  // Lấy thông tin người dùng hiện tại
  async getuserbyid(req, res) {
  try {
    const userId = req.params.userid; // Lấy ID người dùng từ tham số URL
    const user = await AuthService.getuserbyid(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Người dùng không tìm thấy'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lấy thông tin người dùng thành công',
      data: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role, // Giả sử role mặc định là 'user'
      teams: user.teams || [],
      tasks: user.tasks || [],
      role: user.role || 'user' // Thêm trường role nếu có
}
    });
  } catch (err) {
    console.error('Error during get user by id:', err);
    const statusCode = err.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Đã xảy ra lỗi'
    });
  }
}
  async updatemyuser(req, res) {
  try {
    const userId = req.user.id;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Bạn cần gửi ít nhất một trường để cập nhật'
      });
    }

    const updatedUser = await AuthService.updatemyuser(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Người dùng không tìm thấy'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      data: updatedUser
    });
  } catch (err) {
    console.error('Error during update my user:', err);
    const statusCode = err.statusCode || 400;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Đã xảy ra lỗi'
    });
  }
}
}

export default new AuthController();