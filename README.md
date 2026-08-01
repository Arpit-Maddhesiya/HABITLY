# 🪐 Habitly
 
**A habit tracker that actually notices when you're slipping — and tells you what to do about it.**
 
Habitly is a full-stack MERN app for building habits, but the interesting part isn't the checkbox grid — it's the AI layer sitting on top of it. Instead of a static "streak: 12 days" counter, Habitly reads your real completion history and turns it into a coach: a weekly report written about *your* habits, a 3-day recovery plan the moment you break a streak, and a chat you can interrogate about your own data.
 
<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-6366f1?style=for-the-badge">
  <img src="https://img.shields.io/badge/React_19-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-Express_4-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Gemini-AI-8b5cf6?style=for-the-badge&logo=googlegemini&logoColor=white">
</p>
---
 
## Why this isn't just another habit tracker
 
Most habit trackers stop at "did you check the box today." Habitly's backend keeps a real audit trail (`HabitLog` documents, one per completion, uniquely indexed by user + habit + date) and feeds that history to Gemini through five purpose-built prompts, each with its own system instruction and personality:
 
| Feature | What it actually does |
|---|---|
| 🌅 **Morning Motivation** | On login, pulls your active habits and current streaks and generates a short, personal nudge — under 60 words, mentions real habits by name, capped at one emoji so it doesn't feel like spam. |
| 📊 **Weekly AI Report** | Analyzes your last 7 days and writes a 120–180 word plain-prose report: what struggled, what pattern it noticed, one specific piece of encouragement. No generic "great job!" filler. |
| 🩹 **Streak Recovery Plan** | Break a streak and instead of shame, you get a structured 3-day comeback plan (Day 1 / Day 2 / Day 3, one concrete action each) tailored to the habit you actually dropped. |
| 💡 **Habit Suggestions** | Describe your goals and it returns exactly 3 new habits as structured JSON — name, category, frequency, icon, and *why* it picked them — ready to render straight into the UI. |
| 💬 **AI Chat** | Ask questions about your own data ("why did I struggle on Tuesdays?") and get answers grounded only in your logged history — no hallucinated advice. |
 
All five run through one small, reusable `chatCompletion()` wrapper around the Gemini API, so adding a sixth AI feature is a matter of writing a new system prompt, not new plumbing. If `GEMINI_API_KEY` isn't set, the app degrades gracefully with a placeholder response instead of crashing — worth knowing if you're cloning this to hack on the non-AI parts first.
 
---
 
## Architecture at a glance
 
```
Habitly
├── backend/                     Express API (ESM, MongoDB via Mongoose)
│   ├── controllers/             auth · habits · logs · ai
│   ├── models/                  User · Habit · HabitLog · AIInsight
│   ├── middleware/               JWT auth guard · centralized error handler
│   ├── utils/aiService.js       Gemini client + 5 system prompts + JSON parser
│   └── server.js                CORS allow-list, health check, route mounting
│
└── frontend/habit-tracker/      React 19 + Vite + Tailwind 4
    ├── src/pages/               Landing · Login/Register · Dashboard · Habits
    │                             · Weekly · Insights · Stats
    ├── src/components/          20+ components incl. drag-and-drop habit grid,
    │                             heatmap/pie/bar charts (Recharts), animated
    │                             OrbitingHabits landing visual, AI chat panel
    └── src/context/             Auth + Theme (light/dark) providers
```
 
**Data model worth noting:** `HabitLog` has a compound unique index on `{ userId, habitId, completedDate }` — completions are idempotent at the database level, not just the UI, so double-submits or race conditions can't create duplicate check-ins. `AIInsight` persists every AI generation with a `type` enum (`weekly | suggestion | recovery | chat | morning`), so insights are cached and auditable rather than regenerated and thrown away.
 
**Frontend stack choices:** React 19, Tailwind 4 (via the new `@tailwindcss/vite` plugin, no separate config build step), `@dnd-kit` for drag-to-reorder habits, `react-markdown` for rendering AI responses safely, and `canvas-confetti` for the small dopamine hit when you complete a habit.
 
---
 
## Quick start
 
```bash
git clone https://github.com/Arpit-Maddhesiya/HABITLY.git
cd HABITLY
```
 
### Backend
 
```bash
cd backend
npm install
```
 
Create `backend/.env`:
 
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key      # optional — AI routes degrade gracefully without it
GEMINI_MODEL=models/gemini-flash-latest # optional override
```
 
```bash
npm run dev      # nodemon, hot reload
npm run seed      # optional: seed sample habits/logs
```
 
### Frontend
 
```bash
cd frontend/habit-tracker
npm install
```
 
Create `frontend/habit-tracker/.env`:
 
```env
VITE_API_URL=http://localhost:8000/api
```
 
```bash
npm run dev
```
 
Visit `http://localhost:5173`. CORS is already configured to allow any `localhost`/`127.0.0.1` origin in dev, plus whatever's in `CLIENT_URL` for production.
 
---
 
## API surface
 
All routes below are prefixed `/api` and, except `/auth/register` and `/auth/login`, require `Authorization: Bearer <jwt>`.
 
```
POST   /auth/register            /auth/login          GET /auth/me         PUT /auth/profile
 
GET    /habits                   POST /habits          PUT /habits/:id
DELETE /habits/:id                PUT /habits/:id/archive       PUT /habits/reorder
 
POST   /logs                     DELETE /logs           GET /logs/today
GET    /logs/range               GET /logs/heatmap       GET /logs/stats       GET /logs/stats/:habitId
 
POST   /ai/weekly-report          POST /ai/suggest-habits
POST   /ai/recovery-plan          POST /ai/chat          GET /ai/morning
 
GET    /health
```
 
---
 
## Roadmap
 
- [ ] Email verification
- [ ] Push notifications for daily reminders
- [ ] Calendar integration
- [ ] Social/shared habit groups
- [ ] Offline support (PWA)
---
 
## Contributing
 
```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```
 
Then open a PR. Issues and ideas welcome, especially around the AI prompt design in `backend/utils/aiService.js` — it's the most fun file in the repo to iterate on.
 
---
 
## Author
 
**Arpit Maddhesiya**
[GitHub](https://github.com/Arpit-Maddhesiya) · [LinkedIn](https://www.linkedin.com/in/arpit-maddhesiya/)
 
If Habitly helped you build a better morning routine (or just a better README template), a ⭐ on GitHub goes a long way.