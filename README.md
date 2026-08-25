# TrentApps LLC — Studio Website

**Live site:** [https://trentapps.com](https://trentapps.com)

The website for TrentApps LLC, a software studio in Springfield, Missouri. Two things it needs to say:

1. **We build custom software** for small and medium businesses — start a project at `maya@trentapps.com`.
2. **We build hiroi Assistant**, our own AI assistant, live at [hiroi.ai](https://hiroi.ai) and answering on this site.

## Structure

| Path | What |
|---|---|
| `index.html` | The homepage: hero → six working examples → hiroi Assistant → process → studio → contact. Page-specific CSS lives in its `<style>` block. |
| `demos/` | Six self-contained demonstration builds, plus `demos/index.html` (the same gallery on its own shareable page). |
| `demos/assets/demobar.js` | The TrentApps bar every demo carries — identity, back link, reset control. Publishes its height as `--ta-demobar-h` so demos with their own fixed UI can clear it. |
| `assets/` | The logo: ring mark, light/dark lockups, favicons, OG card. |
| `css/shared.css` | Design tokens (colour, type, spacing, motion) plus nav, badges, reveal animations, footer. Shared with every page. |
| `css/examples.css` | Buttons and the example cards, shared by the homepage and `/demos/`. |
| `css/project-detail.css` | Layout for `projects/*.html`. |
| `js/shared.js` | Theme toggle, scroll progress, nav state, reveal observer, mobile menu. |
| `projects/hiroi.html` | The one product detail page. |

Homepage anchor ids — `#examples`, `#hiroi`, `#process`, `#studio`, `#contact` — are linked from every other page's nav and breadcrumb. Renaming one means updating those too.

## Demos

Six invented businesses, each covering a different vertical, each clickable end to end. They are **demonstration builds, not client work** — the homepage says so in as many words, and every demo carries the bar. All state is `localStorage`; there is no backend and nothing to deploy.

| Demo | Shows |
|---|---|
| Marigold Kitchen | Menu site, online ordering, kitchen display — an order placed on `/order` lands live on `/kitchen` |
| Ironside Barber Co. | Appointment booking with per-barber availability and service-aware slot length |
| Northgate Supply Co. | Inventory: stock, low-stock alerts, receiving, cycle counts, grouped purchase orders, audit log |
| Cedar Ridge Land Works | Contractor site with a live job estimator and quote intake |
| Bloom & Barrow | Retail storefront, cart, checkout, live stock counts |
| Riverbend Family Health | New-patient intake plus a portal showing both the patient and front-desk views |

Deliberately **photo-free** — the art is inline SVG. Do not add photographs of real businesses to an invented one.

## Type & colour

One family carries the whole site: **Nunito Sans** for everything, **Quicksand** for the `trentapps` wordmark only (it matches the logo's letterforms). `--f-serif` is a legacy token name — it is the *display* role, not a serif. Display rules run at `font-weight: 750` with tight tracking; at 400 the face reads limp.

Colour comes from the logo: navy `#00112c`, electric blue `#014efd`, cyan `#03c9fe`. Every token is tuned to clear WCAG AA on its real background in both themes — axe passes clean on every page. Lightening one breaks it.

## Maya

The corner assistant is the real [hiroi](https://hiroi.ai) widget, loaded from
`https://hiroi.ai/static/va-wave-widget.js`, on the TrentApps-branded pages only (not the demos — she answers as TrentApps, which would confuse a visitor on "Marigold Kitchen").

The embed carries `data-display-mode="widget"` **on purpose**. The attribute's presence — not its value — pins the presentation and discards the dashboard's stored `display_mode`, which is `fullscreen` and takes over the page. We want the corner orb here, so the pin is the point. `show_waves` is off in the dashboard, which is what makes it the plain orb rather than the ambient pill.

**Colours are not pinnable the same way.** The widget applies script-tag attributes first, then overwrites them from the server unconditionally (`if (settings.primary_color) this.primaryColor = settings.primary_color;`). Adding `data-primary-color` to the embed does nothing while the dashboard holds a value, so the palette lives in the hiroi dashboard for this site id:

| Setting | Value | Why |
|---|---|---|
| Primary | `#014efd` | the logo's electric blue; white button text at 6.0:1 |
| Secondary | `#03c9fe` | the logo's cyan — the orb gradient becomes the ring mark |
| Ring / Idle | `#35c4ff` | the dark theme's accent |
| Listening | `#3ddc84` | deliberately off-palette, so state is readable |
| Speaking | `#03c9fe` | |
| Processing | `#014efd` | |
| Glow | `0.5` | |

`position` is also server-owned and currently `bottom-left`.

The widget will not initialise on `localhost` — the origin is not in `allowed_domains`, so `/api/widget/init` answers 401. To preview colour changes locally, mock that one response; don't add localhost to the production allow-list.

## Tech

Static site on GitHub Pages (`CNAME` → trentapps.com). Vanilla HTML, CSS, and JS — no build step. Push to `main` deploys.

## Contact

- Email — [maya@trentapps.com](mailto:maya@trentapps.com)
- [hiroi.ai](https://hiroi.ai) · [GitHub](https://github.com/TrentApps-com) · [LinkedIn](https://www.linkedin.com/in/tdscott2/)
