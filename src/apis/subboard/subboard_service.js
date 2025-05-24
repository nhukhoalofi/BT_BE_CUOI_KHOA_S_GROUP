import SubboardModel from "../../model/subboard.model.js";

class SubboardService{
    async createsubboard(subboarddata){
        try {
            const subboard = new SubboardModel(subboarddata);
            await subboard.save();
            return subboard;
        }
        catch(error) {
            throw new Error('Error creating subboard:'+error.message);
        }
    }
    async getallsubboard(){
        try {
        const subboards= await SubboardModel.find();
            return subboards;
        }
        catch (error){
            throw new Error('Error fetching subboard'+ error.message);
        }

    }
    async getidsubboard(id){
        try {
            const subboard= await SubboardModel.findById(id);
            return subboard;
        }
        catch {
            throw new Error('Error fetching subboard'+error.message)
        }
    }
    async updatesub(id,subboarddata){
        try {
            const subboard = await SubboardModel.findByIdAndUpdate(id,subboarddata,{new: true} );
            return subboard;
        }
        catch(error){
            throw new Error('Error updating subboard'+error.message);
        }
    }
    async deletesub(id){
        try {
            const subboard_deleted = SubboardModel.findByIdAndDelete(id);
            return subboard_deleted; 
        }
        catch(error){
            throw new Error('Error deleting subboard'+error.message);
        }
    }
    async patchstatus(id,statusdata){
        try {
            const subboard = await SubboardModel.findByIdAndUpdate(id, {status: statusdata},{new:true});
            return subboard;
        }
        catch(error){
            throw new Error ('Error updating status'+error.message);
        }
    }
    async addmember(subboardId, memberId) {
    try {
        const subboard = await SubboardModel.findByIdAndUpdate(
            subboardId,
            { $addToSet: { members: memberId } }, // $addToSet để tránh trùng lặp
            { new: true }
        );
        return subboard;
    } catch (error) {
        throw new Error('Error adding member: ' + error.message);
    }
    }
    async removemember(subboardid,memberId){
        try {
            const subboard= await SubboardModel.findByIdAndUpdate(
                subboardid,
                {$pull: {members:memberId}},
                {new:true}
            );
            return subboard;
        } catch (error){
            throw new Error ('Error removing member: '+error.message);
        }
    }
    async addTask(subboardId,taskId){
        try {
        const subboard = await SubboardModel.findByIdAndUpdate(
            subboardId,
            { $addToSet: { tasks: taskId } }, // Thêm taskId vào mảng tasks, tránh trùng lặp
            { new: true }
        );
        return subboard;
    } catch (error) {
        throw new Error('Error adding task: ' + error.message);
    }
    }
    async removeTask(taskid){
        try {
        const subboard = await SubboardModel.findByIdAndUpdate(
            subboardId,
            { $pull: { tasks: taskId } }, // Xóa taskId khỏi mảng tasks
            { new: true }
        );
        return subboard;
    } catch (error) {
        throw new Error('Error removing task: ' + error.message);
    }
    }
    async upadatedeadline(subboardId, deadline) {
    try {
        const subboard = await SubboardModel.findByIdAndUpdate(
            subboardId,
            { deadline: deadline },
            { new: true }
        );
        return subboard;
    } catch (error) {
        throw new Error('Error updating deadline: ' + error.message);
    }
}

async updatepriority(subboardId, priority) {
    try {
        const subboard = await SubboardModel.findByIdAndUpdate(
            subboardId,
            { priority: priority },
            { new: true }
        );
        return subboard;
    } catch (error) {
        throw new Error('Error updating priority: ' + error.message);
    }
}
}
export default SubboardService;