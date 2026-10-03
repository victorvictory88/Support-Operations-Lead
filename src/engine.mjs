const round=(n,d=1)=>Math.round((n+Number.EPSILON)*10**d)/10**d;
export const formatDate=date=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
const validDate=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')&&!Number.isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export function actionStatus(action,reviewDate){
 if(!validDate(action.due)||!validDate(reviewDate))return {color:'red',label:'Date missing',reason:'A valid review date and due date are required.'};
 if(action.state==='blocked')return {color:'red',label:'Blocked',reason:'The fictional review records an unresolved blocker requiring owner intervention.'};
 if(action.due<reviewDate)return {color:'red',label:'Overdue',reason:'The due date precedes the fictional review date and completion remains unconfirmed.'};
 if(action.state==='at-risk')return {color:'yellow',label:'At risk',reason:'The owner has identified a delivery risk before the due date.'};
 return {color:'green',label:'On track',reason:'The fictional plan is on schedule. Green indicates progress, with completion still pending.'};
}
export function evaluateMetric(m){
 const valid=Number.isFinite(m.numerator)&&m.numerator>=0&&Number.isFinite(m.denominator)&&m.denominator>0&&Number.isFinite(m.goal);
 const value=valid?m.numerator/m.denominator*(m.unit==='%'?100:1):null;
 const difference=valid?value-m.goal:null;
 const passed=valid&&(m.direction==='up'?value>=m.goal:value<=m.goal);
 const format=v=>m.unit==='%'?`${round(v)}%`:m.unit==='hours'?`${round(v).toLocaleString('en-US')}h`:round(v,2).toFixed(2);
 const suffix=m.unit==='%'?' pp':m.unit==='hours'?'h':'';
 const gap=valid?(Math.abs(difference)<1e-9?'At goal':`${m.unit==='ratio'?round(Math.abs(difference),2).toFixed(2):round(Math.abs(difference)).toLocaleString('en-US')}${suffix} ${difference<0?'below':'above'}`):'Needs evidence';
 return {...m,value,difference,passed,actual:valid?format(value):'Unavailable',target:`${m.direction==='up'?'≥':'≤'} ${format(m.goal)}`,gap};
}
export function evaluate(s){
 const d=s.data,missing=s.required.filter(id=>!s.records.some(r=>r.id===id));
 const metrics=d.metrics.map(evaluateMetric),failed=metrics.filter(m=>!m.passed),byId=Object.fromEntries(metrics.map(m=>[m.id,m]));
 let decision,insight,calculation,reviewer,reason,outputs={},cost=null;
 const blockers=failed.map(m=>`${m.label} requires recovery`);
 if(metrics.some(m=>m.value===null))blockers.push('metric denominator or data unavailable');
 switch(s.id){
 case 'quality':{
  decision=failed.length?'Close the conversation-quality gaps':'Review sustained quality recovery';
  insight=failed.length?`Tailored Solutions is ${byId.tailored.gap} goal, and Commercial Conversations is ${byId.commercial.gap} goal. Calibrate scoring, then coach discovery, relevant recommendations, and explicit next steps.`:'Both quality goals pass in this snapshot. Confirm a second calibrated audit before closing the plan.';
  calculation=`The Tailored Solutions audit has ${byId.tailored.numerator} passes across ${byId.tailored.denominator} conversations, yielding ${byId.tailored.actual}, while Commercial Conversations has ${byId.commercial.numerator} passes across ${byId.commercial.denominator} conversations, yielding ${byId.commercial.actual}.`;
  reviewer='Leo Grant • Partner Operations';reason='Closure requires calibrated audits and sustained recovery.';
  outputs={quality:`Tailoring ${byId.tailored.actual}, commercial ${byId.commercial.actual}.`,coaching:'Practice discovery and commercial next steps.',review:failed.length?'Re-audit both measures against 90%.':'Verify a second passing audit.'};break;
 }
 case 'productivity':{
  decision=failed.length?'Recover coverage and pitch execution':'Review sustained funnel performance';
  const extraAttempts=Math.max(0,Math.ceil(byId.attempted.denominator*byId.attempted.goal/100-byId.attempted.numerator));
  const extraPitches=Math.max(0,Math.ceil(byId.pitched.denominator*byId.pitched.goal/100-byId.pitched.numerator));
  insight=failed.length?`Connection rate is ${byId.connected.actual}. At the current denominators, coverage needs ${extraAttempts} additional attempted accounts and pitching needs ${extraPitches} additional pitched accounts. Coach relevant recommendations alongside coverage.`:'All five funnel measures pass in this snapshot. Confirm sustained performance while preserving quality.';
  calculation=metrics.map(m=>`${m.label} = ${m.numerator} ÷ ${m.denominator}${m.unit==='%'?' × 100':''} = ${m.actual}.`).join(' ')+' Unique-account stage rates and repeat-call ratios use separate denominators.';
  reviewer='Leo Grant • Partner Operations';reason='Funnel recovery must preserve the quality floors and reconciled account definitions.';
  outputs={funnel:`${failed.length} funnel measures below goal.`,coaching:'Improve relevant pitches and recommendation depth.',review:'Assign coverage blocks and review weekly.'};break;
 }
 case 'capacity':{
  decision=failed.length?'Restore hours and stabilize attendance':'Review sustained workforce coverage';
  const gap=byId.hours.value===null?null:Math.max(0,byId.hours.goal-byId.hours.value);
  insight=gap===null?'Production-hour evidence is incomplete. Reconcile the cutoff before approving recovery.':`${round(gap).toLocaleString('en-US')} production hours need recovery. Prioritize qualified backfill, attendance follow-up, and voluntary-retention actions. Involuntary attrition is ${byId.involuntary.actual} against its ${byId.involuntary.target} ceiling.`;
  calculation=metrics.map(m=>m.unit==='hours'?`${m.actual} recorded hours versus ${m.target} cumulative cutoff plan.`:`${m.label} = ${m.numerator} ÷ ${m.denominator} × 100 = ${m.actual}.`).join(' ')+' Attrition uses average active headcount, while attendance uses scheduled shifts. No-show and late numerators are separate.';
  reviewer='Sam Ortiz • Operations Lead';reason='Qualified recovery hours need approval, and retention actions require People Partner review.';
  outputs={capacity:gap===null?'Reconcile missing production hours.':`${round(gap).toLocaleString('en-US')}h gap across the MTD cutoff.`,planning:'Validate separate backfill and attendance hours.',review:`Voluntary exits ${byId.voluntary.actual}, goal ${byId.voluntary.target}.`};break;
 }
 case 'cost':{
  const valid=d.productionHours>0&&[d.productionHours,d.onshoreHourly,d.offshoreHourly,d.recoveryCost].every(n=>Number.isFinite(n)&&n>=0);
  const onshore=valid?d.productionHours*d.onshoreHourly:null,offshore=valid?d.productionHours*d.offshoreHourly+d.recoveryCost:null,adjusted=valid?offshore/d.productionHours:null,savings=valid?onshore-offshore:null;
  cost={valid,onshore,offshore,adjusted,savings,savingsRate:valid&&onshore>0?round(savings/onshore*100):null};
  if(!valid||!d.comparable){decision='Hold the location decision pending comparable costs';insight='Verify equivalent production hours, workload, and complete costs before comparing vendor locations.';blockers.push('comparable cost model required');}
  else if(savings<=0||d.reviewCyclesFailed>=2){decision='Review a phased transfer to onshore';insight=savings<=0?'Offshore recovery spending removes the modeled cost advantage. Review a phased transfer, including transition cost and service risk.':'Two recovery checkpoints failed. Review a phased transfer, including transition cost and service risk, before approval.';blockers.push('transfer requires commercial review');}
  else if(failed.length===0&&d.consecutivePasses>=2&&d.reviewedCheckpoints>=2){decision='Recommend retaining offshore allocation';insight=`Two passing reviews and a ${cost.savingsRate}% adjusted cost advantage support retention, subject to commercial approval.`;}
  else if(s.reviewDate>=d.pilotEnd||d.reviewedCheckpoints>=2){decision='Review a phased transfer or approved extension';insight='The recovery window has closed without two passing reviews. Decide on a phased transfer or a documented extension with a refreshed budget before continuing the pilot.';blockers.push('pilot deadline requires commercial decision');}
  else {decision='Keep offshore allocation during a bounded recovery pilot';insight=`Offshore costs $${round(adjusted,2)} per production hour after recovery spending versus $${d.onshoreHourly} onshore, a ${cost.savingsRate}% advantage. Cap allocation during recovery and require two passing reviews before retention.`;blockers.push('two passing vendor reviews required');}
  calculation=valid?`Onshore = ${d.productionHours.toLocaleString('en-US')} production hours × $${d.onshoreHourly} = $${onshore.toLocaleString('en-US')}. Offshore = ${d.productionHours.toLocaleString('en-US')} × $${d.offshoreHourly} + $${d.recoveryCost.toLocaleString('en-US')} recovery = $${offshore.toLocaleString('en-US')}, or $${round(adjusted,2)} per production hour. Adjusted savings = $${savings.toLocaleString('en-US')}. Transition costs remain outside this retention-pilot comparison.`:'Production-hour and cost inputs must be complete before calculating the location comparison.';
  reviewer='Sam Ortiz • Commercial Owner';reason='Retention or transfer requires performance evidence, comparable costs, and commercial approval.';
  outputs={cost:valid?`$${d.onshoreHourly} onshore, $${round(adjusted,2)} adjusted offshore.`:'Comparable cost evidence remains missing.',recovery:`Close ${failed.length} offshore performance gaps.`,review:decision};break;
 }
 default:throw new Error('Unknown scenario');
 }
 if(missing.length){reason+=' Required records remain missing.';blockers.push('required evidence missing');}
 const evidence=s.records.map(r=>r.id),review={required:true,reviewer,reason,approved:false};
 const roles=[{id:'orchestrator',label:'Orchestrator',help:'Combines the selected evidence, assigns specialist review, and preserves human approval.',input:s.title,output:'Route the gaps into an owned recovery plan.'},...s.specialists.map(r=>({...r,output:outputs[r.key]}))];
 const trace=roles.map((r,i)=>({...r,handoff:i===roles.length-1?reviewer:roles[i+1].label,evidenceIds:evidence}));
 const actionPlan=s.owners.map(o=>({...o,status:actionStatus(o,s.reviewDate)}));
 return {decision,metrics,calculation,insight,missing,review,trace,blockers,cost,actionPlan,uncertainty:s.uncertainty,nextCheck:s.nextCheck,completion:'Awaiting operator proof',fictional:true};
}
export function canComplete(result,proof={}){return result.missing.length===0&&result.blockers.length===0&&proof.reviewApproved===true&&proof.successConfirmed===true&&proof.recordsCollected===true&&proof.actionsCompleted===true;}
export function answerGuide(question,s){
 const r=evaluate(s),q=question.toLowerCase();
 if(/independent|parallel|implemented|software|live systems|production access|agent design/.test(q))return 'One deterministic browser engine calculates recommendations. The chart replays proposed sequential handoffs with three specialists for each scenario. Production requires authorized data, secure integrations, validated evaluations, and human approval. Independent agents are outside this demonstration.';
 if(/due|deadline|status|date|action plan/.test(q))return `Fictional review on ${formatDate(s.reviewDate)}. `+r.actionPlan.map(o=>`${o.name} owns ${o.action.charAt(0).toLowerCase()+o.action.slice(1)} Due ${formatDate(o.due)}, ${o.status.color} status, ${o.status.label.toLowerCase()}.`).join(' ');
 if(/owner|handoff|action|next/.test(q))return `${s.title}. ${s.owners[0].name}, ${s.owners[0].role}, should ${s.owners[0].action.charAt(0).toLowerCase()+s.owners[0].action.slice(1)} Proof includes ${s.owners[0].proof.charAt(0).toLowerCase()+s.owners[0].proof.slice(1)}`;
 if(/uncertain|missing|confidence|limit/.test(q))return `${s.title}. ${r.uncertainty} ${r.missing.length?'Missing record IDs include '+r.missing.join(', ')+'. ':''}${r.nextCheck}`;
 if(/review|approv|risk|safe/.test(q))return `${s.title}. ${r.review.reviewer} reviews this recommendation. ${r.review.reason} Approval remains pending in this demonstration.`;
 if(/why|decision|signal|evidence|metric|calcula|insight|funnel|pitch|tailored|commercial|hours|attrition|show|late|offshore|onshore|cost|gap|goal/.test(q))return `${s.title}. ${r.decision}. ${r.insight} ${r.calculation} ${r.uncertainty}`;
 return 'I explain the selected scenario, its evidence, calculations, action plan, review rule, and design limits. My answers use page content and fixed rules. I cannot verify career history, access live systems, send messages, or make operating decisions.';
}
