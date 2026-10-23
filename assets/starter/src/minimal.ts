import * as THREE from 'three';
import type {WorldState} from './world';
import {staggerAge} from './motion';
// One uninterrupted trajectory per card; stagger overlaps visibly.
export function minimal(frame:number):WorldState{
 const poses=[];
 for(let i=0;i<3;i++){
  const age=staggerAge(frame,i,24);
  if(age<0||age>150)continue;
  const u=age/150;
  // Continue physically deeper before retirement; partial absorption is not invisibility.
  const tail=Math.max(0,(u-.65)/.35);
  const z=3-15*(1-Math.exp(-u*2))-8*tail*tail*tail;
  const y=-15*Math.exp(-u*12)+.8*u;
  poses.push({image:i,position:new THREE.Vector3(0,y,z),quaternion:new THREE.Quaternion().setFromEuler(new THREE.Euler(-.22-.08*u,.08*Math.sin(u*2),.025)),brightness:1,opacity:1,role:'receding',voidDepth:-4.8});
 }
 return {t:frame,poses,outroLight:null};
}
