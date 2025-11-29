# E-Commerce Single Product (Tech AI Prompt Bundle)

## Quick Start
1. Buat akun MongoDB Atlas gratis (mongodb.com/atlas): Copy connection string ke backend/.env.
2. Backend: cd backend && npm init -y && npm i express mongoose cors jsonwebtoken bcryptjs dotenv stripe && npm start (port 5000).
3. Frontend: cd frontend && npm create vite@latest . -- --template react && npm i react-router-dom axios react-i18next i18next i18next-browser-languagedetector tailwindcss postcss autoprefixer @tailwindcss/forms && npx tailwindcss init -p && npm run dev (port 5173).
4. Env: Di backend/.env: MONGODB_URI=your_atlas_uri, JWT_SECRET=rahasia123, STRIPE_PUBLISHABLE_KEY=pk_test_..., STRIPE_SECRET_KEY=sk_test_... (dari stripe.com).
5. Test: Buka localhost:5173, beli produk, cek admin di /admin (login: admin@test.com / pass123 – register dulu via /register).
6. Deploy: Frontend ke Vercel (connect GitHub), Backend ke Render.com (free tier).

## Fitur
- Homepage: Showcase 1 produk, switch lang EN/ID.
- Checkout: Form alamat, simulasi payment, order ke DB.
- Admin: Lihat daftar orders (tabel responsive).
- Auth: Register/login JWT.
- Responsive: Tailwind, mobile-first.

Bug? DM aja!