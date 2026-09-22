// Exact full loops only: end with position 0, Phi≈0 (after a final full wait) and F back at F0 (tolerance).
// Rule: F absorbs rho of the released skew during decay. Report worst profit per rho, per curve.
type C=(x:number)=>number
const band=(B:number,a0:number,a=10):C=>p=>Math.abs(p)<=B?a0*p:Math.sign(p)*(a0*B+a*(Math.abs(p)-B))
const sat=(Q:number,a=10):C=>p=>Math.abs(p)<=Q?a*p:Math.sign(p)*a*Q
const integ=(T:C,a:number,b:number)=>{const n=200;let s=0;for(let i=0;i<n;i++)s+=T(a+((i+.5)*(b-a))/n);return s*(b-a)/n}
function worst(T:C,rho:number,cap:number){let best=-1e9,how='',tested=0
 const qs=[0.5,1,2,3,4,6,8,12,16,24,32].filter(q=>q<=cap),holds=[0.25,1,3,50],ns=[1,2,4,8]
 // schedules: nIn slices in (waits between), nOut slices out (waits between), then a final full wait; plus an optional extra push-and-return leg.
 for(const q of qs)for(const t of holds)for(const nIn of ns)for(const nOut of ns)for(const first of['buy','sell'] as const)for(const over of[0,0.5,1]){
  let phi=0,F=0,pnl=0
  const trade=(dir:'buy'|'sell',s:number)=>{const b=dir==='buy'?phi+s:phi-s;const amt=s*F+integ(T,Math.min(phi,b),Math.max(phi,b));phi=b;pnl+=dir==='buy'?-amt:amt}
  const decay=(dt:number)=>{const before=T(phi);phi*=Math.exp(-dt);F+=rho*(before-T(phi))}
  const other=first==='buy'?'sell':'buy'
  for(let i=0;i<nIn;i++){trade(first,q/nIn);decay(t)}
  for(let i=0;i<nOut;i++){trade(other,q*(1+over)/nOut);decay(t)}
  if(over>0){trade(first,q*over);decay(50)}
  decay(50)
  if(Math.abs(phi)>1e-3||Math.abs(F)>0.05*Math.max(1,Math.abs(T(q))))continue
  tested++;const per=pnl/q;if(per>best){best=per;how=`q=${q} hold=${t} in=${nIn} out=${nOut} ${first} over=${over}`}}
 return{best,how,tested}}
const rhos=[0.25,0.5,0.6,0.75,0.9,1]
const cases:[string,C,number][]=[['linear',band(0,10),16],['band B2 a0/a=.1',band(2,1),16],['band B2 a0=0',band(2,0),16],['band B2 a0/a=.5',band(2,5),16],['band B2 cap32',band(2,1),32],['sat Q3 cap16',sat(3),16],['sat Q1 cap16',sat(1),16]]
console.log('exact full loops; rho '+rhos.map(r=>String(r).padStart(7)).join(''))
for(const [n,T,cap] of cases){const r=rhos.map(rho=>worst(T,rho,cap));console.log(n.padEnd(18)+r.map(x=>x.best.toFixed(1).padStart(7)).join('')+`   loops=${r[0].tested} worst@1: ${r[5].how}`)}
