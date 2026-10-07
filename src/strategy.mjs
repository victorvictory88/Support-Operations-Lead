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
  {match:/human case|cases reach|case count|case volume/i,answer:'The chart counts issues that reach a person each week. In the illustrative Year 3 stretch case, that number falls from 60k to about 34k, even though total issues rise. People focus on sensitive cases and exceptions as AI takes on more routine issues.'},
  {match:/redeploy|released capacity|freed (hours|time)|staff|headcount|vendor|partner|who|owner|responsib/i,answer:'AI handles approved routine issues, partner teams handle defined exceptions and protect coverage, and internal specialists own sensitive decisions and AI controls. I would move people toward harder cases and quality review before changing staffing or partner contracts.'},
  {match:/idea|vision|strategy|future/i,answer:'The three-year vision is Support that spots common needs and resolves approved problems inside the product before they become tickets. People govern AI, handle sensitive cases, and remove repeat causes. The 88% path is an illustrative stretch case for that vision.'},
  {match:/88|75|automation|automated|eligib/i,answer:'The 88% rate is my illustrative stretch case, separate from OpenAI targets. At Year 3 demand, it leaves about 34k weekly issues for people. If automation reaches only 75%, about 70k issues reach people, so I would keep coverage and review the issue mix.'},
  {match:/year|glide|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 281k in Year 3. Automated resolutions rise from 90k to about 247k in the stretch case, while cases reaching people fall from 60k to about 34k. The remaining human queue is likely to contain more sensitive cases and exceptions.'},
  {match:/meta|metric|score|sales|revenue|success/i,answer:'The lead customer outcome is durable resolution by issue type. I would read quality, productivity, capacity, and cost to serve together, then inspect AI, partner, and internal contributions using one issue history.'},
  {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'A severe privacy, policy, or access error stops the affected AI action and sends impacted cases to people. More repeat contact freezes expansion while the team repairs guidance or tools. If human queues stay high, staffing stays in place.'},
  {match:/first|90|pilot|start|invoice|receipt/i,answer:'The proposed pilots are invoice lookup and a common product how-to journey. I would confirm eligible volume and risk, set a baseline, and return by Day 90 with a scale or stop decision. The detailed pilot gates are illustrative and appear in the appendix.'},
  {match:/source|assum|logic|appendix/i,answer:'The exercise supplies 1 billion weekly users, 150k weekly issues, and 60% automated resolution. Growth, case complexity, and the 70%, 80%, and 88% automation path are illustrative assumptions. Open the appendix for the full math and the 75% downside case.'}
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
