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
  {match:/118|100m|hundred million|hypergrowth/i,answer:'The $117.5M high case is net vendor cost saved over three years against a forecast that keeps AI resolution at 60%. It assumes 500k weekly issues and 90% verified AI resolution by Year 3, 3,000 annual cases per vendor rep, a high share of vendor-handled cases, flexible contracts, and $20M in AI and rollout spending. The other cases show $42.4M saved or a $13.1M loss.'},
  {match:/financ|saving|cost|budget|onshore|offshore|dollar|money|upside|return on investment|risk and reward|low.*medium.*high/i,answer:'The low, medium, and high cases share the 500k Year 3 demand path. They differ in AI results, vendor handling, and how quickly contracts can change. Every case uses a blended vendor price with 30% onshore and 70% offshore. A further location shift is a separate option with a possible quality risk.'},
  {match:/redeploy|released capacity|freed (hours|time)|staff|headcount|vendor|partner|who|owner|responsib/i,answer:'Support Delivery moves trained people into harder cases and AI review first. Operations checks coverage and vendor plans. Trust & Safety owns sensitive review, while Product and Product Engagement use repeat issues to improve the product. Vendor seats change only after customer quality and service coverage hold.'},
  {match:/idea|vision|strategy|future/i,answer:'AI would turn Support into a connected system that anticipates needs, completes approved actions in the product, and learns from exceptions. The 90% AI path is an illustrative stretch target for the assignment.'},
  {match:/90|82|automation|automated|eligib/i,answer:'The 90% rate is my illustrative Year 3 target, separate from OpenAI targets. At 500k weekly issues, it leaves 50k for people. If AI reaches only 82%, 90k issues reach people, so I would keep coverage and review the issue mix.'},
  {match:/year|glide|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 500k in Year 3. Automated resolutions rise from 90k to 450k in the plan, while cases reaching people rise to 66k in Year 1 and fall to 50k in Year 3. The remaining human queue is likely to contain more sensitive cases and exceptions.'},
  {match:/meta|metric|score|sales|revenue|success/i,answer:'I would review four buckets every quarter. Quality covers durable resolution, repeat contact, and severe errors. Productivity covers verified AI resolution and time to resolution. Capacity covers issue coverage, backlog, attrition, and no-shows. Cost to Serve includes vendor and AI costs per durable resolution.'},
  {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'A severe privacy, policy, or access error stops the affected AI action and sends impacted cases to people. More repeat contact freezes expansion while the team repairs guidance or tools. If human queues stay high, staffing stays in place.'},
  {match:/first|90|pilot|start|invoice|receipt/i,answer:'The proposed pilots are invoice lookup and a common product how-to journey. I would confirm eligible volume and risk, set a baseline, and return by Day 90 with a scale or stop decision. The detailed pilot gates are illustrative and appear in the appendix.'},
  {match:/source|assum|logic|appendix/i,answer:'The exercise supplies 1 billion weekly users, 150k weekly issues, and 60% automated resolution. The 500k demand path and AI targets are exercise assumptions. The appendix shows matching growth factors for users and issues per user, plus public vendor price references and the model inputs.'}
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
