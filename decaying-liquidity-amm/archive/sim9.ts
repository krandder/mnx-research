// From-rest loops, fair moves on fills: dF = (lam0 + lam*|T(phi)|) * dq (signed). Hard cap C on |P|. Worst trader profit, bps/unit, spread 0.
type C=(x:number)=>number
const step=(B:number,a0:number,a=10):C=>p=>Math.abs(p)<=B?a0*p:Math.sign(p)*(a0*B+a*(Math.abs(p)-B))
const cubic=(a:number,b:number):C=>p=>a*p+b*p*p*p
function worst(T:C,lam0:number,lam:number,cap:number){let best=-1e9,how=''
 const qs=[1,4,16].filter(q=>q<=cap),holds=[0.25,1,3,10],ns=[1,2,4,8,16]
 for(const q of qs)for(const t of holds)for(const nIn of ns)for(const nOut of ns)for(const first of['buy','sell'] as const)for(const midHold of[0,1])for(const partial of[1,0.5]){
  let phi=0,F=0,P=0,pnl=0,ok=true
  const trade=(dir:'buy'|'sell',s:number)=>{const n=1000;const d=dir==='buy'?1:-1;let amt=0;for(let i=0;i<n;i++){const dq=s/n;const p=F+T(phi+d*dq/2);amt+=p*dq;F+=(lam0+lam*Math.abs(T(phi+d*dq/2)))*d*dq;phi+=d*dq;P+=d*dq;if(Math.abs(P)>cap+1e-9)ok=false}pnl+=dir==='buy'?-amt:amt}
  const decay=(dt:number)=>{phi*=Math.exp(-dt)}
  const other=first==='buy'?'sell':'buy'
  for(let i=0;i<nIn;i++){trade(first,q/nIn);if(i<nIn-1||midHold)decay(t)}
  for(let i=0;i<nOut;i++){trade(other,q*partial/nOut);if(i<nOut-1)decay(t)}
  if(partial!==1){decay(t);trade(other,q*(1-partial))}
  if(!ok)continue
  const per=pnl/q;if(per>best){best=per;how=`q=${q} hold=${t} in=${nIn} out=${nOut} ${first} mid=${midHold} partial=${partial}`}}
 return{best,how}}
const cap=16
const cases:[string,C][]=[['linear 10',step(0,10)],['step a0/a=.1',step(2,1)],['step a0=0',step(2,0)],['steepening 10x+0.5x³',cubic(10,0.5)]]
for(const lam0 of[2])for(const lamC of[1,1.5]){const lam=lamC/cap;console.log(`lam0=${lam0} lam*C=${lamC}: `+cases.map(([n,T])=>{const w=worst(T,lam0,lam,cap);return `${n}:${w.best.toFixed(2)}`}).join('  '))}
