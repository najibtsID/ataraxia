# Ataraxia — Landing Page (Vite + React)

**Ataraxia** is a simple landing page for a coffee brand that displays products from Contentful, follows the AIDA framework (Attention, Interest, Desire, Action), and integrates WhatsApp for ordering.

---

## ⚡ Key Features

- AIDA-based sections: Hero, Why, Product List (slider), CTA, Social Proof.
- Products fetched from Contentful (fields: name, description, price, category, image, featured).
- Product descriptions preserve formatting (bold/italic) from Contentful Rich Text.
- Centered **“Full Info”** modal rendered via React Portal (not clipped by layout).
- Local image fallback order: Contentful image → `public/products/{index}.png` → `src/assets/product-placeholder.svg`.
- WhatsApp CTA using number from env variable: `VITE_WHATSAPP_NUMBER`.

---

## 🚀 Quick Start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
# open http://localhost:5173
```

3. Build & preview

```bash
npm run build
npm run preview
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
VITE_WHATSAPP_NUMBER=6281234567890
# (optional) CONTENTFUL_SPACE_ID=...
# (optional) CONTENTFUL_ACCESS_TOKEN=...
```

> Note: Contentful variables are optional and only required for live fetching.

---

## 🧭 Contentful (CMS)

Product content is fetched from Contentful. Make sure your content model includes the following fields:

- `name` (Text)
- `description` (Rich Text)
- `price` (Number or Text)
- `category` (Text)
- `image` (Asset, optional)
- `featured` (Boolean)

If Contentful is not configured, the application will still work using local fallback images located in `public/products/`.

---

## 🗂️ Project Structure (Brief)

- `src/`
  - `components/` — React components: `Hero`, `Why`, `ProductList`, `ProductModal`, `CTA`, `SocialProof`
  - `hooks/` — custom hooks (`useInView`)
  - `assets/` — local placeholders/icons
  - `styles.css` — global styles
  - `contentfulClient.js` — (optional) Contentful fetch helper

- `public/`
  - `images/coffee-logo.png` — (upload) hero logo PNG
  - `products/1.png`..`N.png` — fallback product images

---

## 🛠️ Tips & Maintenance

- Code formatting: add Prettier + ESLint for consistent code style.
- Styling: if `styles.css` grows too large, split it into partials under `src/styles/`.
- Testing: consider visual testing for the modal and product slider.

---

## 🧾 Uploading Assets

- Upload `coffee-logo.png` to `public/images/` to replace the placeholder logo.
- Place product images (`1.png`, `2.png`, etc.) in `public/products/` to enable local fallbacks.

---

## ❗ Troubleshooting

- **Modal is clipped or not centered**: this is handled via React Portal (`ProductModal` is rendered into `document.body`). If issues persist, clear browser cache and disable layout-modifying extensions.
- **Images not showing**: check DevTools console for missing `/products/1.png` paths or failed network requests.

---

## 📄 License & Notes

This project is provided as a landing page scaffold. You are free to modify and adapt it to your needs.

---
