# Deploy on Hostinger Node.js (GitHub)

Same flow as `panachickal_tree` / tree.nuancedor.com: connect GitHub, build on Hostinger, run the generated `server.js`.

| Item | Value |
|------|--------|
| **Git repo** | `rajmat2025/arkinthevalley` → branch **`main`** |
| **Framework** | Next.js 15 (App Router) |
| **Database** | None required |

---

## Hostinger hPanel — Node.js + Git

1. **Websites** → **Add Website** → **Node.js Apps**
2. **Import Git Repository** → connect GitHub → select **`rajmat2025/arkinthevalley`**, branch **`main`**
3. **Node.js version:** `20.x`
4. **Install command:** `npm install`
5. **Build command:** `npm run build`
6. **Start command:** `node server.js` ← same as tree site; Hostinger generates this from the Next.js **standalone** build
7. **Environment variables:** see `deploy/hostinger-hpanel.env.example`

> Do **not** use `npm run dev` in production. After changing env vars, **redeploy** so `NEXT_PUBLIC_*` values are baked into the client bundle.

---

## Environment variables (required for contact form)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key ([web3forms.com](https://web3forms.com)) — contact form emails |
| `NODE_ENV` | `production` |

Without `NEXT_PUBLIC_WEB3FORMS_KEY`, the site will load but the contact form cannot send messages.

---

## Pre-deploy checklist

- [x] Code on GitHub `main`
- [x] `npm run build` succeeds locally
- [x] `output: "standalone"` in `next.config.ts`
- [ ] Web3Forms key added in hPanel env vars
- [ ] Domain DNS pointed to Hostinger (if using custom domain, e.g. arkinthevalley.com)

---

## After deploy

1. Open the site URL and hard-refresh
2. Scroll through hero, gallery, testimonials, contact
3. Submit a test contact form message
4. Future pushes to `main` can auto-redeploy if enabled in hPanel

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| **503 / app won't start** | Start command must be `node server.js`, not `npm start` |
| **Contact form fails** | Set `NEXT_PUBLIC_WEB3FORMS_KEY` in hPanel, then redeploy |
| **Build fails** | Run `npm run build` locally; fix errors, push to `main`, redeploy |
| **Stale assets** | Redeploy from hPanel or push a new commit |
