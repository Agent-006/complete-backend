// server ko create karna

import express from "express";

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
    // yahan par abhi code likha jayega
    // pehle hme req body me se data lena hai
    const data = req.body;
    notes.push(data);

    res
        .status(201)
        .json({ 
            message: "Note created successfully" 
        });
});

app.get("/notes", (req, res) => {
    // notes array ko as a response dena hai

    res
        .status(200)
        .json({
            message: "Notes fetched successfully",
            notes: notes
        });
});

// update note in array
app.patch("/notes/:index", (req, res) => {
    const index = req.params.index;
    const description = req.body.description;

    notes[ index ].description = description;

    res
        .status(200)
        .json({
            message: "Note updated successfully"
        });
});


// delete note from arrayI
app.delete("/notes/:noteIndex", (req, res) => {
    const index = req.params.noteIndex;

    delete notes[index];

    res
        .status(200)
        .json({
            message: "Note deleted successfully"
        });
}); 

export default app;
