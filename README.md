# Sazzad Hossen — Personal Portfolio Website

A personal portfolio website for **Sazzad Hossen**, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **JSON Server**.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Vector Brand Icons
- **Animation & Transitions**: CSS transitions + [Framer Motion](https://www.framer.com/motion/)
- **Local Mock API**: [JSON Server 0.17.3](https://github.com/typicode/json-server)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🎨 Design System

- **Color Palette**:
  - **Primary**: Purple `#8B5CF6` (dominates accents, borders, gradients)
  - **Secondary**: Green `#22C55E` (highlights, hover states, status pills)
  - **Dark Background**: `#080D12`
  - **Light Background**: `#F8FAFC`
- **Theme**: Dark and Light themes with persistent toggle saved in `localStorage`.
- **Aesthetic**: Modern glassmorphism, responsive cards, clean typography, accessible design.

---

## 🛠️ Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` (already configured by default for local development):
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### 3. Start JSON Server (Port 3001)
In one terminal window:
```bash
npm run server-json
```

### 4. Start Next.js Development Server (Port 3000)
In a second terminal window:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints

### Local JSON Server (`http://localhost:3001`) & Vercel App Router (`/api/*`)
Both environments expose identical REST endpoints from `db.json`:

| Resource | Local Endpoint | Next.js / Production Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Profile** | `GET /profile` | `GET /api/profile` | Profile info, bio, email, social links |
| **Projects** | `GET /projects` | `GET /api/projects` | All project showcases |
| **Project Details** | `GET /projects/:id` | `GET /api/projects/:id` | Individual project by ID |
| **Skills** | `GET /skills` | `GET /api/skills` | Technical skills with category & proficiency |
| **Experience** | `GET /experience` | `GET /api/experience` | Career history (empty array `[]`) |
| **Education** | `GET /education` | `GET /api/education` | Academic background (empty array `[]`) |
| **Socials** | `GET /socials` | `GET /api/socials` | Social profile links & icons |

---

## 🖼️ Image Management

All project screenshots and portraits live in `public/images/`:
- **Hero portrait/illustration**: `/images/hero.png`
- **Web Development Project**: `/images/devstack.png`
- **FitLog**: `/images/fitlog.png`
- **Market Price**: `/images/market-price.jpg`

### Adding a New Project:
1. Save your screenshot inside `public/images/` (e.g. `public/images/my-new-app.png`).
2. Open `db.json` and add an object inside `"projects"`:
   ```json
   {
     "id": 4,
     "title": "My New App",
     "description": "A description of the new web application.",
     "image": "/images/my-new-app.png",
     "technologies": ["React", "Next.js", "Tailwind CSS"],
     "category": "Web Application",
     "liveUrl": "https://my-app.vercel.app",
     "githubUrl": "https://github.com/sazzad-hossen9/my-app",
     "featured": true
   }
   ```
3. Save `db.json`. In local development, JSON Server will hot-reload immediately. In production, redeploy to update!

---

## 🌐 Deploying to Vercel

The portfolio is architected for zero-configuration, production-ready deployment on Vercel:

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "Complete portfolio implementation with Next.js, Tailwind, and App Router API"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [Vercel](https://vercel.com/) and click **Add New Project**.
   - Select your GitHub repository: `sazzad-hossen9/my-portfolio`.
   - Next.js is automatically detected with build command `next build`.
   - **Environment Variables**: Leave `NEXT_PUBLIC_API_BASE_URL` empty or set to `/api`. In production, the unified data layer directly reads the bundled `db.json` and uses the native `/api/*` App Router handlers without any dependency on `localhost:3001`!
   - Click **Deploy**.

3. **Updating Published Content**:
   Whenever you edit `db.json` or add new images in `public/images/`, commit and push to GitHub. Vercel will automatically rebuild and publish the changes within seconds!

---

## 🧪 Testing and Verification

- **Lint check**: `npm run lint` (ESLint 9 — 0 errors, 0 warnings)
- **Production build**: `npm run build` (Turbopack + Next.js App Router — builds cleanly)
- **JSON Server**: `npm run server-json` (Watches `db.json` on port 3001)
