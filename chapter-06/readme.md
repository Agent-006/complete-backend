# Spotify Backend Clone (Chapter-06)

This project is a backend implementation for a Spotify-like application using **Node.js**, **Express.js**, and **MongoDB**. It demonstrates role-based access control, JWT authentication, and file uploading using **Multer** and **ImageKit**.

## 📌 Features
- **User Authentication:** Registration, Login, and Logout functionality.
- **Role-Based Access Control (RBAC):** Supports `user` and `artist` roles.
- **JWT Authorization:** Tokens are securely issued and stored in cookies.
- **Music Management:** Artists can upload music files to remote storage.
- **Album Management:** Artists can group uploaded music into albums.
- **Public/Private Routes:** Middlewares enforce role permissions for different API endpoints.

## 🛠️ Tech Stack
- **Backend Framework:** Node.js, Express.js
- **Database & ODM:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs, cookie-parser
- **File Upload:** Multer (memory storage), ImageKit (remote storage)

## 📂 Project Structure

```text
chapter-06/
├── src/
│   ├── app.js               # Express app configuration
│   ├── controllers/         # Request handling logic
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── db/                  # Database connection logic
│   │   └── db.js
│   ├── middlewares/         # Custom middlewares for auth
│   │   └── auth.middleware.js
│   ├── models/              # Mongoose schemas
│   │   ├── album.model.js
│   │   ├── music.model.js
│   │   └── user.model.js
│   ├── routes/              # API route definitions
│   │   ├── auth.route.js
│   │   └── music.route.js
│   └── services/            # External service integrations
│       └── storage.service.js
├── .env                     # Environment variables (ignored in Git)
├── package.json             # Dependencies and scripts
└── server.js                # Application entry point
```

## 🚀 Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
```

## ⚙️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

3. **Start the Production Server:**
   ```bash
   npm start
   ```
The server will start running at `http://localhost:3000`.

## 🌐 API Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user or artist. | Public |
| POST | `/login` | Authenticate user and issue JWT cookie. | Public |
| POST | `/logout` | Clear JWT cookie. | Public |

### Music & Albums (`/api/v1/artist`)
*Note: Although the base route is `/artist`, some endpoints are accessible to regular users.*

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/upload` | Upload a single music file (multipart/form-data with key `music`). | **Artist** |
| POST | `/album` | Create a new album with an array of music IDs. | **Artist** |
| GET | `/` | Retrieve a list of all uploaded musics (max 20). | User/Artist |
| GET | `/albums` | Retrieve a list of all albums. | User/Artist |
| GET | `/albums/:albumId` | Retrieve details of a specific album and its songs. | User/Artist |

## 🔑 Key Concepts Covered

1. **Authentication via Cookies:** Instead of relying on the client to send the token via Authorization headers, this API issues a token directly into an HTTP cookie. The middleware then extracts this token from `req.cookies`.
2. **Multer Memory Storage:** Files are not saved locally. Instead, Multer's `memoryStorage` stores the file buffer in RAM.
3. **ImageKit Upload Integration:** The file buffer is converted to a base64 string and uploaded directly to ImageKit via the `storage.service.js` module.
4. **Mongoose Population:** Using `.populate()` to fetch related documents (e.g., fetching artist details for a song, or all songs within an album).
