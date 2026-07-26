# TrentApps LLC — Studio Website

**Live site:** [https://trentapps.com](https://trentapps.com)

The website for TrentApps LLC, a software studio in Springfield, Missouri. Two things it needs to say:

1. **We build custom software** for small and medium businesses — start a project at `maya@trentapps.com`.
2. **We build hiroi**, our own suite of AI apps — Assistant (live in beta), Campaigns and Presents (coming soon).

## Structure

| Path | What |
|---|---|
| `index.html` | The whole studio page: hero → two doors (custom software / hiroi) → hiroi roster → work index → process → studio → contact. Page-specific CSS lives in its `<style>` block. |
| `css/shared.css` | Design tokens (color, type, spacing, motion) plus nav, badges, reveal animations, footer. Shared with every project page. |
| `css/project-detail.css` | Layout for the `projects/*.html` detail pages. |
| `js/shared.js` | Theme toggle, scroll progress, nav state, reveal observer, mobile menu. |
| `projects/*.html` | One detail page per shipped product. Every row in the homepage work index links to one of these. |

Anchor ids on the homepage — `#services`, `#hiroi`, `#work`, `#process`, `#studio`, `#contact` — are linked from every project page's nav and breadcrumb. Renaming one means updating `projects/*.html` too.

## Work index

The homepage lists everything shipped in one scannable index, grouped by what it proves:

- **AI & voice products** — hiroi Assistant, FormFlow, YourStory, Voice Assistant
- **Business & compliance systems** — AuditAI, ManagerProtocol, AIFinance
- **Real-time, 3D & mobile** — Live Earth, Claude Code Mobile UI, Lingua

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
