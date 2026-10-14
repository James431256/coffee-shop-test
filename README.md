# Ruby's Coffee Shop website

A responsive, single-page site for Ruby's Coffee Shop & Bar, 125 Partington Lane, Swinton, Manchester M27 0NS.

Live at https://james431256.github.io/coffee-shop-test/ (served from the `gh-pages` branch).
Plain HTML, CSS and vanilla JS, with no build step. The branding, menu and opening times come from [@rubyscoffeeshop](https://www.instagram.com/rubyscoffeeshop/).

```
index.html          markup, SEO meta, Open Graph, LocalBusiness schema
css/styles.css      mobile-first styles (brand colours and fonts at the top)
js/main.js          nav, menu tabs, open/closed badge, scroll animations, newsletter
images/             favicon and photos (cropped from Ruby's Instagram posts)
```

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Changing opening times

Opening times appear in four places, which must match:
1. `OPENING_HOURS` in `js/main.js` (drives the "Open now / Closed" badge)
2. the hours table in `index.html`
3. the footer in `index.html`
4. `openingHoursSpecification` in the schema in `<head>`

## Still to fill in before going live

- **Postcode:** M27 0NS is inferred from neighbouring addresses (129–139 Partington Lane). Double-check it.
- **Phone number:** optional. See the comment in the `<address>` block, and add `telephone` to the schema.
- **Reviews:** the three reviews are placeholders. Swap in real customer quotes, with permission.
- **About text:** add who runs Ruby's and the story behind the name, if wanted.
- **Domain:** URLs point at the GitHub Pages address. If Ruby's gets its own domain, update the canonical, Open Graph and schema URLs.
- **Newsletter:** front-end only. Point the form at Mailchimp, Buttondown, etc.
- **Photos:** cropped from Instagram screenshots. Original, higher-resolution photos would look sharper.
