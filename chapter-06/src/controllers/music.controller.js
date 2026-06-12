import { musicModel } from "../models/music.model.js";
import { albumModel } from "../models/album.model.js";
import uploadFile from "../services/storage.service.js";

// Create music controller
export async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,
        });

        if (!music) {
            return res.status(500).json({
                success: false,
                message: "Failed to create a music",
            });
        }

        res.status(201).json({
            success: true,
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artistId: music.artist,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Album creation controller
export async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics,
        });

        if (!album) {
            return res.status(500).json({
                success: false,
                message: "Failed to create album",
            });
        }

        res.status(201).json({
            success: true,
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// List all music controller
export async function getAllMusics(req, res) {
    try {
        const musics = await musicModel
            .find()
            .limit(20)
            .populate("artist", "username email");

        if (!musics) {
            return res.status(404).json({
                success: false,
                message: "No musics found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Musics retrieved successfully",
            musics,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// List all albums
export async function getAllAlbums(req, res) {
    try {
        const albums = await albumModel
            .find()
            .select("title artist")
            .populate("artist", "username email");

        if (!albums) {
            return res.status(404).json({
                success: false,
                message: "No albums found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Albums retrieved successfully",
            albums,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Get single album and its songs
export async function getAlbumById(req, res) {
    try {
        const { albumId } = req.params;

        if (!albumId) {
            return res.status(400).json({
                success: false,
                message: "Please provide an album id",
            });
        }

        const album = await albumModel
            .findById(albumId)
            .populate("artist", "username email")
            .populate("musics");

        if (!album) {
            return res.status(404).json({
                success: false,
                message: "No album found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Album fetched successfully",
            album,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
