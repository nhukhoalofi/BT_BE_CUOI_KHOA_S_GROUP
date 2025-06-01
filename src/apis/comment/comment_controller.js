import CommentService from './comment_service.js';

class CommentController {
    async addComment(req, res) {
        try {
            const { taskId } = req.params;
            const { content } = req.body;
            const userId = req.user.id;
            const newComment = await CommentService.addComment(userId, taskId, content);
            res.status(201).json({ message: 'Comment added successfully', data: newComment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllComments(req, res) {
        try {
            const { taskId } = req.params;
            const comments = await CommentService.getAllComments(taskId);
            res.status(200).json({ message: 'Comments retrieved successfully', data: comments });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CommentController();