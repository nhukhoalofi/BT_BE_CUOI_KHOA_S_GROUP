import TeamModel from "../../model/team.model.js";

class TeamService {
    async createTeam(teamData) {
        try {
            const team = new TeamModel(teamData);
            await team.save();
            return team;
        } catch (error) {
            throw new Error("Error creating team: " + error.message);
        }
    }

    async getAllTeam() {
        try {
            const teams = await TeamModel.find();
            return teams;
        } catch (error) {
            throw new Error("Error fetching teams: " + error.message);
        }
    }

    async getTeambyId(id) {
        try {
            const team = await TeamModel.findById(id);
            return team;
        } catch (error) {
            throw new Error("Error fetching team: " + error.message);
        }
    }
    async updateTeam(id, teamData) {
        try {
            const team = await TeamModel.findByIdAndUpdate(id, teamData, { new: true });
            return team;
        }
        catch (error) {
            throw new Error("Error updating team: " + error.message);
        }
    }
    async deleteTeam(id) {
        try {
            const team = await TeamModel.findByIdAndDelete(id);
            return team;
        } catch (error) {
            throw new Error("Error deleting team: " + error.message);
        }
    }
    async addMemberToTeam(teamId, userId) {
        try {
            const team = await TeamModel.findByIdAndUpdate(
                teamId,
                { $addToSet: { member: userId } },
                { new: true }
            );
            return team;
        } catch (error) {
            throw new Error("Error adding member to team: " + error.message);
        }
    }

    async removeMemberFromTeam(teamId, userId) {
        try {
            const team = await TeamModel.findByIdAndUpdate(
                teamId,
                { $pull: { member: userId } },
                { new: true }
            );
            return team;
        } catch (error) {
            throw new Error("Error removing member from team: " + error.message);
        }
    }
}

export default new TeamService();