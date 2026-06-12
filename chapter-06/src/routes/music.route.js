import express from "express";
import {
    createAlbum,
    createMusic,
    getAlbumById,
    getAllAlbums,
    getAllMusics,
} from "../controllers/music.controller.js";
import {
    authArtistMiddleware,
    authUserMiddleware,
} from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

// upload music
router.post(
    "/upload",
    authArtistMiddleware,
    upload.single("music"),
    createMusic,
);

// create album
router.post("/album", authArtistMiddleware, createAlbum);

// get all musics
router.get("/", authUserMiddleware, getAllMusics);

// get all albums
router.get("/albums", authUserMiddleware, getAllAlbums);

// get a single album and its songs
router.get("/albums/:albumId", authUserMiddleware, getAlbumById);

export default router;
