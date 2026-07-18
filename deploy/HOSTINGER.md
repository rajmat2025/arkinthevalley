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
6. **Start command:** `node server.js` (default — data persistence runs automatically)
7. **Environment variables:** only if you need the contact form (see below)

> Do **not** use `npm run dev` in production.

---

## Site content — survive redeploy (no hPanel setup)

Hostinger **rebuilds `nodejs/`** on every Git deploy. Edits inside `nodejs/` alone are wiped.

**You do not need to change the start command or add env vars.** On every boot, `server.js` automatically:

1. Creates **`data/apartmentData.json`** next to the `nodejs/` folder (if missing)
2. Seeds it from the repo on first run
3. Symlinks `nodejs/src/data/apartmentData.json` → that persistent file

### Where to edit content (File Manager)

Go **one folder up** from `nodejs/`:

| File Manager path | Purpose |
|-------------------|---------|
| **`/files/data/apartmentData.json`** | **Edit this** — survives redeploy |
| `/files/nodejs/src/data/apartmentData.json` | Symlink — may look editable but use `data/` instead |

Example layout on server:

```
/domains/your-site.com/
  data/apartmentData.json    ← persistent (edit here)
  nodejs/                    ← replaced on every Git deploy
```

Redeploy replaces `nodejs/` only. **`data/apartmentData.json` is kept.**

---

## Environment variables (optional)

| Variable | Required? | Purpose |
|----------|-------------|---------|
| `WEB3FORMS_ACCESS_KEY` | For contact form | Web3Forms key ([web3forms.com](https://web3forms.com)) — server reads at runtime |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | No | Legacy fallback only |
| `APARTMENT_DATA_PATH` | No | Only if you need a custom data file path |

### Contact form without hPanel

Add your Web3Forms access key to the **persistent** data file (same place as promos/FAQs):

```json
"integrations": {
  "web3formsAccessKey": "your-key-from-web3forms.com"
}
```

File: **`/files/data/apartmentData.json`** (beside `nodejs/`). No redeploy needed after adding the key — only restart the app if it was already running.

Without a key, the site loads but the contact form returns a configuration error.

---

## Pre-deploy checklist

- [x] Code on GitHub `main`
- [x] `npm run build` succeeds locally
- [x] `output: "standalone"` in `next.config.ts`
- [ ] Web3Forms key in hPanel (if using contact form)
- [ ] Domain DNS pointed to Hostinger

---

## After deploy

1. Hard-refresh the site
2. In File Manager, confirm `data/apartmentData.json` exists beside `nodejs/`
3. Edit promos, FAQs, etc. in **`data/apartmentData.json`**
4. Push code to `main` to redeploy — content in `data/` should remain

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| **503 / app won't start** | Start command should be `node server.js` |
| **Content resets after redeploy** | Edit `/files/data/apartmentData.json`, not only inside `nodejs/` |
| **Contact form fails** | Add `integrations.web3formsAccessKey` to `data/apartmentData.json` (get key at web3forms.com) |
| **Build fails** | Run `npm run build` locally; fix errors; push to `main` |
