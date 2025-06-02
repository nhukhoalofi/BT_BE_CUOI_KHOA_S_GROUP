import TaskModel from '../../model/task.model.js';

class TaskService{
    async createTask(taskData) {
        try {
            const task = new TaskModel(taskData);
            await task.save();
            return task;
        } catch (error) {
            throw new Error("Error creating task: " + error.message);
        }
    }

    async getAllTask() {
        try {
            const tasks = await TaskModel.find();
            return tasks;
        } catch (error) {
            throw new Error("Error fetching tasks: " + error.message);
        }
    }

    async getTaskbyId(id) {
        try {
            const task = await TaskModel.findById(id);
            return task;
        } catch (error) {
            throw new Error("Error fetching task: " + error.message);
        }
    }
    
    async updateTask(id, taskData) {
        try {
            const task = await TaskModel.findByIdAndUpdate(id, taskData, { new: true });
            return task;
        }
        catch (error) {
            throw new Error("Error updating task: " + error.message);
        }
    }
    
    async deleteTask(id) {
        try {
            const task = await TaskModel.findByIdAndDelete(id);
            return task;
        } catch (error) {
            throw new Error("Error deleting task: " + error.message);
        }
    }
    async getAllTasksbytagging(tagging) {
        try {
            const tasks = await TaskModel.find({ tags: { $in: [tagging] } });
            return tasks;
        } catch (error) {
            throw new Error("Error fetching tasks by tagging: " + error.message);
        }
    }
}
export default new TaskService();