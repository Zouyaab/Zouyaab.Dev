# Zouyaab.Dev Portfolio

Single-page portfolio for Zouyaab Hussain, AI Engineer & Data Scientist.
Plain HTML, CSS and JavaScript, no build step, no dependencies. Served by GitHub Pages.

| File | Purpose |
|---|---|
| `index.html` | All content and sections |
| `styles.css` | Layout, light/dark themes, responsive rules |
| `script.js` | Mobile nav, active link, theme toggle, scroll reveal, contact form |

## Theme

Colours live as variables at the top of `styles.css` (`:root` for light, and the
dark block below it). Dark mode follows the OS until the visitor uses the toggle.

## Adding a project

Featured projects are `<article class="feature">` blocks in the `#work` section;
smaller ones are `<article class="card">` blocks under "More projects".

The contact form posts to FormSubmit (`FORM_ENDPOINT` in `script.js`).
