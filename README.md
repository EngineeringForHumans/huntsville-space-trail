# Huntsville Space Trail

A free, mobile-friendly map of the places where Huntsville's space history happened. See [CONCEPT.md](CONCEPT.md) for the goals and plan.

**Live site:** <https://huntsvillespacetrail.com>

> **This is an AI-generated concept.** The sites, map pins, and history haven't been researched or checked yet. You can help by [verifying a site](CONTRIBUTING.md#verify-a-site).

## Contribute

You don't need to write code to help. To suggest a site, report a correction, or confirm a site you visited, open an [issue](https://github.com/EngineeringForHumans/huntsville-space-trail/issues/new/choose). To edit the data or code yourself, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Run it locally

The site is static HTML, CSS, and JavaScript with no build step.

1. Open a terminal in this folder.
2. Start a local server:

   ```powershell
   python -m http.server 8080
   ```

3. Go to `http://localhost:8080`.

You can also open `index.html` directly in a browser. The map tiles and Leaflet library load from the internet, so you need a connection either way.

## Project layout

| Path | What it holds |
| --- | --- |
| `index.html` | Page structure and the About dialog |
| `css/styles.css` | Styles, including dark mode and the mobile layout |
| `js/app.js` | Map, filters, list, site details, routes, and sharing links |
| `data/sites.js` | All sites, categories, and routes |
| `scripts/validate-sites.mjs` | Checks `data/sites.js` for mistakes |
| `.github/` | Issue templates, the pull request template, and the data check workflow |

## Edit sites

All content lives in `data/sites.js`. To add a site, copy an existing entry in `sites` and change its fields. The `era`, `type`, `access`, and `cost` values must match an `id` in the lists at the top of the file.

To add a site to a route, add its `id` to the route's `stops` list in the order you want visitors to go, and add the route's `id` to the site's `routes` list.

To check your changes, run the data check. It needs [Node.js](https://nodejs.org/) 20 or later:

```powershell
node scripts/validate-sites.mjs
```

The same check runs automatically on every pull request.

## Verify sites

Every site starts as unverified. When you confirm a site on the ground or with a primary source:

1. Correct `lat` and `lng`. To get coordinates, right-click the spot in Google Maps or OpenStreetMap.
2. Remove `precision: "approximate"` if the pin is now accurate.
3. Check `access`, `cost`, `hours`, and the history text.
4. Set `lastVerified` to the date, for example `"2026-12-05"`.

## Share a site or route

The URL updates as you browse, so you can share a link to a specific site or route:

- `#site=redstone-test-stand`
- `#route=von-braun`

## Deployment

The site is hosted on GitHub Pages at `huntsvillespacetrail.com`. GitHub publishes the `main` branch automatically, usually within a few minutes of each merge. The `CNAME` file sets the custom domain, so don't delete it.

## License

- **Code** (HTML, CSS, and JavaScript): [MIT License](LICENSE)
- **Content** (site text, routes, and documents): [CC BY 4.0](LICENSE-CONTENT.md)

## Credits

- Map: [Leaflet](https://leafletjs.com/) with [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles. If traffic grows, switch to a tile provider that allows heavier use, because the free OpenStreetMap tile servers have a [usage policy](https://operations.osmfoundation.org/policies/tiles/).
- Site sources are listed on each site's page.
