# Averlo Motion Studio

Create local image-plane motion films with Three.js and Remotion: continuous choreography, spatial darkness, studio lighting, soft inter-card shadows and physical material finish. Includes an agent skill, runnable starter and original sample artwork. The starter is a technical example; it is not a complete creative brief.

## Install with your coding agent

```sh
npx skills add olafBobryk/averlo-tool-motion-studio --skill averlo-motion-studio
```

Ask your agent: “Use averlo-motion-studio to make a motion film from my images.” It should confirm genuinely unresolved direction, preserve your assets, create a separate project and render locally. No Averlo login, email or access key is required. The complete runtime is included alongside `SKILL.md` in the installed skill directory.

For a Git checkout:

```sh
git clone https://github.com/olafBobryk/averlo-tool-motion-studio.git
```

## Run the included sample

Requires Python 3, Node.js 22 or newer, npm and a Chromium browser with WebGL support. Commands below run from the checkout or installed skill directory; choose a new output project path.

```sh
python3 scripts/create_project.py /absolute/new-motion-project --assets "$PWD/assets/sample"
cd /absolute/new-motion-project
npm ci
npm run still
npm run test:geometry
npm run test:visibility
npm run render
```

The three generic FORM / SPACE / MOTION panels are original sample artwork. Sample output: `output/still.png`, `output/video.mp4`, `output/geometry-check.json`, and `output/visibility-check.json`. Default video is muted H.264, 1080×1920, 30 fps, 210 frames / 7 seconds. `npm run render` checks actual geometry and visibility before rendering; the `test:*` commands exercise checker regressions. Review the media as well: gates do not certify creative quality.

Remotion downloads a browser when needed. If that fails, set `BROWSER_EXECUTABLE` to your installed Chrome executable when running the render commands. An installed browser is an alternative, not a bundled dependency. On macOS, for example:

```sh
BROWSER_EXECUTABLE='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run render
```

For your own images, supply three equal-aspect PNGs named `frame-01.png`, `frame-02.png` and `frame-03.png` to the minimal starter. The optional historical V15 adapter needs sixteen PNGs and an authorized SVG mark; see [starter documentation](references/starter.md). Source and documentation are included, but historical client clips/artwork are not.

## Updates before every use

Follow [the update procedure](references/updates.md) before every invocation. Public updates preserve local work and announce only the changes actually integrated since your previous successful sync. First use identifies its starting version; unchanged use says no updates were found. Keep custom generated projects separate from the upstream tool checkout.

## Terms and provenance

The [Averlo Tool Use Terms](LICENSE) permit use/customization and personal or commercial outputs, but do not grant redistribution/resale of the tool or modified source. Third-party dependencies retain their licenses; check Remotion’s current licensing for your intended use. [Provenance](references/provenance.md) preserves third-party notices and explains the public package exclusions. Public availability is not an open-source license.
