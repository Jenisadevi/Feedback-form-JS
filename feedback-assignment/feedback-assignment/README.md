# Fresher Full-Stack Assignment - Simple Feedback Form

## Overview
This is a small full-stack project (React frontend + Node.js/Express backend) implementing a simple feedback form and a feedback list. The backend stores feedback in-memory (suitable for an entry-level take-home assignment).

## Structure
```
feedback-assignment/
  README.md
  backend/
    package.json
    index.js
  frontend/
    package.json
    index.html
    src/
      main.jsx
      App.jsx
      styles.css
  screenshots/
    submission-form.png
    feedback-list.png
```

## Setup & Run (two terminals)

### Backend
```bash
cd backend
npm install
npm start
# Server runs at http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Vite dev server runs (usually at http://localhost:5173)
# Open the URL shown by vite in the browser.
```

## APIs

- `POST /feedback` - submit feedback
  - Body JSON: `{ "name": "Your name", "message": "Your feedback" }`
  - Returns 201 with the saved feedback object.

- `GET /feedback` - list feedback
  - Returns array of feedback objects sorted by newest first.

## Approach (short)
- Backend: Node.js + Express, in-memory array for storing feedback (simple to run and verify).
- Frontend: React (hooks) + Vite. Simple form with controlled inputs, POST to submit, GET to refresh list.
- No DB required (fits the time expectation). Easy to extend to SQLite if needed.

## Notes for evaluation
- The frontend expects the backend at `http://localhost:4000`. If you run the backend on another host/port, update the fetch URLs in `src/App.jsx`.
- For production or persistence, replace the in-memory store with a database (SQLite, etc.).

## Screenshots
Screenshots included in `screenshots/` are simple placeholders demonstrating expected UI.
