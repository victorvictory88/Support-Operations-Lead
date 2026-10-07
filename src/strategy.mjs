const panel=document.getElementById('guide');
const launcher=document.getElementById('guide-launcher');
const close=document.getElementById('guide-close');
const log=document.getElementById('guide-log');
const form=document.getElementById('guide-form');
const input=document.getElementById('question');
const appendix=document.getElementById('appendix');

function setOpen(open){
  panel.hidden=!open;
  launcher.setAttribute('aria-expanded',String(open));
  if(open) input.focus();
  else launcher.focus();
}
launcher.addEventListener('click',()=>setOpen(panel.hidden));
close.addEventListener('click',()=>setOpen(false));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&!panel.hidden) setOpen(false);
});

let appendixWasOpen=false;
window.addEventListener('beforeprint',()=>{
  appendixWasOpen=appendix.open;
  appendix.open=true;
});
window.addEventListener('afterprint',()=>{
  appendix.open=appendixWasOpen;
});
function revealAppendixForHash(){
  if(location.hash.startsWith('#appendix-')) appendix.open=true;
}
window.addEventListener('hashchange',revealAppendixForHash);
revealAppendixForHash();

const answers=[
  {match:/human case|cases reach|case count|case volume/i,answer:'The human share falls from 40% today to 10% in the Year 3 stretch case. Weekly human cases rise to 66k in Year 1, then fall to 50k by Year 3 while total weekly issues reach 500k. People focus on sensitive cases and exceptions.'},
  {match:/118|100m|hundred million|hypergrowth/i,answer:'The $118M stretch case compares the plan with a future where automation stays at 60% as issues grow. The medium case saves about $42M. Higher vendor throughput or natural AI improvement would reduce the stretch case, so I would verify both before changing vendor plans.'},
  {match:/4m|four million|year 1 budget|rollout spend/i,answer:'The $4M in Year 1 is my planning estimate for AI use, tools, training, evaluations, and quality checks. It is one part of the $20M three-year rollout estimate, not an approved OpenAI budget. I would ask Finance to price two pilots before requesting a capped pilot budget.'},
  {match:/financ|saving|cost|budget|onshore|offshore|dollar|money|upside|return on investment|risk and reward|low.*medium.*high/i,answer:'The low, medium, and high cases share the 500k Year 3 demand path. They differ in AI results, vendor handling, and how quickly contracts can change. Every case uses a blended vendor price with 30% onshore and 70% offshore. The appendix shows how higher vendor throughput or natural AI improvement would narrow the high case.'},
  {match:/attribution|contribut|holdout|false containment|abandon|who resolved/i,answer:'I would use one issue ID across AI, partners, and internal specialists, then compare quality and repeat contact for similar cases. I would also sample AI closures to find customers who left without an answer. That keeps an unresolved exit from counting as success.'},
  {match:/redeploy|released capacity|freed (hours|time)|staff|headcount|vendor|partner|who|owner|responsib|sla/i,answer:'Support Delivery moves trained people into harder cases and AI review first. Operations checks coverage and vendor plans. Trust & Safety reviews sensitive decisions, while Product and Product Engagement use repeat issues to improve the product. I would reduce planned vendor seats once the agreed SLA target and service coverage hold.'},
  {match:/idea|vision|strategy|future/i,answer:'AI would turn Support into a connected system that anticipates needs, completes approved actions in the product, and learns from exceptions. The 90% AI path is an illustrative stretch target for the assignment.'},
  {match:/90|82|automation|automated|eligib/i,answer:'A 90% automated-resolution rate means 90 of every 100 weekly issues finish without human assistance. At 500k weekly issues, 50k would reach people. If automation resolves only 82 of every 100, about 90k would reach people and I would keep coverage in place.'},
  {match:/year|glide|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 500k in Year 3. Automated resolutions rise from 90k to 450k in the plan, while cases reaching people rise to 66k in Year 1 and fall to 50k in Year 3. The remaining human queue is likely to contain more sensitive cases and exceptions.'},
  {match:/meta|metric|score|sales|revenue|success/i,answer:'I would review Quality, Productivity, Capacity, and Cost to Serve every quarter. One issue ID lets me compare AI, partners, and internal specialists on similar cases. I would sample AI closures for unresolved exits and watch repeat contact before expanding a path.'},
  {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'A severe privacy, policy, or access error stops the affected AI action and sends impacted cases to people. More repeat contact freezes expansion while the team repairs guidance or tools. If human queues stay high, staffing stays in place.'},
  {match:/first|90|pilot|start|invoice|receipt/i,answer:'The proposed pilots are invoice lookup and a common product how-to journey. I would confirm eligible volume and risk, set a baseline, and return by Day 90 with a scale or stop decision. The detailed pilot gates are illustrative and appear in the appendix.'},
  {match:/source|assum|logic|appendix|forecast|contact rate|issue frequency/i,answer:'The exercise supplies 1 billion weekly users, 150k weekly issues, and 60% automated resolution. That is 1.5 weekly support issues per 10,000 users. My stretch case assumes 2 billion weekly users and 2.5 issues per 10,000 by Year 3, producing 500k weekly issues. The appendix shows each input and the public vendor price references.'}
];
function ask(question){
  const q=question.trim();
  if(!q) return;
  const user=document.createElement('p');
  user.className='user';
  user.textContent=q;
  log.append(user);
  const reply=document.createElement('p');
  reply.textContent=(answers.find(item=>item.match.test(q))||{answer:'I can explain the three-year path, cases reaching people, staffing approach, risks, measures, and assumptions shown on this page.'}).answer;
  log.append(reply);
  log.scrollTop=log.scrollHeight;
  input.value='';
}
form.addEventListener('submit',event=>{
  event.preventDefault();
  ask(input.value);
});
document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>ask(button.dataset.question)));

const termTooltip=document.createElement('div');
termTooltip.className='term-tooltip';
termTooltip.setAttribute('role','tooltip');
termTooltip.hidden=true;
document.body.append(termTooltip);
document.querySelectorAll('.help-tip').forEach(term=>{
  term.dataset.tip=term.title;
  term.setAttribute('aria-label',term.title);
  term.removeAttribute('title');
});
function showTerm(term){
  if(!term?.matches('.help-tip'))return;
  termTooltip.textContent=term.dataset.tip;
  termTooltip.hidden=false;
  const rect=term.getBoundingClientRect();
  const width=termTooltip.getBoundingClientRect().width;
  const left=Math.max(10,Math.min(rect.left+rect.width/2-width/2,innerWidth-width-10));
  const top=rect.bottom+10+termTooltip.offsetHeight>innerHeight?rect.top-termTooltip.offsetHeight-10:rect.bottom+10;
  termTooltip.style.left=`${left}px`;
  termTooltip.style.top=`${Math.max(10,top)}px`;
}
function hideTerm(){termTooltip.hidden=true}
document.addEventListener('mouseover',event=>showTerm(event.target.closest?.('.help-tip')));
document.addEventListener('mouseout',event=>{if(event.target.closest?.('.help-tip'))hideTerm()});
document.addEventListener('focusin',event=>showTerm(event.target.closest?.('.help-tip')));
document.addEventListener('focusout',event=>{if(event.target.closest?.('.help-tip'))hideTerm()});
