import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        if(res) {
            console.log("Database connected");
        }
    }
    catch(err) {
        console.error(err.message);
    }
}

export default connectDB;