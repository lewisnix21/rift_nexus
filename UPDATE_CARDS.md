# How to Update the Card Database

When new Riftbound sets are released, follow these steps to update the card database, images, and CI map.

## Source
All card data comes from the **official Riftbound card gallery**:
`https://riftbound.leagueoflegends.com/en-us/card-gallery/`

The data is embedded in the page's `__NEXT_DATA__` JSON at:
`props.pageProps.page.blades[2].cards.items`

## Step 1: Extract Card Data

1. Open the card gallery in Chrome
2. Open DevTools Console (F12)
3. Run this script:

```javascript
var nd = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
var items = nd.props.pageProps.page.blades[2].cards.items;

var seen = {};
var cards = [];
items.forEach(function(c) {
  if (seen[c.name]) return;
  seen[c.name] = true;
  var tMap = {unit:"Unit",spell:"Spell",gear:"Gear",legend:"Legend",battlefield:"Battlefield",champion:"Champion",rune:"Rune"};
  var mainType = c.cardType.type[0] ? c.cardType.type[0].id : "";
  var domains = c.domain.values.map(function(v){return v.label;});
  var primaryDomain = domains[0] || "Colorless";
  var pwVal = c.power && c.power.value ? c.power.value.id : 0;
  var rc = [];
  if (pwVal > 0 && primaryDomain !== "Colorless") {
    for (var i = 0; i < pwVal; i++) rc.push(primaryDomain);
  }
  // Derive set code (OGN/SFD/UNL) from card image URL, which contains "OGN-XXX", "SFD-XXX", or "UNL-XXX" in the asset filename.
  // Falls back to scanning any string field on the card for a "(OGN|SFD|UNL)-..." token. If neither yields a hit, leave as null and the runtime setOf() helper picks it up.
  var setCode = null;
  var imgUrl = c.cardImage && c.cardImage.url ? c.cardImage.url : "";
  var setMatch = imgUrl.match(/(OGN|OGS|SFD|UNL)-[A-Z0-9]+/);
  if (!setMatch) {
    try { var blob = JSON.stringify(c); var m2 = blob.match(/(OGN|OGS|SFD|UNL)-[A-Z0-9]+/); if (m2) setMatch = m2; } catch(e) {}
  }
  if (setMatch) { setCode = setMatch[1] === "OGS" ? "OGN" : setMatch[1]; }
  cards.push({
    n: c.name,
    t: tMap[mainType] || mainType,
    d: primaryDomain,
    ds: domains,
    e: c.energy && c.energy.value ? c.energy.value.id : null,
    m: c.might && c.might.value ? c.might.value.id : null,
    kw: c.tags && c.tags.tags ? c.tags.tags : [],
    tx: c.text && c.text.richText ? c.text.richText.body.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim() : "",
    rc: rc,
    s: setCode
  });
});

// Download as db.js
var json = 'var DB=' + JSON.stringify(cards) + ';';
var blob = new Blob([json], {type:'application/javascript'});
var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
a.download = 'db.js'; document.body.appendChild(a); a.click();
console.log('Extracted ' + cards.length + ' cards');
```

## Step 2: Extract Card Images (CI map)

Run this in the same console session:

```javascript
var nd = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
var items = nd.props.pageProps.page.blades[2].cards.items;

var seen = {};
var ciMap = {};
items.forEach(function(c) {
  if (seen[c.name]) return;
  seen[c.name] = true;
  if (c.cardImage && c.cardImage.url) {
    var match = c.cardImage.url.match(/game_data_live\/([^?]+)/);
    if (match) ciMap[c.name] = match[1];
  }
});

// Add rune card images (these aren't in the gallery)
var runeImages = {
  "Body Rune":"3b3c3c07626d6180457c849047e0228dc0d19539-744x1039.png",
  "Calm Rune":"0a0e8c3d16c2595e2f8efcc2b1466226539b506c-744x1039.png",
  "Chaos Rune":"daf23b0deaa5e1a5a5d310b59e9ad25d1bd70363-744x1039.png",
  "Fury Rune":"12bcd0cde5d9ff4640e82945001e9fef863530f1-744x1039.png",
  "Mind Rune":"f99aa4874baaebd2e81798c8a3aa01c5900f6d30-744x1039.png",
  "Order Rune":"35ec6fdd2124324bb7052cba31c8c44f2e98f3ae-744x1039.png"
};
Object.keys(runeImages).forEach(function(k) { ciMap[k] = runeImages[k]; });

// Download as ci.js
var json = 'var CI=' + JSON.stringify(ciMap) + ';';
var blob = new Blob([json], {type:'application/javascript'});
var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
a.download = 'ci.js'; document.body.appendChild(a); a.click();
console.log('Extracted ' + Object.keys(ciMap).length + ' image hashes');
```

## Step 3: Replace Files

1. Copy the downloaded `db.js` and `ci.js` to the riftbound folder, replacing the old ones
2. In `riftbound_v10.html` AND `index.html` (the deployed file), find and replace:
   - Line starting with `var CI=` — replace with contents of new `ci.js`
   - Line starting with `var DB=` — replace with contents of new `db.js`

> **⚠ Source-of-truth gotcha**: the standalone `db.js` / `ci.js` / `pa_map.js` / `decks.js` files in the repo root are *working copies only*. The deployed page (`index.html`) inlines all four (`var DB=…`, `var CI=…`, `var PA=…`, `var DECKS=…`) directly inside its `<script>` block, and `firebase.json` rewrites all routes to `/index.html`. Editing the standalone file alone will NOT change deployed behaviour — you must paste the new contents into the matching inline `var X=…` line in `index.html`. Same applies to `decks.js` ↔ `var DECKS=…` (lines 229–241 as of writing).

## Field Reference

| DB Field | Source Field | Description |
|----------|-------------|-------------|
| `n` | `name` | Card name |
| `t` | `cardType.type[0].id` | Type: Unit, Spell, Gear, Legend, Battlefield |
| `d` | `domain.values[0].label` | Primary domain |
| `ds` | `domain.values[*].label` | All domains |
| `e` | `energy.value.id` | Energy cost (total runes to pay) |
| `m` | `might.value.id` | Might (combat power) |
| `kw` | `tags.tags` | Tags/keywords (e.g. ["Mech", "Piltover"]) |
| `tx` | `text.richText.body` | Card text (HTML stripped) |
| `rc` | Derived from `power.value.id` | Recycle cost array (e.g. ["Fury"] = recycle 1 Fury rune) |
| `s` | Derived from `cardImage.url` set prefix | Set code: `"OGN"` (Origins, incl. OGS starter variants), `"SFD"` (Spiritforged), `"UNL"` (Unleashed). `null` if not detected — the runtime `setOf()` helper in index.html falls back to PA + precon membership. |

### Recycle Cost Logic
The `power` field = number of primary-domain runes to recycle. A card with `power: 2` and `domain: "Calm"` gets `rc: ["Calm", "Calm"]`.

## CI Map Format
- Keys: card names (exact match)
- Values: image hash filenames like `89929cfa...-744x1039.png`
- Portrait cards: `744x1039`
- Landscape cards (battlefields): `1039x744` or `1038x744`
- Image URL base: `https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/`
- Full URL = base + hash

## Current Stats (as of April 2026)
- 767 unique cards across 3 sets: Origins (OGN), Spiritforged (SFD), Unleashed (UNL)
- 381 Units, 192 Spells, 92 Gear, 56 Battlefields, 40 Legends, 6 Runes
- 320 cards have recycle costs
- All 767 cards have images
