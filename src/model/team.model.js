import mongoose from "mongoose";
const teamSchema= new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    member:[{type: mongoose.Schema.Types.ObjectId,ref:'User'}],
    // createdAt: { type: Date, default: Date.now }
})
const TeamModel= mongoose.model('Team',teamSchema);
export default TeamModel;