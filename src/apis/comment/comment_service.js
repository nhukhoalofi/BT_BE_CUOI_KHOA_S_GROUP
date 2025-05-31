import CommentModel from "../../model/comment.model.js";
import TaskModel from "../../model/task.model.js"

class CommentService{
    async AddComment(userId,taskId,content){
        try{
        const task =await TaskModel.findById(taskId);
        if(!task) throw new Error('Task not found')
        const comment= new CommentModel({
                content,
                task:taskId,
                user:userId,
                
        })
        await comment.save();
        return comment;
        }
        catch(err){
            throw new Error('Error adding comment'+error.message); 
        }
    }
    async getAllComment(TaskId){
        try {
        const comments=await CommentModel.find({task:TaskId}).populate('user', 'name email');
        return comments;    
        }
        catch(err){
            throw new Error('Error get all comment'+error.message);
        }
    }
}
export default CommentService;