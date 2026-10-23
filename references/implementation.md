# Renderer implementation and adaptation boundaries

Read alongside the runnable source; this explains why the implementation is structured this way.

## Spatial absorption

`world.ts` computes world position per fragment. For a plane boundary with normal n and coordinate d, density is proportional to max(0,d-dot(n,point))². Its camera-ray average has an analytic cubic primitive:

`I(a,b) = (max(b,0)^3-max(a,0)^3)/(3*(b-a))`, using the midpoint limit when a≈b.

Multiply by ray length and density coefficient, then transmission=exp(-opticalDepth). Apply transmission to outgoing surface light before final output; diffuse and clearcoat darken together. This is an absorbing field, not a visible smoke simulation or multiple alpha planes. Preserve depth writing: a dark opaque card still occludes geometry behind it. Plan geometry/handoffs accordingly. Do not enable the legacy transparency branch for ordinary reveals.

Keep field parameters per material/pose, so overlapping scenes do not accidentally share one reset. A moving boundary can envelop a card even while it follows its existing trajectory. The V15 fan accelerates this boundary toward the camera after the last focal arrival; the grid uses a fixed boundary and tiny pivots/depth motion instead.

## Studio light and shadows

Three.js0.186.0 RectAreaLight provides broad physically based illumination but no native shadowmaps. `studio.ts` integrates visibility across fixed emitter samples by intersecting camera-visible surface→light rays with each other rectangular card. Only that key's contribution is reduced; fill/rim remain. Sampling is deterministic in light space. Penumbra width follows emitter extent and blocker separation. It is an approximation, not energy-exact path tracing.

Use48samples for iteration and128for final where appropriate. Check banding and temporal shimmer. More samples cannot repair wrong blocker geometry, incorrect light dimensions or self-shadowing. Exclude the receiver, reject intersections behind the surface or beyond the light, and exclude transparent logos from opaque rectangular blockers. The provided implementation caps blockers at6; validate or explicitly extend this capacity.

## Surface finish

Seeded roughness and normal maps perturb the coating, not the artwork color. Keep texture amplitudes small, use mipmaps and data color space. Clearcoat gives a restrained dielectric finish; varying view angle creates the shine. No actual transmission/refraction is implemented. If the brief explicitly requires glass, that is a different material treatment, not a polish switch.

Do not animate the light source to sweep a highlight unless requested. The ending's light-intensity ramp is intentional scene illumination and is distinct from a traveling shine overlay.

## Deterministic rendering

Every frame is a function of time, assets and fixed parameters. Evaluate frames out of order during smoke checks. Avoid accumulated requestAnimationFrame physics or unseeded noise in a video render. Remotion captures Three.js after GPU completion; wait for textures and shader compilation before releasing the frame.

The shader additions patch Three.js chunk strings. Pin the version, assert each insertion target and render a test image after upgrades. A successful TypeScript bundle cannot detect a missing GLSL patch. Keep generated dependencies and browser paths out of the shipped template.

## Capacities and coordinates

Card width/height must agree between geometry and shadow bounds. Camera FOV/aspect and output dimensions must agree. Pose pool and shadow blocker count are different budgets. Distinct cards need depth/order planning to avoid intersections; opacity is not a repair for clipping. Identity quaternion is reserved for an intentionally front-facing logo, not a universal end state for every visible card.
