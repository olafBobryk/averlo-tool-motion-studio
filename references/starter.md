# Runnable Three.js starter

Generate a project with the minimal example by default; select `--example v15` for the exact reference. The script refuses existing targets and validates every required image before copying anything.

```sh
python3 scripts/create_project.py /absolute/new-project --example minimal --assets /absolute/supplied-images --quality final
cd /absolute/new-project
npm ci
npm run still
npm run test:geometry
npm run test:visibility
npm run render
```

`--example minimal` needs `frame-01.png` through `frame-03.png`. `--example v15` needs `frame-01.png` through `frame-16.png` plus `averlo-mark.svg`. The bundled assets/sample are original generic panels for technical execution. For production films, supply actual approved artwork; client images and the original external source reel are not bundled. Do not substitute generated artwork for supplied client material without authorization. Outputs are `output/still.png` and muted `output/video.mp4`.

Use `FRAME=200 npm run still` to inspect another frame. Optional `BROWSER_EXECUTABLE` selects an installed Chrome; otherwise Remotion manages its browser. Dependencies are pinned, including Three.js 0.186.0 and Remotion 4.0.534. The starter includes a dependency lock; use npm ci so project dependencies match it. There are no shipped dependency symlinks or machine-specific paths.

## Implementation boundaries

- `src/world.ts` receives a `WorldState`, rather than choosing a choreography. Camera, studio lights, physical materials, analytical absorption and finite-area visibility are shared mechanisms.
- `src/choreography.ts` is the exact V15 choreography. The `src/v15.ts` adapter calls it with `frame + SOURCE_FRAMES`, excludes the 77-frame external reel, and preserves the remaining 479 frames at 30 fps. Its opening motion starts mid-reference context by design: do not describe this as the complete source TikTok.
- `src/minimal.ts` is a distinct three-plane example of one continuous trajectory per card, entering from below the camera and receding into the void. It is an implementation teaching example, not a claim of equivalent editorial quality to V15.
- `src/studio.ts` provides seeded micro-normal/roughness maps and rectangular emitter visibility. Quality `preview` uses 48 fixed samples; `final` uses the reference 128. This is a finite-sample studio-shadow approximation, not path tracing or refraction.
- `createWorld(canvas, urls, options)` accepts card and logo width/height, logo image index, pool size, and shadow sample count. All card dimensions are shared by geometry and occlusion calculations. Aspect ratio should match supplied imagery. The default camera/composition is 1080×1920; change both together for another format.
- The pose pool defaults to 16 simultaneous planes. The studio blocker budget is independently limited to six, validated before updates. Set `castsStudioShadow: true` explicitly for opaque card blockers. Logo planes are rejected as rectangular blockers. Only the V15 adapter interprets ribbon role names. Other planes still receive lighting and volumetric absorption.
- Studio lighting is the default regardless of timeline position. `openingMix` selects the legacy spotlight blend; `accentMix` selects opening fill accents. Both default to zero. `outroLight` overrides them and always extinguishes the opening spotlight. `voidNormal` is copied and normalized per pose (default +Z); `voidAmount` defaults to 1. `openingFinish` explicitly selects the original glossy opening material. No renderer behavior depends on role names.
- `opacity` and `brightness` remain part of the preserved V15 pose interface; new physical reveals should hold them at 1 and animate depth, void parameters or actual lighting instead. `voidDepth` specifies the spatial boundary; `voidDensity` changes absorption strength, not an alpha dissolve.
- Shader patch targets are asserted exactly once. An upstream Three.js change must fail clearly rather than silently dropping shadow or absorption logic. Keep version pins until recompilation and image checks pass.

## Adaptation workflow

Keep `world.ts` and `studio.ts` stable while replacing choreography first. Explicitly set image indexes, visible counts, position, quaternion, field depth and timeline. Evaluate frames out of order to detect hidden accumulated state. Inspect continuous playback in addition to stills; a successful single-frame render only proves compilation and image loading.

## Image dimensions and duration

Scaffolding reads PNG IHDR dimensions without image dependencies. Minimal geometry uses width 10.8 and height derived from supplied artwork aspect ratio. All non-logo images must agree within 1%; mixed ratios fail with an explicit request for per-image geometry/layout instead of stretching. The exact V15 example deliberately preserves its reference geometry 10.8×6.045.

`project.json` exposes `cardWidth`, `cardHeight`, and `durationInFrames`; the composition and studio blocker geometry receive these settings. Defaults: minimal 210 frames, exact V15 479 frames, both at 30 fps. `--duration-seconds 8` changes minimal composition length only; author choreography timing to fit it. It does not silently rescale trajectories, and a longer composition can contain black after the example finishes. V15 rejects duration overrides because its reference clocks must remain intact.

The render command now runs the deterministic geometry gate first. See review.md for clearance, sampling limits and how to interpret failures. esbuild 0.28.1 loads the actual TypeScript choreography for this check.

The render command also gates on check:visibility. Use stable pose.id for simultaneous repeated images. Only a documented intentional closing hold may set visibilityCheck.finalHoldReason; see review.md.
