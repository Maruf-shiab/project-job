import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
mongoose.connection.on('connected', () => console.log('MongoDB connected'));
 await mongoose.connect(`${process.env.MONGODB_URI}/jobproject`)
}
export default connectDB

