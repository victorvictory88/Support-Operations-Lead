import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SCENARIOS} from '../src/scenarios.mjs';
import {evaluate,evaluateMetric,actionStatus,canComplete,answerGuide} from '../src/engine.mjs';
const get=id=>structuredClone(SCENARIOS.find(s=>s.id===id));
const proof={reviewApproved:true,successConfirmed:true,recordsCollected:true,actionsCompleted:true};
const hit=(r,id)=>r.metrics.find(m=>m.id===id);
function passMetrics(s){for(const m of s.data.metrics)m.numerator=m.goal*m.denominator/(m.unit==='%'?100:1);return s;}
test('four scenarios retain an orchestrator and three relevant specialists',()=>{
 assert.deepEqual(SCENARIOS.map(s=>s.title),['Quality','Productivity','Capacity','Cost to serve']);
 for(const s of SCENARIOS){const r=evaluate(s);assert.equal(r.trace.length,4);assert.equal(r.trace[0].id,'orchestrator');for(const role of r.trace){assert.ok(role.input);assert.ok(role.output);assert.ok(role.handoff);}}
});
test('Quality calculates audited pass rates and both gaps',()=>{
 const r=evaluate(get('quality'));assert.equal(hit(r,'tailored').actual,'72%');assert.equal(hit(r,'tailored').gap,'18 pp below');assert.equal(hit(r,'commercial').actual,'78%');assert.equal(hit(r,'commercial').gap,'12 pp below');assert.equal(r.blockers.length,2);assert.equal(canComplete(r,proof),false);
 const s=passMetrics(get('quality'));assert.equal(canComplete(evaluate(s),proof),true);s.data.metrics[1].numerator=89;assert.equal(canComplete(evaluate(s),proof),false);
});
test('Productivity respects unique-account stage denominators',()=>{
 const r=evaluate(get('productivity'));assert.equal(hit(r,'attempted').actual,'70%');assert.equal(hit(r,'connected').actual,'60%');assert.equal(hit(r,'connected').passed,true);assert.equal(hit(r,'pitched').actual,'60%');assert.equal(hit(r,'pitched').gap,'20 pp below');assert.match(r.insight,/200 additional attempted accounts/);assert.match(r.insight,/84 additional pitched accounts/);
});
test('Productivity distinguishes repeated calls from unique accounts',()=>{
 const r=evaluate(get('productivity'));assert.equal(hit(r,'callsBook').actual,'0.30');assert.equal(hit(r,'callsBook').gap,'0.20 below');assert.equal(hit(r,'solutions').actual,'0.90');assert.equal(hit(r,'solutions').denominator,500);assert.equal(hit(r,'solutions').gap,'0.30 below');assert.equal(r.metrics.filter(m=>!m.passed).length,4);
});
test('Capacity uses matched MTD hours and separate attendance categories',()=>{
 const r=evaluate(get('capacity'));assert.equal(hit(r,'hours').actual,'9,200h');assert.equal(hit(r,'hours').gap,'800h below');assert.equal(hit(r,'voluntary').actual,'5%');assert.equal(hit(r,'voluntary').passed,false);assert.equal(hit(r,'involuntary').actual,'1%');assert.equal(hit(r,'involuntary').passed,true);assert.equal(hit(r,'noshow').actual,'5%');assert.equal(hit(r,'late').actual,'8%');assert.match(hit(r,'late').help,/No-show shifts remain excluded/);
});
test('lower-is-better ceilings treat above-goal rates as gaps',()=>{
 const m=get('capacity').data.metrics.find(m=>m.id==='noshow');assert.equal(evaluateMetric(m).passed,false);m.numerator=20;assert.equal(evaluateMetric(m).passed,true);assert.equal(evaluateMetric(m).gap,'At goal');m.numerator=10;assert.equal(evaluateMetric(m).passed,true);
});
test('zero denominators stay unavailable and block completion',()=>{
 for(const original of SCENARIOS){const s=structuredClone(original);s.data.metrics[0].denominator=0;const r=evaluate(s);assert.equal(r.metrics[0].actual,'Unavailable');assert.equal(r.metrics[0].passed,false);assert.equal(canComplete(r,proof),false);assert.doesNotMatch(r.metrics[0].actual,/NaN|Infinity/);}
});
test('Cost includes the complete recovery budget and preserves quality gates',()=>{
 const r=evaluate(get('cost'));assert.equal(r.cost.onshore,48000);assert.equal(r.cost.offshore,34000);assert.equal(r.cost.adjusted,34);assert.equal(r.cost.savings,14000);assert.equal(r.cost.savingsRate,29.2);assert.match(r.decision,/bounded recovery pilot/);assert.equal(canComplete(r,proof),false);
});
test('offshore retention needs two passing reviews and a cost advantage',()=>{
 const s=passMetrics(get('cost'));assert.match(evaluate(s).decision,/bounded recovery pilot/);s.data.consecutivePasses=2;s.data.reviewedCheckpoints=2;assert.match(evaluate(s).decision,/retaining offshore/);assert.equal(canComplete(evaluate(s),proof),true);s.data.metrics[0].numerator=75;assert.equal(canComplete(evaluate(s),proof),false);
});
test('failed recovery or exhausted savings triggers transfer review',()=>{
 const s=get('cost');s.data.reviewCyclesFailed=2;assert.match(evaluate(s).decision,/phased transfer/);s.data.reviewCyclesFailed=0;s.data.recoveryCost=20000;assert.equal(evaluate(s).cost.savings,0);assert.match(evaluate(s).decision,/phased transfer/);assert.equal(canComplete(evaluate(s),proof),false);
});
test('incomparable or invalid cost inputs withhold a location decision',()=>{
 const s=get('cost');s.data.comparable=false;assert.match(evaluate(s).decision,/Hold the location/);s.data.comparable=true;s.data.productionHours=0;const r=evaluate(s);assert.equal(r.cost.valid,false);assert.match(r.decision,/Hold the location/);assert.equal(canComplete(r,proof),false);
});
test('action statuses use the fictional snapshot and explicit risk states',()=>{
 const date='2026-10-15';assert.equal(actionStatus({due:'2026-10-14',state:'on-track'},date).label,'Overdue');assert.equal(actionStatus({due:'2026-10-18',state:'blocked'},date).color,'red');assert.equal(actionStatus({due:'2026-10-18',state:'at-risk'},date).color,'yellow');assert.equal(actionStatus({due:'2026-10-18',state:'on-track'},date).color,'green');assert.equal(actionStatus({due:'2026-02-30',state:'on-track'},date).color,'red');
 for(const s of SCENARIOS){for(const a of evaluate(s).actionPlan){assert.ok(a.name);assert.ok(a.action);assert.match(a.due,/^2026-/);assert.ok(['red','yellow','green'].includes(a.status.color));}}
});
test('evidence links and operator references belong to each selected scenario',()=>{
 for(const s of SCENARIOS){const ids=s.records.map(r=>r.id);assert.equal(new Set(ids).size,ids.length);for(const row of evaluate(s).trace)for(const id of row.evidenceIds)assert.ok(ids.includes(id));for(const o of s.owners)for(const id of o.refs)assert.ok(ids.includes(id));}
});
test('missing records and absent approval keep closure pending',()=>{
 for(const original of SCENARIOS){const s=passMetrics(structuredClone(original));s.records=[];const r=evaluate(s);assert.deepEqual(r.missing,s.required);assert.equal(canComplete(r,proof),false);assert.equal(r.review.approved,false);assert.ok(r.uncertainty.length>50);assert.ok(r.nextCheck.length>40);}
 const r=evaluate(passMetrics(get('quality')));assert.equal(canComplete(r,{...proof,actionsCompleted:false}),false);assert.equal(canComplete(r,{...proof,reviewApproved:false}),false);
});
test('guide grounds plan dates metrics and execution limits in selected data',()=>{
 for(const s of SCENARIOS){assert.ok(answerGuide('Why this decision?',s).includes(s.title));assert.ok(answerGuide('Who owns the next handoff?',s).includes(s.owners[0].name));assert.ok(answerGuide('Explain uncertainty',s).includes(s.uncertainty));assert.match(answerGuide('Action plan due dates and status',s),/Oct 15, 2026/);}
 assert.match(answerGuide('Explain production hours',get('capacity')),/9,200h/);assert.match(answerGuide('Are agents parallel?',get('capacity')),/deterministic/);assert.match(answerGuide('Send a message',get('quality')),/cannot/);
});

test('chart final handoffs agree with the displayed human reviewer',()=>{for(const s of SCENARIOS){const r=evaluate(s);assert.equal(r.trace.at(-1).handoff,r.review.reviewer);}});
test('pilot deadline and mixed checkpoints require a new commercial decision',()=>{
 const s=get('cost');s.reviewDate='2026-11-14';assert.match(evaluate(s).decision,/approved extension/);assert.equal(canComplete(evaluate(s),proof),false);s.reviewDate='2026-10-30';s.data.reviewedCheckpoints=2;s.data.reviewCyclesFailed=1;s.data.consecutivePasses=1;assert.match(evaluate(s).decision,/approved extension/);
});
