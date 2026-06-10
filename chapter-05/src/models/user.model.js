import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
