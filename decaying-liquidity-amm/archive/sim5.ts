// From-rest loops. Rule 'mix': fills split rho into a permanent state and 1-rho into a decaying one; price = T(perm+trans).
// Rule 'recenter': state decays to 0, F absorbs rho of the released skew (for comparison).
type C=(x:number)=>number
const band=(B:number,a0:number,a=10):C=>p=>Math.abs(p)<=B?a0*p:Math.sign(p)*(a0*B+a*(Math.abs(p)-B))
const sat=(Q:number,a=10):C=>p=>Math.abs(p)<=Q?a*p:Math.sign(p)*a*Q
const integ=(T:C,a:number,b:number)=>{const n=200;let s=0;for(let i=0;i<n;i++)s+=T(a+((i+.5)*(b-a))/n);return s*(b-a)/n}
function worst(T:C,rho:number,cap:number,rule:'mix'|'recenter'){let best=-1e9,how=''
 const qs=[0.5,1,2,3,4,6,8,12,16,24,32].filter(q=>q<=cap),holds=[0.25,1,3,10],ns=[1,2,4,8,16]
 for(const q of qs)for(const t of holds)for(const nIn of ns)for(const nOut of ns)for(const first of['buy','sell'] as const)for(const midHold of[0,1])for(const partial of[1,0.5]){
  let perm=0,trans=0,F=0,pnl=0
  const phi=()=>perm+trans
  const trade=(dir:'buy'|'sell',s:number)=>{const a=phi();const b=dir==='buy'?a+s:a-s;const amt=s*F+integ(T,Math.min(a,b),Math.max(a,b));
   if(rule==='mix'){perm+=rho*(b-a);trans+=(1-rho)*(b-a)}else{trans=b}
   pnl+=dir==='buy'?-amt:amt}
  const decay=(dt:number)=>{const before=T(phi());trans*=Math.exp(-dt);if(rule==='recenter')F+=rho*(before-T(phi()))}
  const other=first==='buy'?'sell':'buy'
  for(let i=0;i<nIn;i++){trade(first,q/nIn);if(i<nIn-1||midHold)decay(t)}
  // unwind: possibly over-shoot by a partial extra leg then come back, to probe non-monotone paths
  for(let i=0;i<nOut;i++){trade(other,q*partial/nOut);if(i<nOut-1)decay(t)}
  if(partial!==1){decay(t);trade(other,q*(1-partial))}
  const per=pnl/q;if(per>best){best=per;how=`q=${q} hold=${t} in=${nIn} out=${nOut} ${first} mid=${midHold} partial=${partial}`}}
 return{best,how}}
const rhos=[0.03,0.05,0.1,0.15,0.2]
const cases:[string,C,number][]=[['linear',band(0,10),16],['band B2 a0/a=.1',band(2,1),16],['band B2 a0/a=0',band(2,0),16],['band B2 cap32',band(2,1),32],['sat Q3 cap16',sat(3),16],['sat Q1 cap16',sat(1),16]]
for(const rule of['recenter'] as const){console.log(`${rule}: rho `+rhos.map(r=>String(r).padStart(7)).join(''))
 for(const [n,T,cap] of cases){const r=rhos.map(rho=>worst(T,rho,cap,rule));console.log(' '+n.padEnd(18)+r.map(x=>x.best.toFixed(1).padStart(7)).join('')+'   worst: '+r[2].how)}}
