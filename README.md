# Al-Cazar Fort — Hotel Website

Luxury hotel website for Al-Cazar Fort, Naran, Pakistan.

## Stack
- **Frontend:** React 19, React Router 7, Sonner toasts, Lucide icons
- **Backend:** FastAPI + MongoDB (optional — only used by Contact form)
- **Booking flow:** WhatsApp (no backend needed)

## Deploying the Frontend to Vercel

The repository is pre-configured. On Vercel:

1. Import the GitHub repo.
2. Vercel will auto-detect everything from `vercel.json` — just click **Deploy**.
3. Done. All pages (Home, Rooms, Restaurant, Gallery, Contact, etc.) will work, including WhatsApp booking.

## Vercel Settings (auto-detected)
- **Root Directory:** repository root
- **Build Command:** `cd frontend && yarn install --frozen-lockfile && yarn build`
- **Output Directory:** `frontend/build`
- **Framework:** None (custom)

## What works without a backend?
- All pages and navigation
- Hero slider, gallery, lightbox
- Room listing, room details, category filter
- Every Book / Reserve / Check Availability button → redirects to WhatsApp (+923492244011) with pre-filled details
- Contact info, map, social links
- WhatsApp floating button

## Optional: deploy the backend
If you want the Contact form "Send Message" to save to a database, deploy the
FastAPI backend on Railway, Render, or any Python host, then add this env var
on Vercel:

- `REACT_APP_BACKEND_URL` = your backend URL (e.g. `https://api.yourdomain.com`)

Redeploy after adding the variable.
