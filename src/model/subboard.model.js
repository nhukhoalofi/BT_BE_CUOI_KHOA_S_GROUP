  import mongoose from "mongoose";

  const subboardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    background:{type:String},
    // taskParent: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    // description: { type: String },        
    //   status: {
    //   type: String,
    //   enum: ['pending', 'in-progress', 'completed', 'in-review', 'waiting-approval', 'on-hold', 'archived'],
    //   default: 'pending'
    //   },
    //   deadline: { type: Date },
    //   priority: {
    //       type: String,
    //       enum: ['low', 'medium', 'high'],
    //       default: 'medium'
    //   },
      taskID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
      createdAt: { type: Date, default: Date.now }
  });
  const SubboardModel = mongoose.model('Subboard', subboardSchema);
  export default SubboardModel;