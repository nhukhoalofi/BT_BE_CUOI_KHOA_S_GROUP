import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb://user:password@127.0.0.1:27019/S-Mongo?authSource=admin');
        console.log('Mongo connected');
    }
    catch (err){
        console.log('Failed to connect to mongoDB',err);
        process.exit(1);
    }
}
export default connectDB;
