// Frame-independent motion primitives. Parameters are explicit; tune in playback.
export const clamp01=(x:number)=>Math.max(0,Math.min(1,x));
export const smooth=(x:number)=>{const u=clamp01(x);return u*u*u*(10-15*u+6*u*u)};
// Smooth peak, separate rise and recession widths. Avoid a flat-topped fourth
// power when the exit must visibly begin during later arrivals.
export const wave=(age:number,rise=37,fall=28,risePower=4,fallPower=2)=>Math.exp(-Math.pow(Math.abs(age)/(age<0?rise:fall),age<0?risePower:fallPower));
export const softplus=(x:number,softness=4)=>Math.max(x,0)+softness*Math.log1p(Math.exp(-Math.abs(x)/softness));
// Starts gently before the nominal release and accelerates out of the deck.
export const joinFall=(age:number,release=68,acceleration=.00016)=>acceleration*Math.pow(softplus(age-release),3);
export const staggerAge=(frame:number,index:number,interval=24,growth=0)=>frame-index*interval-growth*index*(index-1)/2;
