import {build} from 'esbuild';
import * as T from 'three';
import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const eye=new T.Vector3(0,0,21);
const camera=new T.PerspectiveCamera(2*Math.atan(9.6/21)*180/Math.PI,1080/1920,.1,120);camera.position.copy(eye);camera.updateMatrixWorld();
const frustum=new T.Frustum().setFromProjectionMatrix(new T.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
const EPS=1e-6;
const integral=(a,b)=>Math.abs(b-a)<.0001?Math.max(0,(a+b)/2)**2:(Math.max(b,0)**3-Math.max(a,0)**3)/(3*(b-a));
function corners(p,c){const logo=c.images[p.image]==='averlo-mark.svg',w=logo?2.3:c.cardWidth,h=logo?2.36:c.cardHeight;return [-1,1].flatMap(x=>[-1,1].map(y=>new T.Vector3(x*w/2,y*h/2,0).applyQuaternion(p.quaternion).add(p.position)));}
export function boundary(p,c){
 const pts=corners(p,c),box=new T.Box3().setFromPoints(pts);
 // AABB-frustum rejection is conservative: ambiguous corners must use darkness.
 if(!frustum.intersectsBox(box))return {safe:true,route:'offscreen',transmissionBound:null};
 const normal=(p.voidNormal??new T.Vector3(0,0,1)).clone().normalize(),depth=p.voidDepth??-4.8;
 const a=depth-normal.dot(eye),b=Math.min(...pts.map(v=>depth-normal.dot(v)));
 const local=eye.clone().sub(p.position).applyQuaternion(p.quaternion.clone().invert());
 const logo=c.images[p.image]==='averlo-mark.svg',w=logo?2.3:c.cardWidth,h=logo?2.36:c.cardHeight;
 const nearest=new T.Vector3(T.MathUtils.clamp(local.x,-w/2,w/2),T.MathUtils.clamp(local.y,-h/2,h/2),0);
 const minRay=local.distanceTo(nearest);
 // Lower bound on absorption over the whole rectangle; nonnegative side absorption ignored.
 const transmissionBound=Math.exp(-(p.voidAmount??1)*(p.voidDensity??1)*minRay*.16*integral(a,b));
 return {safe:transmissionBound<=EPS,route:'field',transmissionBound};
}
if(process.argv.includes('--self-test')){
 const c={images:['a'],cardWidth:10.8,cardHeight:6.045};
 const p={image:0,position:new T.Vector3(0,0,-12),quaternion:new T.Quaternion(),voidDepth:-10.7,voidDensity:2};
 const cases=[['slightly inside field fails',p,false],['fully dark passes',{...p,voidDepth:10},true],['offscreen passes',{...p,position:new T.Vector3(100,0,-12)},true],['tilted exposed edge fails',{...p,quaternion:new T.Quaternion().setFromEuler(new T.Euler(0,1,0))},false]];
 for(const [n,p,want] of cases)if(boundary(p,c).safe!==want)throw Error(n);
 console.log('4 visibility boundary cases passed.');
}else{
 const c=JSON.parse(readFileSync('project.json','utf8')),tmp=resolve('.visibility-check-'+process.pid+'.mjs');
 const failures=[],events=[],holds=[];let previous=new Map(),runs=new Map();
 const key=p=>String(p.id??p.image);
 try{
 await build({entryPoints:[c.example==='v15'?'src/v15.ts':'src/minimal.ts'],outfile:tmp,bundle:true,platform:'node',format:'esm',packages:'external',logLevel:'silent'});
 const m=await import(pathToFileURL(tmp)),evaluate=c.example==='v15'?m.v15:m.minimal;
 function at(f){const map=new Map();for(const p of evaluate(f).poses){const k=key(p);if(map.has(k))throw Error('Repeated image needs distinct stable pose.id: '+k);map.set(k,p);}return map;}
 function event(k,p,f,kind){const result=boundary(p,c);events.push({id:k,image:p.image,frame:f,timeSeconds:f/30,kind,...result});if(!result.safe)failures.push(events.at(-1));}
 function edge(k,lo,hi,birth){for(let n=0;n<22;n++){let mid=(lo+hi)/2;if(at(mid).has(k)===birth)hi=mid;else lo=mid;}const f=birth?hi:lo;return [at(f).get(k),f];}
 function closeHold(k,f){const r=runs.get(k);if(r&&f-r.start>=24)holds.push({id:k,startSeconds:r.start/30,endSeconds:f/30,seconds:(f-r.start)/30,reason:'Projected corners move below 8 pixels/second; editorial review, not automatic failure'});runs.delete(k);}
 for(let f=0;f<=c.durationInFrames-1;f+=.25){
  const curr=at(f);
  for(const [k,p] of curr){
   if((p.opacity??1)!==1||(p.brightness??1)!==1||p.scale!==undefined)throw Error(`Forbidden opacity/brightness/scale shortcut at frame ${f}, id ${k}`);
   if((p.voidAmount??1)<0||(p.voidDensity??1)<0||(p.voidSides??0)<0)throw Error('Negative absorption unsupported');
   if(!previous.has(k)){const [q,t]=f===0?[p,0]:edge(k,f-.25,f,true);event(k,q,t,'birth');}
   else if(!boundary(p,c).safe){
    const before=corners(previous.get(k),c).map(v=>v.project(camera)),now=corners(p,c).map(v=>v.project(camera));
    const speed=Math.max(...now.map((v,i)=>Math.hypot((v.x-before[i].x)*540,(v.y-before[i].y)*960)))*120;
    if(speed<8){if(!runs.has(k))runs.set(k,{start:f-.25});}else closeHold(k,f);
   }else closeHold(k,f);
  }
  for(const [k] of previous)if(!curr.has(k)){const [q,t]=edge(k,f-.25,f,false);event(k,q,t,'retirement');closeHold(k,f);}
  previous=curr;
 }
 for(const [k,p] of previous){closeHold(k,c.durationInFrames-1);if(c.visibilityCheck?.finalHoldReason)events.push({id:k,kind:'explicit-final-hold',reason:c.visibilityCheck.finalHoldReason});else event(k,p,c.durationInFrames-1,'film-end');}
 mkdirSync('output',{recursive:true});const report={passed:failures.length===0,thresholdTransmission:EPS,events,failures,holdWarnings:holds,scope:'Conservative rectangle/frustum and whole-plane optical-depth bound using starter camera and shader. Quarter-frame identity sampling with refined boundaries. No pixel-brightness, occlusion, or between-sample continuity proof.'};
 writeFileSync('output/visibility-check.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,failures:failures.length,holdWarnings:holds.length,report:'output/visibility-check.json'}));if(failures.length)process.exitCode=1;
 }finally{rmSync(tmp,{force:true});}
}
