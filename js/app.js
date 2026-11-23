(function () {
  "use strict";

  const DATA = window.TRAIL;
  const HUNTSVILLE = [34.7304, -86.5861];

  const byId = (list) => Object.fromEntries(list.map((x) => [x.id, x]));
  const ERAS = byId(DATA.eras);
  const TYPES = byId(DATA.types);
  const ACCESS = byId(DATA.access);
  const COSTS = byId(DATA.costs);
  const ROUTES = byId(DATA.routes);
  const SITES = byId(DATA.sites);

  const FILTER_GROUPS = [
    { key: "era", label: "Era", options: DATA.eras, swatch: true },
    { key: "type", label: "Site type", options: DATA.types },
    { key: "access", label: "Access", options: DATA.access },
    { key: "cost", label: "Cost", options: DATA.costs }
  ];

  const state = {
    filters: { era: new Set(), type: new Set(), access: new Set(), cost: new Set() },
    query: "",
    route: "",
    userLoc: null,
    sortByDistance: false,
    selected: null
  };

  const $ = (sel) => document.querySelector(sel);
  const els = {
    search: $("#search"),
    routeSelect: $("#route-select"),
    routeInfo: $("#route-info"),
    filterGroups: $("#filter-groups"),
    filterCount: $("#filter-count"),
    clearFilters: $("#clear-filters"),
    resultCount: $("#result-count"),
    nearMe: $("#near-me"),
    list: $("#site-list"),
    detail: $("#detail"),
    detailBody: $("#detail-body"),
    detailClose: $("#detail-close"),
    legend: $("#legend"),
    about: $("#about"),
    aboutBtn: $("#about-btn"),
    filtersDetails: $("#filters")
  };

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---------- Map ----------

  const map = L.map("map", { zoomControl: true }).setView(HUNTSVILLE, 11);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  let userMarker = null;
  const markers = {};

  function markerStyle(site, active) {
    const color = ERAS[site.era].color;
    const restricted = site.access === "restricted";
    return {
      radius: active ? 11 : 8,
      color: active ? "#ffffff" : color,
      weight: active ? 3 : 2,
      fillColor: color,
      fillOpacity: restricted ? 0.25 : 0.9,
      dashArray: restricted ? "3 3" : null
    };
  }

  DATA.sites.forEach((site) => {
    const m = L.circleMarker([site.lat, site.lng], markerStyle(site, false));
    m.bindTooltip(site.name, { direction: "top", offset: [0, -6] });
    m.on("click", () => selectSite(site.id, { pan: false }));
    markers[site.id] = m;
  });

  function renderLegend() {
    const eras = DATA.eras.map((e) =>
      `<div><span class="swatch" style="background:${e.color}"></span>${esc(e.label)}</div>`).join("");
    els.legend.innerHTML = eras + `<div><span class="ring"></span>Restricted (approximate)</div>`;
  }

  // ---------- Filtering ----------

  function matches(site) {
    const f = state.filters;
    if (f.era.size && !f.era.has(site.era)) return false;
    if (f.type.size && !f.type.has(site.type)) return false;
    if (f.access.size && !f.access.has(site.access)) return false;
    if (f.cost.size && !f.cost.has(site.cost)) return false;
    if (state.query) {
      const hay = `${site.name} ${site.summary} ${site.history} ${site.address}`.toLowerCase();
      if (!hay.includes(state.query)) return false;
    }
    return true;
  }

  function visibleSites() {
    if (state.route) {
      // A route shows its stops in order and ignores filters.
      return ROUTES[state.route].stops.map((id) => SITES[id]).filter(Boolean);
    }
    let list = DATA.sites.filter(matches);
    if (state.sortByDistance && state.userLoc) {
      list = list.slice().sort((a, b) => distanceMiles(a) - distanceMiles(b));
    } else {
      list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }

  function distanceMiles(site) {
    if (!state.userLoc) return null;
    const R = 3958.8;
    const toRad = (d) => (d * Math.PI) / 180;
    const [lat1, lng1] = state.userLoc;
    const dLat = toRad(site.lat - lat1);
    const dLng = toRad(site.lng - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(site.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function activeFilterCount() {
    return Object.values(state.filters).reduce((n, s) => n + s.size, 0);
  }

  // ---------- Rendering ----------

  function renderFilters() {
    els.filterGroups.innerHTML = FILTER_GROUPS.map((g) => `
      <div class="filter-group">
        <h3>${esc(g.label)}</h3>
        <div class="chips">
          ${g.options.map((o) => `
            <button type="button" class="chip" data-filter="${g.key}" data-value="${o.id}"
              aria-pressed="${state.filters[g.key].has(o.id)}">
              ${g.swatch ? `<span class="swatch" style="background:${o.color}"></span>` : ""}${esc(o.label)}
            </button>`).join("")}
        </div>
      </div>`).join("");
  }

  function renderRouteOptions() {
    DATA.routes.forEach((r) => {
      const opt = document.createElement("option");
      opt.value = r.id;
      opt.textContent = `${r.name} (${r.stops.length} stops)`;
      els.routeSelect.appendChild(opt);
    });
  }

  function routeDirectionsUrl(route) {
    const stops = route.stops.map((id) => SITES[id]).filter(Boolean);
    const pt = (s) => `${s.lat},${s.lng}`;
    const origin = pt(stops[0]);
    const destination = pt(stops[stops.length - 1]);
    const waypoints = stops.slice(1, -1).map(pt).join("|");
    const mode = route.duration.includes("walking") ? "walking" : "driving";
    const params = new URLSearchParams({ api: "1", origin, destination, travelmode: mode });
    if (waypoints) params.set("waypoints", waypoints);
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function renderRouteInfo() {
    if (!state.route) {
      els.routeInfo.hidden = true;
      els.filtersDetails.hidden = false;
      return;
    }
    const r = ROUTES[state.route];
    els.routeInfo.hidden = false;
    els.filtersDetails.hidden = true;
    els.routeInfo.innerHTML = `
      <p><strong>${esc(r.duration)}.</strong> ${esc(r.description)}</p>
      <a class="btn-secondary" href="${esc(routeDirectionsUrl(r))}" target="_blank" rel="noopener">Open route in Google Maps</a>`;
  }

  function renderList(sites) {
    els.resultCount.textContent = state.route
      ? `${sites.length} stops`
      : `${sites.length} of ${DATA.sites.length} sites`;

    if (!sites.length) {
      els.list.innerHTML = `<li class="empty">No sites match these filters. Try clearing a filter or your search.</li>`;
      return;
    }

    els.list.innerHTML = sites.map((s, i) => {
      const dist = distanceMiles(s);
      const lead = state.route
        ? `<span class="step" aria-hidden="true">${i + 1}</span>`
        : `<span class="dot" style="background:${ERAS[s.era].color}" aria-hidden="true"></span>`;
      return `
        <li>
          <button type="button" class="site-card${state.selected === s.id ? " active" : ""}" data-site="${s.id}">
            ${lead}
            <span>
              <span class="name">${esc(s.name)}</span>
              <span class="summary">${esc(s.summary)}</span>
              <span class="meta">
                <span class="badge ${s.access}">${esc(ACCESS[s.access].short)}</span>
                ${s.access !== "restricted" ? `<span class="badge plain">${esc(COSTS[s.cost].label)}</span>` : ""}
                ${dist != null ? `<span class="distance">${dist.toFixed(1)} mi</span>` : ""}
              </span>
            </span>
          </button>
        </li>`;
    }).join("");
  }

  function renderMap(sites) {
    markerLayer.clearLayers();
    routeLayer.clearLayers();

    sites.forEach((s) => {
      markers[s.id].setStyle(markerStyle(s, state.selected === s.id));
      markerLayer.addLayer(markers[s.id]);
    });

    if (state.route && sites.length) {
      const pts = sites.map((s) => [s.lat, s.lng]);
      L.polyline(pts, { color: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#e8590c", weight: 3, opacity: 0.8, dashArray: "6 6" }).addTo(routeLayer);
      sites.forEach((s, i) => {
        L.marker([s.lat, s.lng], {
          icon: L.divIcon({ className: "", html: `<div class="step-marker">${i + 1}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
          keyboard: false
        }).on("click", () => selectSite(s.id, { pan: false }))
          .bindTooltip(s.name, { direction: "top", offset: [0, -12] })
          .addTo(routeLayer);
      });
    }
  }

  function fitTo(sites) {
    if (!sites.length) return;
    const bounds = L.latLngBounds(sites.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }

  function renderDetail() {
    const s = SITES[state.selected];
    if (!s) {
      els.detail.hidden = true;
      return;
    }
    const era = ERAS[s.era];
    const restricted = s.access === "restricted";
    const dest = `${s.lat},${s.lng}`;
    const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
    const viewUrl = `https://www.openstreetmap.org/?mlat=${s.lat}&mlon=${s.lng}#map=16/${s.lat}/${s.lng}`;
    const dist = distanceMiles(s);

    els.detailBody.innerHTML = `
      <h2 id="detail-name">${esc(s.name)}</h2>
      <div class="era-line"><span class="swatch" style="background:${era.color}"></span>${esc(era.label)} &middot; ${esc(era.years)}</div>
      <div class="badges">
        <span class="badge ${s.access}">${esc(ACCESS[s.access].label)}</span>
        <span class="badge plain">${esc(TYPES[s.type].label)}</span>
        ${!restricted ? `<span class="badge plain">${esc(COSTS[s.cost].label)}</span>` : ""}
        ${dist != null ? `<span class="badge plain">${dist.toFixed(1)} mi away</span>` : ""}
      </div>
      ${restricted ? `<div class="notice danger">This site isn't open to the public. The pin shows its approximate location.</div>` : ""}
      ${!restricted && s.precision === "approximate" ? `<div class="notice">This pin is approximate. Check the address before you go.</div>` : ""}
      <p class="lede">${esc(s.summary)}</p>
      <p>${esc(s.history)}</p>
      <dl>
        <dt>Where</dt><dd>${esc(s.address)}</dd>
        <dt>Visiting</dt><dd>${esc(s.hours)}</dd>
        <dt>Verified</dt><dd>${s.lastVerified ? esc(s.lastVerified) : "Not yet verified"}</dd>
      </dl>
      <div class="actions">
        ${restricted
          ? `<a class="btn-secondary" href="${esc(viewUrl)}" target="_blank" rel="noopener">View on OpenStreetMap</a>`
          : `<a class="btn-primary" href="${esc(dirUrl)}" target="_blank" rel="noopener">Get directions</a>`}
        <button type="button" class="btn-secondary" id="share-btn">Copy link</button>
      </div>
      <h3>Sources</h3>
      <ul class="sources">
        ${s.sources.map((src) => `<li><a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label)}</a></li>`).join("")}
      </ul>
      ${renderCredits(s)}`;
    els.detail.hidden = false;
    els.detail.scrollTop = 0;

    $("#share-btn").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      try {
        await navigator.clipboard.writeText(location.href);
        btn.textContent = "Link copied";
      } catch {
        btn.textContent = "Copy failed";
      }
      setTimeout(() => { btn.textContent = "Copy link"; }, 2000);
    });
  }

  const CREDIT_ROLES = {
    added: "Added this site",
    verified: "Verified",
    edited: "Edited",
    research: "Research",
    photo: "Photo"
  };

  function formatDate(iso) {
    const d = new Date(`${iso}T12:00:00`);
    return isNaN(d) ? iso : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function renderCredits(site) {
    const credits = Array.isArray(site.credits) ? site.credits : [];
    const contributeUrl = "https://github.com/EngineeringForHumans/huntsville-space-trail/blob/main/CONTRIBUTING.md";
    if (!credits.length) {
      return `
        <h3>Contributors</h3>
        <p class="credit-empty">No one has added or verified this site yet. <a href="${contributeUrl}" target="_blank" rel="noopener">Help check it</a> and get credit.</p>`;
    }
    const items = credits.map((c) => {
      const name = /^https:\/\//.test(c.url || "")
        ? `<a href="${esc(c.url)}" target="_blank" rel="noopener nofollow ugc">${esc(c.name)}</a>`
        : esc(c.name);
      const role = CREDIT_ROLES[c.role] || "Contributed";
      const date = c.date ? ` &middot; ${esc(formatDate(c.date))}` : "";
      return `<li><span class="credit-name">${name}</span><span class="credit-role">${esc(role)}${date}</span></li>`;
    }).join("");
    return `<h3>Contributors</h3><ul class="credits-list">${items}</ul>`;
  }

  function render({ fit = false } = {}) {
    const sites = visibleSites();
    renderList(sites);
    renderMap(sites);
    renderRouteInfo();
    renderDetail();
    const n = activeFilterCount();
    els.filterCount.hidden = n === 0;
    els.filterCount.textContent = n;
    if (fit) fitTo(sites);
  }

  // ---------- Actions ----------

  function selectSite(id, { pan = true } = {}) {
    state.selected = id;
    updateHash();
    render();
    if (id && pan) {
      const s = SITES[id];
      map.setView([s.lat, s.lng], Math.max(map.getZoom(), 14));
    }
    if (id) els.detailClose.focus({ preventScroll: true });
  }

  function closeDetail() {
    const prev = state.selected;
    state.selected = null;
    updateHash();
    render();
    const card = prev && els.list.querySelector(`[data-site="${prev}"]`);
    if (card) card.focus({ preventScroll: true });
  }

  function updateHash() {
    const params = new URLSearchParams();
    if (state.route) params.set("route", state.route);
    if (state.selected) params.set("site", state.selected);
    const hash = params.toString();
    history.replaceState(null, "", hash ? `#${hash}` : location.pathname + location.search);
  }

  function readHash() {
    const params = new URLSearchParams(location.hash.slice(1));
    const route = params.get("route");
    const site = params.get("site");
    state.route = route && ROUTES[route] ? route : "";
    state.selected = site && SITES[site] ? site : null;
    els.routeSelect.value = state.route;
  }

  function setView(view) {
    document.body.dataset.view = view;
    document.querySelectorAll("[data-view-btn]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.viewBtn === view)));
    if (view === "map") setTimeout(() => map.invalidateSize(), 0);
  }

  // ---------- Events ----------

  els.filterGroups.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const set = state.filters[chip.dataset.filter];
    const v = chip.dataset.value;
    set.has(v) ? set.delete(v) : set.add(v);
    chip.setAttribute("aria-pressed", String(set.has(v)));
    render();
  });

  els.clearFilters.addEventListener("click", () => {
    Object.values(state.filters).forEach((s) => s.clear());
    state.query = "";
    els.search.value = "";
    renderFilters();
    render({ fit: true });
  });

  els.search.addEventListener("input", () => {
    state.query = els.search.value.trim().toLowerCase();
    if (state.route) {
      state.route = "";
      els.routeSelect.value = "";
      updateHash();
    }
    render();
  });

  els.routeSelect.addEventListener("change", () => {
    state.route = els.routeSelect.value;
    state.selected = null;
    updateHash();
    render({ fit: true });
  });

  els.list.addEventListener("click", (e) => {
    const card = e.target.closest("[data-site]");
    if (card) selectSite(card.dataset.site);
  });

  els.detailClose.addEventListener("click", closeDetail);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.selected && !els.about.open) closeDetail();
  });

  els.nearMe.addEventListener("click", () => {
    if (state.sortByDistance) {
      state.sortByDistance = false;
      els.nearMe.setAttribute("aria-pressed", "false");
      els.nearMe.textContent = "Sort by distance";
      render();
      return;
    }
    if (!navigator.geolocation) {
      els.nearMe.textContent = "Location unavailable";
      return;
    }
    els.nearMe.textContent = "Finding you…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        state.userLoc = [pos.coords.latitude, pos.coords.longitude];
        state.sortByDistance = true;
        els.nearMe.setAttribute("aria-pressed", "true");
        els.nearMe.textContent = "Sorted by distance";
        if (userMarker) userMarker.remove();
        userMarker = L.circleMarker(state.userLoc, { radius: 7, color: "#fff", weight: 2, fillColor: "#1971c2", fillOpacity: 1 })
          .bindTooltip("You are here").addTo(map);
        render();
      },
      () => {
        els.nearMe.textContent = "Location blocked";
        setTimeout(() => { els.nearMe.textContent = "Sort by distance"; }, 2500);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  });

  document.querySelectorAll("[data-view-btn]").forEach((b) =>
    b.addEventListener("click", () => setView(b.dataset.viewBtn)));

  els.aboutBtn.addEventListener("click", () => els.about.showModal());

  function showSelectedOnMap() {
    if (!state.selected) return;
    const s = SITES[state.selected];
    map.setView([s.lat, s.lng], Math.max(map.getZoom(), 14));
  }

  window.addEventListener("hashchange", () => {
    readHash();
    render({ fit: !state.selected });
    showSelectedOnMap();
  });

  // ---------- Start ----------

  renderLegend();
  renderFilters();
  renderRouteOptions();
  readHash();
  // Keep the map sized correctly when the window or layout changes.
  new ResizeObserver(() => map.invalidateSize()).observe(document.getElementById("map"));
  render({ fit: !state.selected });
  showSelectedOnMap();
})();
