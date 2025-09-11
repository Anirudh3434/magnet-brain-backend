import mongoose from "mongoose";


export const connectDB = async () => {

    const MONGO_URI = process.env.MONGO_URI;

    try {
        await mongoose.connect(`${MONGO_URI}/magnet_brain`, {
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}