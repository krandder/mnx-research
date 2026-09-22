// Static SVGs for the theory companion page.
const C={ink:'#161616',muted:'#5f625f',rule:'#ccd6da',green:'#0f6b5f',orange:'#b4530a',purple:'#5b4b8a',grey:'#8a949a',warn:'#9b4b21',soft:'#0f6b5f22'}
const path=(pts:number[][],X:(x:number)=>number,Y:(y:number)=>number)=>pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ')
function frame(W:number,H:number,pad:any,xr:number[],yr:number[],xt:number[],yt:number[],xl:string,yl:string){
 const X=(x:number)=>pad.l+(x-xr[0])/(xr[1]-xr[0])*(W-pad.l-pad.r),Y=(y:number)=>H-pad.b-(y-yr[0])/(yr[1]-yr[0])*(H-pad.t-pad.b)
 let g=`<rect width="${W}" height="${H}" fill="#ffffff"/>`
 for(const v of yt)g+=`<line x1="${pad.l}" x2="${W-pad.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.rule}"/><text x="${pad.l-6}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="${C.muted}">${v}</text>`
 for(const v of xt)g+=`<text x="${X(v)}" y="${H-pad.b+14}" text-anchor="middle" font-size="11" fill="${C.muted}">${v}</text>`
 g+=`<text x="${W-pad.r}" y="${H-4}" text-anchor="end" font-size="11" fill="${C.muted}">${xl}</text><text x="${pad.l}" y="${pad.t-5}" font-size="11" fill="${C.muted}">${yl}</text>`
 return{g,X,Y}}
const legend=(items:[string,string,boolean?][],x:number,y:number)=>items.map((it,i)=>`<line x1="${x}" x2="${x+18}" y1="${y+i*16}" y2="${y+i*16}" stroke="${it[1]}" stroke-width="2.2" ${it[2]?'stroke-dasharray="5 3"':''}/><text x="${x+24}" y="${y+i*16+4}" font-size="11.5" fill="${C.ink}">${it[0]}</text>`).join('')
const out:Record<string,string>={}
// Fig A: implication map
{const W=760,H=330;let g=`<rect width="${W}" height="${H}" fill="#ffffff"/>`
 const box=(x:number,y:number,w:number,h:number,t:string[],col:string)=>{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#ffffff" stroke="${col}" stroke-width="1.8"/>`;t.forEach((l,i)=>s+=`<text x="${x+w/2}" y="${y+18+i*15}" text-anchor="middle" font-size="${i?11:12.5}" font-weight="${i?400:600}" fill="${i?C.muted:C.ink}">${l}</text>`);return s}
 g+=box(20,30,200,58,['E: strategic equilibrium','competitive dealers, insider,','noise, a manipulator as player'],C.purple)
 g+=box(280,30,200,58,['B_obs: observational posterior','fill price = E[V | public history]','with full support'],C.orange)
 g+=box(540,30,200,58,['B_ctl: controlled-law posterior','fill price = E[V | the trader’s own','law, order ownership included]'],C.orange)
 g+=box(150,200,200,58,['N₀: no pump from rest','⇔ a storage function G','(fills charge ΔG, waits lower G)'],C.green)
 g+=box(410,200,200,58,['N∗: no pump from any state','⇔ liquidation value never rises','on a wait ⇒ price still on waits'],C.green)
 const arrow=(x1:number,y1:number,x2:number,y2:number,label:string,ok:boolean)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ok?C.green:C.warn}" stroke-width="2" ${ok?'':'stroke-dasharray="6 4"'} marker-end="url(#a)"/><text x="${(x1+x2)/2+6}" y="${(y1+y2)/2-4}" font-size="11" fill="${ok?C.green:C.warn}">${label}</text>`
 g=`<defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${C.ink}"/></marker></defs>`+g
 g+=arrow(640,88,300,200,'⇒ proved (no full support needed)',true)
 g+=arrow(380,88,270,200,'⇏ six-slot counterexample',false)
 g+=arrow(120,88,200,200,'⇏ Nash gives the manipulator ≥ 0, not ≤ 0',false)
 g+=arrow(410,229,350,229,'⇒',true)
 g+=`<text x="380" y="300" text-anchor="middle" font-size="11.5" fill="${C.ink}">N₀ ⇏ B_obs (a plateau price admits no martingale) and N₀ ⇏ B_ctl (a deterministic schedule at posterior fills costs exactly zero).</text>`
 g+=`<text x="380" y="318" text-anchor="middle" font-size="11.5" fill="${C.ink}">N∗ is unattainable by any spreadless AMM whose price moves during a wait; every decaying transient is harvestable from a displaced state.</text>`
 out.figA=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Implications between equilibrium, Bayesian pricing and non-pumpability">${g}</svg>`}
// Fig B: the explicit steepening equilibrium g(y)=b y-(b-a) L atan(y/L) and its slope
{const a=1,b=10,L=2;const g_=(y:number)=>b*y-(b-a)*L*Math.atan(y/L);const gp=(y:number)=>b-(b-a)/(1+y*y/(L*L))
 const W=760,H=280,pad={l:46,t:20,r:14,b:30};const ym=12
 const {g:g0,X,Y}=frame(W,H,pad,[-ym,ym],[-g_(ym)*1.05,g_(ym)*1.05],[-12,-6,0,6,12],[-100,-50,0,50,100],'cumulative flow y (units)','bp')
 let g=g0+`<line x1="${X(0)}" x2="${X(0)}" y1="${pad.t}" y2="${H-pad.b}" stroke="${C.grey}" stroke-dasharray="2 3"/>`
 const pts:number[][]=[],lin:number[][]=[];for(let y=-ym;y<=ym;y+=0.1){pts.push([y,g_(y)]);lin.push([y,b*y-(b-a)*L*Math.PI/2*Math.sign(y)])}
 g+=`<path d="${path(lin,X,Y)}" fill="none" stroke="${C.grey}" stroke-width="1.4" stroke-dasharray="5 3"/><path d="${path(pts,X,Y)}" fill="none" stroke="${C.green}" stroke-width="2.4"/>`
 g+=legend([['g(y) = b·y − (b − a)·L·arctan(y/L): the value map of the equilibrium',C.green],['its far asymptote of slope b: the liquidity floor 1/b',C.grey,true]],pad.l+10,pad.t+12)
 out.figB=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The steepening equilibrium price map">${g}</svg>`
 const W2=760,H2=220;const {g:h0,X:X2,Y:Y2}=frame(W2,H2,pad,[-ym,ym],[0,b*1.1],[-12,-6,0,6,12],[0,5,10],'cumulative flow y (units)','bp per unit')
 let h=h0+`<line x1="${X2(0)}" x2="${W2-pad.r}" y1="${Y2(a)}" y2="${Y2(a)}" stroke="${C.rule}"/>`
 const sp:number[][]=[];for(let y=-ym;y<=ym;y+=0.1)sp.push([y,gp(y)]);h+=`<path d="${path(sp,X2,Y2)}" fill="none" stroke="${C.green}" stroke-width="2.4"/>`
 h+=`<text x="${X2(0)+6}" y="${Y2(a)-6}" font-size="11.5" fill="${C.ink}">slope a = ${a} at the touch, dense</text><text x="${W2-pad.r-6}" y="${Y2(b)+14}" text-anchor="end" font-size="11.5" fill="${C.ink}">slope → b = ${b} far out, thin, never a wall</text>`
 out.figB2=`<svg viewBox="0 0 ${W2} ${H2}" role="img" aria-label="Slope of the equilibrium price map">${h}</svg>`}
// Fig C: Kyle-Back with decaying noise: R = aY + bY^3 + 3bvY as v decays
{const a=1,b=0.05;const R=(Y:number,v:number)=>a*Y+b*Y**3+3*b*v*Y
 const W=760,H=280,pad={l:46,t:20,r:14,b:30};const ym=10
 const {g:g0,X,Y}=frame(W,H,pad,[-ym,ym],[-R(ym,4)*1.05,R(ym,4)*1.05],[-10,-5,0,5,10],[-100,-50,0,50,100],'insider’s cumulative flow Y','price minus fair (bp)')
 let g=g0+`<line x1="${X(0)}" x2="${X(0)}" y1="${pad.t}" y2="${H-pad.b}" stroke="${C.grey}" stroke-dasharray="2 3"/>`
 const cols=[C.orange,C.purple,C.green];const vs=[4,1,0]
 vs.forEach((v,i)=>{const pts:number[][]=[];for(let y=-ym;y<=ym;y+=0.1)pts.push([y,R(y,v)]);g+=`<path d="${path(pts,X,Y)}" fill="none" stroke="${cols[i]}" stroke-width="2.2" ${v===0?'':'stroke-dasharray="6 3"'}/>`})
 g+=legend([['early, v = 4: steep, the transient part 3bvY is large',C.orange,true],['later, v = 1',C.purple,true],['v → 0: only the permanent part aY + bY³ remains',C.green]],pad.l+10,pad.t+12)
 out.figC=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Kyle-Back price with decaying noise variance">${g}</svg>`}
await Bun.write('/tmp/pump-sim/theory-figs.json',JSON.stringify(out));console.log(Object.keys(out).join(','))
