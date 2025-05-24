import SubboardService from './subboard_service.js';
const subboardService = new SubboardService();

class SubboardController {
    static async createsubboard(req, res) {
        try {
            const subboard = await subboardService.createsubboard(req.body);
            res.status(201).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getallsubboard(req, res) {
        try {
            const subboards = await subboardService.getallsubboard();
            res.status(200).json(subboards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getidsubboard(req, res) {
        try {
            const subboard = await subboardService.getidsubboard(req.params.id);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updatesub(req, res) {
        try {
            const subboard = await subboardService.updatesub(req.params.id, req.body);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletesub(req, res) {
        try {
            const subboard = await subboardService.deletesub(req.params.id);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async patchstatus(req, res) {
        try {
            const subboard = await subboardService.patchstatus(req.params.id, req.body.status);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addmember(req, res) {
        try {
            const subboard = await subboardService.addmember(req.params.id, req.body.memberId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async removemember(req, res) {
        try {
            const subboard = await subboardService.removemember(req.params.id, req.params.memberId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addTask(req, res) {
        try {
            const subboard = await subboardService.addTask(req.params.id, req.body.taskId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async removeTask(req, res) {
        try {
            const subboard = await subboardService.removeTask(req.params.id, req.params.taskId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async upadatedeadline(req, res) {
        try {
            const subboard = await subboardService.upadatedeadline(req.params.id, req.body.deadline);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updatepriority(req, res) {
        try {
            const subboard = await subboardService.updatepriority(req.params.id, req.body.priority);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default SubboardController;
