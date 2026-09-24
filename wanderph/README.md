# WanderPH — Individual Website Project

WanderPH is an original three-page website concept created from the provided course requirements.

## Pages

- `index.html` — landing/home page
- `explore.html` — dynamic destination explorer
- `plan.html` — HTML trip-planning form
- `form-action.html` — form action/results page (does not count toward the 3-page requirement)

## Data source

`data/destinations.json` contains 15 destinations. `js/main.js` uses the Fetch API with `async/await` and `try/catch` to load the file.

Each destination contains more than four data properties, including:

- name
- region
- province
- type
- budget
- bestSeason
- description
- highlight

## Requirement checklist

- Semantic HTML with header, nav, main and footer
- Three main website pages
- Responsive navigation with hamburger menu
- Responsive layout down to 320px
- No horizontal scrolling
- Original HTML/CSS/JavaScript; no framework or site builder
- Fetch API + `try/catch`
- 15 dynamically generated items
- Four or more data properties displayed across each destination
- `localStorage` for favorite destinations and planner preference
- Accessible `<dialog>` modal
- DOM selection and event handling
- Array methods: `filter`, `find`, `map`
- HTML form + separate form action page
- Descriptive page titles
- Favicon
- No external images required, keeping the project lightweight

## Running locally

Because the project uses `fetch()` for a local JSON file, open it through a local development server instead of double-clicking the HTML file.

For VS Code, you can use a simple local server such as Live Server, or run:

```bash
python -m http.server
```

Then visit the local address shown by the server.

## GitHub Pages

Upload the entire `wanderph-final-project` folder into your required `wdd231` repository subfolder, such as:

`final/`

or

`finalproject/`

Then update the "Final" link in your Week 1 navigation to the GitHub Pages URL for the project.
