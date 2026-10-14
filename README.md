# Ruby's Coffee Shop website

A responsive, single-page site for Ruby's Coffee Shop & Bar, 125 Partington Lane, Swinton.
Plain HTML, CSS and vanilla JS, with no build step. The branding, menu and opening times come from [@rubyscoffeeshop](https://www.instagram.com/rubyscoffeeshop/).

```
index.html          markup, SEO meta, Open Graph, LocalBusiness schema
css/styles.css      mobile-first styles (brand colours and fonts at the top)
js/main.js          nav, menu tabs, open/closed badge, scroll animations, newsletter
images/favicon.svg  browser tab icon
```

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Changing opening times

Opening times appear in four places, which must match:
1. `OPENING_HOURS` in `js/main.js` (drives the "Open now / Closed" badge)
2. the hours table in `index.html`
3. the footer in `index.html`
4. `openingHoursSpecification` in the schema in `<head>`

## Still to fill in before going live

- **Postcode and phone number:** see the TODO in the `<address>` block, and add `telephone` to the schema.
- **Photos:** the about photo and six gallery tiles are placeholders. Use real `<img>` tags with `alt`, `width`, `height` and `loading="lazy"`. The hero can take a photo too (see `.hero__bg`).
- **Reviews:** the three reviews are placeholders. Swap in real customer quotes, with permission.
- **About text:** add who runs Ruby's and the story behind the name.
- **Domain:** replace `rubyscoffeeshop.example` in the canonical, Open Graph and schema URLs, and add an `images/og-image.jpg` (1200×630) for link previews.
- **Newsletter:** front-end only. Point the form at Mailchimp, Buttondown, etc.
