// Handoff model: R = F + T(phi) + S(P - phi). Fills move P and phi together; phi decays into c = P - phi. F fixed.
// S = rho*T, or S = rho*2V_T(c)/c (twice the running average of T). Worst trader profit, bps/unit, spread 0.
type C=(x:number)=>number
const band=(B:number,a0:number,a=10):C=>p=>Math.abs(p)<=B?a0*p:Math.sign(p)*(a0*B+a*(Math.abs(p)-B))
const sat=(Q:number,a=10):C=>p=>Math.abs(p)<=Q?a*p:Math.sign(p)*a*Q
const integ=(T:C,a:number,b:number)=>{const n=200;let s=0;for(let i=0;i<n;i++)s+=T(a+((i+.5)*(b-a))/n);return s*(b-a)/n}
const V=(T:C)=>(x:number)=>x===0?0:integ(T,0,Math.abs(x))
function worst(T:C,S:C,cap:number,exact:boolean){let best=-1e9,how=''
 const qs=[0.5,1,2,3,4,6,8,12,16,24,32].filter(q=>q<=cap),holds=[0.25,1,3,50],ns=[1,2,4,8]
 for(const q of qs)for(const t of holds)for(const nIn of ns)for(const nOut of ns)for(const first of['buy','sell'] as const)for(const over of[0,0.5,1]){
  let P=0,phi=0,pnl=0
  const trade=(dir:'buy'|'sell',s:number)=>{const c=P-phi;const b=dir==='buy'?phi+s:phi-s;const amt=s*S(c)+integ(T,Math.min(phi,b),Math.max(phi,b));phi=b;P+=dir==='buy'?s:-s;pnl+=dir==='buy'?-amt:amt}
  const decay=(dt:number)=>{phi*=Math.exp(-dt)}
  const other=first==='buy'?'sell':'buy'
  for(let i=0;i<nIn;i++){trade(first,q/nIn);decay(t)}
  for(let i=0;i<nOut;i++){trade(other,q*(1+over)/nOut);decay(t)}
  if(over>0){trade(first,q*over)}
  if(exact){decay(50);if(Math.abs(phi)>1e-3)continue}
  const per=pnl/q;if(per>best){best=per;how=`q=${q} hold=${t} in=${nIn} out=${nOut} ${first} over=${over}`}}
 return{best,how}}
const rhos=[0.25,0.5,0.75,1]
const cases:[string,C,number][]=[['linear',band(0,10),16],['band a0/a=.1',band(2,1),16],['band a0=0',band(2,0),16],['band a0/a=.5',band(2,5),16],['band cap32',band(2,1),32],['sat Q3',sat(3),16],['sat Q1',sat(1),16]]
for(const sk of['S=rho*T','S=rho*2V/c'] as const)for(const exact of[true,false]){console.log(`${sk}, ${exact?'exact loops':'from rest, any end'}: rho `+rhos.map(r=>String(r).padStart(7)).join(''))
 for(const [n,T,cap] of cases){const Vt=V(T);const r=rhos.map(rho=>{const S:C=sk==='S=rho*T'?x=>rho*T(x):x=>x===0?0:rho*2*Vt(x)/Math.abs(x)*Math.sign(x);return worst(T,S,cap,exact)});console.log(' '+n.padEnd(14)+r.map(x=>x.best.toFixed(1).padStart(7)).join('')+'   worst@1: '+r[3].how)}}
