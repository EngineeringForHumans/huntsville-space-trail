// Huntsville Space Trail site data.
// Every site is UNVERIFIED until someone confirms its location, access, and facts.
// When you verify a site, set `lastVerified` to the date (YYYY-MM-DD) and fix `lat`/`lng`.
// `precision: "approximate"` flags pins that are known to be rough guesses.
// `credits` (optional) lists who added, verified, or edited a site. See CONTRIBUTING.md#get-credit.

window.TRAIL = {
  eras: [
    { id: "arrival-redstone", label: "Arrival & Redstone", years: "1950–1959", color: "#d9480f" },
    { id: "saturn-apollo", label: "Saturn & Apollo", years: "1960–1975", color: "#1971c2" },
    { id: "shuttle-iss", label: "Skylab, Shuttle & ISS", years: "1973–2011", color: "#0c8599" },
    { id: "artemis", label: "SLS & Artemis", years: "2011–today", color: "#7048e8" },
    { id: "multi", label: "Spans many eras", years: "1950–today", color: "#5c6370" }
  ],

  types: [
    { id: "hardware", label: "Hardware on display" },
    { id: "test-facility", label: "Test facility or landmark" },
    { id: "marker", label: "Historical marker" },
    { id: "neighborhood", label: "Neighborhood or gathering place" },
    { id: "institution", label: "Institution" },
    { id: "museum", label: "Museum or memorial" },
    { id: "trail", label: "Public art and trails" }
  ],

  access: [
    { id: "open", label: "Open to the public", short: "Open" },
    { id: "viewable", label: "Viewable from outside", short: "Viewable" },
    { id: "restricted", label: "Restricted", short: "Restricted" }
  ],

  costs: [
    { id: "free", label: "Free" },
    { id: "paid", label: "Paid admission" }
  ],

  routes: [
    {
      id: "von-braun",
      name: "Von Braun's Huntsville",
      duration: "Half day, by car",
      description: "Downtown, where the Rocket Team first settled, then up Monte Sano, where many team families moved in the 1950s.",
      stops: ["courthouse-square", "church-of-the-nativity", "maple-hill", "von-braun-center", "monte-sano-marker", "vbas-planetarium"]
    },
    {
      id: "hardware-drive",
      name: "Rocket hardware drive",
      duration: "Half day, by car",
      description: "Real rockets and flight hardware on public display, from a Saturn IB on I-65 to the ISS node at the Botanical Garden.",
      stops: ["ardmore-saturn-ib", "ussrc", "saturn-v-replica", "botanical-garden-node", "hermes-missile", "lunar-lander-tire-world"]
    },
    {
      id: "downtown-walk",
      name: "Downtown on foot",
      duration: "1–2 hours, walking",
      description: "A short walk through downtown: the 1969 celebration site, the Secret Artemis Trail, and the civic center named for von Braun.",
      stops: ["secret-artemis-trail", "courthouse-square", "church-of-the-nativity", "von-braun-center"]
    }
  ],

  sites: [
    {
      id: "ussrc",
      name: "U.S. Space & Rocket Center",
      lat: 34.7113, lng: -86.6536,
      address: "1 Tranquility Base, Huntsville",
      era: "multi", type: "museum", access: "open", cost: "paid",
      hours: "Daily. Check the museum's website for current hours and prices.",
      summary: "Alabama's space museum, with Rocket Park and a real Saturn V.",
      history: "The museum opened in 1970, and von Braun championed it as a home for the rockets his teams built. Rocket Park displays Army and NASA rockets from the Redstone era onward. The Davidson Center for Space Exploration houses a real Saturn V moon rocket, suspended horizontally so you can walk its full length. The museum is also the official visitor center for NASA's Marshall Space Flight Center.",
      sources: [
        { label: "Encyclopedia of Alabama: U.S. Space & Rocket Center", url: "https://encyclopediaofalabama.org/article/u-s-space-rocket-center/" },
        { label: "NASA: Marshall's Rocket Park", url: "https://www.nasa.gov/image-article/nasa-marshall-centers-rocket-park/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "saturn-v-replica",
      name: "Saturn V replica",
      lat: 34.7104, lng: -86.6552,
      address: "U.S. Space & Rocket Center grounds, next to I-565",
      era: "saturn-apollo", type: "hardware", access: "viewable", cost: "free",
      hours: "Visible at any time from I-565 and the museum parking lot.",
      summary: "A full-size standing Saturn V that you can see from the interstate.",
      history: "This full-scale replica stands upright at 363 feet, the same height as the real rocket. It's one of the most recognizable landmarks in Huntsville. The Saturn V was designed and managed at Marshall Space Flight Center, and it launched every Apollo crew that went to the Moon.",
      sources: [
        { label: "Encyclopedia of Alabama: U.S. Space & Rocket Center", url: "https://encyclopediaofalabama.org/article/u-s-space-rocket-center/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "pathfinder",
      name: "Space Shuttle Pathfinder",
      lat: 34.7118, lng: -86.6527,
      precision: "approximate",
      address: "U.S. Space & Rocket Center grounds",
      era: "shuttle-iss", type: "hardware", access: "open", cost: "paid",
      hours: "Visible during museum hours.",
      summary: "A shuttle test article displayed with an external tank and boosters.",
      history: "Marshall built Pathfinder in 1977 as a full-size test article with the weight and shape of a real orbiter. Engineers used it to check handling equipment and facilities. At the museum it sits on an external tank with two solid rocket boosters, so you can see the full launch configuration of the Space Shuttle.",
      sources: [
        { label: "Encyclopedia of Alabama: U.S. Space & Rocket Center", url: "https://encyclopediaofalabama.org/article/u-s-space-rocket-center/" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "miss-baker",
      name: "Miss Baker's grave",
      lat: 34.7108, lng: -86.6543,
      precision: "approximate",
      address: "U.S. Space & Rocket Center, near the main entrance",
      era: "arrival-redstone", type: "museum", access: "open", cost: "paid",
      hours: "Museum hours.",
      summary: "The grave of a squirrel monkey who flew to space in 1959.",
      history: "In May 1959, Miss Baker and a rhesus monkey named Able rode a Jupiter rocket on a suborbital flight and were recovered alive. The Jupiter was developed by the Army Ballistic Missile Agency at Redstone Arsenal. Miss Baker later lived at the museum and is buried on its grounds. Space Camp students often leave bananas on her headstone.",
      sources: [
        { label: "Dawn: Huntsville's space history", url: "https://www.dawn.com/news/1425457/i.dawn.com" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "space-camp",
      name: "Space Camp",
      lat: 34.7128, lng: -86.6512,
      precision: "approximate",
      address: "U.S. Space & Rocket Center campus",
      era: "shuttle-iss", type: "institution", access: "restricted", cost: "paid",
      hours: "Open to registered campers only.",
      summary: "The camp that has trained students as astronaut candidates since 1982.",
      history: "Space Camp opened in 1982, inspired by von Braun's idea of a camp where young people could learn about spaceflight. Its training simulators and mission programs have hosted students and adults from around the world. You can see the buildings from the museum grounds, but the programs are for registered campers.",
      sources: [
        { label: "Space Camp: History and overview", url: "https://spacecamp.com/node/9" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "cockpit-trail",
      name: "Cockpit Trail",
      lat: 34.7075, lng: -86.6605,
      precision: "approximate",
      address: "Trails behind the U.S. Space & Rocket Center, near the campground",
      era: "multi", type: "trail", access: "open", cost: "free",
      hours: "Daylight hours.",
      summary: "A wooded hiking and biking loop with old aircraft and rocket parts.",
      history: "The trail system behind the museum includes the Cockpit Trail, named for an old aircraft cockpit near the top of the loop. Other aircraft and rocket parts are scattered along the way. It's an unusual way to see space hardware outside the museum's walls.",
      sources: [
        { label: "Huntsville CVB: Hiking trails behind the Space & Rocket Center", url: "https://www.huntsville.org/blog/list/post/unexpected-space-encounters-hiking-trails-behind-the-us-space-rocket-center-in-huntsville/" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "msfc",
      name: "Marshall Space Flight Center",
      lat: 34.6466, lng: -86.6738,
      precision: "approximate",
      address: "Redstone Arsenal",
      era: "multi", type: "test-facility", access: "restricted", cost: "free",
      hours: "Not open to the public. Check the U.S. Space & Rocket Center for any current tours.",
      summary: "The NASA center that built the Saturn V and now manages SLS.",
      history: "NASA opened Marshall on July 1, 1960, and President Eisenhower dedicated it that September. Von Braun was its first director, and most of his Army rocket team transferred to NASA. Marshall developed the Saturn rockets for Apollo, the Skylab space station, and Shuttle propulsion. Today it manages the Space Launch System for the Artemis program.",
      sources: [
        { label: "NASA: Visit Marshall Space Flight Center", url: "https://www.nasa.gov/marshall/visit-marshall-space-flight-center" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "saturn-v-dynamic-test-stand",
      name: "Saturn V Dynamic Test Stand",
      lat: 34.6302, lng: -86.6720,
      precision: "approximate",
      address: "Marshall Space Flight Center, Redstone Arsenal",
      era: "saturn-apollo", type: "test-facility", access: "restricted", cost: "free",
      hours: "Not open to the public.",
      summary: "The tower where engineers shook a complete Saturn V to test it.",
      history: "Engineers built this tower in the 1960s to test how a fully assembled Saturn V responded to the vibrations of flight. It later held the Space Shuttle Enterprise for similar tests. The stand was designated a National Historic Landmark in 1985.",
      sources: [
        { label: "NPS: NASA National Historic Landmarks", url: "https://www.nps.gov/articles/nasa-nhls.htm" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "redstone-test-stand",
      name: "Redstone Test Stand",
      lat: 34.6275, lng: -86.6700,
      precision: "approximate",
      address: "Marshall Space Flight Center, Redstone Arsenal",
      era: "arrival-redstone", type: "test-facility", access: "restricted", cost: "free",
      hours: "Not open to the public.",
      summary: "Where the von Braun team test-fired Redstone rockets in the 1950s.",
      history: "The Army built this stand in the early 1950s to static-fire Redstone rockets. Rockets tested here led to the launch of Explorer 1, the first U.S. satellite, and to the Mercury-Redstone flights that carried the first American astronauts. It's a National Historic Landmark.",
      sources: [
        { label: "NPS: NASA National Historic Landmarks", url: "https://www.nps.gov/articles/nasa-nhls.htm" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "pstf",
      name: "Propulsion and Structural Test Facility",
      lat: 34.6290, lng: -86.6650,
      precision: "approximate",
      address: "Marshall Space Flight Center, Redstone Arsenal",
      era: "saturn-apollo", type: "test-facility", access: "restricted", cost: "free",
      hours: "Not open to the public.",
      summary: "A test tower used for Army missiles and early Saturn stages.",
      history: "Built in the late 1950s, this facility tested Army missile stages and then the first stage of the Saturn I, the first of the Saturn family. It's a National Historic Landmark.",
      sources: [
        { label: "NPS: NASA National Historic Landmarks", url: "https://www.nps.gov/articles/nasa-nhls.htm" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "neutral-buoyancy-simulator",
      name: "Neutral Buoyancy Simulator",
      lat: 34.6458, lng: -86.6660,
      precision: "approximate",
      address: "Marshall Space Flight Center, Redstone Arsenal",
      era: "shuttle-iss", type: "test-facility", access: "restricted", cost: "free",
      hours: "Not open to the public.",
      summary: "A giant water tank where astronauts practiced spacewalks.",
      history: "Floating in water is the closest thing on Earth to weightlessness. Astronauts and engineers used this tank to rehearse work in space, including repairs to Skylab and procedures for the Hubble Space Telescope. It's a National Historic Landmark.",
      sources: [
        { label: "NPS: NASA National Historic Landmarks", url: "https://www.nps.gov/articles/nasa-nhls.htm" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "redstone-arsenal",
      name: "Redstone Arsenal",
      lat: 34.6600, lng: -86.6450,
      precision: "approximate",
      address: "South and west of Huntsville",
      era: "arrival-redstone", type: "test-facility", access: "restricted", cost: "free",
      hours: "Military installation. Not open to the public.",
      summary: "The Army post where Huntsville's rocket history began in 1950.",
      history: "In 1950, the Army moved von Braun's team of German rocket engineers, along with American soldiers and civilians, from Fort Bliss, Texas, to Redstone Arsenal. Many of the Germans had built the V-2 missile in Nazi Germany, a program that used concentration-camp forced labor. At Redstone, the team developed the Redstone and Jupiter missiles and, in 1958, launched Explorer 1, the first U.S. satellite.",
      sources: [
        { label: "HMDB: Sunrise Terrace marker", url: "https://www.hmdb.org/m.asp?m=85601" },
        { label: "Army.mil: Tribute to pioneers of space rocketry", url: "https://www.army.mil/article/42499/lasting_tribute_to_pioneers_of_space_rocketry" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "courthouse-square",
      name: "Courthouse Square",
      lat: 34.7304, lng: -86.5861,
      address: "100 Northside Square, Huntsville",
      era: "saturn-apollo", type: "neighborhood", access: "open", cost: "free",
      hours: "Open at all times.",
      summary: "Where Huntsville celebrated the Apollo 11 Moon landing in 1969.",
      history: "After Apollo 11 landed on the Moon in July 1969, crowds filled the square around the Madison County Courthouse. People carried von Braun through the crowd on their shoulders. The Saturn V that launched the mission had been designed and managed in Huntsville.",
      sources: [
        { label: "Huntsville CVB: Visiting von Braun's Huntsville", url: "https://www.huntsville.org/blog/list/post/how-to-visit-von-brauns-huntsville/" },
        { label: "Huntsville CVB: Rocket City history", url: "https://huntsville.org/rocket-city/history" }
      ],
      lastVerified: null,
      routes: ["von-braun", "downtown-walk"]
    },
    {
      id: "church-of-the-nativity",
      name: "Church of the Nativity",
      lat: 34.7287, lng: -86.5842,
      address: "208 Eustis Avenue SE, Huntsville",
      era: "arrival-redstone", type: "neighborhood", access: "viewable", cost: "free",
      hours: "View from the street. Check with the church before you go inside.",
      summary: "A historic downtown church on the visitor bureau's von Braun tour.",
      history: "The visitor bureau's guide to von Braun's Huntsville starts here and in the streets around the church. In the early 1950s, many members of the rocket team lived in the older neighborhoods close to downtown.",
      sources: [
        { label: "Huntsville CVB: Visiting von Braun's Huntsville", url: "https://www.huntsville.org/blog/list/post/how-to-visit-von-brauns-huntsville/" }
      ],
      lastVerified: null,
      routes: ["von-braun", "downtown-walk"]
    },
    {
      id: "maple-hill",
      name: "Maple Hill Cemetery area",
      lat: 34.7266, lng: -86.5770,
      address: "203 Maple Hill Drive SE, Huntsville",
      era: "arrival-redstone", type: "neighborhood", access: "open", cost: "free",
      hours: "Cemetery hours. Please respect private homes nearby.",
      summary: "The neighborhood where the von Brauns first lived in Huntsville.",
      history: "When they first arrived in Huntsville, the von Brauns and many other German team members lived close to Maple Hill Cemetery, the city's oldest. Von Braun's daughter Margrit has recalled those years fondly. The homes are private, so this trail marks the area, not individual houses.",
      sources: [
        { label: "Huntsville CVB: Visiting von Braun's Huntsville", url: "https://www.huntsville.org/blog/list/post/how-to-visit-von-brauns-huntsville/" }
      ],
      lastVerified: null,
      routes: ["von-braun"]
    },
    {
      id: "sunrise-terrace",
      name: "Sunrise Terrace marker",
      lat: 34.7230, lng: -86.5600,
      precision: "approximate",
      address: "Sunrise Terrace neighborhood, Huntsville",
      era: "arrival-redstone", type: "marker", access: "viewable", cost: "free",
      hours: "Viewable from the street.",
      summary: "A neighborhood built on a farm that Rocket Team members bought in 1950.",
      history: "According to the historical marker, a group of von Braun's team members bought a local farm in 1950, and it became the Sunrise Terrace subdivision. It's one of the first places where the team put down roots in Huntsville.",
      sources: [
        { label: "HMDB: Sunrise Terrace marker", url: "https://www.hmdb.org/m.asp?m=85601" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "monte-sano-marker",
      name: "Monte Sano Space Age marker",
      lat: 34.7375, lng: -86.5310,
      precision: "approximate",
      address: "Monte Sano Elementary School, Monte Sano Boulevard",
      era: "arrival-redstone", type: "marker", access: "viewable", cost: "free",
      hours: "Viewable from the street. Don't enter school grounds during school hours.",
      summary: "A marker about the space-program families who settled on Monte Sano.",
      history: "The marker describes how Monte Sano grew during the Space Age. By 1958, about 100 families connected with the space program lived on the mountain, and many were members of von Braun's rocket team.",
      sources: [
        { label: "City of Huntsville: Historic markers", url: "https://www.huntsvilleal.gov/?p=33376" }
      ],
      lastVerified: null,
      routes: ["von-braun"]
    },
    {
      id: "vbas-planetarium",
      name: "Von Braun Astronomical Society planetarium",
      lat: 34.7440, lng: -86.5130,
      precision: "approximate",
      address: "Monte Sano State Park, Huntsville",
      era: "arrival-redstone", type: "institution", access: "open", cost: "paid",
      hours: "Public programs on select evenings. Check the society's schedule. The state park charges an entry fee.",
      summary: "An observatory and planetarium that von Braun helped build.",
      history: "Von Braun helped found this astronomy society in the 1950s and helped build its planetarium on Monte Sano. According to the visitor bureau, the planetarium's dome is reused Saturn rocket hardware. The society still runs public sky shows and telescope nights.",
      sources: [
        { label: "Huntsville CVB: Visiting von Braun's Huntsville", url: "https://www.huntsville.org/blog/list/post/how-to-visit-von-brauns-huntsville/" }
      ],
      lastVerified: null,
      routes: ["von-braun"]
    },
    {
      id: "von-braun-center",
      name: "Von Braun Center",
      lat: 34.7240, lng: -86.5893,
      address: "700 Monroe Street SW, Huntsville",
      era: "saturn-apollo", type: "institution", access: "viewable", cost: "free",
      hours: "Open during events.",
      summary: "Huntsville's civic center, named for Wernher von Braun.",
      history: "The city opened this arena and concert hall in 1975 as the Von Braun Civic Center. The name reflects how closely Huntsville tied its identity to the rocket program. Von Braun also helped start the Huntsville Symphony Orchestra, which performs here.",
      sources: [
        { label: "Huntsville CVB: Visiting von Braun's Huntsville", url: "https://www.huntsville.org/blog/list/post/how-to-visit-von-brauns-huntsville/" }
      ],
      lastVerified: null,
      routes: ["von-braun", "downtown-walk"]
    },
    {
      id: "uah",
      name: "University of Alabama in Huntsville",
      lat: 34.7252, lng: -86.6400,
      precision: "approximate",
      address: "301 Sparkman Drive NW, Huntsville",
      era: "saturn-apollo", type: "institution", access: "viewable", cost: "free",
      hours: "Campus is open. Check building hours before you visit.",
      summary: "A university campus that the rocket team pushed the state to build.",
      history: "Von Braun and his colleagues pushed for a state university campus in Huntsville so engineers could train and study close to the rocket program. The campus grew into the University of Alabama in Huntsville, which remains closely tied to aerospace research.",
      sources: [
        { label: "American Heritage", url: "https://www.americanheritage.com/node/133443?issue=133426" }
      ],
      lastVerified: null,
      routes: []
    },
    {
      id: "hermes-missile",
      name: "Hermes Guided Missile",
      lat: 34.6905, lng: -86.5715,
      precision: "approximate",
      address: "Airport Road at Memorial Parkway, Huntsville",
      era: "arrival-redstone", type: "hardware", access: "viewable", cost: "free",
      hours: "Viewable at any time.",
      summary: "One of the first American guided missiles ever put on public display.",
      history: "The Hermes program was an early U.S. Army effort to build guided missiles after World War II, and it drew on lessons from the captured V-2. According to the visitor bureau, this Hermes was the first American-made guided missile put on public display.",
      sources: [
        { label: "Huntsville CVB: North Alabama Rocket Trail", url: "https://www.huntsville.org/blog/post/north-alabama-rocket-trail/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "botanical-garden-node",
      name: "ISS connecting node",
      lat: 34.7106, lng: -86.6365,
      precision: "approximate",
      address: "Huntsville Botanical Garden, 4747 Bob Wallace Avenue SW",
      era: "shuttle-iss", type: "hardware", access: "open", cost: "paid",
      hours: "Garden hours. Admission required.",
      summary: "A space station node in the Botanical Garden's Children's Garden.",
      history: "Boeing built this space station connecting node in 1988. NASA gave it to the Botanical Garden in 1994, and it now sits in the Children's Garden. Connecting nodes like this one link the modules of a space station.",
      sources: [
        { label: "Huntsville CVB: North Alabama Rocket Trail", url: "https://www.huntsville.org/blog/post/north-alabama-rocket-trail/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "ardmore-saturn-ib",
      name: "Saturn IB at the Ardmore Welcome Center",
      lat: 34.9790, lng: -86.8590,
      precision: "approximate",
      address: "Alabama Welcome Center, I-65 South, near Ardmore",
      era: "saturn-apollo", type: "hardware", access: "open", cost: "free",
      hours: "Welcome center hours. The rocket is visible from I-65.",
      summary: "A Saturn IB rocket that greets drivers entering Alabama on I-65.",
      history: "The Saturn IB was a smaller sibling of the Saturn V, and Marshall managed its development. It launched Apollo 7, the three Skylab crews, and the U.S. half of the Apollo-Soyuz Test Project. This one stands at the state welcome center, about 25 miles northwest of downtown Huntsville.",
      sources: [
        { label: "Huntsville CVB: North Alabama Rocket Trail", url: "https://www.huntsville.org/blog/post/north-alabama-rocket-trail/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "lunar-lander-tire-world",
      name: "Lunar lander model at Used Tire World",
      lat: 34.7180, lng: -86.6080,
      precision: "approximate",
      address: "Governors Drive, Huntsville",
      era: "saturn-apollo", type: "hardware", access: "viewable", cost: "free",
      hours: "Viewable from the road. This is a private business.",
      summary: "A roadside lunar lander model at a tire shop.",
      history: "The visitor bureau listed this lunar lander model as a bonus stop on its 2016 rocket trail. It shows how deeply the space program runs through everyday Huntsville. Confirm that it's still there before you make a special trip.",
      sources: [
        { label: "Huntsville CVB: North Alabama Rocket Trail", url: "https://www.huntsville.org/blog/post/north-alabama-rocket-trail/" }
      ],
      lastVerified: null,
      routes: ["hardware-drive"]
    },
    {
      id: "secret-artemis-trail",
      name: "Secret Artemis Trail",
      lat: 34.7310, lng: -86.5905,
      precision: "approximate",
      address: "Starts at the Huntsville/Madison County Visitor Center, downtown",
      era: "artemis", type: "trail", access: "open", cost: "free",
      hours: "Pick up a trail card at the Visitor Center or download it online.",
      summary: "Twelve small rockets hidden around downtown for you to find.",
      history: "This scavenger hunt hides twelve one-foot-tall rocket replicas around downtown, paired with public art. It celebrates Huntsville's role in Artemis II, including hardware built at Marshall for the Space Launch System. The trail card lists general locations for each rocket.",
      sources: [
        { label: "Huntsville CVB: Secret Artemis Trail", url: "https://huntsville.org/things-to-do/scavenger-hunts-and-trails/secret-artemis-trail" },
        { label: "Huntsville Business Journal: Trail returns", url: "https://huntsvillebusinessjournal.com/news/2025/12/29/secret-artemis-ii-downtown-art-trail-returns-inviting-families-to-explore-huntsvilles-space-legacy/" }
      ],
      lastVerified: null,
      routes: ["downtown-walk"]
    }
  ]
};
