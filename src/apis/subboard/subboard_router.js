import express from 'express'
import SubboardController from '../../apis/subboard/subboard_controller.js'

const Subboardrouter=express.Router();
Subboardrouter.post('/createsubboard',SubboardController.createsubboard);
Subboardrouter.get('/getallsubboard',SubboardController.getallsubboard);
Subboardrouter.get('/subboards/:id',SubboardController.getidsubboard);
Subboardrouter.put('/subboards/:id',SubboardController.updatesub);
Subboardrouter.delete('/subboards/:id',SubboardController.deletesub);
Subboardrouter.patch('/subboard/:id/status',SubboardController.patchstatus);
Subboardrouter.post('/subboard/:id/members',SubboardController.addmember);
Subboardrouter.delete('/subboard/:id/members/:memberId',SubboardController.removemember);
Subboardrouter.post('/subboard/:id/tasks',SubboardController.addTask);
Subboardrouter.delete('/subboard/:id/tasks/:taskId',SubboardController.removeTask);
Subboardrouter.patch('/subboard/:id/deadline',SubboardController.upadatedeadline);
Subboardrouter.patch('/subboard/:id/priority',SubboardController.updatepriority);

export default Subboardrouter;