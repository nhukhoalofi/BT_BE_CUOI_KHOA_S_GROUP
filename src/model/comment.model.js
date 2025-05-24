import mongoose from "mongoose";
const commentSchema= new mongoose.Schema({
    content: {type:String, required: true},
    task: {type: mongoose.Schema.Types.ObjectId,ref:'Task'},
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User'},
    createAt: {type:Date, default: Date.now()}
})

const CommentModel= mongoose.model('Comment',commentSchema);
export default CommentModel;