---
name: averlo-motion-studio
description: Build and refine Three.js image-plane showcases with continuous choreography, spatial darkness, studio lighting and physical surface finish. Includes a runnable Remotion starter, original sample artwork and source-based motion examples; use for rendered motion films rather than ordinary UI transitions.
---

# Motion Studio

Implement the user's choreography using a coherent Three.js motion language. Start from the supplied mechanisms, not a fresh approximation of the lighting/void. The default is a small runnable starter; V15 is a detailed reference, not a mandatory sequence. Preserve user paths, image order, focal framing and accepted entrances. Ask about genuinely unresolved scene direction before replacing it.

## Update before every use

Read [updates.md](references/updates.md) before execution. Check the public upstream, preserve local work, integrate safe fast-forwards, and announce the changes actually integrated since the previous successful sync. First use identifies its starting version; unchanged use says no updates were found. Refresh copied skill files after updating. No Averlo account or access key is required.

## Start with a concrete motion brief

Read the supplied reference and existing implementation. Identify the requested journey for each scene: start relative to camera, readable position, destination relative to the dark field, focus, visible overlap, and any intentional pause. Ask one narrow question at a time only where the answer changes the work; continue independent implementation while awaiting the answer. Do not re-ask settled choices or substitute style adjectives for trajectory decisions.

When the user has not chosen a motion direction, ask a short creative-choice question: “What kind of animation would you like: a directional pass, a receding fan, a surface wave, curved ribbons, a pivoting/orbiting arrangement, an illuminated reveal, your own idea, or should I choose?” Offer a few relevant options, not a mandatory complete questionnaire. If the user delegates the choice (“surprise me”, “you choose”), proceed without asking again. Do not turn these options into a fixed sequence.

For an open or delegated creative brief, read [composition.md](references/composition.md) before choosing choreography. It supplies spatial ideas, handoff mechanisms and selection rules. For a complete showcase, compose distinct scenes with their own purpose, artwork allocation and animation—not just successive poses of the same cards. Write the scene map before paths; the minimal starter is technical scaffolding, not a single-gesture creative default.

Examples teach mechanisms, not compositions to reproduce. For an open creative brief, choose a distinct spatial idea before consulting the closest reference for its timing, lighting or handoff. Do not automatically combine the same bands, grid and logo because the example did. The overlapping-handoff reference demonstrates how two scenes can share screen space; its exact arrangement is optional.

For a new project, read [starter.md](references/starter.md), then run `scripts/create_project.py` with the provided artwork. Use the minimal example by default. The script creates an isolated project; install its pinned dependencies, inspect a rendered frame, then render the video. Read [implementation.md](references/implementation.md) before changing materials, field or shadow code. Do not assume a CLI build proves the shader or image loading works.

Read [motion-language.md](references/motion-language.md) when setting timing or revising transitions. Use [case-study.md](references/case-study.md) to find concrete V15 functions, frame numbers and rejected alternatives. Historical client-artwork clips are intentionally excluded from this public package. Consult the source-based mechanism map, and render with the bundled original sample or your authorized artwork when you need a visual example. Never claim to have watched an unavailable reference. These references are part of the skill: do not rely only on this entrypoint.

## Essential motion contracts

- Individual exits are invariant: cards must not disappear, recede or be engulfed uniformly as one synchronized group. Use overlapping but visibly offset departure onset, progression and completion. This applies to advancing-field exits too: depth, angle and spatial progression must cause a visible sequence across surfaces. A shared field is allowed; simultaneous whole-group disappearance is not.


- Default to collective choreography: several images participate meaningfully, with distributed or transferring attention. A single dominant active slide is opt-in when the user concretely requests it; do not default to a carousel with dim supporting cards.
- Avoid repeating an animation family within a film unless explicitly requested as a reprise. Different slides, timing, direction or slight curvature do not turn the same two-lane pass into a new animation. Apply the pairwise scene-variety gate in composition.md before implementation AND against rendered body excerpts. Compare every pair by spatial organization, dominant visible action and evolving relationships; a different entrance or exit cannot disguise a repeated body. Save the comparison with the output.
- During readable intervals, artwork must emerge clearly out of the absorption field. A black background does not imply dim artwork. Diagnose field transmission separately from studio illumination; do not compensate for field burial with brightness or opacity.
- Deliberately vary exit mechanisms where useful. An accelerating field advancing toward the camera can engulf a still-moving scene; use it when requested rather than waiting for cards to recede or recycling another lateral exit.
- Pair complementary concepts for each scene: a spatial organization plus an expressive behavior tied to that organization. Read the pairing guidance in composition.md; a direction of travel alone is not a complete scene idea.
- Do not animate object scale or opacity for entrances/exits. Keep physical dimensions fixed and use perspective travel through the spatial absorption field for depth reveals. Lateral offscreen travel is a valid alternative. Do not replace these with uniform brightness fades. A requested light-on reveal uses actual studio lights.
- Every card must be fully offscreen or fully obscured by spatial absorption before its first visible moment and before retirement. Partial darkness does not qualify. Start physical lifetimes early enough; do not instantiate an already-visible card. Run `npm run check:visibility` and review its hold warnings.
- Grid cards need independent, overlapping trajectories and reveal/recession timing. Do not swoop or rotate the whole grid in unison; tiny per-card wiggles do not fix that. Intentional opposite-moving rows or groups are valid when they visibly counteract one another.
- Budget readable slowdowns, not long waits. Near-static dwell is an editorial review item even when tiny drift prevents a literal stop.
- Run `npm run check:geometry` before rendering. Fix every reported intersection or near-contact by changing spacing, paths or banking. Do not bypass failures with opacity or darkness. The standard render command gates on this check; see review.md for its scope.


- One connected lifetime per object. Derive translation, banking and reveal from related clocks. Avoid independent enter/hold/exit blocks that reset speed. Comparable movements share a vocabulary, not necessarily an identical easing equation.
- A readable slowdown normally retains perceptible motion. Explicit black pauses and final holds are allowed. Chaining zero-velocity endpoint eases for every beat is not continuous motion.
- Incoming and outgoing activity must overlap visibly when requested. Check actual pixels, not merely nominal scene ranges. Begin recession before the last arrival completes when the brief calls for a rising/falling wave.
- Give each visible pass a purposeful nonlinear speed profile. A constant-speed translation with a small rotation wiggle does not satisfy this motion language. Use fast approach, readable nonzero slowdown and renewed departure where appropriate; do not tack easing only onto the last instant.
- Separate arrival shape, crest shape, exit shape and stagger. Preserve an accepted entrance while repairing its tail. A flat crest may be the problem even after increasing exit speed.
- Keep physical image dimensions and aspect ratio consistent; perspective produces apparent scale. Supporting cards may overflow; a readable active card stays framed when requested. A grid may intentionally have equal emphasis across panels.
- Orient planes to support their journey. For the under-camera-to-background example, the upper edge tilts away and the card recedes in depth; do not reverse this into a rear-to-front reveal.
- Use opaque image planes crossing a spatial absorption field. Per-fragment geometry determines darkness. Move the field toward camera when the scene should be engulfed rather than waiting for distant cards. Scene-specific fields may reset at a dark handoff.
- Studio shine belongs to fixed lights and a subtle physical finish, not an animated gloss overlay. Soft shadows come from occlusion of the broad key; ambient/fill light is not globally blacked out. Do not turn a card coating into transparent glass by default.
- A logo reveal can be mostly illumination: shallow depth travel, concurrent actual light ramp, small final size, deliberate hold. Avoid rapid perspective growth followed by a long settling tail.

## Compose from the mechanisms

Default assets are only user-supplied imagery; no invented labels or decorative geometry in the film. The example uses a black studio and muted output. These are explicit defaults, not restrictions overriding a new brief.

Keep the renderer/material system stable while implementing a new choreography. Do not copy V15's complete fan→grid→ribbons→logo order unless requested. Use seconds or document the 30fps timing convention and convert consistently. Validate capacity, image indices and required assets instead of silently omitting objects.

The upstream motion-direction ideas are incorporated in [motion-language.md](references/motion-language.md). You do not need another installed motion skill. Its mandatory per-beat stillness, fixed preset sequence and tone defaults are deliberately excluded; see [provenance.md](references/provenance.md).

## Verify and hand off

Follow [review.md](references/review.md). Inspect actual rendered media, including short sequences around handoffs and shadow motion. Record what was checked and what remains subjective. If using a fresh agent to test this skill, give it a new brief and raw assets rather than the author's expected answer. Fix observed defects narrowly, then return a strong review candidate; independent approval never substitutes for user acceptance.

Return a verified preview and the video path, plus concise changes and limitations. Preserve previous candidates and accepted source. A render request does not authorize publishing. Do not create unrelated automations, introduce a mandatory approval process, or require a new plan for routine authorized revisions.

## Reference acceptance

The user closed skill iteration after the final pairwise test. Scene 2's independent hinge/depth lattice was acceptable. Scene 1's orbit was rejected as dull and too long, with an unacceptable uniform exit; do not use it as an accepted example. Scene 4's four-leaf central-aperture spreading treatment was rejected and removed from suggestions. Completion concerns the reusable skill; it does not endorse the last film.
