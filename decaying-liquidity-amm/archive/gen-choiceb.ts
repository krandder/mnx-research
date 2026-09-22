// Static SVG figures for the Choice B write-up (no JS allowed on the deploy).
const a=1,b=10,L=2,s=0.5,tau=1,d=b-a
const sg=(x:number)=>x<0?-1:x>0?1:0
const T=(x:number)=>{const X=Math.abs(x);return sg(x)*(b*X-d*L*Math.log1p(X/L))}
const V=(x:number)=>{const X=Math.abs(x);return b/2*X*X-d*L*((X+L)*Math.log1p(X/L)-X)}
const Tp=(x:number)=>{const X=Math.abs(x);return a+d*X/(L+X)}
const h=(x:number)=>{const r=Math.abs(x)/L;if(r<1e-9)return a;const sr=Math.sqrt(r);return b-d*Math.atan(sr)/sr}
const A=(x:number)=>2*x*h(x)-T(x)
const B=(x:number)=>(2*x*A(x)-V(x))/3
// engine
type St={P:number,phi:number,F:number,cash:number}
const fill=(st:St,q:number)=>{const phi2=st.phi+q;const c=st.F*q+s/2*q*q+V(phi2)-V(st.phi)+B(phi2)-B(st.phi)-A(st.phi)*q;st.F+=s*q+A(phi2)-A(st.phi);st.phi=phi2;st.P+=q;st.cash-=c}
const wait=(st:St,t:number)=>{st.phi=st.P/2+(st.phi-st.P/2)*Math.exp(-t/tau)}
const R=(st:St)=>st.F+T(st.phi)
// svg helpers
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
// Fig 1: slopes and density, two-sided
{const W=760,H=300,pad={l:46,t:20,r:14,b:30},xm=12
 const {g:g0,X,Y}=frame(W,H,pad,[-xm,xm],[0,s+2*b+1],[-12,-6,0,6,12],[0,5,10,15,20],'standing flow φ (units; bought +, sold −)','bp per unit')
 let g=g0
 const tp=[],hh=[],tot=[]
 for(let x=-xm;x<=xm;x+=0.1){tp.push([x,Tp(x)]);hh.push([x,s+h(x)]);tot.push([x,s+h(x)+Tp(x)])}
 g+=`<line x1="${X(0)}" x2="${X(0)}" y1="${pad.t}" y2="${H-pad.b}" stroke="${C.grey}" stroke-dasharray="2 3"/>`
 g+=`<path d="${path(tot,X,Y)}" fill="none" stroke="${C.ink}" stroke-width="2.4"/><path d="${path(tp,X,Y)}" fill="none" stroke="${C.green}" stroke-width="2"/><path d="${path(hh,X,Y)}" fill="none" stroke="${C.orange}" stroke-width="2"/>`
 g+=legend([['what the next unit costs in total: s + h(φ) + T′(φ)',C.ink],['temporary part T′(φ): comes back as φ relaxes',C.green],['permanent part s + h(φ): stays in the fair',C.orange]],pad.l+10,pad.t+12)
 out.fig1=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Fill slope and its temporary and permanent parts against standing flow">${g}</svg>`}
// Fig 2: liquidity density = 1/(fill slope), two-sided, in bp distance from the price
{const W=760,H=260,pad={l:46,t:20,r:14,b:30}
 // map phi -> distance in bp: cumulative cost slope integrates; distance(phi)=∫0^phi (s+h+T') = s*phi + A(phi)+T(phi)... use numeric
 const dist=(x:number)=>{const n=400;let acc=0;for(let i=0;i<n;i++){const u=(i+.5)*x/n;acc+=(s+h(u)+Tp(u))*x/n}return acc}
 const pts:number[][]=[];for(let x=-14;x<=14;x+=0.1)pts.push([dist(x),1/(s+h(x)+Tp(x))])
 const dm=Math.max(...pts.map(p=>Math.abs(p[0])));const {g:g0,X,Y}=frame(W,H,pad,[-dm,dm],[0,1/(s+2*a)*1.1],[-Math.round(dm),-Math.round(dm/2),0,Math.round(dm/2),Math.round(dm)],[0,0.2,0.4],'bp from the current price (bids left, asks right)','units resting per bp')
 let g=g0+`<line x1="${X(0)}" x2="${X(0)}" y1="${pad.t}" y2="${H-pad.b}" stroke="${C.grey}" stroke-dasharray="2 3"/>`
 g+=`<path d="${path(pts,X,Y)}" fill="none" stroke="${C.green}" stroke-width="2.4"/>`
 g+=`<text x="${X(0)+8}" y="${Y(1/(s+2*a))+14}" font-size="11.5" fill="${C.ink}">touch density 1/(s+2a) = ${(1/(s+2*a)).toFixed(2)} units/bp</text><text x="${W-pad.r-6}" y="${Y(1/(s+2*b))-8}" text-anchor="end" font-size="11.5" fill="${C.ink}">floor 1/(s+2b) = ${(1/(s+2*b)).toFixed(3)} units/bp, never zero</text>`
 out.fig2=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Liquidity density against distance from the price">${g}</svg>`}
// Fig 3: scenario. Sweep 8 at t=0, wait 3τ, sell 8 in 8 slices over 3τ, wait 3τ.
{const W=760,H=320,pad={l:46,t:20,r:52,b:30}
 const st:St={P:0,phi:0,F:0,cash:0};const rows:number[][]=[];let t=0
 const rec=()=>rows.push([t,R(st),st.F,st.phi,st.P])
 rec();for(let i=0;i<40;i++){fill(st,0.2);rec()}
 for(let i=0;i<60;i++){wait(st,0.05);t+=0.05;rec()}
 const settled=R(st)
 for(let k=0;k<8;k++){for(let i=0;i<5;i++){fill(st,-0.2);rec()}for(let i=0;i<7;i++){wait(st,0.05);t+=0.05;rec()}}
 for(let i=0;i<60;i++){wait(st,0.05);t+=0.05;rec()}
 const yr=[Math.min(...rows.map(r=>r[1]),...rows.map(r=>r[2]))-5,Math.max(...rows.map(r=>r[1]))+5]
 const {g:g0,X,Y}=frame(W,H,pad,[0,t],yr,[0,2,4,6,8],[0,20,40,60,80].filter(v=>v>=yr[0]&&v<=yr[1]),'time (units of τ)','bp above the initial fair')
 let g=g0
 const pm=Math.max(...rows.map(r=>Math.abs(r[4])),1);const YP=(p:number)=>H-pad.b-(p+pm)/(2*pm)*(H-pad.t-pad.b)
 g+=`<path d="${path(rows.map(r=>[r[0],r[4]]),X,YP)}" fill="none" stroke="${C.orange}" stroke-width="1.6" stroke-dasharray="4 3"/>`
 g+=`<path d="${path(rows.map(r=>[r[0],r[2]]),X,Y)}" fill="none" stroke="${C.purple}" stroke-width="2" stroke-dasharray="6 4"/>`
 g+=`<path d="${path(rows.map(r=>[r[0],r[1]]),X,Y)}" fill="none" stroke="${C.green}" stroke-width="2.4"/>`
 g+=`<text x="${W-pad.r+4}" y="${YP(pm)+4}" font-size="10.5" fill="${C.orange}">+${pm.toFixed(0)}</text><text x="${W-pad.r+4}" y="${YP(-pm)+4}" font-size="10.5" fill="${C.orange}">−${pm.toFixed(0)}</text><text x="${W-pad.r+4}" y="${YP(0)+4}" font-size="10.5" fill="${C.orange}">P</text>`
 g+=legend([['price R = F + T(φ)',C.green],['fair F (moves only at fills)',C.purple,true],['position held by the trader (right axis)',C.orange,true]],pad.l+10,pad.t+12)
 g+=`<text x="${X(3)+4}" y="${Y(settled)-8}" font-size="11.5" fill="${C.ink}">settled at ${settled.toFixed(1)} bp: F₀ + sq + A(q) + T(q/2)</text>`
 out.fig3=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Price, fair and position through a sweep, a wait, a sliced unwind and a final wait">${g}</svg>`
 out.scenarioCash=(-st.cash).toFixed(2);out.scenarioF=st.F.toFixed(2);out.scenarioSettled=settled.toFixed(1)}
// Fig 4: random loops cost histogram (proof illustration)
{let seed=904;const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff}
 const costs:number[]=[];let minc=1e9
 for(let n=0;n<2000;n++){const st:St={P:0,phi:0,F:0,cash:0};for(let k=0;k<12;k++){fill(st,(rnd()*2-1)*8);wait(st,rnd()*4)}fill(st,-st.P);const c=-st.cash;costs.push(c);minc=Math.min(minc,c)}
 const W=760,H=220,pad={l:46,t:20,r:14,b:30};const mx=Math.max(...costs);const bins=40;const cnt=new Array(bins).fill(0);for(const c of costs)cnt[Math.min(bins-1,Math.floor(c/mx*bins))]++
 const {g:g0,X,Y}=frame(W,H,pad,[0,mx],[0,Math.max(...cnt)*1.1],[0,Math.round(mx/4),Math.round(mx/2),Math.round(3*mx/4),Math.round(mx)],[],'cost to the trader of a random 12-leg loop (bp·units)','loops')
 let g=g0;for(let i=0;i<bins;i++){const x0=i*mx/bins,x1=(i+1)*mx/bins;g+=`<rect x="${X(x0)+1}" y="${Y(cnt[i])}" width="${X(x1)-X(x0)-2}" height="${Y(0)-Y(cnt[i])}" fill="${C.green}"/>`}
 g+=`<text x="${pad.l+10}" y="${pad.t+14}" font-size="11.5" fill="${C.ink}">2000 random loops from rest, fills uniform on [−8, 8], waits uniform on [0, 4τ], closed flat: smallest cost ${minc.toFixed(2)}, none below zero</text>`
 out.fig4=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Histogram of loop costs, all positive">${g}</svg>`;out.minloop=minc.toFixed(2)}
// numbers for the text
out.touch=(1/(s+2*a)).toFixed(2);out.floor=(1/(s+2*b)).toFixed(3);out.lamEff=(d/(3*a*L)).toFixed(3)
await Bun.write('/tmp/pump-sim/choiceb-figs.json',JSON.stringify(out))
console.log(Object.keys(out).join(','),'scenario cost',out.scenarioCash,'F',out.scenarioF,'settled',out.scenarioSettled,'minloop',out.minloop)
