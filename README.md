# 🖼️ Image → PDF Converter (Full-Stack)

Convert multiple images (PNG/JPG) into a single PDF—fast, clean, and production-ready.

[![React](https://img.shields.io/badge/FE-React-61DAFB?logo=react&logoColor=000&labelColor=fff)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/CSS-Tailwind%20v4-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/BE-Node.js-339933?logo=nodedotjs&logoColor=fff)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=fff)](https://expressjs.com/)
[![Multer](https://img.shields.io/badge/Uploads-Multer-FF6A00)](https://github.com/expressjs/multer)
[![PDFKit](https://img.shields.io/badge/PDF-PDFKit-44546A)](https://pdfkit.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#-license)

---

## ✨ Features

- Upload up to **10 images** (PNG/JPG), **10MB each**
- **Drag & drop** upload zone with live highlight
- Client-side **validation** (type / size / count), remove items, clear all
- Server merges images into **one PDF** and returns a **download URL**
- Polished UI (card, alerts, progress), accessible controls
- Easy deploy: FE → Vercel/Netlify, BE → Render/Railway

---

## 🗂️ Monorepo Structure

```
image-to-pdf-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── controllers/convertController.js
│   │   ├── routes/convertRoutes.js
│   │   ├── utils/pdfGenerator.js
│   │   ├── middlewares/errorHandler.js
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/            # temp uploads (gitignored)
│   ├── output/             # generated PDFs (gitignored, served statically)
│   ├── .env                # PORT=3000
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css       # Tailwind v4 directives
    ├── index.html
    ├── .env                # VITE_API_BASE=http://localhost:3000
    └── package.json
```

---

## ⚙️ Setup (Local)

### 1) Backend (Node/Express)

**`backend/.env`**
```env
PORT=3000
```

**Scripts (`backend/package.json`)**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

Run:
```bash
cd backend && npm install && npm run dev
```

Health check:
```
GET http://localhost:3000/api/health  ->  { "status": "ok" }
```

---

### 2) Frontend (React + Vite + Tailwind v4)

**`frontend/.env`**
```env
VITE_API_BASE=http://localhost:3000
```

**`frontend/src/index.css`** (Tailwind v4)
```css
@import "tailwindcss";
@source "./index.html";
@source "./src/**/*.{js,jsx,ts,tsx}";
@layer base, components, utilities;

/* optional global tweak */
body { @apply bg-gray-50 text-gray-900; }
```

Run:
```bash
cd frontend && npm install && npm run dev
```

Open the app:
```
http://localhost:5173
```

> Keep `import './index.css'` in `src/main.jsx`.

---

## 🔌 API Reference

### GET `/api/health`
Check service status.
```json
{ "status": "ok" }
```

### POST `/api/convert`
Merge uploaded images into a single PDF.

**Headers**
```
Content-Type: multipart/form-data
```

**Body**
- `images` — multiple files (PNG/JPG)

**200 OK**
```json
{
  "message": "PDF created successfully",
  "downloadUrl": "/output/converted-1731342342342.pdf"
}
```

Open the PDF at:
```
GET http://<API_HOST>/output/<filename>.pdf
```

**Errors**
- `400` — no files / invalid type / file too large
- `500` — server error

---

## 🧠 Limits & Validation

- **Max files:** 10  
- **Max size:** 10MB per file  
- **Types:** images (`image/*`) → PNG/JPG recommended

Adjust limits:
- Frontend: `MAX_FILES`, `MAX_SIZE_BYTES` (in `App.jsx` if you used the enhanced UI)
- Backend: `multer` limits (in `src/routes/convertRoutes.js`)

---

## 🚀 Deployment

### Backend (Render / Railway)
- Listen on `process.env.PORT`
- Serve static PDFs:
```js
// in backend/src/app.js
const path = require('path');
app.use('/output', express.static(path.join(__dirname, '..', 'output')));
```

### Frontend (Vercel / Netlify)
- Set `VITE_API_BASE` to your deployed backend URL
- Rebuild and redeploy

Update with live links:
- **Frontend:** https://your-frontend.vercel.app  
- **API Base:** https://your-backend.onrender.com

---

## 🧪 Quick Test (cURL)

```bash
curl -F "images=@/path/to/one.jpg" \
     -F "images=@/path/to/two.png" \
     http://localhost:3000/api/convert
```

Expected:
```json
{ "message":"PDF created successfully", "downloadUrl":"/output/converted-*.pdf" }
```

---

## 🧰 Troubleshooting

- **Tailwind styles missing**
  - Ensure `index.css` includes Tailwind v4 directives above
  - Keep `import './index.css'` in `src/main.jsx`
  - Clear Vite cache: delete `frontend/node_modules/.vite` and restart

- **CORS error in frontend**
  - Confirm `app.use(require('cors')())` is enabled in `backend/src/app.js`
  - Check `VITE_API_BASE` points to the backend

- **“could not determine executable to run”**
  - Update Node/npm; reinstall Tailwind packages if needed

- **PDF 404**
  - Ensure backend serves `/output` statically and the file exists

---

## 🛣️ Roadmap (Optional Enhancements)

- JWT auth for `/api/convert`
- Rate limiting (`express-rate-limit`)
- Thumbnails & drag-to-reorder on the frontend
- Background jobs (BullMQ) for heavy conversions
- Observability (Pino, Sentry)
- Dockerfiles for FE/BE

---

## 🖼️ Screenshots

_Add images to `/screenshots` and reference them:_
```md
![Uploader](./screenshots/home.png)
![Success](./screenshots/success.png)
```

---

## 📄 License

MIT — feel free to use and adapt. If this repo helped you, a ⭐ would be amazing!
