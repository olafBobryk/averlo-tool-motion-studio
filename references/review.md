# Review and forward tests

1. Render the actual video and confirm dimensions, FPS, duration and audio policy. Report exact-black separately from whole-frame-average near-black. Sparse bright logos can have low frame averages while plainly visible. Measure exact black at native resolution: downsampling can round very dim pixels to zero. Track the last visibly meaningful artwork and the next visible reveal, not only mean brightness; a long near-black gap can be an editorial failure despite containing nonzero pixels.
2. Watch playback or explicitly state when only sampled frames were inspected. Review tight sequences around joins, field resets, arrivals and departures; isolated hero stills cannot prove cohesion.
3. Check geometric intersections, focal clipping, reverse travel, overshoot, shadow acne/banding, texture shimmer and simultaneous light/motion onset. Finite light sampling is an approximation: inspect moving shadows, not only their stills.
4. Plot or sample position/velocity around suspected pauses. Nonzero subpixel movement does not prove perceptual flow. Explicit final holds should not be rejected by a blanket no-repeated-frames rule.
5. For an open showcase brief, review formation variety and handoff continuity using [composition.md](composition.md). A scene must have an identifiable purpose, an appropriate artwork group and a distinct animation. Neither changing artwork alone nor changing poses of the same persistent cards proves multiple scenes. Reject arbitrary intermediate layouts and verify the actual content progression.
6. Separate implementation/technical pass, independent visual critique, and human acceptance. Do not call a score human approval. Record remaining limitations honestly.

## Fresh-agent evaluation

Give a fresh agent SKILL.md, the supplied assets and a realistic creative brief, without the implementation author's hidden expected solution. Use an isolated output folder. Require a runnable project and video. Inspect actual output, make narrow fixes supported by visible failures, and rerun the failing case. Do not simply add more prohibitions for every criticism. A second changed brief helps distinguish reusable transfer from copying the reference.

For a skill evaluation, keep the author's hand off the test choreography. Give the fresh agent the skill, raw artwork and minimal task, not a proposed replacement scene. The agent may independently critique and revise its own output under the skill; record these iterations. Preserve its first rendered candidate. Any parent-provided composition, path, timing or lighting rescue is a failed independent transfer for that candidate, even if the repaired film is attractive. Do not present a hand-directed revision as a successful fresh test. Return a direct video link, with failures stated plainly; the user should not have to inspect research notes to find the result.

Require the pairwise rendered scene comparison from composition.md. Inspect the body excerpts yourself. Collision/visibility gates cannot certify variety; scene names and different artwork are not evidence. If another generation is needed, fix the skill and rerun independently rather than privately supplying the desired answer.

Stop once there are no obvious defects and the output is a strong review candidate relative to the reference; hand it to the user. Do not claim it is accepted or keep searching for theoretical perfection. User feedback may reveal missing abstraction.

## Deterministic geometry gate

Run `npm run test:geometry` for the checker regression cases and `npm run check:geometry` for the actual choreography. `npm run render` runs the latter first. `output/geometry-check.json` records failures with zero-based frame/time/image IDs. The check uses oriented-box separating axes around the renderer's actual rectangular planes, with 0.02 world-unit clearance. This catches crossing planes, coplanar overlap and near-contact; ordinary projected overlap at separated depths is allowed.

Every output frame and quarter-frame interval is evaluated deterministically, including dark and offscreen emitted planes. This is finite sampling, not a continuous collision proof; exceptionally fast motion needs denser checking or swept-volume validation. Do not describe a pass as proof of all possible times. Retire hidden planes when their physical lifetime ends, not to hide visible intersections. No opacity exemptions.

The checker matches the supplied renderer: fixed cardWidth/cardHeight, logo 2.3×2.36 and normalized quaternions. If geometry or scene transforms change, update checker dimensions/transforms too. It does not verify camera clipping, aesthetics, volumetric readability or shader appearance. A historical reference may fail; preserve its original source as evidence rather than waive the gate for new output.

The full-collection test was rejected by the user: first scene was a boring single-active-card treatment with actual plane intersections; second was an unwanted vertical conveyor; third read as an unnatural uniform reveal; fourth was only partially acceptable. Multiple content scenes are necessary but insufficient. Check concept pairing, collective participation and spatial darkness in the actual render before claiming improvement.

## Visibility boundary gate and hold diagnostics

`npm run check:visibility` now also gates `npm run render`. It tracks stable pose IDs (image index by default; repeated simultaneous images require distinct `id` values), checks births and retirements at quarter-frame samples with refined event boundaries, and checks the beginning/end of the film. It rejects alpha, material-brightness and object-scale shortcuts.

A boundary passes only if a conservative whole-plane AABB is outside the starter camera frustum, or a whole-surface optical-depth bound guarantees transmission at most 1e-6. The optical calculation mirrors the shader's integrated density, with conservative lower bounds on ray length and density; nonnegative side absorption is ignored, so it can conservatively reject a safe side-only case. Ambiguous offscreen cases can also be conservatively rejected. Fix physically or extend the validated checker, never loosen the threshold to pass a visible pop. Rendered near-black must still be inspected: the threshold is optical transmission, not measured RGB black under every lighting setup.

If a film intentionally ends on a visible hold, document `visibilityCheck.finalHoldReason` in project.json. This permits only the film end; births and earlier retirements still fail. Do not set it without an actual intentional closing hold. No opening-pop exemption exists. Every emitted rectangle is checked independently; another card occluding it does not qualify as offscreen or volumetric darkness.

The report lists intervals of projected corner speed below 8 pixels/second lasting at least 0.8 seconds. These are editorial warnings, not a universal timing law. They catch long barely-moving holds; inspect opacity-free reveal/light changes and intended final holds before deciding to trim. Fixed framerate is 30 fps, same as starter. The checker is deterministic finite sampling, not continuous-time proof; it does not detect every teleport of an already-present card or prove smooth shader changes. Tight rendered transition sequences remain required. Update the checker when camera, geometry, deformation or shader equations change.

The corrected fresh-run film also failed: 12 unsafe births across its opening, 5.4s grid and 17.3s applications reveal. The prior geometry gate passed because collision safety says nothing about visibility boundaries. Shared grid rotation/exit and multi-second barely-moving ending intervals are separate editorial failures.

## Variety and exposure review

Before accepting a film, compare the visible animation family of every scene pair. Repeated opposing horizontal passes count as repetition even if scene labels/artwork differ. Inspect readable crest frames for clear whites and color. Check optical transmission across tilted cards separately from actual light/material exposure; boundary safety does not prove readable illumination. Inspect an advancing-field departure as a temporal sequence, ensuring the field overtakes visible surfaces before retirement rather than merely shrinking/dimming all cards together.

Final exit review: compare the departure times and visible field-crossing progression of all cards. Reject uniform simultaneous group exits even if geometry/visibility checks pass. Those checks establish boundary safety, not stagger quality. User closed skill iteration after adding this invariant and removing the rejected central-aperture spreading treatment.
