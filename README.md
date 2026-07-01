# AI-Powered Resume Analyzer

A full-stack web application that uses Google's Gemini AI to analyze uploaded resumes (PDFs) and provide a score, extracted skills, and constructive feedback.

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS, Axios
*   **Backend:** Node.js, Express, Multer, pdf-parse
*   **Database:** MongoDB Atlas
*   **AI:** Google Gemini API (`@google/generative-ai`)

## Project Structure

ai-resume-analyzer/
├── backend/       # Express server and MongoDB models
└── frontend/      # React client app