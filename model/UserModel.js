import mongoose from 'mongoose'
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    signupAt: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true,
        enum: ["MALE", "FEMALE", "other"],
    }
})

const User = mongoose.model("User", userSchema);
export default User