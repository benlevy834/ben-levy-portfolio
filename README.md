# Ben Levy — Portfolio Site

A bilingual (Hebrew + English) personal portfolio for Ben Levy — learning developer, instructional designer and educator.

Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies. Push it to GitHub and it deploys.

## What's in this repo

```
index.html                    # Hebrew home (RTL) — the default landing page
en/index.html                 # English home (LTR)
assets/
  css/styles.css              # Single stylesheet (both languages)
  js/main.js                  # Lang toggle, scroll reveal, modal, nav, smooth scroll
  cv/ben-levy-cv.pdf          # The CV PDF (served by the "Download CV" button)
  img/favicon.svg             # BL monogram favicon
  portfolio/                  # Where your real work samples live
    README.md                 # Drop-location guide for each card
  writing/                    # Drop the short story here
README.md                     # This file
.gitignore
.nojekyll                     # Tells GitHub Pages not to run Jekyll
```

## Local preview

You have two options:

**Option A — just open it.** Double-click `index.html`. Works for a quick look. The only thing that may misbehave is the language toggle (file:// path math), so for anything real use Option B.

**Option B — local server (recommended).** From the project root:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Or with Node:

```bash
npx serve .
```

## Deploy to GitHub Pages

1. Create a new repo on [github.com](https://github.com/new). Suggested name: `portfolio` (or use the special `<your-username>.github.io` name if you want the root URL).
2. From this folder, connect and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git add .
   git commit -m "Initial portfolio site"
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under **Source**, pick **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)**. Save.
6. Wait ~1 minute. Your site will be live at:
   - `https://<your-username>.github.io/<repo-name>/` (normal repo name), or
   - `https://<your-username>.github.io/` (if you used the `<username>.github.io` repo name)

The empty `.nojekyll` file at the root is already there — it tells GitHub Pages to serve files exactly as-is instead of running them through Jekyll. Don't delete it.

## Replacing the placeholder work samples

Every card in the Work section has an inline HTML comment above the "View" button telling you exactly what to drop and where. The short version:

| Card | Drop files at | Update links in |
|---|---|---|
| Articulate Storyline Module | `assets/portfolio/storyline/` | `index.html` + `en/index.html`, Card 1 |
| Vibe-Coded Learning Module | `assets/portfolio/vibe-coded/` | Card 2 |
| H5P &amp; Video | `assets/portfolio/h5p-video/` | Card 3 |
| Digital Workbook | `assets/portfolio/workbook/` | Card 4 |
| Presentations | `assets/portfolio/presentations/` | Card 5 |
| Design Process | `assets/portfolio/design-process/` | Card 6 |

For each card, the pattern is:
1. Drop the asset (PDF / video link / screenshot / SCORM folder) into the matching `assets/portfolio/<category>/` folder.
2. In `index.html` **and** `en/index.html`, find the card (search for the tag like `data-tag="Storyline"`), and replace the `<button class="card__view" data-view ...>` with an `<a class="card__view" href="...">...</a>` that points to your asset.
3. Edit the `data-detail` attribute on that card to describe the real work (one to three sentences).

The Creative Writing section has the same pattern: drop `short-story.md` into `assets/writing/` and update the link in both HTML files.

## Swapping the CV

The CV PDF is at `assets/cv/ben-levy-cv.pdf`. To update it, just replace that file with your new export (same filename) and push. The download button will serve the new version automatically.

## Editing content

- Hebrew copy lives in `index.html`.
- English copy lives in `en/index.html`.
- If you change something in one language, change it in the other so both stay in sync.
- Tokens (colors, fonts, spacing) all live at the top of `assets/css/styles.css` under `:root` and `html[lang="he"]`.

## Credits

Hand-crafted. Fonts from Google Fonts (Fraunces, Inter, Frank Ruhl Libre, Assistant). No other dependencies.
