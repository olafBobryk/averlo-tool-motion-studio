import React from 'react';
import {Composition,registerRoot,staticFile,useCurrentFrame,delayRender,continueRender,cancelRender} from 'remotion';
import {createWorld} from './world';
import {v15} from './v15';
import {minimal} from './minimal';
import config from '../project.json';
function Showcase(){
 const frame=useCurrentFrame(),canvas=React.useRef<HTMLCanvasElement>(null);
 const [world,setWorld]=React.useState<Awaited<ReturnType<typeof createWorld>>|null>(null);
 const [loading]=React.useState(()=>delayRender('Load image planes'));
 const paint=React.useMemo(()=>delayRender('Paint deterministic frame'),[frame]);
 React.useEffect(()=>{let disposed=false;let active:Awaited<ReturnType<typeof createWorld>>|null=null;
 createWorld(canvas.current!,config.images.map(staticFile),{cardWidth:config.cardWidth,cardHeight:config.cardHeight,logoImage:config.images.indexOf('averlo-mark.svg'),samples:config.quality==='preview'?48:128}).then(w=>{active=w;if(disposed){w.dispose();return}setWorld(w);continueRender(loading)}).catch(cancelRender);
 return()=>{disposed=true;active?.dispose()};},[loading]);
 React.useLayoutEffect(()=>{if(!world)return;try{world.update(config.example==='v15'?v15(frame):minimal(frame));continueRender(paint)}catch(e){cancelRender(e)}},[world,frame,paint]);
 return <canvas ref={canvas} width={1080} height={1920} style={{width:'100%',height:'100%',display:'block'}}/>;
}
registerRoot(()=> <Composition id="MotionStudio" component={Showcase} width={1080} height={1920} fps={30} durationInFrames={config.durationInFrames}/>);
