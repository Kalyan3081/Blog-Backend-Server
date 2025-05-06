import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

const Token = mongoose.model('Token', TokenSchema);
export default Token;
