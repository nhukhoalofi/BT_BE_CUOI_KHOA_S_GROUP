import express from 'express';
import TeamController from './team_controller.js';
import { checkRole } from '../../middleware/checkmiddleware.js';

const Teamrouter = express.Router();

Teamrouter.post('/create', checkRole(['admin']), TeamController.createTeam);
Teamrouter.get('/getAll', checkRole(['admin', 'member']), TeamController.getAllTeam);
Teamrouter.get('/getById/:id', checkRole(['admin', 'member']), TeamController.getTeambyId);
Teamrouter.put('/update/:id', checkRole(['admin']), TeamController.updateTeam);
Teamrouter.delete('/delete/:id', checkRole(['admin']), TeamController.deleteTeam);
Teamrouter.post('/addMember/:id', checkRole(['admin']), TeamController.addMemberToTeam);
Teamrouter.post('/removeMember/:id', checkRole(['admin']), TeamController.removeMemberFromTeam);
export default Teamrouter;
