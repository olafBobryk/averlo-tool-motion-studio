import type * as THREE from 'three';
export type Pose={id?:string;image:number;position:THREE.Vector3;quaternion:THREE.Quaternion;brightness:number;opacity:number;role:string;voidDepth?:number;voidSides?:number;voidDensity?:number;voidNormal?:THREE.Vector3;voidAmount?:number;castsStudioShadow?:boolean;openingFinish?:boolean};
export type WorldState={t:number;poses:Pose[];outroLight?:number|null;openingMix?:number;accentMix?:number};
