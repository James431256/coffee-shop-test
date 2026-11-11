# Coffee shop website

A one-page website I built for a small local coffee shop and bar. It's plain HTML, CSS and JavaScript, so there's nothing to install or build.

You can see it live here: https://james431256.github.io/coffee-shop-test/ (it's served from the `gh-pages` branch).

## Running it

Just open `index.html` in a browser. If you'd rather run it on a local server:

```
python3 -m http.server
```

then go to http://localhost:8000.

## How it's laid out

- `index.html` has all the page content
- `css/styles.css` has the styling (colours and fonts are set at the top so they're easy to change)
- `js/main.js` handles the menu tabs, the mobile nav, the "Open now / Closed" badge and a few scroll animations
- `images/` has the logo and photos

## Updating the opening times

The opening times show up in a few places, so if they change you need to update all of them:

1. `OPENING_HOURS` in `js/main.js` (this is what the open/closed badge uses)
2. the hours table in `index.html`
3. the footer in `index.html`
4. the structured data in the `<head>` of `index.html`

## Still to do

- Swap the placeholder reviews for real ones
- Add a proper "About us" section
- Hook the newsletter form up to an actual mailing service (it doesn't send anywhere yet)
- Get some higher quality photos
- Point everything at a custom domain if the shop ever gets one
