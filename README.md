# Ruby's Coffee Shop website

A responsive, single-page site for Ruby's Coffee Shop. Plain HTML, CSS and vanilla JS, with no build step.

```
index.html      markup, SEO meta, Open Graph, LocalBusiness schema
css/styles.css  mobile-first styles (design tokens at the top)
js/main.js      nav, menu tabs, open/closed badge, scroll animations, newsletter
```

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Before going live, replace the placeholders

- **Town, address, postcode, phone:** in `index.html` (search for `Your Town`, `12 High Street`, `01234`), including the JSON-LD schema in `<head>`.
- **Opening hours:** in three places that must match: the hours table and footer in `index.html`, the schema in `<head>`, and `OPENING_HOURS` in `js/main.js` (this drives the "Open now" badge).
- **Domain:** `rubyscoffeeshop.example` in the canonical, Open Graph and schema URLs.
- **Photos:** hero (`.hero__bg` in CSS), about photo, and the six gallery tiles. Use real `<img>` tags with `alt`, `width`, `height` and `loading="lazy"`.
- **Map:** swap `.map-placeholder` for a Google Maps embed `<iframe>`.
- **Menu, reviews and story:** placeholder copy; check prices and use real (permitted) reviews.
- **Newsletter:** front-end only. Point the form at Mailchimp, Buttondown, etc.
- **Facebook URL:** assumed to be `facebook.com/rubyscoffeeshop`.
