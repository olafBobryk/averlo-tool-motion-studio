# Motion language: executable decisions

Apply this to the user's paths, sequence and composition. Do not substitute a preset scene. Related motions should share their behavior, not necessarily an identical formula.

## Continuous clocks

For each object define age=time-start-delay. Derive position, rotation, spatial absorption and any light ramp from this lifetime or a deliberately related clock. A handoff may switch formulas only with matching position and preferably velocity. Check velocity around joins by finite differences; do not call all curves C2.

A quintic smootherstep is useful for a bounded light ramp or final settle: u³(10-15u+6u²). It has zero endpoint velocity, so chaining it for every entrance/read/exit creates unwanted stops. For a readable pass, use a monotonic trajectory with a low positive central speed. For a join-and-fall, overlap collection with accelerating loss of depth rather than restart an exit timer after arrival completes.

## Rise and retreat

Use shared incoming/outgoing response shapes with per-object offsets. Expose incoming width, outgoing width, crest shape and delay schedule independently. A too-flat crest can look paused even when numerical velocity is nonzero. V15 grid equation is exp(-(|age|/width)^power), with incoming(37frames,4), outgoing(21+.15j frames,2). These are an example at30fps, not universal constants.

To verify overlap, compare the first visible retreat against the last visible arrival. Timeline intervals overlapping while both objects remain black do not count. Preserve a loved entrance when editing exit. Do not uniformly speed up an entire stage to fix only its tail.

## Hierarchy and restraint

Usually one readable focus, with support motion giving context. A grid can intentionally make many panels equally readable. Keep the active fan card centered/fully framed when requested; supporting layers can fill or overflow the frame. Do not dim a single grid item solely to manufacture hierarchy.

Stagger is a rhythm: consistent cadence, gradual widening, gradual tightening, or an explicitly designed grouping. Avoid arbitrary per-card timings. Optional pauses belong between high-level scenes or at an intentional final hold, not between every card action.

## Direction and momentum

Specify where the object starts relative to the camera and where it ends relative to the field. 'Under camera into background' means approach from below/near, pass the readable location, and decrease camera-facing depth. Use equal physical image dimensions and perspective for apparent scale. Never apply a global screen-scale pulse to fake that depth.

Bank along curves using their tangent/curvature, with modest amplitude. A serious studio pass normally has no unintended position reversal or overshoot. A fallback ease-out is not sufficient justification for a bend that visibly hesitates.

## Adapted upstream ideas

Ported as original implementation guidance from the project's Motion Art Direction reference: shared motion vocabulary, deliberate rhythm, primary/support distinction, and a consistency review. We intentionally do NOT port its mandatory per-beat stillness, exact duration multiples, two-ease ceiling, generic tone presets, or fixed choreography. Those conflicted with this user's continuous motion and overlapping grid. Cinematic Camera contributed coherent spatial relationships and reference inspection, not its warm-background fallback or mandatory new intake gates. See provenance.md.

## Transfer checks exposed by the first new sequence

A long translating band can regress into constant-speed conveyor motion even while its orientation varies. Inspect the translation velocity itself, not a generic claim that the shot is eased. Couple the bands to a shaped travel clock with visible but smooth changes in speed.

For a subtle grid reveal, constrain projected size change, not just world-space Z. At cameraZ21, V15 grid depth−8.6→−7.3 changes projection only about4.6%. A5.8unit depth excursion can exceed25% and read as a zoom. Keep roughly5–8% size variation as a useful starting point for this treatment, and adjust field density/boundary for visibility instead. This is a subtle-grid default, not a ban on deliberate cinematic depth journeys elsewhere.
