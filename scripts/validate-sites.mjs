// Checks data/sites.js for missing fields, bad categories, and broken route links.
// Run with: node scripts/validate-sites.mjs
// Exits with code 1 if it finds errors.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "data", "sites.js");

// sites.js assigns to window.TRAIL. Run it in a sandbox with a stand-in window.
const sandbox = { window: {} };
try {
  vm.runInNewContext(readFileSync(file, "utf8"), sandbox, { filename: "data/sites.js", timeout: 1000 });
} catch (err) {
  console.error(`data/sites.js has a syntax error:\n  ${err.message}`);
  process.exit(1);
}

const data = sandbox.window.TRAIL;
const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

if (!data || typeof data !== "object") {
  console.error("data/sites.js must set window.TRAIL to an object.");
  process.exit(1);
}

for (const key of ["eras", "types", "access", "costs", "routes", "sites"]) {
  if (!Array.isArray(data[key])) err(`window.TRAIL.${key} must be a list.`);
}
if (errors.length) report();

const ids = (list) => new Set(list.map((x) => x.id));
const ERAS = ids(data.eras);
const TYPES = ids(data.types);
const ACCESS = ids(data.access);
const COSTS = ids(data.costs);
const ROUTES = ids(data.routes);

// North Alabama, with some margin.
const BOUNDS = { minLat: 34.2, maxLat: 35.1, minLng: -87.6, maxLng: -85.6 };

const REQUIRED_TEXT = ["id", "name", "address", "hours", "summary", "history"];
const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const seen = new Set();
const siteIds = new Set(data.sites.map((s) => s.id));

data.sites.forEach((site, i) => {
  const label = site.id ? `Site "${site.id}"` : `Site #${i + 1}`;

  for (const field of REQUIRED_TEXT) {
    if (typeof site[field] !== "string" || !site[field].trim()) err(`${label}: "${field}" is missing or empty.`);
  }

  if (site.id) {
    if (!ID_PATTERN.test(site.id)) err(`${label}: "id" must be lowercase words joined by hyphens.`);
    if (seen.has(site.id)) err(`${label}: "id" is used more than once.`);
    seen.add(site.id);
  }

  if (!ERAS.has(site.era)) err(`${label}: "era" must be one of ${[...ERAS].join(", ")}.`);
  if (!TYPES.has(site.type)) err(`${label}: "type" must be one of ${[...TYPES].join(", ")}.`);
  if (!ACCESS.has(site.access)) err(`${label}: "access" must be one of ${[...ACCESS].join(", ")}.`);
  if (!COSTS.has(site.cost)) err(`${label}: "cost" must be one of ${[...COSTS].join(", ")}.`);

  if (typeof site.lat !== "number" || typeof site.lng !== "number") {
    err(`${label}: "lat" and "lng" must be numbers.`);
  } else if (site.lat < BOUNDS.minLat || site.lat > BOUNDS.maxLat || site.lng < BOUNDS.minLng || site.lng > BOUNDS.maxLng) {
    err(`${label}: coordinates ${site.lat}, ${site.lng} are outside north Alabama. Check that "lng" is negative.`);
  }

  if (site.precision !== undefined && site.precision !== "approximate") {
    err(`${label}: "precision" must be "approximate" or left out.`);
  }

  if (!Array.isArray(site.sources) || site.sources.length === 0) {
    err(`${label}: add at least one source.`);
  } else {
    site.sources.forEach((src, j) => {
      if (!src || typeof src.label !== "string" || !src.label.trim()) err(`${label}: source ${j + 1} needs a "label".`);
      if (!src || typeof src.url !== "string" || !/^https?:\/\/\S+$/.test(src.url)) err(`${label}: source ${j + 1} needs a "url" that starts with http:// or https://.`);
    });
  }

  if (site.lastVerified !== null && site.lastVerified !== undefined) {
    if (typeof site.lastVerified !== "string" || !DATE_PATTERN.test(site.lastVerified) || isNaN(Date.parse(site.lastVerified))) {
      err(`${label}: "lastVerified" must be null or a date like "2026-12-05".`);
    } else if (Date.parse(site.lastVerified) > Date.now() + 86400000) {
      err(`${label}: "lastVerified" is in the future.`);
    }
  } else {
    warn(`${label}: not verified yet.`);
  }

  if (!Array.isArray(site.routes)) {
    err(`${label}: "routes" must be a list. Use [] if the site isn't on a route.`);
  } else {
    for (const r of site.routes) {
      if (!ROUTES.has(r)) err(`${label}: route "${r}" doesn't exist.`);
    }
  }

  if (typeof site.summary === "string" && site.summary.length > 160) warn(`${label}: "summary" is over 160 characters. Keep it to one sentence.`);
  if (typeof site.history === "string") {
    const words = site.history.trim().split(/\s+/).length;
    if (words > 250) warn(`${label}: "history" is ${words} words. Aim for 100–200.`);
  }
});

data.routes.forEach((route) => {
  const label = `Route "${route.id}"`;
  for (const field of ["id", "name", "duration", "description"]) {
    if (typeof route[field] !== "string" || !route[field].trim()) err(`${label}: "${field}" is missing or empty.`);
  }
  if (!Array.isArray(route.stops) || route.stops.length < 2) {
    err(`${label}: needs at least 2 stops.`);
    return;
  }
  const stops = new Set();
  for (const id of route.stops) {
    if (!siteIds.has(id)) err(`${label}: stop "${id}" isn't a site id.`);
    if (stops.has(id)) err(`${label}: stop "${id}" is listed twice.`);
    stops.add(id);
    const site = data.sites.find((s) => s.id === id);
    if (site && Array.isArray(site.routes) && !site.routes.includes(route.id)) {
      err(`${label}: includes "${id}", but that site's "routes" list doesn't include "${route.id}".`);
    }
  }
  for (const site of data.sites) {
    if (Array.isArray(site.routes) && site.routes.includes(route.id) && !stops.has(site.id)) {
      err(`Site "${site.id}": lists route "${route.id}", but the route's "stops" don't include it.`);
    }
  }
});

for (const era of data.eras) {
  if (!/^#[0-9a-fA-F]{6}$/.test(era.color ?? "")) err(`Era "${era.id}": "color" must be a hex color like "#1971c2".`);
}

report();

function report() {
  const verified = data.sites?.filter((s) => s.lastVerified).length ?? 0;
  if (warnings.length) {
    const unverified = warnings.filter((w) => w.endsWith("not verified yet.")).length;
    const other = warnings.filter((w) => !w.endsWith("not verified yet."));
    if (unverified) console.log(`Note: ${unverified} site(s) aren't verified yet.`);
    for (const w of other) console.log(`Warning: ${w}`);
  }
  if (errors.length) {
    console.error(`\n${errors.length} error(s) in data/sites.js:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`OK: ${data.sites.length} sites (${verified} verified) and ${data.routes.length} routes passed.`);
  process.exit(0);
}
