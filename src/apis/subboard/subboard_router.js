import express from 'express';
import SubboardController from '../../apis/subboard/subboard_controller.js';
import checkrole from '../../middleware/checkmiddleware.js';

const Subboardrouter = express.Router();

Subboardrouter.post('/tasks/:taskId/subboards', checkrole(['admin']), SubboardController.createsubboard);
Subboardrouter.get('/getallsubboard', checkrole(['admin', 'member']), SubboardController.getallsubboard);
Subboardrouter.get('/subboards/:id', checkrole(['admin', 'member']), SubboardController.getidsubboard);
Subboardrouter.put('/subboards/:id', checkrole(['admin']), SubboardController.updatesub);
Subboardrouter.delete('/subboards/:id', checkrole(['admin', 'member']), SubboardController.deletesub);
// Subboardrouter.post('/subboard/:id/members', checkrole(['admin']), SubboardController.addmember);
// Subboardrouter.delete('/subboard/:id/members/:memberId', checkrole(['admin']), SubboardController.removemember);
// Subboardrouter.post('/subboard/:id/tasks', checkrole(['admin', 'member']), SubboardController.addTask);
// Subboardrouter.delete('/subboard/:id/tasks/:taskId', checkrole(['admin', 'member']), SubboardController.removeTask);
Subboardrouter.post('/subboards/:id/upload-bg', SubboardController.uploadimage);
export default Subboardrouter;
