# Choosing and composing animations

Read this for an open showcase brief, including “animate these; you choose”. A small implementation starter is not an instruction to make a small creative idea. A full showcase needs multiple intentional scenes with different artwork selections and distinct animations connected into one film. Several arrangements of the same persistent cards can still be only one animation. A single gesture is appropriate when explicitly requested or when the short duration genuinely calls for it.

## Plan scenes before paths

For a complete multi-image showcase, inspect the entire supplied artwork set before choosing animations. Group by what the images demonstrate: identity, typography, palette, applications, campaign examples or other actual content. Do not reduce a full collection to the starter's three example images.

Write a scene table before implementation, with: purpose, specific image IDs, animation mechanism, readable focus, approximate duration, and transition to the next scene. Each scene should answer “what new thing am I showing, and why does this movement help show it?” A different pose is not a new subject or a new scene. Choose several scenes appropriate to the collection and duration; do not impose a fixed count on explicitly short single-animation requests.

Give each scene an independently understandable animation and a satisfying readable interval. Individual focus may suit detail pages; a full-frame surface may suit variety; convergence may suit a concluding overview. Allocate different groups of slides across scenes rather than carrying the same three cards through the whole film. Repetition may support a deliberate cover callback if allowed, but is not a substitute for showing the supplied work.

Cohesion applies within each scene and across its handoff, not as a requirement that every card survive the entire film. A transition connects two meaningful scenes; it must not become a long, arbitrary intermediate arrangement. Prefer introducing the next scene's own images while the preceding group departs, preserving direction, timing or occlusion. A purposeful darkness bridge is also valid. Do not globally interpolate every card between unrelated layouts just to avoid a cut.

For example, V15 establishes a subject, presents individual designs, shows collective breadth, and finishes by gathering other work. Preserve that editorial distinction, not its exact fan/grid/ribbon recipe. The rejected three-card triptych → orbit → stack test changed poses but demonstrated no new content and produced an unmotivated intermediate state. Treat it as a failed composition test, not a creative reference.

## Pair concepts, with a reason

Choose a spatial organization AND a complementary expressive behavior for every scene. Explain their causal connection, not just two labels. Candidate organizations include ribbons, lattices, split currents and fans. Candidate behaviors include curvature-driven Y-axis banking, a propagating pivot wave, depth-separated braiding, peeling occlusion, progressive compression and accelerated release into the void.

Examples: a curved ribbon banks about Y as its path bends; a lattice carries a staggered shallow hinge wave through the field while retaining its grid anchors; split currents braid at safely separated depths before separating into depth. Two independent wiggles are not a pairing. Parameterize the behavior from path tangent, wave phase or collective progression so it feels motivated. Avoid arbitrary turns at intermediate states.

Default to multiple meaningfully visible participants. Do not make every scene another one-at-a-time active-card showcase. Single dominant slide treatment requires a concrete user request. Attention may transfer, but supporting work should have an intentional role rather than simply wait dimmed in a queue.

The failed rising specimen column (straight vertical conveyor with an opening tilt) is removed as a recommended treatment. Do not recycle it as a ribbon: a ribbon needs curvature plus coherent orientation/banking or another genuinely interacting concept. Scene count and content grouping alone cannot make dull movement interesting.

Depth reveals must read spatially. Use modest perspective displacement across an angle-aware field with staggered surface crossings; large synchronous Z excursions can look like a zoom even without scale animation. A uniform field sweep on parallel surfaces can look like an opacity dissolve. Inspect the per-surface dark boundary and temporal wave; merely including the shader is not enough. Keep opacity and material brightness at 1 for these reveals; field transmission and real lighting provide darkness. Direct object-scale transitions are forbidden. Lateral offscreen departures remain valid.

## Spatial word bank

These are starting points, not named presets to reproduce. Invent hybrids or alternatives. Describe what the planes actually do before writing code.

| Idea | Spatial behavior | Useful when / implementation cue |
|---|---|---|
| Split currents | Two flows diverge around an opening, then redirect toward a shared destination. | Contrast or reveal; use separate lanes with clear depth separation at crossings. |
| Folding surface | A tiled formation pivots along shared seams, opening like a screen before unfolding into another arrangement. | Structure becoming space; rigid planes rotate about edge pivots, not stretched textures. |
| Rotating lattice | A stable grid organization carries independently timed shallow pivots, depth crossings and recession; no common swooping rotation. | Show breadth; keep grid anchors coherent while local lifetimes overlap; independent timing must visibly matter. |
| Cascading fan | A depth-separated deck opens progressively; older leaves recede as younger leaves become readable. | Sequential focus; derive fan position and reveal from the same clock. |
| Braided ribbons | Two spaced curved streams weave through different depths, then collect or separate. | Direction and momentum; bank with tangent/curvature and keep physical planes apart. |
| Orbital cluster | Cards revolve around a shared center, then unwind or flatten into another formation. | Change viewpoint; use generous radius and keep readable faces from disappearing edge-on too long. |
| Peeling layers | A near layer lifts from one edge, exposing another arrangement beneath while continuing into depth. | Reveal through occlusion; edge pivot plus translation, no alpha substitute. |
| Compression | A wide formation progressively narrows into a stack or column while its older members continue falling away. | Convergence; preserve spacing and velocity through collection rather than snap to endpoints. |
| Diagonal cascade | A diagonal chain grows into a broad surface, then propagates a collapse along the opposite axis. | Vertical framing; stagger wave travel rather than individual stop/start clips. |
| Perspective corridor | Parallel or offset ranks create a corridor; their vanishing direction turns into the next composition. | Spatial depth; avoid unreadably tiny cards and clipping past camera. |
| Illuminated emergence | A restrained arrangement becomes visible through spatial darkness and concurrent illumination. | Quiet contrast or finish; shallow travel, actual light ramp, no compulsory logo. |

## Handoff word bank

- **Reveal underneath:** outgoing planes open space while the incoming formation is already legible behind or below them. See the saved handoff clip for visibility, not its exact composition.
- **Formation morph:** retain object identity and smoothly change the relationships between planes; a fan stretches into a ribbon or a lattice folds into a corridor.
- **Shared vector:** the outgoing direction carries into a new arrangement, with speed and banking related across the boundary.
- **Occlusion exchange:** a passing plane conceals a local change, then reveals the next arrangement. Check geometry and actual pixel coverage rather than relying on a cut being unseen.
- **Darkness bridge:** the absorption field overtakes one scene, and the next begins at a deliberately dark handoff. Use sparingly when visible overlap would be stronger.
- **Focus transfer:** a background formation becomes the subject while the previous subject is still receding; depth and light guide the eye together.

## How to choose

1. Inspect supplied images and duration: which need individual readability, which support a collective surface, and which can be cropped at the boundary? Preserve explicit user rules about reuse and order. Do not invent extra assets to fill the composition.
2. Sketch two or three short candidate journeys, each with different scene purposes and artwork groups, an opening, a contrasting development and a resolution. When choice is delegated, select one yourself and proceed. Otherwise offer a few concrete combinations to the user; do not ask them to understand the entire vocabulary.
3. Select for meaningful contrast. Adjacent stages should change formation, spatial axis, distribution of focus or density—not merely change the image or reverse the same pass. Judge distinctness by purpose, artwork and animation together. Do not count intermediate poses as scenes or cram in every idea.
4. Preserve an invariant across each handoff: direction, curved trajectory, card identity, wave phase or a moving occlusion edge. State what visibly continues and what changes. Several stages should still feel like one continuous choreography.
5. Budget readable exposure before adding effects. Do not spend the whole duration repeating a single curved pass. With a genuinely small supplied set, scope the film honestly; with a full collection, use it rather than silently selecting only the starter images. Reuse only when the brief permits it; never silently override a no-repeat rule.
6. Pick one unexpected but legible spatial change. Creativity is not random rotations, maximal movement, extra decorations or extreme Z travel. A purposeful formation change can be richer than many unconnected tricks.

Candidate sketches are reasoning aids, not templates: “split currents → folding surface → compression” and “corridor → orbital cluster → illuminated emergence” illustrate contrast, not default orders. The final choice must fit the supplied imagery.

## Translate to implementation

Implement the scene map above. Maintain one lifetime per plane only when that particular plane intentionally crosses scenes; other scenes introduce and retire their own image groups. Within a lifetime, use smooth blending with compatible velocities rather than resetting poses at a boundary. A blend should change formation, not freeze the scene while it interpolates. Separate lanes/depth before banking so opaque planes never intersect. If new geometry starts behind old geometry, confirm the old invisible planes cannot obscure it.

Before final rendering, inspect three points in each stage and a tight sequence across each handoff. Can a viewer identify each scene’s new subject and distinct animation without reading its implementation labels? Check purpose and slide changes as well as silhouettes. Is the incoming stage visibly present before the outgoing one finishes when overlap is intended? Does a readable focal moment survive the novelty? If the result is one repeated gesture, revise the composition rather than adding rotation wiggles. Report this review honestly; sampled frames do not prove temporal smoothness.

## Grid motion and readable dwell

A four-panel layout is not a single rigid object to fly in, rotate and fly out. Give each panel an individual lifetime: staggered ingress, shallow pivot/depth crossing, moving readable crest and earlier recession. Their local timings should overlap substantially, not become a sequence of stops. Keep the grid recognizable through stable anchors. Independent does not mean random or disconnected: propagate a shared wave with meaningful phase offsets and controlled duration variation.

Counter-moving rows or groups are a valid alternative because the opposing directions form an intentional relationship. They must visibly counter-move, not share a global sweep with tiny decorative deviations. Do not add global parent rotation to make a quiet grid seem more animated.

Budget readable dwell explicitly in the scene map. Start departures before the last arrival finishes where appropriate. A slow crest should retain visible progression; do not spend several seconds on subpixel drift. Inspect the checker's near-static intervals and trim unmotivated waits. Explicit requested final holds can remain, with a documented duration and reason; they are not a blanket exemption for a long static outro.

Every physical lifetime must begin fully offscreen or fully dark across the entire rotated surface. Being geometrically behind a field boundary does not imply sufficient optical absorption, especially at a tilted edge. Extend the trajectory/field setup before birth, and retire only after the surface fully clears the viewport or disappears into the field. Review first and last visible frames, not merely a hero still mid-reveal.

## Scene-variety gate: compare the visible action, not names

Before implementation, write a pairwise scene comparison in the scene map. Describe each scene in one literal sentence without branded names or motion vocabulary labels: number and arrangement of participants, what changes visibly during most of the readable interval, and how their relationships evolve. Compare EVERY pair, not just adjacent scenes.

Use these axes:
- Spatial organization: e.g. fixed two-by-two positions, two traveling lanes, depth-separated overlapping leaves, an opening corridor.
- Dominant visible action during the body: e.g. independently crossing depth, exchanging lateral positions, spreading around a center, collecting and accelerating away.
- Relative relationships: do neighbors keep their positions, change order, separate, converge, or weave at different depths?

If two scenes share the organization AND dominant action for most of their readable time, reject the pair before coding. Different artwork, a new name, reversed direction, stagger, a slightly changed tilt, or a different exit does not rescue it. If organization repeats, the dominant action and changing relationships must be unmistakably different. This is a qualitative design gate, not a numerical creativity score.

Concrete failed pair: “four hinged quadrants opening an aperture” and “independent hinge lattice” both read as four boards sitting in a two-by-two arrangement, revealing through depth/tilt. Radial spreading at the end did not change the repeated body. Another failed pair: opposing horizontal shutters and opposed curved currents. A bend or bank did not make two lateral-lane passes distinct.

After the first render, extract a short body excerpt and a beginning/middle/end strip for EVERY scene. Hide scene names and mentally ignore artwork. Repeat the pairwise comparison against what is ACTUALLY visible. If the identifying distinction occurs only during the last half-second or only in the code, the pair still fails. Save the comparison and excerpts with the test output; do not merely assert “all scenes are different”. Redesign the failed scene within the agent's own process, rerender it, and record the iteration. Keep other accepted scenes stable when doing a user-directed revision.

Use the word bank to explore different structures, not to rename similar layouts. Never generate an ordered sequence by picking impressive labels and implementing the same pose interpolation underneath them. Preserve shared lighting, easing and cohesive handoffs across scenes; those are a language, not repetition of the same animation. Explicit requested reprises remain an exception.

## Clear artwork, varied departures

Black studio describes the environment; artwork should retain its intended white, color and surface detail during the readable crest. Record a readable sample time per card/group and inspect field transmission there. A surface can be fully safe at birth/retirement yet stay partly absorbed for its whole lifetime. The boundary checker does not catch that. Bring the whole readable surface onto the clear side of the field, accounting for tilt and edges. Dense shadows and dark reveals belong to transitions, not a blanket dimming of every scene.

If transmission is near one but the artwork is still dull, diagnose fixed studio illumination/material response at the card's actual distance and angle. Calibrate lights against supplied white/color panels, preserve highlights, and keep artwork/material brightness at one. Do not overexpose the lighting to overpower an absorption mistake.

Use an advancing-field exit as a distinct option: while cards continue gentle existing motion, accelerate the field boundary toward the camera after the final intended reading moment. Cross the nearer and farther surface regions progressively until every plane is fully absorbed; then retire them. This is a spatial boundary sweep with geometric depth/angle response, not an alpha dissolve. Give the advancing field enough duration to read, overlap the next scene when appropriate, and reset its position only while the old scene is hidden. Avoid combining a huge retreat and field advance so the scene merely shrinks away before the engulfing is visible.

## Final user decisions and exit invariant

The final pairwise test is not an accepted showcase. Scene 1's revolving identity constellation was rejected as dull and overlong; its common engulfing exit failed. Scene 2's independently timed lattice was acceptable. Scene 4's four-leaf stack spreading around a central aperture was rejected: remove that treatment from the available suggestions and do not recreate it under a new name. Historical references may describe it only as a failed attempt. Do not generalize this rejection to the original accepted V15 ribbon/fall mechanism.

Every collective exit must have visible individual progression. Offset when cards begin departing, how they accelerate/cross the field, and when they disappear. Their departures should overlap cohesively without completing in uniform lockstep. For advancing darkness, choose depth/angle relationships and field direction that engulf surfaces in a legible wave. A single field sweep that erases every card together violates this invariant even when technically volumetric. Inspect the full exit sequence, not only the last hidden frame.

Keep opening scenes concise: repeated revolutions or prolonged low-change reading add no purpose. Trim once the subject and motion are established; preserve nonzero readable movement and begin the next handoff promptly.
