# Zouyaab.Dev — Portfolio

A single-page developer portfolio built with plain HTML, CSS and JavaScript — no build step, no dependencies.

**Theme:** "Nebula" — violet (`#7C5CFF`) + magenta (`#FF4D9D`) on near-black.

## Files

| File | Purpose |
|---|---|
| `index.html` | All content and sections |
| `styles.css` | Styling, theme variables, responsive rules |
| `script.js` | Nav, scroll reveal, counters, skill bars, contact form |

## Before you publish — fill these in

Search `index.html` for `TODO` and replace:

1. **Email** — in the contact section and in `script.js` (`MY_EMAIL`)
2. **LinkedIn URL** — contact section
3. **Experience** — the second timeline entry (your earlier role)
4. **Education** — all three cards

## Change the colour theme

Open `styles.css` and edit the four variables at the top of `:root`:

```css
--brand:   #7C5CFF;   /* primary  */
--brand-2: #FF4D9D;   /* accent   */
--bg:      #07070D;   /* page base */
--surface: #10101B;   /* cards    */
```

Ready-made palettes are listed at the bottom of `styles.css`:

- **Emerald / Lime** — `#10B981` + `#A3E635`
- **Cyber Blue / Cyan** — `#3B82F6` + `#22D3EE`
- **Sunset Orange / Rose** — `#F97316` + `#FB7185`
- **Gold / Amber** — `#D4A537` + `#F5D67B`

Copy one block into `:root` to swap the entire site instantly.

## Run locally

Just open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a **public** repo named `Zouyaab.Dev` on GitHub.
2. Push this folder:

```bash
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/Zouyaab/Zouyaab.Dev.git
git push -u origin main
```

3. On GitHub: **Settings → Pages → Source =** `Deploy from a branch`, **Branch =** `main` / `/ (root)`, then **Save**.
4. Your site goes live at:

```
https://Zouyaab.github.io/Zouyaab.Dev/
```

Give it 1–2 minutes on the first deploy.

## Add it to LinkedIn

- **Profile → Contact info → Website** — add the URL
- **Featured section** — add it as a link so it shows a preview card
- **Headline** — mention it, e.g. "AI / ML Engineer · portfolio: Zouyaab.github.io/Zouyaab.Dev"
