import express from 'express';
import TaskController from './task_controller.js';
import checkrole from '../../middleware/checkmiddleware.js';

const Taskrouter = express.Router();

Taskrouter.post('/create', checkrole(['admin', 'member']), TaskController.createTask);
Taskrouter.get('/getAll', checkrole(['admin']), TaskController.getAllTask);
Taskrouter.get('/getById/:id', checkrole(['admin', 'member']), TaskController.getTaskbyId);
Taskrouter.put('/update/:id', checkrole(['admin']), TaskController.updateTask);
Taskrouter.delete('/delete/:id', checkrole(['admin']), TaskController.deleteTask);
export default Taskrouter;

