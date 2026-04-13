# assets/portfolio — drop zone

This folder is where your real work samples live. The six cards in the Work section of the site are set up as placeholders that you replace one at a time, as you get each asset ready.

The pattern is always:

1. Create a subfolder here for the category (if it doesn't exist yet).
2. Drop the asset inside it.
3. Open both `index.html` (Hebrew) and `en/index.html` (English) at the project root.
4. Find the card by its `data-tag` attribute.
5. Replace the card's "View" `<button>` with an `<a>` pointing to your asset — and update the `data-detail` attribute with real copy.

Below is the full map.

---

## 1. Articulate Storyline Module

- **Tag:** `Storyline`
- **Folder:** `assets/portfolio/storyline/`
- **Drop:** published output (`story.html` + supporting folder), a `.mp4` screen capture, or a Review 360 link.
- **Edit in both HTML files:** find `data-tag="Storyline"`. Replace the `<button class="card__view" data-view>` with:
  ```html
  <a class="card__view" href="assets/portfolio/storyline/story.html" target="_blank" rel="noopener">View ...</a>
  ```
  (From `en/index.html` use `../assets/portfolio/storyline/story.html`.)

## 2. Vibe-Coded Learning Module

- **Tag:** `Vibe Coding`
- **Folder:** `assets/portfolio/vibe-coded/`
- **Drop:** an `index.html` (with its assets) or a live URL.
- **Edit:** same pattern — replace the button with an `<a href="assets/portfolio/vibe-coded/index.html">` or a remote URL.

## 3. H5P &amp; Video

- **Tag:** `H5P & Video`
- **Folder:** `assets/portfolio/h5p-video/`
- **Drop:** exported H5P `.h5p` file, a screenshot, or replace the "View" link with a YouTube / H5P-hosted URL.
- **Edit:** swap the button for `<a href="https://youtube.com/..." target="_blank" rel="noopener">`.

## 4. Digital Workbook

- **Tag:** `Digital Workbook`
- **Folder:** `assets/portfolio/workbook/`
- **Drop:** `workbook.pdf` (or the source HTML export).
- **Edit:** swap the button for `<a href="assets/portfolio/workbook/workbook.pdf" target="_blank" rel="noopener">`.

## 5. Presentations

- **Tag:** `Presentations`
- **Folder:** `assets/portfolio/presentations/`
- **Drop:** `deck.pdf`, or a Google Slides share URL.
- **Edit:** swap the button for `<a href="...">`.

## 6. Design Process &amp; Characterization

- **Tag:** `Design Process`
- **Folder:** `assets/portfolio/design-process/`
- **Drop:** PDF of a characterization doc, or screenshots bundled into a PDF.
- **Edit:** swap the button for `<a href="...">`.

---

## Creative Writing

- **Folder:** `assets/writing/`
- **Drop:** `short-story.md` (or `.txt`, or `.pdf`).
- **Edit:** in the Writing section of both HTML files, update the "Ask me for it" / "בקשו אצלי" link to point at the file, and update the `writing__title` and `writing__desc`.

---

## Path tips

- From `index.html` (project root), use paths like `assets/portfolio/storyline/story.html`.
- From `en/index.html`, add a leading `../`: `../assets/portfolio/storyline/story.html`.
- Always test locally with a local server (`python -m http.server 8080`) before pushing, because `file://` URLs sometimes lie about paths.

---

Future-you is thanking present-you.
