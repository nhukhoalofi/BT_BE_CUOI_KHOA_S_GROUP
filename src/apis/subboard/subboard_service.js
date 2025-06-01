import SubboardModel from "../../model/subboard.model.js";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import path from 'path' 
cloudinary.config({
    cloud_name:'dvfhyxnke',
    api_key:'173672421639628',
    api_secret:'PHCZEt9JSNrAapRUTwgd5JL89Mg'
})
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
    
    async uploadimage(subboardId){
        try{
            const folderPath='./img';
            const files =fs.readdirSync(folderPath).filter(file=>
                file.endsWith('.png')||file.endsWith('.jpg')||file.endsWith('.jpeg')
            )
            for (const file of files){
                const filePath=path.join(folderPath,filePath);
                const uploadResult=await cloudinary.uploader.upload(filePath,{
                   folder: 'uploaded_images',
                    resource_type: 'image'
            });

            const avatarUrl = uploadResult.secure_url;
            await SubboardModel.findByIdAndUpdate(subboardId, { avatarUrl });
            console.log(`✅ Upload thành công: ${file}`);
        }

        return { message: 'Upload completed!' };
        }
        catch (error) {
        throw new Error('Error uploading images: ' + error.message);
        }
    }   
}
export default SubboardService;