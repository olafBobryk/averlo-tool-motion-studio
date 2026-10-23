import {build} from 'esbuild';
import * as THREE from 'three';
import {readFileSync,writeFileSync,mkdirSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

// Separating-axis test of oriented rectangles with a small clearance thickness.
// Unlike screen-space bounding boxes, normal overlap in projection is allowed.
export function intersects(a,b,clearance=.02){
 const axes=p=>[new THREE.Vector3(1,0,0),new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,1)].map(v=>v.applyQuaternion(p.quaternion).normalize());
 const A=axes(a),B=axes(b),ha=[a.width/2,a.height/2,clearance/2],hb=[b.width/2,b.height/2,clearance/2];
 const delta=b.position.clone().sub(a.position);
 for(const axis of [...A,...B,...A.flatMap(x=>B.map(y=>new THREE.Vector3().crossVectors(x,y)))]){
  if(axis.lengthSq()<1e-16)continue;
  axis.normalize();
  const radius=(basis,h)=>basis.reduce((s,v,i)=>s+Math.abs(axis.dot(v))*h[i],0);
  if(Math.abs(delta.dot(axis))>radius(A,ha)+radius(B,hb)+1e-9)return false;
 }
 return true;
}
if(process.argv.includes('--self-test')){
 const p=(x,y,z,ry=0)=>({position:new THREE.Vector3(x,y,z),quaternion:new THREE.Quaternion().setFromEuler(new THREE.Euler(0,ry,0)),width:2,height:2});
 const cases=[['crossing',p(0,0,0),p(0,0,0,Math.PI/2),true],['coplanar overlap',p(0,0,0),p(.5,0,0),true],['projected overlap but separated',p(0,0,0),p(0,0,.1),false],['apart',p(0,0,0),p(3,0,0),false],['near contact',p(0,0,0),p(0,0,.01),true]];
 for(const [name,a,b,want] of cases)if(intersects(a,b)!==want)throw Error(name);
 console.log('5 geometric regression cases passed.');
}else{
 const config=JSON.parse(readFileSync('project.json','utf8'));
 const tmp=resolve('.geometry-check-'+process.pid+'.mjs');
 const violations=[];let total=0,collisions=0;
 try{
  const source=config.example==='v15'?'src/v15.ts':'src/minimal.ts';
  await build({entryPoints:[source],outfile:tmp,bundle:true,platform:'node',format:'esm',packages:'external',logLevel:'silent'});
  const module=await import(pathToFileURL(tmp));const evaluate=config.example==='v15'?module.v15:module.minimal;
  // Four deterministic samples per output-frame interval. Not a continuous-time proof.
  for(let frame=0;frame<=config.durationInFrames-1;frame+=.25){
   const poses=evaluate(frame).poses.map((p,index)=>{
    const logo=config.images[p.image]==='averlo-mark.svg';
    const values=[...p.position.toArray(),...p.quaternion.toArray()];
    if(!values.every(Number.isFinite)||Math.abs(p.quaternion.length()-1)>1e-5)throw Error(`Invalid transform at ${frame}, pose ${index}`);
    if(p.scale!==undefined)throw Error('Pose scale unsupported: checker must match fixed renderer geometry');
    return {...p,index,width:logo?2.3:config.cardWidth,height:logo?2.36:config.cardHeight};
   });
   total++;
   for(let i=0;i<poses.length;i++)for(let j=i+1;j<poses.length;j++)if(intersects(poses[i],poses[j])){
    collisions++;if(violations.length<300)violations.push({frame,timeSeconds:frame/30,images:[poses[i].image,poses[j].image],poseIndices:[i,j]});
   }
  }
  mkdirSync('output',{recursive:true});
  const report={passed:collisions===0,sampledTimes:total,collisionSamples:collisions,clearanceWorldUnits:.02,stepFrames:.25,violations,scope:'All emitted opaque rectangles, including dark/offscreen planes. Fixed starter dimensions. Finite sampling, not continuous collision proof.'};
  writeFileSync('output/geometry-check.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,collisionSamples:collisions,first:violations[0],report:'output/geometry-check.json'}));
  if(collisions)process.exitCode=1;
 }finally{rmSync(tmp,{force:true});}
}
