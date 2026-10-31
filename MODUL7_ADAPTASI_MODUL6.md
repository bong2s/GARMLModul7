# GARML AR Modul 7 — adaptation of the Modul 6 model system

Modul 7 keeps its own learning content (`src/content/lessons.ts`), its model registry and
topic mapping (`src/models/registry.ts`) and its three GLB files (`public/models/*.glb`,
byte-identical to the originals). Everything about *how the models are presented,
framed, manipulated and placed in AR* now follows the Modul 6 engine.

## Architecture (src/ar)

| File | Role | Origin |
|---|---|---|
| `config.ts` | Per-model layout (label, colour, target size, cell, orientation fix) and shared constants | new (values derived from Modul 7's own GLBs) |
| `scene.ts` | Renderer, cameras, light rig, shadows, camera video, arcball / pan / zoom, camera framing, AR spawn maths, gyro fallback | Modul 6 `SceneManager`, extended with per-model parts and free-region framing |
| `session.ts` | WebXR `immersive-ar` session, placement, anchors, light estimation, fallback orchestration | Modul 6 `ARSession` (hit-test code removed: it was disabled there) |
| `hotspots.ts` | Dots, labels, dashed leader lines | Modul 6 hotspot layer, anchors per model, measured label sizes |
| `engine.ts` | GLB loading, normalisation, composition, selection / dimming, tap picking, public `Viewer` API | Modul 7 file, rewritten around the above |

`src/main.ts` (UI wiring) and `src/style.css` (Modul 6 visual system) were rewritten accordingly.

## Per-model geometry (measured from the GLB binaries)

| | CPU.glb | Computer_Chip.glb | calculator.glb |
|---|---|---|---|
| Native bbox x × y × z | 3.4061 × 3.4061 × 0.1112 (Z-up, plate in XY) | 2.1107 × 1.7956 × 3.9446 (Y-up, DIP chip, pins point −Y) | 0.1528 × 0.0268 × 0.2011 (after root-node matrix; Y-up, flat, keypad up) |
| Orientation fix | `rotateX(−π/2)` (plate lies flat, +Z face up) | none | none |
| Longest side after fix → target | 3.4061 → 2.6 | 3.9446 → 2.5 | 0.2011 → 2.1 |
| Normalised size (x × y × z) | 2.600 × 0.085 × 2.600 | 1.338 × 1.138 × 2.500 | 1.596 × 0.280 × 2.100 |
| Cell (x, z) before centring | (−2.5, −2.0) | (+2.5, −2.0) | (0, +2.0) |
| Materials / textures | unchanged | unchanged | unchanged (3 × 2048² textures kept) |

Composition: two models behind, one in front (Modul 6 pattern), whole layout centred on the
origin (size 6.97 × 1.14 × 6.35, `floorY = −0.569`). Preview tilt `Euler(0.62, −0.42, 0, 'YXZ')`.
Each model has its own pivot group centred on its bounding box, so it rotates and zooms about
its own centre.

## Interaction model

* **Group mode** (`SEMUA` / *Semua*): gestures transform `modelRoot` (relative layout preserved).
* **Individual mode** (tap a model, hotspot, nav pill or ALUR chip): gestures, zoom buttons and
  *Reset Terpilih* only touch the selected model's pivot group; the other two stay put and are
  dimmed to 35 % opacity (not hidden).
* 1 finger / left mouse = rotate (arcball), 2 fingers / right mouse / Shift+drag = move,
  pinch / wheel / ± buttons = zoom. Limits: model 0.25–4×, group 0.08–8×.
* *Reset Terpilih* = selected model home; *Reset Semua* = all models + group home;
  *Reset View* = Reset Semua + camera re-frame + group mode + panel closed.
* The camera is framed from the real projected geometry inside the *free region* (between the top
  controls and the bottom panels / info sheet), so the three models stay visible when the info
  panel opens. On wide landscape screens the info panel is a side sheet.

## AR

* **WebXR** (`immersive-ar`, reference space `local`, anchors, light estimation, DOM overlay):
  the layout is spawned 0.6 m in front of the camera once tracking is stable and locked to an
  anchor. Hit-testing is not used (the layout floats in the air).
* **Fallback** (no WebXR): camera video + gyroscope. Only device *rotation* is followed — it is
  **not** world-tracked and the UI says so. No anchor is ever reported there.
* **Preview** (default): 3D over the camera image, labelled "PRATINJAU 3D · bukan AR terlacak".
* Finger gestures are disabled in AR (the view changes by moving the phone); zoom / reset buttons
  and component selection still work.

## Deliberate deviations from Modul 6

1. AR spawn elevation is 16–28° *below* the camera horizon (Modul 6: 6–16° above) because Modul 7's
   interesting faces point up. Revert via `SceneManager.SPAWN.minElevation/maxElevation`.
2. Unselected models are dimmed to 35 % (Modul 6: 20 %) so they clearly stay visible.
3. *SEMUA* does not reset transforms (as in Modul 6's code), whereas the original Modul 7 reset them.
4. The info panel sits above the ALUR panel instead of covering it.
5. Fallback mode: tapping the model selects it (Modul 6 re-placed on every canvas tap); use the
   *Tempatkan ulang* button to re-place.
6. Auto-rotation of the original Modul 7 was removed (static composition, stable labels).

## Not verified

Real WebXR / ARCore behaviour (session start, tracking quality, anchor drift, taps on the 3D
model inside a WebXR DOM overlay) and rendering on physical phones have not been tested;
only the code paths were exercised with a headless Chromium (software WebGL) and mocked XR frames.
