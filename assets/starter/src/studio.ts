import * as THREE from 'three';

// Deterministic micro-finish affects only normals and roughness, never the artwork.
export function createFinish(){
 const n=256,rough=new Uint8Array(n*n*4),normal=new Uint8Array(n*n*4);
 let seed=23419;
 const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 const heights=Float32Array.from({length:n*n},()=>random());
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){
  const i=(y*n+x)*4,h=heights[y*n+x];
  const dx=heights[y*n+(x+1)%n]-heights[y*n+(x+n-1)%n];
  const dy=heights[((y+1)%n)*n+x]-heights[((y+n-1)%n)*n+x];
  const r=Math.round(218+24*h+7*Math.sin(x*.09)*Math.sin(y*.13));
  rough.set([r,r,r,255],i);normal.set([128+Math.round(dx*14),128+Math.round(dy*14),255,255],i);
 }
 const make=(data:Uint8Array)=>{const t=new THREE.DataTexture(data,n,n,THREE.RGBAFormat);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(4,2.24);t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.needsUpdate=true;return t;};
 return {rough:make(rough),normal:make(normal)};
}

export function createStudioOcclusion(){
 const vecs=()=>Array.from({length:6},()=>new THREE.Vector3());
 return {studioCount:{value:0},studioCenters:{value:vecs()},studioRights:{value:vecs()},studioUps:{value:vecs()},studioNormals:{value:vecs()},studioLightPosition:{value:new THREE.Vector3(-6,8,14)},studioLightRight:{value:new THREE.Vector3()},studioLightUp:{value:new THREE.Vector3()}};
}

// Visibility of a finite rectangular emitter through the actual card planes.
// Distance-dependent penumbrae emerge from ray geometry, rather than a blurred
// screen-space mask. Sampling is fixed in light space so shadows never shimmer.
export const studioGLSL=(samples:48|128=128,width=10.8,height=6.045)=>`
 uniform int studioCount;
 uniform int studioReceiver;
 uniform vec3 studioCenters[6];
 uniform vec3 studioRights[6];
 uniform vec3 studioUps[6];
 uniform vec3 studioNormals[6];
 uniform vec3 studioLightPosition;
 uniform vec3 studioLightRight;
 uniform vec3 studioLightUp;
 float studioVisibility(vec3 surface){
  if(studioReceiver<0)return 1.0;
  float total=0.0;
  for(int sampleIndex=0;sampleIndex<${samples};sampleIndex++){
   float u=(float(sampleIndex)+0.5)/${samples}.0-0.5;
   float v=fract(float(sampleIndex)*0.61803398875+0.25)-0.5;
   vec3 ray=studioLightPosition+u*studioLightRight+v*studioLightUp-surface;
   float visible=1.0;
   for(int card=0;card<6;card++){
    if(card>=studioCount||card==studioReceiver)continue;
    float denominator=dot(studioNormals[card],ray);
    if(abs(denominator)<0.0001)continue;
    float distanceAlongRay=dot(studioNormals[card],studioCenters[card]-surface)/denominator;
    if(distanceAlongRay<=0.0002||distanceAlongRay>=1.0)continue;
    vec3 point=surface+distanceAlongRay*ray-studioCenters[card];
    float horizontal=1.0-smoothstep(${width/2-.02},${width/2+.02},abs(dot(point,studioRights[card])));
    float vertical=1.0-smoothstep(${height/2-.02},${height/2+.02},abs(dot(point,studioUps[card])));
    visible*=1.0-horizontal*vertical;
   }
   total+=visible;
  }
  return total/${samples}.0;
 }
`;
