# Backend Learning Notes - Part 1

## Server, Node.js, NPM & Basic Express

---

# Current Progress

- [x] What is a Server?
- [x] Node.js Installation & Setup
- [x] Packages & Installation (NPM)
- [x] Basic Express Server
- [ ] Folder Structure
- [ ] Middleware
- [ ] REST APIs
- [ ] MongoDB
- [ ] Authentication
- [ ] Testing

---

# What is a Server?

## Definition

A server is a program that continuously listens for incoming requests and sends responses back to clients.

### Flow

```text
Client (Browser/Postman)
        ↓
     Request
        ↓
      Server
        ↓
    Processing
        ↓
     Response
        ↓
      Client
```

---

## Real World Analogy

```text
Customer → Request

Waiter → HTTP

Kitchen → Server

Food → Response
```

Example:

```text
Customer:
Bring me pizza

Server:
Okay

Kitchen:
Makes pizza

Server:
Returns pizza
```

---

## Key Points

- A server is just a running program.
- It listens on a specific port.
- It receives requests.
- It processes data.
- It returns responses.

---

### My Notes

```text
(Add your own notes here)
```

---

# Understanding Ports

Ports help the operating system determine which application should receive incoming requests.

Example:

```text
Computer
│
├── Port 80    → HTTP
├── Port 443   → HTTPS
├── Port 3000  → Express App
├── Port 5432  → PostgreSQL
└── Port 27017 → MongoDB
```

---

## Why Ports Exist

Without ports:

```text
Request arrives
↓
Operating System doesn't know
which application should receive it
```

Ports solve this problem.

---

### My Notes

```text
(Add your own notes here)
```

---

# What is Node.js?

## Definition

Node.js is a runtime environment that allows JavaScript to run outside the browser.

Before Node.js:

```text
JavaScript → Browser Only
```

After Node.js:

```text
JavaScript → Browser + Server
```

---

## What Node.js Can Do

- Create servers
- Read files
- Write files
- Connect to databases
- Send emails
- Build APIs
- Create CLI tools

---

## Example

```js
import fs from "fs";
```

Possible in Node.js.

Not possible in browsers.

---

## Important Facts

Node.js is NOT:

- A programming language
- A framework

Node.js IS:

- A JavaScript Runtime

---

### My Notes

```text
(Add your own notes here)
```

---

# What is NPM?

## Definition

NPM stands for:

```text
Node Package Manager
```

It helps install and manage third-party packages.

---

## Installing a Package

```bash
npm install express
```

---

## What Happens Internally?

### 1. Downloads Package

```text
Express package downloaded
```

### 2. Creates node_modules

```text
node_modules/
```

Contains:

- Express
- Express dependencies

---

### 3. Updates package.json

```json
{
    "dependencies": {
        "express": "^5.1.0"
    }
}
```

---

### 4. Updates package-lock.json

Locks exact versions.

Important for team projects.

---

## Common Commands

### Initialize Project

```bash
npm init
```

or

```bash
npm init -y
```

---

### Install Package

```bash
npm install express
```

---

### Uninstall Package

```bash
npm uninstall express
```

---

### Install Development Dependency

```bash
npm install nodemon --save-dev
```

---

## Dependency Types

### Production Dependency

```json
"dependencies": {}
```

Needed in production.

Example:

```text
express
mongoose
jsonwebtoken
```

---

### Development Dependency

```json
"devDependencies": {}
```

Needed only during development.

Example:

```text
nodemon
eslint
prettier
jest
```

---

### My Notes

```text
(Add your own notes here)
```

---

# package.json

## Definition

The configuration file of a Node.js project.

Example:

```json
{
    "name": "backend-learning",
    "version": "1.0.0"
}
```

---

## Scripts

Example:

```json
{
    "scripts": {
        "start": "node index.js"
    }
}
```

Run:

```bash
npm start
```

Instead of:

```bash
node index.js
```

---

### Common Scripts

```json
{
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    }
}
```

Run:

```bash
npm run dev
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Why node_modules is Ignored in Git

Reasons:

- Very large
- Can be regenerated
- Slows down repositories

---

## Git Ignore

```gitignore
node_modules/
.env
```

---

## How Team Members Install Dependencies

Clone repository:

```bash
git clone repo-url
```

Install dependencies:

```bash
npm install
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Express.js

## What is Express?

Express is a backend framework built on top of Node.js.

It simplifies:

- Routing
- APIs
- Middleware
- Request handling
- Response handling

---

## Without Express

```js
import http from "http";

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Home");
    }
});

server.listen(3000);
```

---

## With Express

```js
app.get("/", (req, res) => {
    res.send("Home");
});
```

Much cleaner.

---

### My Notes

```text
(Add your own notes here)
```

---

# Basic Express Server

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000, () => {
    console.log("Server running");
});
```

---

## Code Breakdown

### Import Express

```js
import express from "express";
```

Imports Express package.

---

### Create App

```js
const app = express();
```

Creates Express application instance.

---

### Create Route

```js
app.get("/", (req, res) => {
    res.send("Hello World!");
});
```

Defines route.

Meaning:

```text
If:
Method = GET
Path = /

Then:
Execute callback
```

---

### Start Server

```js
app.listen(3000);
```

Starts server on port 3000.

---

### My Notes

```text
(Add your own notes here)
```

---

# Routes

## Definition

A route is:

```text
HTTP Method + URL Path
```

---

Examples:

```text
GET /

GET /about

POST /users

PUT /users/1

DELETE /users/1
```

---

## Common Route Methods

### GET

Retrieve data.

```js
app.get();
```

---

### POST

Create data.

```js
app.post();
```

---

### PUT

Update existing data.

```js
app.put();
```

---

### DELETE

Delete data.

```js
app.delete();
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Request Object (req)

Contains everything sent by the client.

---

## Common Properties

### URL

```js
req.url;
```

---

### Method

```js
req.method;
```

---

### Headers

```js
req.headers;
```

---

### Query Parameters

Request:

```text
/users?page=2
```

Access:

```js
req.query.page;
```

Returns:

```text
2
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Response Object (res)

Used to send data back to the client.

---

## Send Text

```js
res.send("Hello");
```

---

## Send JSON

```js
res.json({
    name: "Sagar",
});
```

---

## Status Codes

```js
res.status(200);
res.status(201);
res.status(404);
res.status(500);
```

---

## Example

```js
res.status(200).json({
    success: true,
});
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Request Lifecycle

```text
Browser/Postman
        ↓
HTTP Request
        ↓
Express Server
        ↓
Route Match
        ↓
Route Handler Executes
        ↓
Response Generated
        ↓
Response Sent Back
        ↓
Browser/Postman
```

---

### My Notes

```text
(Add your own notes here)
```

---

# Common Beginner Mistakes

## Sending Multiple Responses

Wrong:

```js
res.send("A");
res.send("B");
```

Only one response is allowed.

---

## Port Already In Use

Error:

```text
EADDRINUSE
```

Cause:

```text
Another process is already using the port.
```

---

## Forgetting app.listen()

Without:

```js
app.listen();
```

Server never starts.

---

### My Notes

```text
(Add your own notes here)
```

---

# Practice Exercises

## Exercise 1

Create:

```text
GET /
```

Returns:

```json
{
    "message": "Welcome"
}
```

---

## Exercise 2

Create:

```text
GET /about
GET /contact
GET /services
```

---

## Exercise 3

Return JSON response.

---

## Exercise 4

Use:

```js
res.status(201);
res.status(404);
res.status(500);
```

---

## Exercise 5

Log:

```js
req.method;
req.url;
req.headers;
```

---

# Revision Checklist

- [ ] What is a server?
- [ ] How HTTP works
- [ ] What is Node.js
- [ ] What is NPM
- [ ] package.json
- [ ] node_modules
- [ ] Express basics
- [ ] Routes
- [ ] Request object
- [ ] Response object
- [ ] Status codes
- [ ] Request lifecycle
- [ ] Basic server creation

---

END OF PART 1
