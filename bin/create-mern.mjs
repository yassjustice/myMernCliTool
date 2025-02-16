#!/usr/bin/env node

import fs from "fs";
import { execSync } from "child_process";

// Project structure
const serverFolders = [
    "server/config",
    "server/controllers",
    "server/middleware",
    "server/models",
    "server/repositories",
    "server/routes",
    "server/seeders",
    "server/services",
    "server/utils",
];

const serverFiles = {
    "server/.gitignore": "node_modules\n.env\n",
    "server/.envexample":
        "MONGO_URI=mongodb+srv://dbname:password@atlascluster.rgpfgtp.mongodb.net/Mernstarter \nJWT_SECRET=your_password\nPORT=5000",
    "server/config/db.js": `import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

export default connectDB;`,
    "server/index.js": `import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`,
    "server/models/User.js": `import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);`,
    "server/repositories/userRepository.js": `import User from "../models/User.js";

const findAllUsers = () => User.find({});
const findByEmail = (email) => User.findOne({ email });
const createUser = (userData) => new User(userData).save();

export default { findByEmail, createUser, findAllUsers };
`,
    "server/services/userService.js": `import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');
  userData.password = await bcrypt.hash(password, 10);
  return userRepository.createUser(userData);
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getAllUsers = async () => {
  return userRepository.findAllUsers();
};

export default { registerUser, loginUser, getAllUsers };`,
    "server/controllers/userController.js": `import userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ message: "Users fetched successfully", users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

`,
    "server/routes/userRoutes.js": `import express from 'express';
import { register, login, getAllUsers } from '../controllers/userController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);

export default router;`,
    "server/middleware/authenticate.js": `import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};`,
    "server/utils/hashPassword.js": `import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => bcrypt.hash(password, 10);`,
};

// Create backend folders
serverFolders.forEach((folder) => fs.mkdirSync(folder, { recursive: true }));

// Create backend files
Object.entries(serverFiles).forEach(([filePath, content]) => {
    fs.writeFileSync(filePath, content);
});

// Initialize backend
console.log("Initializing backend...");
execSync("cd server && npm init -y", { stdio: "inherit" });
execSync(
    "cd server && npm install express mongoose dotenv bcryptjs jsonwebtoken cors",
    { stdio: "inherit" }
);
execSync("cd server && npm install --save-dev nodemon", { stdio: "inherit" });

// Modify package.json to use ES modules and add scripts
const packageJsonPath = "server/package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
packageJson.type = "module";
packageJson.scripts = {
    dev: "nodemon index.js",
    start: "node index.js",
};
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("Backend setup complete!");

// ========================================
// FRONTEND SETUP
// ========================================
console.log("Initializing frontend...");

// Create frontend with Vite
execSync("npm create vite@latest client --template react", {
    stdio: "inherit",
});

// Install frontend dependencies
execSync("cd client && npm install", { stdio: "inherit" });
execSync("cd client && npm install react-router-dom axios", {
    stdio: "inherit",
});

// Create necessary frontend directories
const directories = [
    "client/src/components",
    "client/src/pages",
    "client/src/context",
    "client/src/services",
    "client/src/utils",
];

directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Create frontend files
const frontendFiles = {
    "client/src/main.jsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`,
    "client/src/App.jsx": `import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;`,
    "client/src/pages/Home.jsx": `import { useEffect, useState } from "react";
import apiService from "../services/apiService";

function Home() {
  const [message, setMessage] = useState("Fetching data...");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService
      .testAPI()
      .then(res => {
        setMessage(res.message);
        setUsers(res.users); // Store user data
      })
      .catch(err => setMessage("Error fetching data"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Welcome to MERN App</h1>
      <a href="/auth">Register</a>
      <p>{message}</p>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
`,
    "client/src/pages/Auth.jsx": `import { useState } from 'react';
import apiService from '../services/apiService';

function Auth() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await apiService.register({ email, password, username });
      setMessage(response.message);
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Auth Page</h1>
      <input type="username" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default Auth;`,
    "client/src/services/apiService.js": `const API_URL = "http://localhost:5000/api/users";

const apiService = {
    async register(data) {
        const response = await fetch(API_URL + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        console.log("response", response);
        return response.json();
    },
    
    async testAPI() {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      }
      
    // async testAPI() {
    //     const response = await fetch(API_URL, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     return response.json();
    //   }
      
};

export default apiService;
`,
    "README.md": `# MERN Full-Stack Starter

This project sets up a **MERN stack** application with a backend using **Express, MongoDB, JWT authentication**, and a frontend using **React**.

## Getting Started

### Clone the Repository

git clone https://github.com/yassjustice/your-repo-name.git
cd your-repo-name

### Install Dependencies

Backend:

cd server
npm install

Frontend:

cd client
npm install

### Configure Environment Variables

Create a .env file inside the **server/** directory with:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Replace **your_secret_key** with a secure value.

## Project Structure

- **server/** - Backend setup (Express, MongoDB, JWT Authentication)
- **client/** - Frontend setup (React, Vite, API integration)
- **client/src/services/apiService.js** - Handles API requests

## Running the Project

Start the backend:

cd server
npm run dev

Start the frontend:

cd client
npm run dev

## API Endpoints

- POST /api/users/register - Register a new user
- POST /api/users/login - Authenticate user and get JWT

## Testing the Full Stack

- Run both backend and frontend.
- Open **http://localhost:5173/** in the browser.
- API requests are handled via **client/src/services/apiService.js**.

## Notes

- MongoDB database is auto-created on first connection.
- JWT tokens are required for protected routes.
- Use Postman or Thunder Client for testing.

### Happy Coding! 🚀

`,
};

// Write frontend files
Object.entries(frontendFiles).forEach(([filePath, content]) => {
    fs.writeFileSync(filePath, content);
});

console.log("Frontend setup complete!");

console.log("Frontend setup complete!");

// Instructions
console.log("\n✅ Project setup complete!");
console.log("To start the backend:");
console.log("  cd server && npm run dev");
console.log("To start the frontend:");
console.log("  cd client && npm run dev");
