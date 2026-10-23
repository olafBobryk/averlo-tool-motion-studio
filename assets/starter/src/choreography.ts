import * as THREE from 'three';
export const SOURCE_FRAMES=77;
export const TOTAL_FRAMES=556;
const X=[-820,-450,-220,-84.203,-33.465,-18.787,-16.238,-15.429];
const slopes=X.map((_,i)=>i===0?410:i===X.length-1?.8:2/(1/(X[i]-X[i-1])+1/(X[i+1]-X[i])));
export const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const smooth=(x:number)=>{const u=clamp(x);return u*u*u*(10-15*u+6*u*u)};
export function travel(t:number){
 if(t<0)return X[0]+410*t;
 if(t>=7)return X[7]+.8*(t-7)+.00012*(t-7)**2;
 const n=Math.floor(t),v=t-n;
 return(2*v**3-3*v*v+1)*X[n]+(v**3-2*v*v+v)*slopes[n]+(-2*v**3+3*v*v)*X[n+1]+(v**3-v*v)*slopes[n+1];
}
const span=X[7]-X[0];
export function pulse(t:number){if(t<=-7)return 0;if(t>=7)return 1;return t<0?(X[7]-travel(-t))/(2*span):1-(X[7]-travel(t))/(2*span)}
import type {Pose} from './types';
const rad=THREE.MathUtils.degToRad;
export function choreography(f:number){
 const t=f-SOURCE_FRAMES;
 const poses:Pose[]=[];
 let rig=new THREE.Quaternion();
 const add=(image:number,x:number,y:number,z:number,rz:number,brightness:number,opacity:number,anchor:THREE.Vector3,role:string)=>{
  const position=new THREE.Vector3(x,y,z).applyQuaternion(rig);
  position.x-=anchor.x;position.y-=anchor.y;
  poses.push({image,position,quaternion:rig.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),rad(rz))),brightness,opacity,role});
 };
 if(t>=0&&t<45){
  const u=t*88/77;
  // Preserve the fast measured arrival, but raise the nonzero reading speed smoothly.
  const drift=Math.max(0,u-7);
  const entry=(travel(u)-X[7])+4*(drift-3*(1-Math.exp(-drift/3)));
  const exit=X[7]-travel(7-Math.max(0,t-24)*88/77);
  const turn=(entry+exit+span)/1600;
  rig.setFromEuler(new THREE.Euler(rad(-22+5*turn+.5*Math.sin(t/38)),rad(15-4*turn+.2*Math.sin(t/45)),rad(12-4*turn+.2*Math.sin(t/47))));
  add(0,(entry+exit)/100,0,-2.6,0,1,1,new THREE.Vector3(0,0,-2.6).applyQuaternion(rig),'opening');
 }
 if(t>=31&&t<146){
  // All cards follow one continuous under-camera → background track.
  // Negative pitch points the upper edge away from the camera.
  rig.setFromEuler(new THREE.Euler(rad(-18+.65*Math.sin(t/67)),rad(7+.35*Math.sin(t/71)),rad(4+.3*Math.sin(t/73))));
  for(let j=0;j<4;j++){
   const age=(t-[50,68,90,116][j])/(.80+j*.13);
   // C1-continuous speed at the focal crossing; faster approach, slower recession.
   const distance=age<0?.20*age-.004*age*age:.10*age+1.3*(1-Math.exp(-age/13));
   const below=Math.min(0,distance);
   const position=new THREE.Vector3(.035*distance,.65*distance-.20*below*below,-3-distance);
   poses.push({image:j+1,position,quaternion:rig.clone(),brightness:1,opacity:1,role:Math.abs(age)<5?'fan-active':'fan-support',voidDepth:-4.8+.012*Math.pow(Math.max(0,t-116),2)});
  }
 }
 // One diagonal grid axis; local center pivots remain subtle.
 if(t>=134&&t<314){
  const g=t-134;
  const axis=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),rad(-12+.35*Math.sin(g/70)));
  const delays=[0,4,8.5,14,20,27,35,44];
  for(let j=0;j<8;j++){
   const row=Math.floor(j/2),col=j%2,age=g-42-delays[j];
   const wave=Math.exp(-Math.pow(age/(age<0?37:21+j*.15),age<0?4:2));
   const phase=age/35;
   const position=new THREE.Vector3((col-.5)*11.5,(row-1.5)*7.1+.10*Math.sin(phase),-8.6+1.3*wave).applyQuaternion(axis);
   const pivot=new THREE.Quaternion().setFromEuler(new THREE.Euler(rad(-4*Math.tanh(phase)),rad((col?1:-1)*2*Math.sin(phase)),0));
   poses.push({image:j+5,position,quaternion:axis.clone().multiply(pivot),brightness:1,opacity:1,role:'grid-wave',voidDepth:-7.6,voidDensity:1500,voidSides:0});
  }
 }
 // Two continuous diagonal ribbons collect, then accelerate out below.
 if(t>=241){
  const g=t-241;
  const deckRig=new THREE.Quaternion().setFromEuler(new THREE.Euler(rad(-15+.7*Math.sin(g/59)),rad(8+.6*Math.sin(g/61)),rad(4+.8*Math.sin(g/67))));
  const anchor=new THREE.Vector3(0,0,-1.75).applyQuaternion(deckRig);
  const delays=[0,8,21,30,43,53];
  const softplus=(x:number)=>x>40?x:10*Math.log1p(Math.exp(x/10));
  for(let j=0;j<6;j++){
   const age=g-delays[j];
   if(age<0)continue;
   const u=1-Math.pow(1-clamp(age/64),3),v=1-u;
   const lane=j%2;
   const a=lane?new THREE.Vector2(19,-13):new THREE.Vector2(-17,15);
   const b=lane?new THREE.Vector2(10,-9):new THREE.Vector2(-9,10);
   const c=lane?new THREE.Vector2(2.5,-2.5):new THREE.Vector2(-2.5,2.5);
   const point=a.clone().multiplyScalar(v*v*v).addScaledVector(b,3*v*v*u).addScaledVector(c,3*v*u*u);
   const tangent=b.clone().sub(a).multiplyScalar(3*v*v).addScaledVector(c.clone().sub(b),6*v*u).addScaledVector(c.clone().negate(),3*u*u);
   const bend=c.clone().add(a).addScaledVector(b,-2).multiplyScalar(6*v).addScaledVector(b.clone().addScaledVector(c,-2),6*u);
   const curvature=(tangent.x*bend.y-tangent.y*bend.x)/Math.max(1,tangent.lengthSq());
   const roll=(Math.atan2(tangent.y,tangent.x)*.27+THREE.MathUtils.clamp(curvature,-1,1)*.12)*v;
   // Acceleration is a continuation of the incoming path, not a new fade/exit.
   const fall=.00016*Math.pow(softplus(age-68),3);
   const position=new THREE.Vector3(point.x,point.y-.90*fall,-3.5+j*.35+3.6*v-1.35*fall).applyQuaternion(deckRig);
   position.x-=anchor.x;position.y-=anchor.y;
   const quaternion=deckRig.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),roll));
   poses.push({image:j===5?0:j+11,position,quaternion,brightness:1,opacity:1,role:j===5?'cover-ribbon':'ribbon',voidDepth:-4.8,voidSides:0});
  }
 }
 const outroLight=t>=409?smooth((t-409)/48):null;
 if(t>=409){
  const age=t-409;
  // Physical emergence and studio-light ignition share the same start time.
  poses.push({image:16,position:new THREE.Vector3(0,0,-5.9+1.7*smooth(age/48)),quaternion:new THREE.Quaternion(),brightness:1,opacity:1,role:'averlo-outro',voidDepth:-4.8,voidDensity:50});
 }
 return {t,poses,rig,outroLight,reveal:0,shadowReveal:false,fan:t>=31&&t<146};
}
