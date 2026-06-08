import express from "express";
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json());

// POST -> create a note
app.use("/create-note", async (req, res) => {
    try {
        // take out data from req body
        const { title, description } = req.body;

        // check if title and description is empty
        if (!title || !description || title === "" || description === "") {
            res.status(404).json({
                message: "Title and Description both are required",
            });
        }

        // if title and description is there, we create the note
        let note = await noteModel.create({
            title: title,
            description: description,
        });

        // we check if the note is created or not
        if (!note) {
            res.status(401).json({
                message:
                    "Note creation failed for some reason. Try again later!!",
            });
        }

        // if note is created then we send a response
        res.status(201).json({
            note: note,
            message: "Note created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});

// get all notes
app.get("/notes", async (req, res) => {
    try {
        // query the db for all notes
        const notes = await noteModel.find();

        // if no notes send a message
        if (!notes || notes.length === 0) {
            res.status(404).json({
                message: "No notes found",
            });
        }

        // if notes are fetched successfully then send a message
        res.status(200).json({
            message: "All notes fetched successfully",
            notes: notes,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});

// get a note by id
app.get("/note/:id", async (req, res) => {
    try {
        // take out the id from the params
        const { id } = req.params;

        // check if is null or undefined
        if (!id || id === null) {
            res.status(404).json({
                message: "Id not found, try again later!!",
            });
        }

        // if id is there, we query the db with the id
        const note = await noteModel.findById({
            _id: id,
        });

        // if no note is found then send response
        if (!note) {
            res.status(404).json({
                message: "Note not found or doesn't exists",
            });
        }

        // if note is found send the note and a message
        res.status(200).json({
            message: "Note fetch successfully",
            note: note,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});

// update a note
app.patch("/update-note/:id", async (req, res) => {
    try {
        // take out the id from the params
        const { id } = req.params;

        // take out the title and description from the req body
        const { title, description } = req.body;

        // check if the id is null or undefined
        if (!id || id === null) {
            res.status(404).json({
                message: "Id not found, try again later!!",
            });
        }

        if (!title || !description) {
            res.status(404).json({
                message: "Title and description both are required",
            });
        }

        // query the db for the note with the id
        const note = await noteModel.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                title: title,
                description: description,
            },
            {
                new: true,
            },
        );

        // if note not found
        if (!note) {
            res.status(404).json({
                message: "Note not found or may not exists",
            });
        }

        // if note is found
        res.status(200).json({
            message: "Note updated successfully",
            note: note,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
});

// delete note by id
app.delete("/delete-note/:id", async (req, res) => {
    try {
        // get the id from the params
        const { id } = req.params;

        // check if id is there or not
        if (!id || id === null) {
            res.status(404).json({
                message: "Id not found, try again later!",
            });
        }

        // query the db for the note
        const note = await noteModel.findOneAndDelete({
            _id: id,
        });

        // if note is not found send a msg
        if (!note) {
            res.status(404).json({
                message: "Note not found or may not exists",
            });
        }

        // if note is deleted send a response
        res.status(200).json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong !!",
        });
    }
});

export default app;
