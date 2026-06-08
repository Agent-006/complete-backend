import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        image: String,
        caption: String,
    },
    {
        timestamps: true,
    },
);

const postModel = mongoose.model("post", postSchema);

export default postModel;
