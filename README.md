# Zouyaab.Dev — Portfolio

A single-page developer portfolio built with plain HTML, CSS and JavaScript — no build step, no dependencies.

**Theme:** "Nebula" — violet (`#7C5CFF`) + magenta (`#FF4D9D`) on near-black.

## Files

| File | Purpose |
|---|---|
| `index.html` | All content and sections |
| `styles.css` | Styling, theme variables, responsive rules |
| `script.js` | Nav, scroll reveal, counters, skill bars, contact form |

## Still to fill in

Search `index.html` for `TODO`:

1. **Education** — all three cards are still placeholders
2. **Experience** — add your earlier role(s) above the Affinity Core entry

Optional: set `MY_EMAIL` in `script.js` to enable the mailto flow on the contact
form. While it's blank, the form sends people to LinkedIn instead.

Already correct: name, role (Data Scientist), LinkedIn, GitHub, projects.
Private client work is marked with a lock badge instead of a dead GitHub link.

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

The local repo is already initialised, committed on `main`, with `origin` set to
`https://github.com/Zouyaab/Zouyaab.Dev.git`.

1. Create a **public** repo named `Zouyaab.Dev` on GitHub — do **not** add a
   README, `.gitignore` or licence (keep it empty).
2. Push:

```bash
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
- **Headline** — mention it, e.g. "Data Scientist · portfolio: Zouyaab.github.io/Zouyaab.Dev"
