import SubboardService from './subboard_service.js';
const subboardService = new SubboardService();

class SubboardController {
    async createsubboard(req, res) {
        try {
            const subboard = await subboardService.createsubboard(req.body);
            res.status(201).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getallsubboard(req, res) {
        try {
            const subboards = await subboardService.getallsubboard();
            res.status(200).json(subboards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getidsubboard(req, res) {
        try {
            const subboard = await subboardService.getidsubboard(req.params.id);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatesub(req, res) {
        try {
            const subboard = await subboardService.updatesub(req.params.id, req.body);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletesub(req, res) {
        try {
            const subboard = await subboardService.deletesub(req.params.id);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async patchstatus(req, res) {
        try {
            const subboard = await subboardService.patchstatus(req.params.id, req.body.status);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addmember(req, res) {
        try {
            const subboard = await subboardService.addmember(req.params.id, req.body.memberId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removemember(req, res) {
        try {
            const subboard = await subboardService.removemember(req.params.id, req.params.memberId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addTask(req, res) {
        try {
            const subboard = await subboardService.addTask(req.params.id, req.body.taskId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeTask(req, res) {
        try {
            const subboard = await subboardService.removeTask(req.params.id, req.params.taskId);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async upadatedeadline(req, res) {
        try {
            const subboard = await subboardService.upadatedeadline(req.params.id, req.body.deadline);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatepriority(req, res) {
        try {
            const subboard = await subboardService.updatepriority(req.params.id, req.body.priority);
            res.status(200).json(subboard);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async uploadimage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Cập nhật đường dẫn ảnh vào subboard
        const result = await subboardService.updatesub(req.params.id, { image: req.file.filename });
        res.status(200).json({ message: "Image uploaded successfully", data: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
}

export default SubboardController;
