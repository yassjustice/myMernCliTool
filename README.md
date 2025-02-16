# Create MERN App

🚀 **Create a fully structured MERN (MongoDB, Express, React, Node.js) application instantly!**

## 🎯 **Project Goals**
This CLI tool is designed to help developers quickly scaffold a complete MERN stack application with a well-structured backend and frontend, reducing setup time and ensuring best practices.

### **Features:**
- 📦 **Pre-configured MERN Stack** with folder structure
- 🔌 **MongoDB Connection Setup**
- 🔐 **JWT Authentication Ready**
- 📂 **Organized Backend with MVC Pattern**
- 🎨 **React Frontend Boilerplate**
- 🛠️ **Easily Extendable & Customizable**

---

## 🛠️ **Installation & Usage**

### **1️⃣ Using `npx` (No installation required)**
```sh
npx create-mern my-project
```

### **2️⃣ Installing Globally**
```sh
npm install -g create-mern-app
create-mern my-project
```

### **3️⃣ Cloning & Running Locally**
If you want to modify or contribute:
```sh
git clone https://github.com/yourusername/create-mern-app.git
cd create-mern-app
npm link  # Link it globally for testing
create-mern test-project  # Test the command
```

---

## 📂 **Generated Project Structure**
After running the command, your project will have the following structure:
```
my-project/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   ├── utils/
│   ├── .env (ignored)
│   ├── index.js
│   ├── package.json
│   └── README.md
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── index.js
│   └── README.md
│
└── README.md
```

---

## 🔄 **Updating the CLI**
If you installed it globally and want the latest version:
```sh
npm update -g create-mern-app
```
If you're using GitHub Actions for auto-updates, just push to the repository, update `package.json` version, and run:
```sh
npm publish
```

---

## 🛠 **Contributing**
We welcome contributions! If you’d like to improve this tool, feel free to fork, create pull requests, or submit issues.

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit your changes
4. Push to your branch and create a PR

---

## 📜 **License**
This project is licensed under the MIT License.

💡 **Happy Coding!** 🎉

