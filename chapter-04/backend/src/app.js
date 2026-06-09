import express from "express";
import multer from "multer";
import { uploadFile } from "./services/storage.service.js";
import postModel from "./models/post.model.js";
import cors from 'cors';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);

    if (result.url === null || result.url === undefined) {
        res.status(500).json({
            message: "File upload failed",
        });

        return;
    }

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption,
    });

    if (!post) {
        res.status(500).json({
            message: "Something went wrong, post creation failed!",
        });
    }

    res.status(201).json({
        message: "Post created successfully!",
        data: post,
    });
});

app.get("/posts", async (req, res) => {
    const posts = await postModel.find();

    if (!posts || posts.length === 0) {
        res.status(404).json({
            message: "No post found",
        });

        return;
    }

    res.status(200).json({
        message: "All posts fetched successfully!",
        posts: posts,
    });
});

export default app;
