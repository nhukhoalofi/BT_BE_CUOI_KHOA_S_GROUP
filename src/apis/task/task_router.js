import express from 'express'
import TaskController from './task_controller.js'

const Taskrouter = express.Router();
Taskrouter.post('/create', TaskController.createTask)
Taskrouter.get('/getAll', TaskController.getAllTask)
Taskrouter.get('/getById/:id', TaskController.getTaskbyId)
Taskrouter.put('/update/:id', TaskController.updateTask)
Taskrouter.delete('/delete/:id', TaskController.deleteTask)

export default Taskrouter;