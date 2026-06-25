# Drift Dudes

A WebGL-based HTML5 racing game featuring 3D cars, 6 unique tracks, flip stunts, a garage upgrade system, real-time multiplayer, and support for 10 languages. Built on a custom WebGL engine ("Simple Engine by Moshé").

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Asset Inventory](#asset-inventory)
  - [3D Meshes](#3d-meshes)
  - [Textures & Images](#textures--images)
  - [Shaders](#shaders)
  - [Audio](#audio)
  - [Track Data](#track-data)
  - [Fonts & UI](#fonts--ui)
- [JavaScript Modules](#javascript-modules)
- [Game Features](#game-features)
- [Localization](#localization)
- [Authentication & Player Data](#authentication--player-data)
- [Credits](#credits)

---

## Overview

| Property | Value |
|---|---|
| Game ID | `drift-dudes` |
| Renderer | WebGL (canvas `#MyCanvasID`) |
| Orientation | Landscape (`aspectRatio: 1.3334`) |
| Multiplayer | Real-time via Socket.IO |
| Languages | 10 (de, en, es, fr, it, nl, pl, pt, ru, tr) |
| Total files | 221 |
| Total size | ~10 MB (uncompressed) |

---

## Project Structure

```
drift-dudes/
├── index.html                        # Entry point
├── v1.js                             # Famobi API loader & game config
│
├── resources/
│   ├── list.txt                      # Asset manifest (loaded at startup)
│   ├── css/
│   │   └── style.css                 # Base styles + login overlay
│   ├── fonts/
│   │   ├── noto.fnt                  # Bitmap font descriptor
│   │   └── noto.png                  # Bitmap font texture atlas
│   ├── images/                       # Game textures and UI sprites
│   ├── meshs/                        # 3D mesh files (.zslurp, .obj)
│   ├── sounds/                       # MP3 audio files
│   ├── shaders/                      # GLSL vertex & fragment shaders
│   ├── paths/                        # Track spline path data
│   ├── heightmaps/                   # Track terrain height data
│   └── login/                        # Avatar and flag images
│
├── js/
│   ├── compressed.js                 # Main game engine (minified)
│   ├── compressed.js.bak             # Backup of compressed.js
│   ├── gameapi.js                    # Famobi Game API
│   ├── null.js                       # Empty stub (replaces GTM in dev)
│   ├── se_firebase_module.js         # Firebase auth module (offline stub)
│   └── libs/
│       ├── gl-matrix-min.js          # WebGL matrix math library
│       ├── socket.io.min.js          # Real-time multiplayer transport
│       └── zip-full.min.js           # In-browser asset decompression
│
├── flags/                            # Language flag icons (10 locales)
└── assets/
    ├── more-games-button.png
    └── css/play.css
```

---

## Getting Started

### Running Locally

Because the game uses WebGL and loads assets via relative paths, it must be served over HTTP (not opened directly as a file).

```bash
# Python 3
cd drift_dudes_assets
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8080` in a WebGL-capable browser (Chrome, Firefox, Edge, Safari 15+).

### Minimum Requirements

- A browser with WebGL 1.0 support
- JavaScript enabled
- Landscape viewport recommended (minimum 1024 × 768)

### Disabling Firebase

Firebase is already disabled by default via the flag in `index.html`:

```js
var Trigger_DisableFireBAse = true;
```

The stub module `js/se_firebase_module.js` replaces all auth calls with no-ops and reads/writes player data to `localStorage` instead.

---

## Asset Inventory

### 3D Meshes

Meshes use the proprietary `.zslurp` binary format (compressed geometry) or standard Wavefront `.obj`.

| File | ID | Description |
|---|---|---|
| `car1.zslurp` | 10 | Car model 1 |
| `car2.zslurp` | 11 | Car model 2 |
| `car3.zslurp` | 12 | Car model 3 |
| `car4.zslurp` | 13 | Car model 4 |
| `tyre.zslurp` | 2 | Standard tyre |
| `tyre2.zslurp` | 3 | Tyre variant 2 |
| `tyre3.zslurp` | 6 | Tyre variant 3 |
| `tyre_boost.zslurp` | 14 | Boost-mode tyre |
| `helmet_hi.zslurp` | 8 | Driver helmet (high detail) |
| `earth.zslurp` | 7 | Earth/globe prop |
| `coin.zslurp` | 20 | Collectible coin |
| `circle.zslurp` | 21 | Circle/ring mesh |
| `flames.zslurp` | 17 | Flame particles mesh |
| `smoke.zslurp` | 18 | Smoke particles mesh |
| `spring.zslurp` | 5 | Suspension spring |
| `fan.zslurp` | — | Spinning fan prop |
| `random.zslurp` | 9 | Random debris prop |
| `sky-1.zslurp` | — | Skybox variant 1 |
| `sky-2.zslurp` | — | Skybox variant 2 |
| `track-1.zslurp` – `track-6.zslurp` | — | Track geometry (6 tracks) |
| `spot.obj` | 4 | Spotlight / point light mesh |

### Textures & Images

#### Car Skins

Four car models, each with 6 color variants (`0`–`5`) and a normal/roughness z-map:

| Prefix | Variants |
|---|---|
| `car-leeman-` | 0, 1, 2, 3, 4, 5, z |
| `car-super8-` | 0, 1, 2, 3, 4, 5, z |
| `car-tryem-` | 0, 1, 2, 3, 4, 5, z |
| `car-turban-` | 0, 1, 2, 3, 4, 5, z |

#### Track Thumbnails & Icons

| File | Description |
|---|---|
| `track-icon-{1-6}.png` | Selection screen icons (in-game quality) |
| `track-{1-6}.png` | Minimap / small thumbnails |

#### Environment & Effects

| File | Description |
|---|---|
| `sky-1.png`, `sky-2.png` | Skybox panoramas |
| `theme-1.png`, `theme-2.png`, `theme-3.png` | Environment/biome theme textures |
| `particles.png` | Particle sprite sheet |
| `smoke.png` | Smoke sprite sheet |
| `skidmark.png` | Tyre skid trail |
| `shadow.png` | Car drop shadow |
| `mud.png`, `mud2.png`, `mud3.png` | Mud splash variants |
| `glass.png` | Windshield glass reflection |
| `fire.png`, `flame.png` | Fire sprites |
| `earth.png` | Earth globe texture |
| `seam.png` | Track seam/join decal |
| `grad.png` | Gradient utility texture |

#### Road Surfaces

| File | Description |
|---|---|
| `grass.png` | Grass surface |
| `sand.png` | Sand/dirt surface |
| `slide.png` | Ice/slide surface |
| `inside.png` | Interior/tunnel texture |

#### Cell Shading

| File | Description |
|---|---|
| `cellshade-1.png` | Cell shading ramp texture 1 |
| `cellshade-2.png` | Cell shading ramp texture 2 |

#### UI & HUD

| File | Description |
|---|---|
| `ui-atlas.png` | Main UI sprite atlas (buttons, icons, HUD elements) |
| `ui-atlas.atlas` | Atlas descriptor (sprite coordinates) |
| `coin.png` | Coin HUD icon |
| `boost.png` | Boost meter icon |
| `engine.png` | Engine upgrade icon |
| `speed.png` | Speedometer texture |
| `tyre.png`, `tyre-z.png` | Tyre UI icons |
| `helmet_1.png`, `helmet_z.png` | Helmet UI icon and z-map |
| `check.png` | Checkmark / lap indicator |
| `blob.png` | Generic UI blob/badge |
| `default.png` | Default/fallback texture |
| `game_icon512.png` | 512 × 512 app icon |
| `random.png` | Random/shuffle icon |

#### Keyboard Prompts

`keyboard-1.png` through `keyboard-9.png` — keyboard key artwork for on-screen control hints.

#### Login & Avatars

Located in `resources/login/`:

| File | Description |
|---|---|
| `avatar1.png` – `avatar8.png` | Player avatar choices |
| `guest.png` | Guest/anonymous avatar |
| `close.png` | Close button |
| `edit.png` | Edit/pencil button |
| `arrow.png` | Navigation arrow |
| `flag_{de,en,es,fr,it,nl,pl,pt,ru,tr}.png` | Language flag icons |

### Shaders

All shaders are GLSL ES, organized as paired vertex (`.vsh`) and fragment (`.fsh`) files.

| Shader | Purpose |
|---|---|
| `cellshade` | Generic cel/toon shading for non-car objects |
| `cellshade-car` | Cel shading variant with car-specific lighting and paint |
| `cellshade-hide` | Transparency-masked cel shader (e.g. glass, hidden parts) |
| `color` | Flat unlit color fill |
| `flames` | Animated flame particles |
| `font` | Signed-distance-field bitmap font rendering |
| `glass` | Refractive/transparent glass effect |
| `ground` | Track surface with tiling and surface blending |
| `particles` | General-purpose particle system (smoke, sparks, debris) |
| `skid` | Skid mark trail decal |
| `slide` | Ice/sliding surface shader |
| `texture` | Standard UV-mapped texture |
| `water` | Animated water surface with normal mapping |

### Audio

All sounds are MP3 format, located in `resources/sounds/`.

| ID | File | Description |
|---|---|---|
| `blank` | `blank.mp3` | Silent placeholder (used to unlock audio on mobile) |
| `title` | `title.mp3` | Title screen music |
| `music` | `music.mp3` | In-race background music |
| `results` | `results.mp3` | End-of-race results jingle |
| `next` | `next.mp3` | Menu navigation / next screen |
| `engine1` | `engine1.mp3` | Car engine loop (low RPM) |
| `engine2` | `engine2.mp3` | Car engine loop (high RPM) |
| `vroom` | `vroom.mp3` | Engine rev / acceleration burst |
| `drift` | `drift.mp3` | Tyre drift/screech loop |
| `boost` | `boost.mp3` | Boost / nitro activation |
| `landing` | `landing.mp3` | Car landing after airtime |
| `hit` | `hit.mp3` | Collision impact |
| `mud` | `mud.mp3` | Driving through mud |
| `lap` | `lap.mp3` | Lap / checkpoint complete |
| `coin1` | `coin1.mp3` | Coin pickup (variant 1) |
| `coin2` | `coin2.mp3` | Coin pickup (variant 2) |
| `start1` | `start1.mp3` | Race countdown beep |
| `start2` | `start2.mp3` | Race start signal |
| `indent` | `indent.mp3` | UI indent / button press |

### Track Data

Each of the 6 tracks consists of four complementary files:

| Type | Extension | Description |
|---|---|---|
| Geometry mesh | `.zslurp` | 3D track surface and scenery geometry |
| Height map | `.map` | Binary terrain elevation data (~135 KB each) |
| Spline path | `.path` | Car AI path and checkpoint waypoints |
| Thumbnail | `.png` (two sizes) | Icon and minimap image |

Track files follow the naming convention `track-{1–6}.*`.

### Fonts & UI

| File | Description |
|---|---|
| `resources/fonts/noto.fnt` | AngelCode BMFont descriptor for the Noto font |
| `resources/fonts/noto.png` | Corresponding bitmap glyph atlas |
| `resources/images/ui-atlas.png` | Full UI sprite atlas (all buttons, icons, HUD) |
| `resources/images/ui-atlas.atlas` | Atlas layout descriptor |

---

## JavaScript Modules

| File | Role |
|---|---|
| `js/compressed.js` | Main game engine — all gameplay, rendering, physics, UI logic |
| `js/gameapi.js` | Famobi platform API — hi-scores, ads, fullscreen, language switching |
| `js/se_firebase_module.js` | Firebase authentication stub — local player data persistence |
| `js/null.js` | Empty script placeholder (replaces analytics tags in self-hosted mode) |
| `js/libs/gl-matrix-min.js` | Fast WebGL vector/matrix math (glMatrix library) |
| `js/libs/socket.io.min.js` | WebSocket client for real-time multiplayer |
| `js/libs/zip-full.min.js` | In-browser ZIP decompression for streaming asset loads |
| `v1.js` | Famobi loader bootstrap — injects `gameapi.js` and starts `se_start()` |

### Load Order (as defined in `index.html`)

```
gl-matrix-min.js  →  zip-full.min.js  →  socket.io.min.js
  →  compressed.js  →  se_start('MyCanvasID', 'GAMES_SNACKS')
```

---

## Game Features

### Gameplay

- **Endless racing** — distance is the primary performance metric
- **6 tracks** — each with unique geometry, biome, and skybox
- **4 car models** — Leeman, Super8, Tryem, Turban; 6 paint colors each
- **Stunt system** — front and back flips up to septuple rotations, with combo scoring
- **Perfect landings** — bonus points for clean landings after stunts
- **Fuel management** — collect gas cans to keep running
- **Coins** — scattered along the track; used as upgrade currency

### Garage Upgrades

| Part | Effect |
|---|---|
| Engine | Increases maximum speed |
| Bodyshell | Improves weight and handling |
| Wheels | Improves handling (+1) and reduces weight |
| Fuel Tank | Increases tank capacity |
| Bullbar | Adds weight and collision protection |

### Mission System

A tiered mission system with 40+ challenges, ranging from beginner to expert:

- Distance milestones (300 m → 1 km in a single run)
- Cumulative distance goals (1 km → 10 km total)
- Stunt combos (single through septuple flips)
- Earnings milestones ($150 → $3 000 per run)
- Coin and gas can collection goals
- Upgrade purchase milestones

### Multiplayer

Real-time multiplayer is implemented via **Socket.IO**. The local multiplayer flag is enabled in the Famobi config (`multiplayer_local: true`).

### Controls

| Input | Desktop | Mobile |
|---|---|---|
| Accelerate | Arrow keys or auto | Touchscreen |
| Jump | Space bar | Right side button |
| Flip | Left/Right arrow keys | Left side button |

---

## Localization

The game supports 10 languages, selected automatically based on the browser locale or the in-game flag switcher:

| Code | Language |
|---|---|
| `en` | English (default) |
| `de` | German |
| `es` | Spanish |
| `fr` | French |
| `it` | Italian |
| `nl` | Dutch |
| `pl` | Polish |
| `pt` | Portuguese |
| `ru` | Russian |
| `tr` | Turkish |

All UI strings, mission descriptions, tutorial prompts, and game-over messages are fully translated. String tables live inside `v1.js` as a `game_i18n` object.

Flag icons for the language switcher are located in both `flags/` and `resources/login/`.

---

## Authentication & Player Data

### Offline / Stub Mode (default)

Firebase is disabled by default:

```js
// index.html
var Trigger_DisableFireBAse = true;
```

`js/se_firebase_module.js` provides stub implementations of all auth functions. Player preferences (name, avatar, coins, score, progress) are persisted locally via `se_savePref` / `se_GetPref` (localStorage wrappers).

**Default player state:**

| Field | Default Value |
|---|---|
| `AccountName` | `Player_XXXXX` (random suffix) |
| `AccountCoins` | `100 000` |
| `AccountRank` | `99 999` |
| `AccountGamePlayed` | `0` |

### Online Mode

To enable Firebase authentication (Google, Facebook, or guest login), replace `se_firebase_module.js` with the full Firebase implementation and set `Trigger_DisableFireBAse = false`. The login overlay HTML is already present in `index.html` and styled in `style.css`.

---

## Credits

| Role | Name |
|---|---|
| Engine Coding & Graphics | Daniel Labriet — [DanLabGames](https://www.danlabgames.com) |
| Production & Business Development | Julien Donguy — AdAsGame |
| Testers | Lea, Emma, Monsieur S. |
| Publisher | [Famobi Inc.](https://famobi.com) |
