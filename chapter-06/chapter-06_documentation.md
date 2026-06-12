# Deep Analysis & Topic Explanations: Spotify Backend (Chapter 06)

This document provides a conceptual deep dive into the technologies, patterns, and logic used in the `chapter-06` project. It is intended to complement the standard `readme.md` by explaining *how* and *why* things are built this way.

---

## 1. Authentication Flow (JWT & Cookies)
**File References:** `src/controllers/auth.controller.js`, `src/middlewares/auth.middleware.js`

### What You Need to Know:
- **Stateless Authentication:** This application uses **JSON Web Tokens (JWT)**. Unlike session-based auth (where the server stores session IDs in memory or a database), JWTs are stateless. The token itself contains all the necessary data (e.g., user ID, role) cryptographically signed.
- **Cookie Transport:** Instead of returning the JWT in the JSON response body and forcing the frontend to manually store it (in `localStorage`) and attach it to every request header, this application uses **HTTP Cookies**.
  - **The Flow:** When a user logs in, the server generates a token and calls `res.cookie("token", token)`. The browser automatically stores this cookie and attaches it to every subsequent request to the server.
- **Bcrypt Hashing:** Passwords are never stored in plain text. `bcryptjs` is used to hash passwords before saving them. When logging in, `bcrypt.compare()` safely compares the plain-text input against the stored hash.

### Security Note & Potential Enhancements:
- Currently, the cookie is set without security flags. In production, it is highly recommended to use:
  ```javascript
  res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie (mitigates XSS)
      secure: true,   // Ensures cookie is only sent over HTTPS
      sameSite: "strict" // Mitigates CSRF attacks
  });
  ```

---

## 2. Role-Based Access Control (RBAC)
**File References:** `src/models/user.model.js`, `src/middlewares/auth.middleware.js`

### What You Need to Know:
- **Roles:** The `User` model defines an `enum: ["user", "artist"]`.
- **Enforcement:** Two separate middlewares enforce access:
  - `authUserMiddleware`: Allows both `user` and `artist`. Used for fetching songs and albums (read-only operations).
  - `authArtistMiddleware`: Strictly allows only `artist`. Used for uploading songs and creating albums (write operations).
- **How it Works:** The middleware intercepts the request, reads the token from `req.cookies.token`, decodes it, and checks the `role` property embedded inside the JWT payload.

---

## 3. File Uploads (Multer & ImageKit)
**File References:** `src/routes/music.route.js`, `src/services/storage.service.js`

### What You Need to Know:
- **Multer (Memory Storage):** File uploads are handled by `multer`. Instead of saving files to the server's hard drive (`diskStorage`), it uses `multer.memoryStorage()`. This stores the incoming file in a `Buffer` (RAM). This is useful when you want to immediately forward the file to a cloud provider without doing disk I/O.
- **ImageKit:** Although typically used for images, ImageKit acts as the cloud storage provider here.
  - The file buffer is converted to a base64 string (`file.buffer.toString("base64")`) and sent to ImageKit via their NodeJS SDK.
  - ImageKit returns a public `url` (URI) which is then saved to the MongoDB database.

---

## 4. MongoDB Data Modeling (Mongoose)
**File References:** `src/models/` directory

### What You Need to Know:
- **Referencing vs Embedding:** The database uses a **Normalized (Referencing)** pattern.
  - `Music` references `User` (the artist) via an ObjectId.
  - `Album` references `User` (the artist) and an array of `Music` ObjectIds.
- **Mongoose Populate:** Because of referencing, fetching an Album only returns an array of Object IDs. To get the actual song titles and URIs, the application uses `.populate()`.
  ```javascript
  // Example from music.controller.js
  const album = await albumModel
      .findById(albumId)
      .populate("artist", "username email") // Replaces artist ID with username & email
      .populate("musics"); // Replaces array of Music IDs with full Music objects
  ```

---

## 5. Directory Architecture Pattern
The codebase follows a standard **MVC-like API structure**:
- `routes/`: Maps URL endpoints to specific controller functions. Acts as the traffic cop.
- `controllers/`: Contains the core business logic. Extracts data from requests, interacts with models, and sends JSON responses.
- `models/`: Defines the schema, data types, and constraints for MongoDB.
- `middlewares/`: Logic that runs *between* the route and the controller (e.g., intercepting the request to check for a valid token).
- `services/`: Encapsulates logic for external third-party APIs (like ImageKit). Keep the controllers clean.
- `db/`: Isolates database connection logic.
