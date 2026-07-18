# 🚀 JobHunt

> **An AI-powered interview preparation platform that analyzes your resume against a job description, identifies skill gaps, generates interview-ready insights, and creates an AI-enhanced resume.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌐 Live Demo

🔗 **https://job-hunt-ochre-phi.vercel.app/**

---

# ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure HTTP-only cookies
- Protected routes

### 📄 Resume Analysis
- Upload resume in PDF format
- Automatic resume text extraction
- AI-powered resume analysis

### 🤖 AI Interview Report

Generate a comprehensive interview preparation report using:
- Resume
- Job Description
- Self Description

The generated report includes:

- 🎯 Match score for the target role
- 📈 Skill gap analysis with severity levels
- 💻 Technical interview questions
- 🗣️ Behavioral interview questions
- 🧠 Interviewer's intent behind each question
- 💡 Answer guidance
- 🗓️ Personalized day-wise preparation roadmap

### 📚 Interview History

- Save interview reports
- View previous reports anytime

### 📄 AI Resume Generator

- Generate an AI-enhanced resume
- Download resume as PDF

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- pdf-parse
- Puppeteer
- Google GenAI

---

# 📂 Project Structure

```text
JobHunt/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
│
└── Frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── features/
        │   ├── auth/
        │   └── interview/
        ├── components/
        ├── pages/
        ├── App.jsx
        ├── app.routes.jsx
        └── main.jsx
```

---

# ⚙️ Environment Variables

## Backend

Create a `.env` file inside the `Backend` folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
CLIENT_URL=http://localhost:5173
```

## Frontend

Create a `.env` file inside the `Frontend` folder.

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/JobHunt.git
cd JobHunt
```

## 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

## 3. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## 4. Start the Backend

```bash
cd ../Backend
npm run dev
```

Backend will run on:

```text
http://localhost:3000
```

## 5. Start the Frontend

```bash
cd ../Frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# 📌 API Routes

## Authentication

| Method | Endpoint | Description |
| :----: | -------- | ----------- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/logout` | Logout |
| GET | `/api/auth/get-me` | Get current user |

## Interview

| Method | Endpoint | Description |
| :----: | -------- | ----------- |
| POST | `/api/interview/` | Generate interview report |
| GET | `/api/interview/` | Get all reports |
| GET | `/api/interview/report/:interviewId` | Get report by ID |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate AI resume PDF |

---

# 🔄 How It Works

1. User signs up or logs in.
2. Uploads a resume in PDF format.
3. Enters a Job Description and Self Description.
4. Resume text is extracted automatically.
5. The combined input is sent to Google GenAI.
6. AI generates a personalized interview report.
7. The report is stored in MongoDB.
8. Users can revisit previous reports anytime.
9. Users can generate and download an AI-enhanced resume.

---

# 🚀 Deployment

### Frontend

Hosted on **Vercel**

🔗 https://job-hunt-ochre-phi.vercel.app/

### Deployment Checklist

- Configure `VITE_API_BASE_URL` to point to the deployed backend.
- Set `CLIENT_URL` to the deployed frontend URL.
- Enable CORS with credentials.
- Configure production cookie settings.

---

# ⚠️ Important Note

Resume PDF generation currently uses Puppeteer with a fixed Chrome executable path:

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

If Chrome is installed elsewhere, update the executable path in the Puppeteer configuration.

---

# 🚧 Future Improvements

- Better UI validation
- Improved error handling
- Better loading and empty states
- Unit and integration testing
- Docker support
- Root workspace scripts
- Cloud storage for uploaded resumes
- Email notifications
- Resume version history
- Support for multiple AI models

---

# 👨‍💻 Author

**Devam Pandey**

Built with ❤️ using **React, Node.js, MongoDB, and Google GenAI**.

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ on GitHub!**