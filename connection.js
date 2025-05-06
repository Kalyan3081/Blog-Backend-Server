import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DEV_MONGO_URI;
const MAX_RETRY_CONNECTIONS = Number(process.env.MAX_DB_RETRY_CONNECTIONS) || 10; // Ensure it's a number
let retries = 0;

export async function mongoDB_connection() {
    while (retries < MAX_RETRY_CONNECTIONS) {
        try {
            await mongoose.connect(DB_URI, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true
            });
            console.log("MongoDB connected successfully");
            return; // Exit function on success
        } catch (err) {
            retries++;
            console.log(`Error connecting to MongoDB, retrying in 5 seconds... (Attempt ${retries}/${MAX_RETRY_CONNECTIONS})`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait before retrying
        }
    }
    console.error("Failed to connect to MongoDB after multiple attempts");
}
