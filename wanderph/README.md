# WanderPH — WDD231 Final Project

WanderPH is a responsive Philippine destination explorer built with semantic HTML, custom CSS, and JavaScript modules.

## Pages
- `index.html` — Home
- `explore.html` — 15 dynamically generated destinations
- `wonder-plan.html` — GET form using URL Search Params
- `thank-you.html` — form action page that displays submitted values

## WDD231 features
- Responsive hamburger navigation and desktop flex navigation
- 15+ dynamic destination records loaded with Fetch from `data/destinations.json`
- Search and filter using array methods
- Local Storage favorites
- Native modal dialog
- ES Modules (`import` / `export`)
- Async Fetch with `try/catch`
- Template literals and DOM manipulation
- Responsive grid layouts
- Google Fonts
- Meta description, author, and Open Graph metadata
- Optimized local SVG assets
- `styles/small.css` followed by `styles/large.css`
- `images`, `styles`, `scripts`, and `data` folders
- Form action page using `URLSearchParams`

## Local testing
Run the project through VS Code Live Server or another local HTTP server. The Fetch API may not work correctly if HTML files are opened directly with `file://`.

## Final testing
Before submission:
1. Check every page for JavaScript console errors.
2. Run the WDD231 page audit on every page.
3. Run W3C HTML validation on every page.
4. Run W3C CSS validation on both CSS files.
5. Run Lighthouse in an incognito/private window in Mobile and Desktop modes.
6. Check Accessibility, Best Practices, and SEO scores.
7. Test the hamburger menu on a narrow viewport.
8. Test search, filters, favorites, and modal on Explore.
9. Submit the Wander Plan form and verify the values appear on `thank-you.html`.
10. Record the required video with your face visible and your screen showing the required JavaScript demonstrations.

## Video demonstration order
1. Show `data/destinations.json` and the Explore page output.
2. Show the `fetch()` call and its `try/catch` asynchronous loading.
3. Show `destination-utils.js` exporting functions and `explore.js` importing them.
4. Demonstrate search/filter, favorites, and modal output.
