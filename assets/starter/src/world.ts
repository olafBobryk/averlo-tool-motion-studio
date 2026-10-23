import * as THREE from 'three';
import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import type {WorldState} from './types';
export type {WorldState} from './types';
function replaceOnce(source:string,target:string,replacement:string){if(source.split(target).length!==2)throw new Error('Three.js shader contract changed: '+target);return source.replace(target,replacement);}
import {createFinish,createStudioOcclusion,studioGLSL} from './studio';
export async function createWorld(canvas:HTMLCanvasElement,urls:string[], options:{cardWidth?:number;cardHeight?:number;logoWidth?:number;logoHeight?:number;logoImage?:number;poolSize?:number;samples?:48|128}={}){
 const {cardWidth=10.8,cardHeight=6.045,logoWidth=2.3,logoHeight=2.36,logoImage=16,poolSize=16,samples=128}=options;
 if(!urls.length || poolSize<1)throw new Error("Provide image URLs and positive pool size");
 RectAreaLightUniformsLib.init();
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
 renderer.setSize(1080,1920,false);renderer.setPixelRatio(1);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
 renderer.shadowMap.enabled=false;renderer.shadowMap.type=THREE.PCFShadowMap;
 const scene=new THREE.Scene();scene.background=new THREE.Color(0);
 const camera=new THREE.PerspectiveCamera(2*Math.atan(9.6/21)*180/Math.PI,1080/1920,.1,120);camera.position.z=21;
 const geometry=new THREE.PlaneGeometry(cardWidth,cardHeight);
 const logoGeometry=new THREE.PlaneGeometry(logoWidth,logoHeight);
 const textures=await Promise.all(urls.map(url=>new THREE.TextureLoader().loadAsync(url)));
 textures.forEach(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy()});

 const finish=createFinish(),studio=createStudioOcclusion();
 const cards=Array.from({length:poolSize},()=>{
  const mat=new THREE.MeshPhysicalMaterial({roughness:.3,metalness:0,clearcoat:1,clearcoatRoughness:.16,ior:1.48,side:THREE.DoubleSide,transparent:true});
  mat.roughnessMap=finish.rough;mat.clearcoatRoughnessMap=finish.rough;mat.normalMap=finish.normal;mat.normalScale.set(.12,.12);mat.clearcoatNormalMap=finish.normal;mat.clearcoatNormalScale.set(.08,.08);
  mat.userData.studioReceiver={value:-1};
  const voidDepth={value:-4.8},voidAmount={value:0},voidSides={value:0},voidNormal={value:new THREE.Vector3(0,0,1)},voidTransparency={value:0},voidDensity={value:1};
  mat.userData.voidUniforms={voidDepth,voidAmount,voidSides,voidNormal,voidTransparency,voidDensity};
  // Integrate a smooth density field along each camera-to-surface ray.
  // The cubic primitive avoids sampling loops or stacks of translucent planes.
  mat.onBeforeCompile=shader=>{
   Object.assign(shader.uniforms,studio,{studioReceiver:mat.userData.studioReceiver});
   const lightChunk=replaceOnce(THREE.ShaderChunk.lights_fragment_begin,"rectAreaLight = rectAreaLights[ i ];",`rectAreaLight = rectAreaLights[ i ];
#if UNROLLED_LOOP_INDEX == 0
rectAreaLight.color *= studioVisibility(voidWorldPosition);
#endif`);
   shader.fragmentShader=replaceOnce(shader.fragmentShader,"#include <lights_fragment_begin>",lightChunk);
   shader.uniforms.voidDepth=voidDepth;shader.uniforms.voidAmount=voidAmount;shader.uniforms.voidSides=voidSides;shader.uniforms.voidNormal=voidNormal;shader.uniforms.voidTransparency=voidTransparency;shader.uniforms.voidDensity=voidDensity;
   shader.vertexShader='varying vec3 voidWorldPosition;\n'+shader.vertexShader;
   shader.vertexShader=replaceOnce(shader.vertexShader,'#include <project_vertex>', '#include <project_vertex>\nvoidWorldPosition=(modelMatrix*vec4(transformed,1.0)).xyz;');
   shader.fragmentShader=`varying vec3 voidWorldPosition;
    uniform float voidDensity;uniform float voidTransparency;uniform vec3 voidNormal;uniform float voidDepth;uniform float voidAmount;uniform float voidSides;
    float integratedDensity(float a,float b){
     float d=b-a;
     if(abs(d)<0.0001)return pow(max(0.0,(a+b)*0.5),2.0);
     return (pow(max(b,0.0),3.0)-pow(max(a,0.0),3.0))/(3.0*d);
    }
   `+studioGLSL(samples,cardWidth,cardHeight)+shader.fragmentShader;
   shader.fragmentShader=replaceOnce(shader.fragmentShader,'#include <opaque_fragment>', `
    float rayLength=length(voidWorldPosition-cameraPosition);
    float opticalDepth=0.16*integratedDensity(voidDepth-dot(voidNormal,cameraPosition),voidDepth-dot(voidNormal,voidWorldPosition));
    opticalDepth+=voidSides*0.055*(integratedDensity(cameraPosition.x-3.7,voidWorldPosition.x-3.7)+integratedDensity(-cameraPosition.x-3.7,-voidWorldPosition.x-3.7));
    float transmission=exp(-voidAmount*voidDensity*rayLength*opticalDepth);
    outgoingLight*=mix(transmission,1.0,voidTransparency);
    diffuseColor.a*=mix(1.0,transmission,voidTransparency);
    #include <opaque_fragment>
   `);
  };
  mat.customProgramCacheKey=()=> 'integrated-black-void-v15-'+samples+'-'+cardWidth+'-'+cardHeight;
  const mesh=new THREE.Mesh(geometry,mat);mesh.castShadow=false;mesh.receiveShadow=false;mesh.visible=false;scene.add(mesh);return mesh;
 });
 const fill=new THREE.AmbientLight(0xffffff,.5);scene.add(fill);
 const openingKey=new THREE.SpotLight(0xffffff,750,0,.72,.25,2);openingKey.position.set(-6,8,14);openingKey.target.position.set(0,0,-3.6);scene.add(openingKey,openingKey.target);
 const key=new THREE.RectAreaLight(0xffffff,8,8,10);key.position.set(-6,8,14);key.lookAt(0,0,-3.6);scene.add(key);
 studio.studioLightRight.value.set(8,0,0).applyQuaternion(key.quaternion);
 studio.studioLightUp.value.set(0,10,0).applyQuaternion(key.quaternion);
 const strip=new THREE.RectAreaLight(0xffffff,1.6,3,12);scene.add(strip);
 const rim=new THREE.RectAreaLight(0xffffff,.75,7,5);rim.position.set(-9,-4,9);rim.lookAt(0,0,-4);scene.add(rim);
 function update(state:WorldState){
  if(state.poses.length>cards.length)throw new Error("Pose count exceeds configured poolSize");
  if(state.poses.some(p=>!Number.isInteger(p.image)||p.image<0||p.image>=textures.length))throw new Error("Invalid pose image index");
  cards.forEach(c=>c.visible=false);
  const blockers=state.poses.filter(p=>p.castsStudioShadow===true);
  if(blockers.some(p=>p.image===logoImage))throw new Error("Logo cannot be an opaque rectangular studio blocker");
  if(blockers.length>6)throw new Error("Studio rectangle blocker limit is 6; split the shot or implement a larger tested budget");
  studio.studioCount.value=blockers.length;
  blockers.forEach((p,i)=>{
   studio.studioCenters.value[i].copy(p.position);
   studio.studioRights.value[i].set(1,0,0).applyQuaternion(p.quaternion);
   studio.studioUps.value[i].set(0,1,0).applyQuaternion(p.quaternion);
   studio.studioNormals.value[i].set(0,0,1).applyQuaternion(p.quaternion);
  });
  for(let i=0;i<state.poses.length;i++){
   const p=state.poses[i],mesh=cards[i],mat=mesh.material;
   mesh.visible=p.opacity>.00001;mesh.position.copy(p.position);mesh.quaternion.copy(p.quaternion);
   // Only the collecting ribbons cast onto each other; the background void stays unchanged.
   mat.userData.studioReceiver.value=blockers.indexOf(p);
   const fog=mat.userData.voidUniforms;
   fog.voidDepth.value=p.voidDepth??-4.8;
   fog.voidAmount.value=p.voidAmount??1;
   fog.voidNormal.value.copy(p.voidNormal??new THREE.Vector3(0,0,1)).normalize();
   fog.voidSides.value=p.voidSides??0;
   fog.voidDensity.value=p.voidDensity??1;
   mesh.geometry=p.image===logoImage?logoGeometry:geometry;
   // All artwork stays opaque; darkness comes only from spatial absorption.
   fog.voidTransparency.value=0;
   mat.depthWrite=true;
   mat.map=textures[p.image];mat.color.setScalar(p.brightness**2.2);mat.opacity=p.opacity;
   mat.clearcoat=(p.openingFinish===true?.95:.22)*p.brightness**2.2;
   mat.specularIntensity=(p.openingFinish===true?1:.65)*p.brightness**2.2;
   mat.clearcoatRoughness=(p.openingFinish===true?.25:.30)+.06*(1-p.brightness);
   mat.needsUpdate=!mat.userData.ready;mat.userData.ready=true;
  }
  // Fixed studio softbox: only the card surface responds to its viewing angle.
  strip.position.set(7,8,12);strip.lookAt(0,0,-3.2);
  const accentMix=THREE.MathUtils.clamp(state.accentMix??0,0,1);
  fill.intensity=.35+.15*accentMix;rim.intensity=.3+.45*accentMix;strip.intensity=.25+1.35*accentMix;
  const openingMix=THREE.MathUtils.clamp(state.openingMix??0,0,1);
  openingKey.intensity=750*openingMix;key.intensity=8*(1-openingMix);
  if(state.outroLight!=null){
   openingKey.intensity=0;
   key.intensity=8*state.outroLight;
   fill.intensity=.35*state.outroLight;
   rim.intensity=.3*state.outroLight;
   strip.intensity=.25*state.outroLight;
  }
  renderer.render(scene,camera);renderer.getContext().finish();
 }
 // Compile with mapped materials, shadow maps and all lights enabled before the first capture.
 cards.forEach((c,i)=>{c.material.map=textures[i%textures.length];c.visible=true});
 await renderer.compileAsync(scene,camera);
 return {update,dispose:()=>{textures.forEach(t=>t.dispose());cards.forEach(c=>c.material.dispose());geometry.dispose();logoGeometry.dispose();finish.rough.dispose();finish.normal.dispose();renderer.dispose()}};
}
