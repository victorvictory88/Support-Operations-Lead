import {SCENARIOS} from './scenarios.mjs';
import {evaluate,answerGuide,formatDate} from './engine.mjs';
const $=s=>document.querySelector(s);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let selected=SCENARIOS[0],result=evaluate(selected),step=0;
const media=matchMedia('(prefers-reduced-motion: reduce)');
const railElement=$('#rail');
const mobileLayout=matchMedia('(max-width:800px)');
function placeRail(){if(mobileLayout.matches)$('#mobile-brief').append(railElement);else $('.app-shell').insertBefore(railElement,$('main'));}
placeRail();mobileLayout.addEventListener('change',placeRail);
let paused=media.matches;
let elapsed=0, previousFrame=0;
const STEP_MS=6500;
const tip=(label,text)=>`<span class="tip">${escape(label)}<button type="button" aria-label="Explain ${escape(label)}" aria-describedby="tip-${++tipId}">?</button><span role="tooltip" id="tip-${tipId}" class="tooltip">${escape(text)}</span></span>`;
let tipId=0;
const ref=id=>`<a href="#record-${selected.id}-${id}">${escape(id)} record</a>`;
function render(){
 result=evaluate(selected);step=0;elapsed=0;
 $('#cards').innerHTML=SCENARIOS.map((s,i)=>`<button class="scenario" data-scenario="${s.id}" aria-pressed="${s.id===selected.id}"><span class="number">0${i+1} / ${escape(s.category)}</span><strong>${escape(s.title)}</strong><span class="summary">${escape(s.summary)}</span></button>`).join('');
 const items=[['PRIORITY',`<span class="priority">${selected.priority}</span>`],['DECISION',escape(result.decision)],['NEXT OWNER',`${escape(selected.owners[0].name)}<br>${escape(selected.owners[0].role)}`],['SUCCESS',escape(selected.success)]];
 $('#rail').innerHTML=`<div class="rail-brand"><span class="rail-emblem" aria-hidden="true">S<span>/</span>O</span><div><strong>SUPPORT<span>/</span>OPS</strong><small>ALBERT CHAN · CANDIDATE PROJECT</small></div></div><div class="rail-heading"><span class="eyebrow">${tip('LEAD BRIEF','The selected scenario’s priority, proposed decision, next owner, and success condition.')}</span><span class="sample-label">FICTIONAL</span></div><h2>${escape(selected.title)}</h2><dl>${items.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl><div class="rail-footer"><span class="boundary-mark">PROPOSED DESIGN / SAMPLE DATA</span><p>Human review remains pending, and actions await operator approval.</p></div>`;
 renderTeam();renderTrace();
 $('#analysis').innerHTML=`<span class="eyebrow">02 / ${escape(selected.title.toUpperCase())}</span><h2 id="analysis-heading">${tip('Problem and insight','The operating problem and the evidence-based recommendation. Open supporting details for calculations, records, and limits.')}</h2><div class="analysis-summary"><article class="summary-card"><h3>${tip('Problem','The fictional signal that prompts this operating decision.')}</h3><p>${escape(selected.signal)}</p></article><article class="summary-card insight-card"><h3>${tip('Insight','The conclusion supported by the sample data, with claims limited by its uncertainty.')}</h3><p>${escape(result.insight)}</p></article></div>${renderScorecard(selected,result)}<div class="next-check"><strong>${tip('Next check','The additional observation needed before the recommendation can move forward.')}</strong><p>${escape(result.nextCheck)}</p></div><p class="limit-note"><b>${tip('Limit','The uncertainty that prevents a stronger claim or requires another check.')}</b> ${escape(result.uncertainty)}</p>${result.missing.length?`<p class="missing">Missing ${result.missing.map(escape).join(', ')} records keep final approval on hold.</p>`:''}<details class="evidence-details"><summary>${tip('Supporting calculations and records','The sample arithmetic and fictional records supporting this insight. Expand this row for closer review.')}</summary><p class="formula">${escape(result.calculation)}</p><div class="refs">${selected.records.map(r=>ref(r.id)).join('')}</div><div class="record-grid">${selected.records.map(r=>`<article id="record-${selected.id}-${r.id}" class="record" tabindex="-1"><span class="record-id">FICTIONAL RECORD</span><h3>${escape(r.title)}</h3><p>${escape(r.text)}</p></article>`).join('')}</div></details>`;
 $('#handoff').innerHTML=`<span class="eyebrow">03 / RECOVERY ACTION PLAN</span><h2>${tip('Action plan','The proposed recovery actions, named owners, deadlines, and status at the fictional review date. Status describes plan progress, without recording approval or completion.')}</h2><div class="plan-context"><p>Fictional review · ${formatDate(selected.reviewDate)}</p><span>${tip('Status key','Red means blocked or overdue. Yellow means at risk. Green means on track, with completion still pending.')}</span></div><table class="action-table" role="table"><thead><tr><th scope="col">Action</th><th scope="col">Named owner</th><th scope="col">Due date</th><th scope="col">Status</th></tr></thead><tbody>${result.actionPlan.map(o=>`<tr><td data-label="Action"><strong>${escape(o.action)}</strong><details class="action-proof"><summary>Proof and records</summary><p>${escape(o.proof)}</p><div class="refs">${o.refs.map(ref).join('')}</div></details></td><td data-label="Named owner"><b>${escape(o.name)}</b><span class="owner-role">${escape(o.role)}</span></td><td data-label="Due date"><time datetime="${escape(o.due)}">${formatDate(o.due)}</time></td><td data-label="Status"><span class="status-box status-${o.status.color}"><span>${o.status.color.charAt(0).toUpperCase()+o.status.color.slice(1)}</span><b>${escape(o.status.label)}</b></span></td></tr>`).join('')}</tbody></table><div class="completion"><strong>${tip('Approval and completion','The sample stays pending. Required records, passing goals, reviewer approval, completed actions, and confirmed success are required for closure.')}</strong><p>${escape(result.review.reviewer)} reviews the plan. ${escape(result.review.reason)}</p><p>All dates and statuses belong to the fictional scenario.</p></div><details class="communication-details"><summary>${tip('Communication draft','A proposed internal update for the scenario’s operator team. A human reviews it before sending.')}</summary><p>${escape(selected.draft)}</p><small>The scenario’s operator team receives this proposed update after lead review. This page sends no messages.</small></details>`;
 $('#quality-list').innerHTML=SCENARIOS.map(s=>`<li><b>${escape(s.title)}</b><span>${escape(s.test)}</span></li>`).join('');
 $('#guide-context').textContent=`Selected scenario · ${selected.title}`;$('#guide-log').replaceChildren();updateMotion();
}
function renderScorecard(s,r){
 const cost=s.id==='cost';
 const costSummary=cost?`<div class="cost-summary"><div><span>${tip('Onshore cost','Vendor cost per verified production hour for the matched fictional workload.')}</span><strong>$${s.data.onshoreHourly}<small> / production hour</small></strong></div><div><span>${tip('Offshore with recovery','Base vendor cost plus the full coaching and oversight budget, divided by matching production hours.')}</span><strong>${r.cost.valid?'$'+r.cost.adjusted.toFixed(2):'Unavailable'}<small> / production hour</small></strong><p>$${s.data.offshoreHourly} base rate + recovery spending</p></div></div>`:'';
 return `<div class="scorecard-section"><div class="scorecard-heading"><h3>${tip(cost?'Vendor performance':'Actual versus goal',cost?'The offshore gap is compared with shared goals and a matched onshore benchmark. Costs include the recovery pilot.':'Each row shows its explicit denominator, fictional goal, and gap. Higher rates are better except attrition, no-shows, and lateness, where the goal is a ceiling.')}</h3><small>Fictional review · ${formatDate(s.reviewDate)}</small></div>${costSummary}<table class="score-table ${cost?'vendor-score':''}" role="table"><thead><tr><th scope="col">Metric</th>${cost?'<th scope="col">Onshore</th>':''}<th scope="col">${cost?'Offshore':'Actual'}</th><th scope="col">Goal</th><th scope="col">${tip('Gap','Percentage rates use percentage-point differences, abbreviated pp. Hours and call ratios use their original units. Below a minimum or above a ceiling requires recovery.')}</th></tr></thead><tbody>${r.metrics.map(m=>`<tr class="metric-row ${m.passed?'goal-pass':'goal-gap'}" data-metric="${escape(m.id)}"><th scope="row">${tip(m.label,m.help)}</th>${cost?`<td data-label="Onshore">${escape(s.data.onshore[m.id])}%</td>`:''}<td data-label="${cost?'Offshore':'Actual'}" class="actual">${escape(m.actual)}</td><td data-label="Goal">${escape(m.target)}</td><td data-label="Gap" class="gap-value">${escape(m.gap)}<small>${m.passed?'Within goal':m.value===null?'Evidence required':'Recovery needed'}</small></td></tr>`).join('')}</tbody></table></div>`;
}
const icons={
 orchestrator:'<circle cx="6" cy="6" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v7a3 3 0 0 0 3 3h7M8 6h8"/>',
 service:'<path d="M4 19h16M6 15V9m6 6V4m6 11v-5"/>',
 capacity:'<circle cx="8" cy="8" r="3"/><path d="M2 21v-3a6 6 0 0 1 12 0v3m2-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 5 5"/>',
 vendor:'<path d="M4 4h16v16H4zM8 8h8m-8 4h8m-8 4h5"/>',
 automation:'<path d="m13 2-8 12h6l-1 8 9-13h-7z"/>',
 risk:'<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6z"/><path d="m8 12 3 3 5-6"/>',
 change:'<path d="m5 13 4 4L20 6M4 4h8M4 8h5M4 21h16"/>',
 operator:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-4a8 8 0 0 1 16 0v4"/>'
};
const icon=id=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[id]}</svg>`;
function renderTeam(){
 const node=(r,i)=>`<article class="agent ${i===0?'orchestrator':''} role-${r.id}" data-agent="${i}"><div class="node-top"><span class="node-icon">${icon(r.id)}</span><span class="role-num">${i===0?'COORDINATE':`0${i}`}</span><span class="node-state" aria-hidden="true"></span></div><div class="agent-label">${tip(r.label,r.help)}</div><div class="node-io"><span><b>INPUT</b> ${escape(r.input)}</span><span><b>OUTPUT</b> ${escape(r.output)}</span></div><div class="node-handoff">TO ${escape(r.handoff)}</div></article>`;
 $('#agent-map').innerHTML=`<div class="diagram"><svg class="flow-lines" aria-hidden="true"><g class="handoff-paths"></g><circle class="flow-halo" r="7"/><circle class="flow-packet" r="3.5"/></svg><div class="orchestrator-wrap">${node(result.trace[0],0)}</div><div class="agent-grid">${result.trace.slice(1).map((r,i)=>node(r,i+1)).join('')}</div><div class="operator-target"><span class="operator-icon">${icon('operator')}</span><div><span class="operator-tag">HUMAN REVIEW / PENDING</span><strong>${escape(result.review.reviewer)}</strong></div></div></div>`;
 requestAnimationFrame(drawConnections);
}
function drawConnections(){
 const diagram=$('.diagram');if(!diagram)return;
 const root=diagram.getBoundingClientRect();if(!root.width)return;
 const rect=el=>{const r=el.getBoundingClientRect();return{x:r.x-root.x,y:r.y-root.y,w:r.width,h:r.height,cx:r.x-root.x+r.width/2,cy:r.y-root.y+r.height/2};};
 const nodes=[...document.querySelectorAll('[data-agent]')].map(rect);
 const owner=rect($('.operator-target'));
 const svg=$('.flow-lines');svg.setAttribute('viewBox',`0 0 ${root.width} ${root.height}`);
 const stem=(a,b)=>{const from=[a.cx,a.y+a.h],to=[b.cx,b.y];const mid=(from[1]+to[1])/2;return `M${from[0]},${from[1]} C${from[0]},${mid} ${to[0]},${mid} ${to[0]},${to[1]}`;};
 const join=(a,b)=>{
  if(Math.abs(a.cy-b.cy)<10){const right=b.cx>a.cx;const x1=right?a.x+a.w:a.x,x2=right?b.x:b.x+b.w;return `M${x1},${a.cy} C${(x1+x2)/2},${a.cy} ${(x1+x2)/2},${b.cy} ${x2},${b.cy}`;}
  return stem(a,b);
 };
 svg.querySelector('.handoff-paths').innerHTML=nodes.map((n,i)=>`<path data-edge="${i}" d="${join(n,i===nodes.length-1?owner:nodes[i+1])}"/>`).join('');
 updateFlow();
}
function updateFlow(){
 document.querySelectorAll('[data-edge]').forEach(p=>p.classList.toggle('active',Number(p.dataset.edge)===step));
 const svg=$('.flow-lines');if(!svg)return;
 const color=getComputedStyle($(`[data-agent="${step}"]`)).getPropertyValue('--role-color');svg.style.setProperty('--flow-color',color);
 const path=svg.querySelector(`[data-edge="${step}"]`);if(!path)return;
 const progress=paused?0.5:Math.min(1,elapsed/STEP_MS);
 const point=path.getPointAtLength(path.getTotalLength()*progress);
 for(const name of ['.flow-halo','.flow-packet']){const c=svg.querySelector(name);c.setAttribute('cx',point.x);c.setAttribute('cy',point.y);}
}
function renderTrace(){
 document.querySelectorAll('[data-agent]').forEach(el=>el.classList.toggle('active',Number(el.dataset.agent)===step));updateFlow();
}
const resizeObserver=new ResizeObserver(()=>requestAnimationFrame(drawConnections));
resizeObserver.observe($('#agent-map'));
function frame(time){
 const delta=previousFrame?Math.min(time-previousFrame,100):0;previousFrame=time;
 if(!paused&&!document.hidden){elapsed+=delta;if(elapsed>=STEP_MS){elapsed=0;step=(step+1)%result.trace.length;renderTrace();}updateFlow();}
 requestAnimationFrame(frame);
}
$('#cards').addEventListener('click',e=>{const card=e.target.closest('[data-scenario]');if(!card)return;selected=SCENARIOS.find(s=>s.id===card.dataset.scenario);render();$(`[data-scenario="${selected.id}"]`).focus({preventScroll:true});});
$('#motion').addEventListener('click',()=>{paused=!paused;updateMotion();});
function updateMotion(){$('#motion').textContent=paused?'Resume trace':'Pause trace';$('#motion').setAttribute('aria-pressed',String(paused));$('.team').classList.toggle('paused',paused);$('#playback-state').textContent=paused?'Paused · proposed handoffs':'Sequential design playback';updateFlow();}
media.addEventListener('change',e=>{if(e.matches){paused=true;updateMotion();}});

function openGuide(open){$('#guide').hidden=!open;$('#guide-launcher').setAttribute('aria-expanded',String(open));if(open)$('#question').focus();else $('#guide-launcher').focus();}
$('#guide-launcher').addEventListener('click',()=>openGuide($('#guide').hidden));
$('#guide-close').addEventListener('click',()=>openGuide(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#guide').hidden)openGuide(false);document.querySelectorAll('.tip').forEach(t=>t.classList.add('dismissed'));}});
document.addEventListener('focusin',e=>{e.target.closest('.tip')?.classList.remove('dismissed');});
document.addEventListener('mouseover',e=>{e.target.closest('.tip')?.classList.remove('dismissed');});
function ask(q){if(!q.trim())return;const reply=answerGuide(q,selected);for(const [name,text] of [['YOU',q],['ONIGIRI',reply]]){const box=document.createElement('div');box.className='guide-message';const speaker=document.createElement('small');speaker.textContent=`${name} · ${selected.title}`;const p=document.createElement('p');p.textContent=text;box.append(speaker,p);$('#guide-log').append(box);}$('#question').value='';$('#guide-log').scrollTop=$('#guide-log').scrollHeight;$('#question').focus();}
$('#guide-form').addEventListener('submit',e=>{e.preventDefault();ask($('#question').value);});
document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.question)));
render();
requestAnimationFrame(frame);

document.querySelectorAll('[data-section-help]').forEach(el=>{el.innerHTML=tip(el.textContent,el.dataset.sectionHelp);});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#record-"]');if(!a)return;const record=document.getElementById(a.getAttribute('href').slice(1));if(record)record.closest('details').open=true;});

document.addEventListener('click',e=>{if(e.target.closest('summary .tip>button'))e.preventDefault();});
