# Ben Levy — Personal Portfolio Website

## What This Is

A bilingual (Hebrew + English) personal portfolio website for Ben Levy — a learning developer and instructional designer with 3+ years of experience building digital learning for Israeli government and enterprise clients. The site showcases real work samples, professional history, and creative writing in a bold, visually distinctive design.

Built as a plain HTML/CSS/JS static site, hosted free on GitHub Pages, optimized for fast time-to-ship.

## Core Value

Give Israeli hiring managers (and recruiters) a single link that proves Ben can do what his resume claims: design, build, and ship learning experiences end-to-end. The portfolio gallery is the heart of the site — work samples speak louder than bullet points.

## Context

- **Owner:** Ben Levy (benlevy834@gmail.com, 050-913-1269)
- **Background:** 3+ years in learning development; M.A. student in Learning Technologies (AI track) at HIT; B.A. in Hebrew Linguistics & English Literature from BGU
- **Tools used in the work being showcased:** Articulate Storyline, Vyond, H5P, Canva, Google Sites, Gemini Canvas, DaVinci Resolve, OBS, Claude Code (vibe coding)
- **Audience:** Israeli employers and recruiters in learning-development / instructional-design roles
- **Why now:** Job search 2026 — needs a shippable portfolio fast to complement LinkedIn and the existing CV PDF

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Bilingual (Hebrew RTL + English LTR) with a clear language toggle
- [ ] Bold & creative visual style — strong color, distinctive typography, not a generic minimal template
- [ ] Hero / About section with name, headline, short bio
- [ ] Experience / CV section derived from the resume, with downloadable CV PDF
- [ ] Portfolio gallery showcasing 6 work-sample categories:
  - [ ] Articulate Storyline learning module (embed or video demo + screenshots)
  - [ ] Vibe-coded learning module (live link or embed)
  - [ ] H5P interactives + YouTube training videos (embedded)
  - [ ] Digital workbook (PDF + preview)
  - [ ] Presentations (PDF or Slides embed)
  - [ ] Characterization & design files (process artifacts — shows the thinking, not just the output)
- [ ] Creative Writing page featuring the English short story
- [ ] Contact via email link (mailto: benlevy834@gmail.com)
- [ ] Responsive design (mobile + desktop)
- [ ] Hosted on GitHub Pages with a free username.github.io URL
- [ ] Minimum-viable ship target: Hero + Portfolio gallery + Contact (other sections cut first if time-constrained)

### Out of Scope

- Custom domain — using free GitHub Pages URL (can be added later)
- Contact form — email link only (no third-party form services)
- CMS / dynamic backend — fully static
- Blog / articles section — not part of v1
- Build tooling / framework (React, Astro, etc.) — plain HTML/CSS/JS only
- Analytics, tracking, cookie banners — v1 stays simple
- LinkedIn link, phone display — only email contact requested
- Photo / headshot — not requested

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Plain HTML/CSS/JS, no framework | Fastest path to ship; no build step; trivial GitHub Pages deploy | — Pending |
| Bilingual HE+EN with toggle | Matches Ben's bilingual positioning and lets the English short story live naturally on the site | — Pending |
| GitHub Pages hosting (free) | Zero cost, instant deploy, custom domain can be added later | — Pending |
| Bold & creative visual style | Differentiates from generic minimal templates; reinforces the "designer" half of "learning developer & designer" | — Pending |
| Email-only contact | User explicitly chose mailto: only — no form, no LinkedIn button, no phone | — Pending |
| MVP cut: Hero + Portfolio + Contact | If time runs short, Experience and Creative Writing get deferred — the work samples are the highest-value content | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after initialization*
