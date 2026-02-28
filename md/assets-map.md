# Assets Map

## CSS Layer

- `assets/css/main.css`
: Primary theme styles for layout, typography, sections, responsive behavior, and utility classes.
: Imports Font Awesome CSS and Google Fonts.
- `assets/css/fontawesome-all.min.css`
: Local Font Awesome icon styles used by section icons and contact icons.

## JavaScript Layer

- `assets/js/jquery.min.js`
: Core jQuery dependency.
- `assets/js/jquery.scrolly.min.js`
: Smooth-scroll behavior for navigation links using class `scrolly`.
- `assets/js/browser.min.js`
: Browser capability detection utility used by template scripts.
- `assets/js/breakpoints.min.js`
: Responsive breakpoint helper.
- `assets/js/util.js`
: Template utility helpers used by main behavior.
- `assets/js/main.js`
: Main template behavior (preload class removal, mobile/IE classes, scrolly setup, gallery/object-fit helpers).

## Image Assets

- `images/banner.jpg`
: Intro section hero image (`<span class="image fill">` in `index.html`).

## External Dependencies in HTML

- Font Awesome CDN stylesheet:
: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css`

## Notes For Maintainers

- Keep script load order intact in `index.html` because `main.js` depends on prior utility scripts.
- If removing CDN icon CSS, verify all `fa-` icon classes still render via local CSS only.
