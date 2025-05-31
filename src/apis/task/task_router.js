import express from 'express';
import TaskController from './task_controller.js';
import { checkRole } from '../../middleware/checkmiddleware.js';

const Taskrouter = express.Router();

Taskrouter.post('/create', checkRole(['admin', 'member']), TaskController.createTask);
Taskrouter.get('/getAll', checkRole(['admin']), TaskController.getAllTask);
Taskrouter.get('/getById/:id', checkRole(['admin', 'member']), TaskController.getTaskbyId);
Taskrouter.put('/update/:id', checkRole(['admin']), TaskController.updateTask);
Taskrouter.delete('/delete/:id', checkRole(['admin']), TaskController.deleteTask);
export default Taskrouter;
