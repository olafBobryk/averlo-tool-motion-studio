import * as THREE from 'three';
import {choreography,SOURCE_FRAMES} from './choreography';
import type {WorldState} from './types';
// Explicit adaptation of the reference case. No role-dependent policy in world.
export function v15(frame:number):WorldState{
 const state=choreography(frame+SOURCE_FRAMES);
 return {...state,openingMix:1-THREE.MathUtils.smoothstep(state.t,43,49),accentMix:state.t<37?1:0,
 poses:state.poses.map(p=>({...p,castsStudioShadow:p.role==='ribbon'||p.role==='cover-ribbon',voidAmount:p.role==='opening'?0:1,openingFinish:p.role==='opening'}))};
}
