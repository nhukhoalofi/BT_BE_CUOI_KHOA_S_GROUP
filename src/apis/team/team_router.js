import express from 'express'
import TeamController from './team_controller.js'

const Teamrouter = express.Router();
Teamrouter.post('/create', TeamController.createTeam)
Teamrouter.get('/getAll', TeamController.getAllTeam)
Teamrouter.get('/getById/:id', TeamController.getTeambyId)
Teamrouter.put('/update/:id', TeamController.updateTeam)
Teamrouter.delete('/delete/:id', TeamController.deleteTeam)
Teamrouter.post('/addMember/:id', TeamController.addMemberToTeam)
Teamrouter.post('/removeMember/:id', TeamController.removeMemberFromTeam)
export default Teamrouter;