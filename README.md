# AINAI – عَيِّناي ✨

**"See yourself differently"**  
A modern, culturally-aware Virtual Try-On (VTON) fashion platform built for the MENA region.

![AINAI Banner](https://via.placeholder.com/800x300/8B4852/D4AF7A?text=AINAI+%E2%80%93+See+Yourself+Differently)

## 🎯 What is AINAI?

AINAI (عَيِّناي) lets you **upload your photo** and instantly see how clothes look on _your_ body — before you buy.

No more guessing. No more high return rates. Just real, confident shopping with modesty-aware visualization tailored for MENA styles (abayas, thobes, modest fashion, etc.).

This repository contains the **complete frontend** — built from scratch in **exactly 3 weeks** while I was learning React.

## ✨ Live Demo

(Coming soon – deployed on Vercel)

## 🚀 Features (MVP – Built in 3 Weeks)

- ✅ User Registration & Login (email + Google/Apple ready)
- ✅ Product browsing with search, filters & infinite scroll
- ✅ Fully functional shopping cart with real-time totals
- ✅ Virtual Try-On experience (photo upload + mock AI overlay)
- ✅ Try-On history & download results
- ✅ Beautiful luxury brand design (Deep Burgundy + Soft Gold + Warm Ivory)
- ✅ Fully responsive (mobile-first)

## 🛠 Tech Stack (Beginner-Friendly)

- **React 18** + Vite
- **React Router v6**
- **Vanilla CSS** (CSS Modules + CSS variables)
- **React Hook Form + Zod** (validation)
- **Lucide React** (icons)
- **browser-image-compression** (client-side image handling)
- No heavy libraries — pure React + Context API

## 📚 My 3-Week Learning Journey

I built this entire app while following the **Scrimba React course** (20 modules, 6 capstone projects).

- **Week 1**: Finished Sections 1–3 → Authentication system
- **Week 2**: Finished Sections 4–5 → Browse + Cart
- **Week 3**: Finished Section 6 (Assembly: Endgame) → Full Virtual Try-On flow

Every single feature was coded **right after** learning the concept in the course.  
This is my first big React project — from zero to deployed MVP in 21 days.

## 📁 Project Structure

```bash
src/
├── components/     # common, auth, browse, cart, vton
├── context/        # AuthContext
├── pages/          # Home, Browse, TryOnHistory...
├── styles/         # globals.css + CSS Modules
├── utils/          # fakeData, imageCompression...
└── App.jsx
```

## 🛠 How to Run Locally

####bash
git clone https://github.com/yourusername/ainai-frontend.git
cd ainai-frontend
npm install
npm run dev

Open [http://localhost:5173](http://localhost:5173)

## 🎯 What's Next?

- Connect real Flux-based VTON API
- Add Virtual Wardrobe
- Arabic + RTL support
- Real AI outfit recommendations

## 🙌 Built With

- Scrimba React Course (highly recommended!)
- Pure determination & daily coding

---

**Made with ❤️ while learning React**  
_Started as a learning project — ended as a real portfolio piece._

---

**Star this repo** if you're also learning React and want to see more learning-journey projects! ⭐

---

_Last updated: February 2026_

```



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
```
