import TaskService from './task_service.js';

class TaskController {
    async createTask(req,res){
        try {
            const task = await TaskService.createTask(req.body);
            res.status(201).json(task);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getAllTask(req,res){
        try {
            const tasks = await TaskService.getAllTask();
            if (!tasks || tasks.length === 0) {
                return res.status(404).json({ message: 'No tasks found' });
            }
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getTaskbyId(req,res){
        try {
            const task = await TaskService.getTaskbyId(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async updateTask(req,res){
        try {
            const task = await TaskService.updateTask(req.params.id, req.body);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }   
    async deleteTask(req,res){
        try {
            const task = await TaskService.deleteTask(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TaskController();