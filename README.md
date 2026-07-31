# 🚀 Habitly - AI Powered Habit Tracker

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb">
  <img src="https://img.shields.io/badge/JWT-Authentication-blue?style=for-the-badge">
</p>

## 📖 Overview

**Habitly** is a full-stack MERN application that helps users build and maintain productive habits through intelligent tracking, progress visualization, and AI-powered insights.

The application allows users to create habits, monitor daily progress, analyze performance using interactive charts, and receive AI-generated recommendations to improve consistency.

---

## ✨ Features

### 👤 Authentication

- Secure User Registration
- Login & Logout
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

### 📅 Habit Management

- Create New Habits
- Update Existing Habits
- Delete Habits
- Track Daily Progress
- Habit Completion History

### 📊 Analytics Dashboard

- Weekly Progress
- Monthly Progress
- Streak Tracking
- Completion Statistics
- Interactive Charts
- Category-wise Analysis

### 🤖 AI Insights

- Personalized Habit Analysis
- Productivity Suggestions
- Progress Evaluation
- Smart Recommendations

### 🎨 User Experience

- Responsive Design
- Modern UI
- Loading States
- Toast Notifications
- Protected Navigation

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Context API
- Tailwind CSS
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Google GenAI API

---

# 📂 Project Structure

```
Habitly
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   └── server.js
│
└── frontend
    └── habit-tracker
        ├── src
        │   ├── api
        │   ├── assets
        │   ├── components
        │   ├── context
        │   ├── pages
        │   └── utils
        │
        ├── public
        └── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Arpit-Maddhesiya/HABITLY.git
```

```
cd HABITLY
```

---

## Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_API_KEY=your_google_genai_api_key
```

Run Backend

```
npm run dev
```

---

## Frontend Setup

```
cd frontend/habit-tracker
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```
npm run dev
```

---

# 📸 Screenshots

> Add screenshots here

- Landing Page
- Dashboard
- Habit Tracker
- AI Insights
- Statistics Page

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
JWT Generated
      │
      ▼
Protected Routes
      │
      ▼
Authenticated API Requests
```

---

# 📈 Future Improvements

- Email Verification
- Dark Mode
- Push Notifications
- Calendar Integration
- Social Habit Groups
- Mobile App
- Offline Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```
git checkout -b feature/new-feature
```

3. Commit changes

```
git commit -m "Add new feature"
```

4. Push branch

```
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Arpit Maddhesiya**

GitHub:
https://github.com/Arpit-Maddhesiya

LinkedIn:
https://www.linkedin.com/in/arpit-maddhesiya/

---

# ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.

It motivates further development and helps others discover the project.

---
