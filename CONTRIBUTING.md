# Contribute to Huntsville Space Trail

Thanks for helping map Huntsville's space history. You don't need to write code to help. The most valuable contributions are local knowledge, site visits, and good sources.

This project started as an AI-generated concept, so many sites still need someone to check them. Verifying an existing site is one of the most useful things you can do.

## Ways to help

| You want to | Do this | Code needed? |
| --- | --- | --- |
| Suggest a new site | Open a [Suggest a site](https://github.com/EngineeringForHumans/huntsville-space-trail/issues/new?template=suggest-site.yml) issue | No |
| Report a wrong fact, location, or hours | Open a [Report a correction](https://github.com/EngineeringForHumans/huntsville-space-trail/issues/new?template=report-correction.yml) issue | No |
| Confirm a site after visiting it | Open a correction issue, or edit `data/sites.js` directly | Optional |
| Add or fix a site yourself | Edit `data/sites.js` and open a pull request | A little |
| Improve the map or design | Edit the HTML, CSS, or JavaScript and open a pull request | Yes |

## Content guidelines

Every site must follow these rules.

- **Cite a source for every fact.** Good sources include NASA, the Marshall History Office, the U.S. Space & Rocket Center archives, UAH archives, the Huntsville-Madison County Public Library, the National Park Service, and historical marker text. Avoid citing other trail sites or AI tools as a source.
- **Stick to space history.** A site must have a clear link to the space program, from the V-2 and Redstone era to Artemis today.
- **Don't map private homes.** Map neighborhoods, public markers, and public places. Don't add the address of a private residence unless the owner agrees in writing.
- **Label access honestly.** If the public can't visit a site, set `access` to `restricted`. Never suggest ways to enter Redstone Arsenal or other restricted areas without authorization.
- **Tell the whole history.** Many of von Braun's team built the V-2 in Nazi Germany using concentration-camp forced labor. Where that history is relevant, state it accurately and cite it.
- **Write plainly.** Keep summaries to one sentence and history text to about 100–200 words. Use present tense for what's there now and past tense for history.
- **Only add content you have the right to share.** Your contribution is licensed under [CC BY 4.0](LICENSE-CONTENT.md) for content and the [MIT License](LICENSE) for code. Don't paste text from other websites or books. Write it in your own words and cite the source.

## Edit site data

All sites, categories, and routes are in [`data/sites.js`](data/sites.js).

### Add a site

Copy this template into the `sites` list and fill it in:

```js
{
  id: "short-unique-id",                 // lowercase words joined by hyphens
  name: "Site name",
  lat: 34.7304, lng: -86.5861,           // right-click the spot in OpenStreetMap or Google Maps
  precision: "approximate",              // remove this line once the pin is accurate
  address: "Street address or clear description",
  era: "saturn-apollo",                  // arrival-redstone, saturn-apollo, shuttle-iss, artemis, or multi
  type: "hardware",                      // hardware, test-facility, marker, neighborhood, institution, museum, or trail
  access: "open",                        // open, viewable, or restricted
  cost: "free",                          // free or paid
  hours: "When and how people can visit.",
  summary: "One sentence about why this place matters.",
  history: "About 100–200 words of history, in your own words.",
  sources: [
    { label: "Source name", url: "https://example.org/page" }
  ],
  lastVerified: null,                    // or the date you confirmed it, like "2026-12-05"
  routes: []                             // route ids this site belongs to, if any
},
```

### Verify a site

When you confirm a site in person or with a primary source:

1. Correct `lat` and `lng`.
2. Remove `precision: "approximate"` if the pin is now accurate.
3. Check `access`, `cost`, `hours`, and the history text.
4. Set `lastVerified` to the date you checked, for example `"2026-12-05"`.
5. In your pull request, describe how you verified it, such as "Visited on December 5" or "Confirmed with the NPS landmark record."

### Add a site to a route

Add the site's `id` to the route's `stops` list in visiting order. Then add the route's `id` to the site's `routes` list. The data check fails if these two lists don't match.

## Preview your changes

The site has no build step.

1. Fork the repository and clone your fork.
2. In the project folder, start a local server:

   ```sh
   python -m http.server 8080
   ```

3. Go to `http://localhost:8080`.

## Check the site data

Every pull request runs an automatic check on `data/sites.js`. It confirms that each site has the required fields, uses valid categories, has a source, sits within north Alabama, and matches its routes.

To run the same check locally, install [Node.js](https://nodejs.org/) 20 or later, then run:

```sh
node scripts/validate-sites.mjs
```

## Open a pull request

1. Create a branch for your change.
2. Keep each pull request focused, such as one new site or one set of corrections.
3. Fill in the pull request template, including your sources.
4. A maintainer reviews it. When it's merged into `main`, the live site updates within a few minutes.

## Code of conduct

Everyone who takes part in this project agrees to follow the [code of conduct](CODE_OF_CONDUCT.md).
