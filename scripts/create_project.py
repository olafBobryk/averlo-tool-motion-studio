#!/usr/bin/env python3
"""Create a portable project. Minimal example by default, no overwrites."""
import argparse,json,shutil,struct,math
from pathlib import Path
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('target',type=Path)
p.add_argument('--example',choices=['minimal','v15'],default='minimal')
p.add_argument('--assets',type=Path,required=True,help='Folder containing frame-01.png etc; v15 also requires averlo-mark.svg')
p.add_argument('--quality',choices=['preview','final'],default='final')
p.add_argument('--duration-seconds',type=float,help='Minimal composition duration; does not retime choreography')
a=p.parse_args()
if a.duration_seconds is not None and (a.example=='v15' or not math.isfinite(a.duration_seconds) or a.duration_seconds<=0):p.error('--duration-seconds requires minimal example and a positive finite value')
images=[f'frame-{i:02}.png' for i in range(1,17 if a.example=='v15' else 4)]
if a.example=='v15':images.append('averlo-mark.svg')
if a.target.exists():p.error('Target already exists; use a new directory (nothing overwritten)')
missing=[n for n in images if not (a.assets/n).is_file()]
if missing:p.error('Missing supplied assets: '+', '.join(missing))
ratios=[]
for name in images:
 if not name.endswith('.png'):continue
 with (a.assets/name).open('rb') as f:header=f.read(24)
 if len(header)!=24 or header[:8]!=b'\x89PNG\r\n\x1a\n' or header[12:16]!=b'IHDR':p.error('Invalid PNG header: '+name)
 width,height=struct.unpack('>II',header[16:24])
 if not width or not height:p.error('Invalid PNG dimensions: '+name)
 ratios.append((name,width/height))
ratio=ratios[0][1]
if any(abs(value/ratio-1)>.01 for _,value in ratios):p.error('Mixed image aspect ratios: this starter uses equal-size planes. Supply consistent-ratio images or implement explicit per-image geometry/layout; artwork will not be silently stretched.')
card_width=10.8
card_height=6.045 if a.example=='v15' else card_width/ratio
duration=479 if a.example=='v15' else (max(1,round(a.duration_seconds*30)) if a.duration_seconds is not None else 210)
source=Path(__file__).resolve().parents[1]/'assets'/'starter'
shutil.copytree(source,a.target)
(a.target/'public').mkdir()
for name in images:shutil.copy2(a.assets/name,a.target/'public'/name)
(a.target/'project.json').write_text(json.dumps({'example':a.example,'quality':a.quality,'images':images,'durationInFrames':duration,'cardWidth':card_width,'cardHeight':card_height},indent=2)+'\n')
print(f'Created {a.target.resolve()}. Run npm ci, then npm run still or npm run render inside it.')
