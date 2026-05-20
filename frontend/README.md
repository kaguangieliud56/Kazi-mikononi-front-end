# Kazi Mikononi — Frontend

A local job marketplace connecting clients with skilled workers across Kenya.
Built with React, Vite, and Tailwind CSS.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`

### Environment Variables

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── common/         # Navbar, Footer, ProtectedRoute
├── context/            # Global state (Auth, Jobs, Chat)
├── pages/              # One folder per page/route
├── services/           # All API calls (axios)
└── index.css           # Tailwind + custom animations
```

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with search and categories |
| `/login` | Login | Sign in to your account |
| `/register` | Register | Create a worker or client account |
| `/dashboard` | Dashboard | Overview of your jobs and stats |
| `/jobs` | Jobs | Browse available job listings |
| `/workers` | Workers | Find skilled professionals |
| `/post-job` | PostJob | Create a new job listing |
| `/profile` | Profile | Manage your worker profile |
| `/chat` | Chat | Message other users |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Dev server & build tool |
| React Router v7 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Axios | HTTP requests |
| Lucide React | Icons |

---

## 🔐 Authentication

- JWT tokens are stored in `localStorage` under the key `kazi_token`
- Tokens are automatically attached to every API request via an Axios interceptor
- A 401 response from the server clears the token and redirects to `/login`

---

## ⚠️ Current Limitations

- Login and Register forms are in **demo mode** (no real API call yet)
- Search and filter inputs are **UI-only** — logic not yet connected
- Photo upload UI exists but **file handling not implemented**
- `ProtectedRoute` component is built but **not yet applied** to routes

---

## 📦 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 👥 Authors

- **Sydney Munene**
- **Emmanuel Kaguangi**

Built as part of the Kazi Mikononi Project.
