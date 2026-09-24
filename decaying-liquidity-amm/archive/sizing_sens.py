import sizing as S, math, json
def d0_for(sym, shape, target, K=0.2):
    a,b=1.0,20000.0
    for _ in range(36):
        m=math.sqrt(a*b); e=S.event_losses(sym,m,shape,1e18,K)[1]
        (a,b)=(m,b) if e<=target else (a,m)
    return a
out={}
for sym in S.MARKETS:
    for shape in ('concave','linear','steep'):
        row={}
        for lab,tgt,K in (('half-freq',5000,0.2),('double-freq',1250,0.2),('knee0.5',2500,0.5)):
            row[lab]=d0_for(sym,shape,tgt,K)
        out[f'{sym}/{shape}']=row
        print(sym,shape,{k:round(v,1) for k,v in row.items()},flush=True)
json.dump(out,open('/tmp/pump-sim/sizing-sens.json','w'),indent=1)
