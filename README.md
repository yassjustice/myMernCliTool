# Create MERN App Connected

## 🚀 Introduction
`create-mern-app-connected` is a CLI tool that helps you quickly scaffold a **MERN (MongoDB, Express, React, Node.js) stack** application with a fully structured backend and frontend. This tool saves time by generating a pre-configured project with best practices already in place.

## 📦 Installation & Usage

### **Using `npx` (No Installation Required)**
```sh
npx create-mern-app-connected my-project
```

### **Install Globally (For Frequent Use)**
```sh
npm install -g create-mern-app-connected
```
Then, create a new MERN project:
```sh
create-mern-app-connected my-project
```

## 📂 Project Structure
Once the command is run, the following project structure is generated:
```
my-project/
│── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   ├── utils/
│   ├── .gitignore
│   ├── .envexample
│   ├── config/db.js
│   ├── index.js
│── client/ (React frontend - optional)
│── README.md
```

## ⚙️ Features
✅ Generates a **full MERN stack** project structure in seconds  
✅ Includes essential **server setup** with Express.js  
✅ Provides **MongoDB connection** and JWT authentication configuration  
✅ Preconfigured **CORS and middleware** support  
✅ Works with **npx** for easy, one-time use  

## 🛠 How It Works
The CLI script automates the creation of all necessary folders and files for a MERN project. It also initializes a Git repository and installs dependencies automatically.

## 🆕 Updating the Package
If you need to update the CLI, simply run:
```sh
npm update -g create-mern-app-connected
```
Or, if you installed it locally:
```sh
npx create-mern-app-connected@latest my-project
```

## 💡 Contributing
Feel free to fork this repository and submit a pull request with improvements! If you find any issues, please report them.

## 📜 License
This project is licensed under the MIT License.

