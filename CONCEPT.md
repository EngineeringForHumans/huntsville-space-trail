# Huntsville Space Trail: site concept

Draft 1, November 22, 2026

## Summary

Huntsville Space Trail is a free, mobile-friendly map of the places where Huntsville's space history happened. You can filter sites by era, type, and public access, read a short history of each one, and get directions.

Today this information is spread across old visitor-bureau blog posts, a paid audio tour, a scavenger-hunt PDF, and general historical-marker databases. Nothing puts the space sites in one place or tells you which ones you can actually visit.

## Who it's for

| Audience | What they need |
| --- | --- |
| Visitors (Space Camp families, conference travelers, space fans) | A plan for a half-day or full day beyond the Space & Rocket Center |
| Locals and new residents | Places to find nearby, such as Rocket Team neighborhoods and markers they drive past every day |
| Teachers and scout leaders | Field-trip stops with short, accurate history notes |
| History enthusiasts | Sources, dates, and the human story, not just the hardware |

## What makes it different

- **Covers only space history.** Every stop relates to the space program, from the V-2 and Redstone era to Artemis.
- **Shows access clearly.** Each site is labeled **Open to the public**, **Viewable from outside**, or **Restricted** (for example, inside Redstone Arsenal). You know before you drive there.
- **Includes the human story.** It maps where the Rocket Team lived, worshipped, and celebrated, along with the institutions they helped build.
- **Shows when each site was checked.** Every site has a "last verified" date and links to its sources.

## Core features (MVP)

1. **Map view.** All sites on one map, with pins colored by era.
2. **Filters.** Era, site type, access level, and cost (free or paid).
3. **Site page.** Name, photo, a 100–200 word history, address, hours and cost if any, access level, sources, and a last-verified date.
4. **Directions.** A link that opens the site in your phone's maps app.
5. **List view.** The same sites as a searchable list, sorted by distance when you allow location access.
6. **Curated routes.** Two or three ready-made routes, for example:
   - *Von Braun's Huntsville*: downtown and Monte Sano, half a day
   - *Rocket hardware drive*: Saturn IB, Hermes, the ISS node, and Rocket Park, half a day
   - *Downtown on foot*: Courthouse Square, the Secret Artemis Trail, and the Von Braun Center, 1–2 hours

### Later

- Printable route cards
- Then-and-now photo comparisons
- Audio narration for each site
- A form where visitors can suggest a site or report a correction
- Oral-history clips from Rocket Team families, if you can get permission

## Categories

**Eras**
- Arrival and Redstone (1950–1959)
- Saturn and Apollo (1960–1975)
- Skylab, Shuttle, and ISS (1973–2011)
- SLS and Artemis (2011–present)

**Site types**
- Hardware on display
- Test facility or landmark
- Historical marker
- Neighborhood or home
- Institution (schools, arts, civic buildings)
- Museum or archive
- Public art and trails

**Access levels**
- Open to the public
- Viewable from outside
- Restricted

## Data model

Store each site as one record in a single data file. This keeps the site easy to edit without a database.

| Field | Example |
| --- | --- |
| `id` | `hermes-missile` |
| `name` | Hermes Guided Missile |
| `lat`, `lng` | Coordinates |
| `address` | Airport Road at Memorial Parkway |
| `era` | `arrival-redstone` |
| `type` | `hardware` |
| `access` | `viewable` |
| `cost` | `free` |
| `summary` | One-sentence description |
| `history` | 100–200 words |
| `photo`, `photoCredit` | Image path and license |
| `sources` | List of URLs |
| `lastVerified` | `2026-11-22` |
| `routes` | `["rocket-hardware-drive"]` |

## Starter site list

Status for every site is **unverified**. Before launch, confirm each location, access level, and fact on site or with a primary source.

| # | Site | Type | Access (expected) | Notes |
| --- | --- | --- | --- | --- |
| 1 | U.S. Space & Rocket Center: Rocket Park and Davidson Center (Saturn V) | Museum | Open, paid | The main anchor site. Holds a real Saturn V |
| 2 | Saturn V replica at the Space & Rocket Center | Hardware | Viewable | Standing replica, visible from I-565 |
| 3 | Pathfinder shuttle display | Hardware | Open, paid | Shuttle test article on the museum grounds |
| 4 | Miss Baker's grave | Memorial | Open, paid | Squirrel monkey who flew in 1959. Visitors leave bananas |
| 5 | Space Camp | Institution | Restricted to campers | Founded in 1982 |
| 6 | Cockpit Trail, behind the Space & Rocket Center | Public art and trails | Open, free | Hiking trail with aircraft and rocket parts |
| 7 | Marshall Space Flight Center | Test facility | Restricted | Opened in 1960 on Redstone Arsenal |
| 8 | Saturn V Dynamic Test Stand | Test facility | Restricted | National Historic Landmark (1985) |
| 9 | Redstone Test Stand | Test facility | Restricted | National Historic Landmark |
| 10 | Propulsion and Structural Test Facility | Test facility | Restricted | National Historic Landmark |
| 11 | Neutral Buoyancy Simulator | Test facility | Restricted | National Historic Landmark. Astronauts trained here underwater |
| 12 | Redstone Arsenal | Test facility | Restricted | Home of the Army Ballistic Missile Agency |
| 13 | Courthouse Square | Neighborhood | Open, free | Site of the 1969 Apollo 11 celebration |
| 14 | Church of the Nativity | Institution | Viewable | Listed in the visitor bureau's von Braun guide |
| 15 | Maple Hill Cemetery area | Neighborhood | Open, free | The von Brauns and other team members first lived nearby |
| 16 | Sunrise Terrace marker | Marker | Viewable | Rocket Team members bought this farm in 1950 |
| 17 | Monte Sano Space Age marker | Marker | Viewable | About 100 space-program families lived on Monte Sano by 1958 |
| 18 | Von Braun Astronomical Society planetarium | Institution | Open on program nights | Von Braun helped build it. Its dome reuses Saturn hardware |
| 19 | Von Braun Center | Institution | Viewable | Civic center named for von Braun |
| 20 | University of Alabama in Huntsville | Institution | Viewable | Von Braun pushed for the campus. Check whether its archives hold Rocket Team papers |
| 21 | Hermes Guided Missile | Hardware | Viewable | Airport Road at Memorial Parkway |
| 22 | ISS connecting node, Huntsville Botanical Garden | Hardware | Open, paid | Built by Boeing in 1988, given to the garden in 1994 |
| 23 | Saturn IB, Ardmore Welcome Center (I-65 South) | Hardware | Open, free | About 25 miles north of downtown, in Elkmont |
| 24 | Lunar lander model, Used Tire World | Hardware | Viewable | Roadside oddity on Governors Drive |
| 25 | Secret Artemis Trail | Public art and trails | Open, free | 12 small rockets hidden downtown |
| 26 | Tranquility Base marker | Marker | Unknown | Listed on HMDB near Old Madison Pike. Text not confirmed |

## Content sources

- U.S. Space & Rocket Center archives
- NASA Marshall History Office
- UAH archives and special collections
- Huntsville-Madison County Public Library, Heritage Room
- Historical Marker Database (hmdb.org) and the City of Huntsville's historic marker map
- National Park Service landmark records
- Huntsville/Madison County Convention & Visitors Bureau

Use photos you take yourself, NASA images (generally public domain), or images with a clear Creative Commons license. Record the credit for each one.

## Recommended technology

The goal is a site that costs nothing to host and is easy to edit.

- **Static site** in plain HTML, CSS, and JavaScript, or with a light framework such as Astro
- **Map**: Leaflet with OpenStreetMap tiles. Both are free and don't need an API key
- **Data**: one `sites.json` (or GeoJSON) file in the repository
- **Hosting**: GitHub Pages, Netlify, or Cloudflare Pages, all free at this size
- **Offline use**: optional later. Make it an installable web app so it works with weak signal

## Risks and open questions

- **Restricted sites.** About a quarter of the key sites are on Redstone Arsenal. Show them with clear "not open to the public" labels, and point to any official tours that exist.
- **Accuracy.** Wrong facts can spread. Cite a source for every claim and show the last-verified date.
- **Private homes.** Rocket Team homes are private residences. Map neighborhoods and public markers, not individual house addresses, unless the owner agrees.
- **The Nazi-era past.** Von Braun and many team members came from Germany's wartime V-2 program, which used forced labor. Address this history directly and accurately, with sources.
- **Upkeep.** Hours and access change. Plan to review every site at least once a year.
- **Name.** "Huntsville Space Trail" is a working name. Check that no existing trail or business uses it.

## Next steps

1. Decide on the name and scope (Huntsville only, or the wider north Alabama area).
2. Verify the starter list. Visit or confirm 10–15 sites first.
3. Build the MVP: map, filters, site pages, and one route.
4. Ask a few locals and history groups to review it before you share it widely.
