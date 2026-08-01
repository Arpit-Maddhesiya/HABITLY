<div align="center">


# 🪐 Habitly

**A habit tracker that notices when you're slipping — and tells you what to do about it.**

*MERN stack + Gemini AI: weekly reports, streak-recovery plans, and a chat that actually knows your data.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Coming_Soon-6366f1?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](#-contributing)

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_4-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_AI-8B5CF6?style=flat-square&logo=googlegemini&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

[Overview](#-why-this-isnt-just-another-habit-tracker) •
[Screenshots](#-screenshots) •
[Architecture](#-architecture) •
[Quick Start](#-quick-start) •
[API](#-api-reference) •
[Roadmap](#-roadmap) •
[Contributing](#-contributing)

</div>

---

## 🌅 Why this isn't just another habit tracker

Most habit trackers stop at "did you check the box today." Habitly's backend keeps a real audit trail (`HabitLog` documents, one per completion, uniquely indexed by user + habit + date) and feeds that history to **Gemini** through five purpose-built prompts, each with its own system instruction and personality:

| Feature | What it actually does |
|---|---|
| 🌅 **Morning Motivation** | On login, pulls your active habits and current streaks and generates a short, personal nudge — under 60 words, mentions real habits by name, capped at one emoji so it doesn't feel like spam. |
| 📊 **Weekly AI Report** | Analyzes your last 7 days and writes a 120–180 word plain-prose report: what struggled, what pattern it noticed, one specific piece of encouragement. |
| 🩹 **Streak Recovery Plan** | Break a streak and instead of shame, you get a structured 3-day comeback plan (Day 1 / Day 2 / Day 3, one concrete action each) tailored to the habit you dropped. |
| 💡 **Habit Suggestions** | Describe your goals and get exactly 3 new habits back as structured JSON — name, category, frequency, icon, and *why* — ready to render straight into the UI. |
| 💬 **AI Chat** | Ask questions about your own data ("why did I struggle on Tuesdays?") and get answers grounded only in your logged history. |

All five run through one reusable `chatCompletion()` wrapper around the Gemini API (`backend/utils/aiService.js`), so adding a sixth AI feature means writing a new system prompt, not new plumbing. No `GEMINI_API_KEY`? The app degrades gracefully with a placeholder response instead of crashing.

---

## 📸 Screenshots

> Images below are temporary placeholders (hosted on placehold.co so they render right now). Swap each `src=` for your real screenshot link once you have one — see below.

<table>
<tr>
<td width="50%">
<p align="center"><b>Landing Page</b></p>
<img src="https://placehold.co/640x400/6366f1/ffffff?text=Landing+Page" alt="Landing page">
</td>
<td width="50%">
<p align="center"><b>Dashboard</b></p>
<img src="https://placehold.co/640x400/6366f1/ffffff?text=Dashboard" alt="Dashboard">
</td>
</tr>
<tr>
<td width="50%">
<p align="center"><b>Weekly AI Report</b></p>
<img src="https://placehold.co/640x400/8b5cf6/ffffff?text=Weekly+AI+Report" alt="Weekly AI report">
</td>
<td width="50%">
<p align="center"><b>AI Chat</b></p>
<img src="https://placehold.co/640x400/8b5cf6/ffffff?text=AI+Chat" alt="AI chat">
</td>
</tr>
<tr>
<td width="50%">
<p align="center"><b>Habit Stats / Heatmap</b></p>
<img src="https://placehold.co/640x400/06b6d4/ffffff?text=Stats+%2F+Heatmap" alt="Stats heatmap">
</td>
<td width="50%">
<p align="center"><b>Dark Mode</b></p>
<img src="https://placehold.co/640x400/1e1b4b/ffffff?text=Dark+Mode" alt="Dark mode">
</td>
</tr>
</table>

<details>
<summary><b>How to get a real, working image link from GitHub</b> (click to expand)</summary>

There are two reliable ways to host a screenshot so its link works in a README:

**Method 1 — Drag-and-drop into a GitHub comment (fastest, no repo commit needed)**
1. Go to any issue, PR, or discussion on your repo (or open a new one — you don't have to submit it).
2. Drag your screenshot image directly into the comment text box.
3. GitHub auto-uploads it and inserts a Markdown link like `![image](https://github.com/user-attachments/assets/xxxxxxxx)`.
4. Copy that URL — it works permanently, even if you never submit the comment.
5. Paste it as the `src=` value in the README, replacing the matching `placehold.co` link.

**Method 2 — Commit the file to your repo, then link via raw.githubusercontent.com**
1. Save your screenshot into `docs/screenshots/` (e.g. `docs/screenshots/dashboard.png`) — already created in this repo.
2. `git add docs/screenshots/dashboard.png && git commit -m "Add dashboard screenshot" && git push`
3. On GitHub, open the file and click **Raw** — copy that URL. It looks like:
   `https://raw.githubusercontent.com/Arpit-Maddhesiya/HABITLY/main/docs/screenshots/dashboard.png`
4. Use that as the `src=` value. (A relative path like `docs/screenshots/dashboard.png` also works *once the file is pushed* — GitHub resolves it automatically on the repo's own README page. It just won't render anywhere else, like in this chat preview, which is why it looked broken here.)

</details>

---

## 🏗 Architecture

```
Habitly
├── backend/                     Express API (ESM, MongoDB via Mongoose)
|   |
│   ├── controllers/             auth · habits · logs · ai
|   |
│   ├── models/                  User · Habit · HabitLog · AIInsight
|   |
│   ├── middleware/               JWT auth guard · centralized error handler
|   |
│   ├── utils/aiService.js       Gemini client + 5 system prompts + JSON parser
|   |
│   └── server.js                CORS allow-list, health check, route mounting
│
└── frontend/habit-tracker/      React 19 + Vite + Tailwind 4
    ├── src/pages/               Landing · Login/Register · Dashboard · Habits
    │                             · Weekly · Insights · Stats
    |
    ├── src/components/          20+ components incl. drag-and-drop habit grid,
    │                             heatmap/pie/bar charts (Recharts), animated
    │                             OrbitingHabits landing visual, AI chat panel
    |
    └── src/context/             Auth + Theme (light/dark) providers
```

**Data model worth noting:** `HabitLog` has a compound unique index on `{ userId, habitId, completedDate }` — completions are idempotent at the database level, not just the UI, so double-submits or race conditions can't create duplicate check-ins. `AIInsight` persists every AI generation with a `type` enum (`weekly | suggestion | recovery | chat | morning`), so insights are cached and auditable rather than regenerated and thrown away.

**Frontend stack choices:** React 19, Tailwind 4 (via the `@tailwindcss/vite` plugin, no separate config build step), `@dnd-kit` for drag-to-reorder habits, `react-markdown` for safely rendering AI responses, and `canvas-confetti` for the small dopamine hit on completion.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A MongoDB connection string ([Atlas](https://www.mongodb.com/cloud/atlas) free tier works fine)
- (Optional) A [Gemini API key](https://ai.google.dev/) for the AI features

### Clone

```bash
git clone https://github.com/Arpit-Maddhesiya/HABITLY.git
cd HABITLY
```

### 1. Backend

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
npm run dev      # nodemon, hot reload on http://localhost:8000
npm run seed      # optional: seed sample habits/logs
```

### 2. Frontend

```bash
cd frontend/habit-tracker
npm install
```

Create `frontend/habit-tracker/.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
npm run dev       # http://localhost:5173
```

CORS is already configured to allow any `localhost`/`127.0.0.1` origin in dev, plus whatever's in `CLIENT_URL` for production.

---

## 📡 API Reference

All routes are prefixed `/api` and, except `/auth/register` and `/auth/login`, require `Authorization: Bearer <jwt>`.

<details>
<summary><b>Auth</b></summary>

```
POST   /auth/register
POST   /auth/login
GET    /auth/me
PUT    /auth/profile
```
</details>

<details>
<summary><b>Habits</b></summary>

```
GET    /habits
POST   /habits
PUT    /habits/:id
DELETE /habits/:id
PUT    /habits/:id/archive
PUT    /habits/reorder
```
</details>

<details>
<summary><b>Logs</b></summary>

```
POST   /logs
DELETE /logs
GET    /logs/today
GET    /logs/range
GET    /logs/heatmap
GET    /logs/stats
GET    /logs/stats/:habitId
```
</details>

<details>
<summary><b>AI</b></summary>

```
POST   /ai/weekly-report
POST   /ai/suggest-habits
POST   /ai/recovery-plan
POST   /ai/chat
GET    /ai/morning
```
</details>

```
GET    /health
```

---

## 🗺 Roadmap

- [ ] Email verification
- [ ] Push notifications for daily reminders
- [ ] Calendar integration
- [ ] Social / shared habit groups
- [ ] Offline support (PWA)
- [ ] Live production deployment + demo link

---

## 🤝 Contributing

Contributions are welcome — especially around the AI prompt design in `backend/utils/aiService.js`, the most fun file in the repo to iterate on.

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request. Bug reports and feature ideas are just as welcome as code — open an [issue](https://github.com/Arpit-Maddhesiya/HABITLY/issues).

---


<div align="center">

## 👤 Author

**Arpit Maddhesiya**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Arpit-Maddhesiya)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arpit-maddhesiya/)

If Habitly helped you build a better morning routine — a ⭐ on this repo goes a long way.

</div>
