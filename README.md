# trentapps.com — Trent Scott's Portfolio

**Live site:** [https://trentapps.com](https://trentapps.com)

The personal portfolio of Trent Scott — software engineer in Springfield, Missouri, founder of TrentApps LLC and the hiroi platform. The page tells one story in order:

1. **Hero** — who Trent is, in his own words ("Every project here started with *I wonder if I could…*").
2. **Professional history** (`#story`) — a timeline: Missouri State (CIS) → founding TrentApps LLC (2023) → Moses/Weitzman Health System (2024, current role) → the AI-governance projects (2025) → hiroi live in beta (2026).
3. **hiroi Assistant** (`#hiroi`) — the flagship: feature grid, a "this site is the demo" panel (Maya, the corner widget, runs on it), and the Campaigns/Presents roadmap.
4. **The Archive** (`#work`) — every other shipped project in one scannable index; each row links to a detail page.
5. **About** (`#about`) — off-the-clock Trent, plus the facts card (location, day job, education, studio, contact).
6. **Contact** (`#contact`) — one email: `maya@trentapps.com`.

## Structure

| Path | What |
|---|---|
| `index.html` | The whole portfolio page. Page-specific CSS lives in its `<style>` block. |
| `css/shared.css` | Design tokens (color, type, spacing, motion) plus nav, badges, reveal animations, footer. Shared with every project page. |
| `css/project-detail.css` | Layout for the `projects/*.html` detail pages. |
| `js/shared.js` | Theme toggle, scroll progress, nav state, reveal observer, mobile menu. |
| `projects/*.html` | One detail page per shipped product, chained with prev/next links. |

Anchor ids on the homepage — `#story`, `#hiroi`, `#work`, `#about`, `#contact` — are linked from every project page's nav. Renaming one means updating `projects/*.html` too.

## Maya

The corner assistant is the real [hiroi](https://hiroi.ai) widget, loaded from
`https://hiroi.ai/static/va-wave-widget.js`. Its presentation (orb vs. panel, colors, greeting) comes from the
hiroi dashboard — **do not** add `data-display-mode` to the script tag; the attribute's mere presence pins the
value and discards the dashboard setting.

## Tech

Static site on GitHub Pages (`CNAME` → trentapps.com). Vanilla HTML, CSS, and JS — no build step. Push to `main` deploys.

## Contact

- Email — [maya@trentapps.com](mailto:maya@trentapps.com)
- [hiroi.ai](https://hiroi.ai) · [GitHub](https://github.com/TrentApps-com) · [LinkedIn](https://www.linkedin.com/in/tdscott2/)
