# Magnet Brain Backend

This is the **backend** of the Magnet Brain project, built using **Express.js**, **MongoDB**, and **JWT Authentication**.  
It provides REST APIs for task management and user authentication.

---

## 🚀 Features
- User Authentication (JWT-based login & signup)
- Task CRUD operations (Create, Read, Update, Delete)
- Assign tasks to users
- Task priorities (High, Medium, Low)
- Task status management (Pending / Completed)
- Protected routes (only logged-in users can access)
- Priority-wise task lists

---

## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT (JSON Web Token)**
- **CORS & Middleware**

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anirudh3434/magnet-brain-backend.git
   cd magnet-brain-backend



# env file
MONGO_URI=mongodb+srv://anirudhbharat415:Ani2002@backend.mhts0iw.mongodb.net
ACCESS_TOKEN=4f8c9b0d6eae4a8d9f5c2b1e7d3f9a5c7b8d1e2f3a4b6c7d8e9f0a1b2c3d4e5
REFRESH_TOKEN=9sdfa8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9csd8d7e6f5a4b3c2d1e0f9a8
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d