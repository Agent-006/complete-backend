# 🚀 Chapter 02: Building a Simple CRUD API with Express.js

Welcome to **Chapter 02** of the Complete Backend series! 🌟 In this chapter, we have built a foundational RESTful API using **Node.js** and **Express.js**. This API allows you to create, read, update, and delete (CRUD) notes using an in-memory array.

## 🛠️ Tech Stack
- **Node.js**: JavaScript runtime environment 🟢
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js 🚂
- **Nodemon**: Tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected 🔄

## 📁 Project Structure

```text
chapter-02/
├── src/
│   └── app.js         # Core Express application and route definitions 🛣️
├── server.js          # Entry point that starts the server 🏁
├── package.json       # Project dependencies and scripts 📦
└── .gitignore         # Files and folders to be ignored by Git 🙈
```

## 🚀 Getting Started

1. **Install dependencies**:
   Run the following command to install Express and other required packages:
   ```bash
   npm install
   ```

2. **Start the development server**:
   We are using `nodemon` to watch for file changes.
   ```bash
   npm run dev
   ```
   The server will start running at `http://localhost:3000` 🎉.

---

## 📡 API Endpoints & Examples

Here is a detailed breakdown of the available endpoints along with examples.

### 1. Create a Note 📝
- **Endpoint:** `POST /notes`
- **Description:** Adds a new note to the list.
- **Request Body:** JSON object representing the note.

**Example Request:**
```bash
curl -X POST http://localhost:3000/notes \
-H "Content-Type: application/json" \
-d '{"title": "Learn Express", "description": "Study routing and middleware."}'
```

**Example Response (201 Created):**
```json
{
  "message": "Note created successfully"
}
```

### 2. Get All Notes 📖
- **Endpoint:** `GET /notes`
- **Description:** Retrieves all the notes that have been created.

**Example Request:**
```bash
curl -X GET http://localhost:3000/notes
```

**Example Response (200 OK):**
```json
{
  "message": "Notes fetched successfully",
  "notes": [
    {
      "title": "Learn Express",
      "description": "Study routing and middleware."
    }
  ]
}
```

### 3. Update a Note ✏️
- **Endpoint:** `PATCH /notes/:index`
- **Description:** Updates the `description` of a specific note using its array index.
- **Request Body:** JSON object containing the new `description`.

**Example Request:**
```bash
curl -X PATCH http://localhost:3000/notes/0 \
-H "Content-Type: application/json" \
-d '{"description": "Study routing, middleware, and error handling."}'
```

**Example Response (200 OK):**
```json
{
  "message": "Note updated successfully"
}
```

### 4. Delete a Note 🗑️
- **Endpoint:** `DELETE /notes/:noteIndex`
- **Description:** Deletes a note at the specified index.

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/notes/0
```

**Example Response (200 OK):**
```json
{
  "message": "Note deleted successfully"
}
```

## 💡 Notes on Implementation
- We are using `type: "module"` in `package.json` to enable ES6 imports (`import/export`). 📦
- The data is currently stored in a local, in-memory array (`const notes = []`). If you restart the server, all notes will be lost. This is a great stepping stone before moving to persistent databases like MongoDB or PostgreSQL! 💾

Happy Coding! 💻✨
