import express from 'express';
import SubboardController from '../../apis/subboard/subboard_controller.js';
import { checkRole } from '../../middleware/checkmiddleware.js';

const Subboardrouter = express.Router();

Subboardrouter.post('/createsubboard', checkRole(['admin', 'member']), SubboardController.createsubboard);
Subboardrouter.get('/getallsubboard', checkRole(['admin', 'member']), SubboardController.getallsubboard);
Subboardrouter.get('/subboards/:id', checkRole(['admin', 'member']), SubboardController.getidsubboard);
Subboardrouter.put('/subboards/:id', checkRole(['admin', 'member']), SubboardController.updatesub);
Subboardrouter.delete('/subboards/:id', checkRole(['admin', 'member']), SubboardController.deletesub);
Subboardrouter.patch('/subboard/:id/status', checkRole(['admin', 'member']), SubboardController.patchstatus);
Subboardrouter.post('/subboard/:id/members', checkRole(['admin']), SubboardController.addmember);
Subboardrouter.delete('/subboard/:id/members/:memberId', checkRole(['admin']), SubboardController.removemember);
Subboardrouter.post('/subboard/:id/tasks', checkRole(['admin', 'member']), SubboardController.addTask);
Subboardrouter.delete('/subboard/:id/tasks/:taskId', checkRole(['admin', 'member']), SubboardController.removeTask);
Subboardrouter.patch('/subboard/:id/deadline', checkRole(['admin', 'member']), SubboardController.upadatedeadline);
Subboardrouter.patch('/subboard/:id/priority', checkRole(['admin', 'member']), SubboardController.updatepriority);
Subboardrouter.post('/subboard/:id/upload-image', SubboardController.uploadimage);
export default Subboardrouter;
