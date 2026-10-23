import {bundle} from '@remotion/bundler';
import {selectComposition,renderMedia,renderStill,openBrowser} from '@remotion/renderer';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
const config=JSON.parse(readFileSync('project.json','utf8'));
for(const image of config.images)if(!existsSync('public/'+image))throw new Error('Missing public/'+image);
mkdirSync('output',{recursive:true});
const serveUrl=await bundle({entryPoint:'src/index.tsx',publicDir:'public'});
const browser=await openBrowser('chrome',{...(process.env.BROWSER_EXECUTABLE?{browserExecutable:process.env.BROWSER_EXECUTABLE}:{}),chromiumOptions:{gl:'angle'}});
try{
 const composition=await selectComposition({serveUrl,id:'MotionStudio',puppeteerInstance:browser});
 const common={serveUrl,composition,puppeteerInstance:browser};
 if(process.argv.includes('--still'))await renderStill({...common,output:'output/still.png',frame:Number(process.env.FRAME||80)});
 else await renderMedia({...common,codec:'h264',outputLocation:'output/video.mp4',concurrency:1,crf:17});
}finally{await browser.close({silent:true})}
