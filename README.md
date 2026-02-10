# PSR Customs - Car Detailing Studio Website

A full-stack MERN (MongoDB, Express, React, Node.js) website for PSR Customs, a premium car detailing and customization studio. Built for car and bike owners.

![PSR Customs](https://img.shields.io/badge/MERN-Stack-green) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

---

## Features

- **Frontend (React)**
  - Home, Services, Booking, Gallery, About, Contact pages
  - Dark theme, premium automotive-style UI
  - Admin Panel (protected routes)
  - Tailwind CSS, React Router

- **Backend (Express)**
  - REST API
  - JWT authentication (Admin only)
  - MongoDB with Mongoose
  - Models: User, Booking, Service

- **Services Offered**
  - Ceramic Coating
  - Paint Protection Film (PPF)
  - Car Washing & Detailing
  - Interior Cleaning
  - Scratch & Paint Correction

---

## Project Structure

```
psr-customs/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── server/                 # Express backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   └── index.js
├── API_DOCUMENTATION.md
└── README.md
```

---

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

---

## Setup Instructions

### 1. Clone or navigate to the project

```bash
cd "Cursor Ai"
```

### 2. Install dependencies

```bash
# Install root + server + client dependencies
npm run install-all

# OR manually:
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Environment Setup

**Backend (server/.env)**

Copy `server/.env.example` to `server/.env` or create `server/.env`:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/psr-customs
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**MongoDB:** 
- Use local MongoDB: `mongodb://localhost:27017/psr-customs`
- Or MongoDB Atlas: `mongodb+srv://user:pass@cluster.mongodb.net/psr-customs`

**Frontend (client/):**
- The client uses `proxy: "http://localhost:5001"` in package.json for development.
- For production, set `REACT_APP_API_URL` to your API domain.

### 4. Seed the database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@psrcustoms.com` / `admin123`
- Sample services (Ceramic Coating, PPF, Car Washing, etc.)

### 5. Run the application

**Option A: Run both (server + client) concurrently**

```bash
# From project root
npm run dev
```

**Option B: Run separately**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

- **Backend:** http://localhost:5001
- **Frontend:** http://localhost:3001

---

## Run Commands Summary

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install all dependencies |
| `npm run dev` | Run backend + frontend (concurrent) |
| `cd server && npm run dev` | Run backend only |
| `cd client && npm start` | Run frontend only |
| `cd server && npm run seed` | Seed database with admin + services |

---

## Default Admin Credentials

- **Email:** admin@psrcustoms.com
- **Password:** admin123

**Important:** Change these in production.

---

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for full API reference.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator |

---

## Deployment Notes

1. **Backend:** Deploy to Railway, Render, Heroku, or VPS.
2. **Frontend:** Build with `npm run build` and deploy to Vercel, Netlify, or static hosting.
3. **Environment:** Set `MONGODB_URI`, `JWT_SECRET`, and `REACT_APP_API_URL` (API base URL).
4. **CORS:** Update CORS settings in `server/index.js` if needed.
5. **Admin:** Change default admin password after first login.

---

## License

MIT

---

Built with ❤️ for PSR Customs - Premium Car Detailing & Customization
