# 🔐 Chapter 05: Authentication & Authorization with JWT

Welcome to **Chapter 05**! In this chapter, we dive deep into securing our backend applications. We cover the fundamental concepts of validation, verification, authentication, and authorization, and implement a robust user registration and protected route system using **JSON Web Tokens (JWT)** and cookies.

---

## 📖 Key Concepts

### 1️⃣ Validation
Ensuring that the incoming data meets the required format and constraints before processing it.
*Example: Checking if an email looks like a valid email or if a password is at least 6 characters long.*

### 2️⃣ Verification
Confirming the accuracy or truth of the provided data.
*Example: Sending an OTP to a phone number or a confirmation link to an email to verify ownership.*

### 3️⃣ Authentication (AuthN)
Verifying **who** the user is. It's the process of identifying a user based on their credentials (like email/password).
*Example: Logging into a website.*

### 4️⃣ Authorization (AuthZ)
Determining **what** the authenticated user is allowed to do.
*Example: An Admin can delete posts, but a regular User can only read them.*

---

## 🛠️ Tech Stack Additions
In this chapter, we introduced a couple of very important libraries:
- `jsonwebtoken`: Used to generate and verify JWTs.
- `cookie-parser`: Middleware to parse cookies attached to the client request object.

---

## 🚀 Implementation Details

### 👤 1. User Model (`user.model.js`)
We created a Mongoose schema for our users to store their details securely.
```javascript
const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true, // Note: In a real app, passwords should be hashed (e.g., using bcrypt)
    },
});
```

### 📝 2. User Registration & Issuing JWT (`auth.controller.js`)
When a user registers:
1. We check if all fields are provided.
2. We verify if the user already exists in the database.
3. We create a new user record.
4. **JWT Creation**: We create a signed token containing the user's `_id` using a secret key.
5. **Cookie Delivery**: We send the JWT back to the client inside an HTTP cookie so subsequent requests are authenticated automatically.

```javascript
// Generating the token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

// Setting the token in a cookie
res.cookie("token", token);
```

### 🛡️ 3. Protecting Routes (`post.route.js`)
To ensure only authenticated users can create posts, we verify their token before allowing access to the route.

1. **Extract Token**: We read the `token` from `req.cookies`.
2. **Missing Token**: If there is no token, we reject the request (`401 Unauthorized`).
3. **Verify Token**: We use `jwt.verify()` with our secret key to decode the token.
4. **Identify User**: We extract the user's `id` from the decoded token and fetch the user from the database.

```javascript
router.post("/create", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user using the ID stored in the token
        const user = await userModel.findById(decoded.id);

        res.send("Post created successfully");
    } catch (error) {
        res.send("Token Invalid");
    }
});
```

---

## 💡 Best Practices to Remember
- **Keep Secrets Secret**: Always store your `JWT_SECRET` in a `.env` file and never commit it to source control.
- **Hash Passwords**: Always hash user passwords (using `bcrypt` or `argon2`) before saving them to the database. Plain text passwords are a huge security risk!
- **Secure Cookies**: In production, set cookies to `httpOnly` and `secure: true` to protect against XSS and interception.

Happy Coding! 🎉