// Tách riêng các thao tác truy vấn database của User như tìm theo ID, email, thêm user... để controller/service không cần làm việc trực tiếp với DB.
import UserModel from '../model/user.model.js';

class UserRepository {
  async create(dto) {                           //data transfer object
    const { name, email, password } = dto;

    const result = await UserModel.create({ name, email, password });

    return {
      id: String(result._id),
      name: result.name,
      email: result.email,
    };
  }
  async getOneByResetToken(token) {
    return this.model.findOne({ resetPasswordToken: token });
  }
  async getOneById(id) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      throw new Error('not found');
    }
    return {
      id: String(user._id),
      name: String(user.name),
      email: String(user.email),
    };
  }

  async getAll() {
    const users = await UserModel.find();
    if (!users) throw new Error('Not found user');
    
    return users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email
    }));
  }

  async getOneByEmail(email) {
    return await UserModel.findOne({ email }).lean();
  }

  async deleteOneById(id) {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id }).lean();
    if (!deletedUser) throw new Error('not found');
    
    return {
      id: String(deletedUser._id),
      name: deletedUser.name,
      email: deletedUser.email,
    };
  }
}

export default UserRepository;  // Export class bằng cách dùng default
