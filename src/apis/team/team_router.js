import express from 'express';
import TeamController from './team_controller.js';
import checkrole from '../../middleware/checkmiddleware.js';

const Teamrouter = express.Router();

Teamrouter.post('/teams/create', checkrole(['admin']), TeamController.createTeam);
Teamrouter.get('/teams/getAll', checkrole(['admin', 'member']), TeamController.getAllTeam);
Teamrouter.get('/teams/getById/:id', checkrole(['admin', 'member']), TeamController.getTeambyId);
Teamrouter.put('/teams/update/:id', checkrole(['admin']), TeamController.updateTeam);
Teamrouter.delete('/teams/delete/:id', checkrole(['admin']), TeamController.deleteTeam);
Teamrouter.post('/teams/addMember/:id', checkrole(['admin']), TeamController.addMemberToTeam);
Teamrouter.post('/teams/removeMember/:id', checkrole(['admin']), TeamController.removeMemberFromTeam);
export default Teamrouter;
