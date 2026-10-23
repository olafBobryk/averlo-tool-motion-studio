# V15 source reference: an example, not the default choreography

This historical mechanism map refers to the portable source in `assets/starter/src/`. Use `scripts/create_project.py --example v15` with your own authorized artwork to inspect it. The V15 adapter excludes the original external 77-frame reel; that reel, all client artwork, client reference clips and private test films are not included. The historical choreography is not a claim of accepted final quality and is not the default composition.

All frame numbers below are zero-based at30fps. SOURCE_FRAMES=77; choreography uses local t=globalFrame-77.

| Mechanism | Inspect | Implementation and why |
|---|---|---|
| Lateral continuation | global77–110; choreography travel/opening | Measured source corner displacement becomes monotonic cubic Hermite translation. Rotation shares displacement. No opening zoom; central speed nonzero. This fitted curve is source-specific. Measure a new hook rather than reusing its numbers. |
| Receding fan | global108–222 | Four equal planes, negative X pitch, enter from below camera and move away in Z. Arrivals local50,68,90,116; clocks .80,.93,1.06,1.19 progressively soften pacing. Departure is the same path. |
| Moving darkness | local116 onward | voidDepth=-4.8+.012*max(0,t-116)^2 approaches camera after last arrival. It ends the shot instead of waiting for cards to travel all the way away. Reset the field for the next scene. |
| Grid wave | global211–~318; inspect253,268,283,298 | Eight slots on shared -12degree roll. Small per-card X/Y pivots and1.3unitZ motion. Delays0,4,8.5,14,20,27,35,44. Incoming power4/width37, outgoing power2/width21+.15j. Earlier panels recede while later ones arrive. This curve is C1, not C2 at crest. |
| Two ribbons | global318 onward; inspect374,404,434 | Opposite corners, monotonic Bezier control points approaching origin; cubic time warp. Banking derives from tangent and curvature, tapers naturally. No accidental overshoot-and-return. |
| Join into fall | same ribbon lifetime | fall=.00016*softplus(age-68)^3; continuous acceleration downward and into depth. Older cards fall during cover arrival. Cover uses the same clock, no arbitrary extra dwell. |
| Soft inter-card shadows | inspect374,404,434 | studio.ts samples128 fixed positions on8×10 area key; rays intersect real card planes. Only the blocked key contribution is attenuated, not fill/rim. Approximate area visibility, not path tracing. |
| Material | world.ts/studio.ts | Fixed micro normal/roughness texture, restrained clearcoat. No animated reflection sweep. Texture changes lighting, never the supplied artwork pixels. |
| Small illuminated logo | global486–555; inspect494,502,510,520,534 | Geometry2.3×2.36. Z -5.9→-4.2 over48frames, fixed voidDepth-4.8/density50. Real lights rise on same clock. Only~7% apparent size growth.22frame final hold. |

## What the rejected revisions teach

- Translation followed by a separate rotation felt like two transitions. Share progress and preserve velocity.
- Large frontmost fan cards cropped the focus. Let supporting cards overflow, keep the readable subject in frame.
- Cards emerging from the rear field then flying past camera reversed the intended fan. Inspect signed depth and pitch, not just an attractive still.
- Per-card opacity hid geometric mistakes. Use opaque geometry crossing the spatial field.
- Flat power4 outgoing grid crests held too long even after shortening exit width. Remove the flat crest when visible recession must begin earlier.
- Single spot shadowmaps gave crisp dark strips inconsistent with a large studio light. Increasing blur alone does not model the light's extent.
- Large Z excursions made the logo look like a zoom. Reduce geometry and depth range, let illumination provide most of the reveal.

Readability is not synonymous with a complete stop. A final explicit hold, however, is valid and was requested here.

## Inspecting a mechanism publicly

The minimal original sample is runnable from `assets/sample`. For a V15 mechanism, supply `frame-01.png` through `frame-16.png` plus your own `averlo-mark.svg`, then render the relevant frame or sequence. Never infer approval or publication rights from the historical source.

A useful overlapping handoff lets an incoming arrangement become visible while the departing arrangement opens space. Verify visible pixels across the join, rather than just overlapping nominal timeline ranges. This mechanism does not prescribe a bands-to-grid recipe.
