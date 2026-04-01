# ♻️ EcoRecycle — React + Vite + Tailwind CSS

A full-featured e-waste recycling platform built with **React 18**, **Vite**, and **Tailwind CSS v3**.

---

## 📁 Project Structure

```
ecorecycle/
├── index.html                    # HTML entry point (Google Fonts loaded here)
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config + custom theme (eco colors, fonts)
├── postcss.config.js             # PostCSS (autoprefixer + tailwind)
├── package.json
│
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Root component — routing state + cart/auth logic
    ├── index.css                 # Tailwind base/components/utilities + scrollbar styles
    │
    ├── data/
    │   └── index.js              # CATEGORIES, BRANDS, MODELS, STEPS static data
    │
    ├── utils/
    │   ├── api.js                # HTTP helpers for Spring Boot REST API
    │   └── pricing.js            # calcPrice() + getConditionLabel() functions
    │
    ├── hooks/                    # (ready for custom hooks e.g. useLocalStorage)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx        # Sticky navbar with auth dropdown + mobile menu
    │   │   └── Footer.jsx        # Simple dark footer
    │   │
    │   └── ui/
    │       ├── ImgF.jsx          # Image with graceful emoji/JSX fallback
    │       ├── Breadcrumb.jsx    # Breadcrumb navigation bar
    │       ├── PageHeader.jsx    # Reusable gradient hero header
    │       ├── CartModal.jsx     # Slide-up cart drawer modal
    │       └── AuthModal.jsx     # Login / Signup modal with dev fallback
    │
    └── pages/
        ├── HomePage.jsx          # Hero + category cards + features + CTA
        ├── AboutPage.jsx         # Company info + project info + tech stack
        ├── ProcessPage.jsx       # 4-step recycling process + impact stats
        ├── CompaniesPage.jsx     # Brand grid (BrandCard)
        ├── ModelsPage.jsx        # Model series list (ModelCard)
        ├── VariantsPage.jsx      # Variant picker
        ├── DetailsPage.jsx       # Device condition form (RAM, Storage, Battery...)
        └── EstimatePage.jsx      # Price result + Add to Cart
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production

```bash
npm run build
```

---

## 🖼️ Adding Images

Place your images in the `public/` folder:

```
public/
├── images/
│   ├── logo.png
│   ├── about-hero.jpg
│   ├── about-project.jpg
│   ├── categories/
│   │   ├── mobile.png
│   │   ├── laptop.png
│   │   └── tablet.png
│   ├── brands/
│   │   ├── apple.png
│   │   ├── samsung.png
│   │   └── ...
│   └── process/
│       ├── collect.jpg
│       ├── sort.jpg
│       ├── recycle.jpg
│       └── dispose.jpg
```

> All images have emoji fallbacks — the app works without any images.

---

## ⚙️ Backend API

Set your Spring Boot API base URL in `src/utils/api.js`:

```js
const API_BASE = 'http://localhost:8080/api'
```

### Endpoints used:
| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| POST   | `/auth/login`     | Login → `{ token, user }` |
| POST   | `/auth/register`  | Signup → `{ token, user }` |
| GET    | `/cart`           | Get cart items          |
| POST   | `/cart`           | Add cart item           |
| DELETE | `/cart/:id`       | Remove cart item        |

> Auth uses Bearer JWT tokens. If the backend is unreachable, a dev fallback is used automatically.

---

## 🎨 Custom Tailwind Theme

| Token              | Value        |
|--------------------|--------------|
| `font-poppins`     | Poppins      |
| `font-inter`       | Inter        |
| `font-montserrat`  | Montserrat   |
| `eco-50` → `eco-900` | Emerald green scale |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **Spring Boot** (backend) — REST API + JWT auth + MySQL
