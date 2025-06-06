import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    subboard: [{type: mongoose.Schema.Types.ObjectId, ref:'Subboard'}],
    comment: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    deadline: { type: Date },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    githubLink: { type: String },
    createdAt: { type: Date, default: Date.now },
    tags: [String],
});

const TaskModel = mongoose.model('Task', taskSchema);
export default TaskModel;
