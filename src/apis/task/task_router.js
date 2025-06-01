import express from 'express';
import TaskController from './task_controller.js';
import checkrole from '../../middleware/checkmiddleware.js';

const Taskrouter = express.Router();

Taskrouter.post('/tasks/create', checkrole(['admin', 'member']), TaskController.createTask);
Taskrouter.get('/tasks/getAll', checkrole(['admin']), TaskController.getAllTask);
Taskrouter.get('/tasks/getById/:id', checkrole(['admin', 'member']), TaskController.getTaskbyId);
Taskrouter.put('/tasks/update/:id', checkrole(['admin']), TaskController.updateTask);
Taskrouter.delete('/tasks/delete/:id', checkrole(['admin']), TaskController.deleteTask);
export default Taskrouter;

