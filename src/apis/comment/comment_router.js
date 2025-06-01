import express from 'express'
import CommentController from './comment_controller.js'
import checkrole from '../../middleware/checkmiddleware.js';
const CommentRouter=express.Router();

CommentRouter.post('/tasks/:taskId/comments',checkrole(['admin','member']),CommentController.addComment);
CommentRouter.get('/tasks/:taskId/comments',checkrole(['admin','member']),CommentController.getAllComments);

export default CommentRouter;