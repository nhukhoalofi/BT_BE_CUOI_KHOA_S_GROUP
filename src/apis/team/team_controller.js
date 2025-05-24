import TeamService from './team_service.js';

class TeamController {
    async createTeam(req, res) {
        try {
            const team = await TeamService.createTeam(req.body);
            res.status(201).json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllTeam(req, res) {
        try {
            const teams = await TeamService.getAllTeam();
            if (!teams || teams.length === 0) {
                return res.status(404).json({ message: 'No teams found' });
            }
            res.status(200).json(teams);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getTeambyId(req, res) {
    try {
        const team = await TeamService.getTeambyId(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

    async updateTeam(req, res) {
        try {
            const team = await TeamService.updateTeam(req.params.id, req.body);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteTeam(req, res) {
        try {
            const team = await TeamService.deleteTeam(req.params.id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json({ message: 'Team deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async addMemberToTeam(req, res) {
        try {
            const team = await TeamService.addMemberToTeam(req.params.id, req.body.userId);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async removeMemberFromTeam(req, res) {
        try {
            const team = await TeamService.removeMemberFromTeam(req.params.id, req.body.userId);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default new TeamController();