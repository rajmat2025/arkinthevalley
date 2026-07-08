# Ark in the Valley — Website

Modern, responsive marketing site for **Ark in the Valley**, a 72-unit apartment community at 774 SH 19, Huntsville, TX 77320.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

Get a free access key at [web3forms.com](https://web3forms.com). The contact form uses this key to deliver lead submissions via email.

## Updating Content

All editable site data lives in **`src/data/apartmentData.json`**:

- Promotions banner (toggle, text, expiry)
- Community contact info (phone, email, office hours)
- Floor plans (rent, availability, features)
- Gallery images
- FAQs

Update the JSON file — no code changes needed for most content updates.

## Property Photos

Drop real property photos into `public/images/` (or run `node scripts/download-images.mjs` to pull current images from arkinthevalley.com):

| Path | Purpose |
|------|---------|
| `public/images/hero/building-exterior.jpg` | Hero background |
| `public/images/gallery/exterior-01.jpg` | Building exterior |
| `public/images/gallery/exterior-02.jpg` | Community building view |
| `public/images/gallery/entry-01.jpg` | Apartment entry |
| `public/images/gallery/kitchen-01.jpg` | Kitchen |
| `public/images/gallery/interior-01.jpg` | Living space |
| `public/images/floorplans/1bed.jpg` | 1 bed floor plan |
| `public/images/floorplans/2bed.jpg` | 2 bed floor plan |

**Important:** Use only real photos of the property for gallery and floor plan sections. Placeholders are shown until real images are added.

Replace placeholder values in `apartmentData.json`:

- `REPLACE_WITH_REAL_PHONE`
- `REPLACE_WITH_REAL_EMAIL`
- `REPLACE_WITH_REAL_HOURS`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/       # UI sections (Navbar, Hero, FloorPlans, etc.)
├── data/             # apartmentData.json — single source of truth
├── lib/              # Utilities (promotions, motion helpers)
└── types/            # TypeScript interfaces
public/
└── images/           # Property photos (gallery, floor plans)
```

## Deployment

### Hostinger (GitHub → Node.js app)

See **`deploy/HOSTINGER.md`** for hPanel settings (same pattern as tree.nuancedor.com).

Quick settings:

| Setting | Value |
|---------|--------|
| Repo | `rajmat2025/arkinthevalley` / `main` |
| Install | `npm install` |
| Build | `npm run build` |
| Start | `node server.js` |
| Node | 20.x |

Set `NEXT_PUBLIC_WEB3FORMS_KEY` in hPanel before deploy. See `deploy/hostinger-hpanel.env.example`.

### Other hosts

Build and deploy to Vercel, Netlify, or any Node.js host:

```bash
npm run build
```

Set `NEXT_PUBLIC_WEB3FORMS_KEY` in your hosting provider's environment variables.
