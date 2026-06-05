import express from "express";

// Created a server instance
const app = express();

// Creating a route
app.get("/", (req, res) => {
    res.send("Hello World! This is express");
});

// Creating a /about route
app.get("/about", (req, res) => {
    res.send("About Page");
});

// Started the server
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
