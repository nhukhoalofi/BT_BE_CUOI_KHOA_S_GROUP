import mongoose from "mongoose"; 
const userSchema= new mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    role: {type:String, enum:['admin','member'],default:'member'},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref:'Team'}],
    tasks: [{type: mongoose.Schema.Types.ObjectId,ref:'Task'}],
    resetPasswordToken: String,
    resetPasswordExpires: Number,
    avatarUrl:{type:String},
    createdAt:{type:String, default:Date.now}
})
const UserModel= mongoose.model('User',userSchema);
export default UserModel;