# 🚀 Chapter 03: Full-Stack Note-Taking Backend with Express & MongoDB

Welcome to **Chapter 03**! This chapter demonstrates how to build a complete RESTful API for a Note-Taking application. We connect our Node.js and Express backend to a MongoDB database using Mongoose. 📝✨

## 📁 Directory Structure

- `server.js`: The entry point for our application. It starts the server and initiates the database connection.
- `src/app.js`: Contains the core Express application and all the REST API routes.
- `src/db/db.js`: Handles the connection to the MongoDB database using Mongoose.
- `src/models/note.model.js`: Defines the Mongoose schema and model for our Notes.

## 🛠️ Tech Stack

- **Node.js** 🟢
- **Express.js** 🚂
- **MongoDB** 🍃
- **Mongoose** 🔗 (ODM)
- **Nodemon** 🔄 (for automatic server restarts during development)

## 📡 API Endpoints (CRUD Operations)

Here are the routes available in this application, found in `src/app.js`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/create-note` | Creates a new note. Expects `title` and `description` in the request body. |
| **GET** | `/notes` | Fetches all the notes from the database. |
| **GET** | `/note/:id` | Fetches a specific note by its ID. |
| **PATCH** | `/update-note/:id` | Updates an existing note. Expects `title` and `description` in the request body. |
| **DELETE** | `/delete-note/:id` | Deletes a note by its ID. |

## 🚀 How to Run

1. Ensure you have your dependencies installed:
   ```bash
   npm install
   ```

2. Start the development server (uses `nodemon` for hot reloading):
   ```bash
   npm run dev
   ```

3. Your server will be running at: `http://localhost:3000` 🌐

## 💡 Key Concepts Covered

- **Database Connectivity**: Establishing a connection to MongoDB Atlas.
- **Mongoose Models**: Designing schemas for structured data.
- **Express Routing**: Handling various HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`).
- **Error Handling**: Implementing `try...catch` blocks and proper HTTP status codes (`200`, `201`, `401`, `404`, `500`).
- **Async/Await**: Managing asynchronous database queries cleanly.

---
*Happy Coding!* 💻🔥
