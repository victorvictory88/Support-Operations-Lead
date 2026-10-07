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
  {match:/human case|cases reach|case count|case volume/i,answer:'The human share falls from 40% today to 10% in the Year 3 stretch case. Weekly human cases rise from 60k to 66k in Year 1, stay near 66k in Year 2, then fall to 50k in Year 3. Early demand outpaces automation gains. Later AI actions and product fixes reduce the number of cases reaching people.'},
  {match:/114|100m|hundred million|hypergrowth|size of prize/i,answer:'The potential $114.1M is the high-case net saving across three years. It compares the plan with keeping automated resolution at 60% while demand grows. The case assumes 90% automated resolution in Year 3, vendor costs that can leave future plans, and an illustrative $20M in added AI and rollout spending. The medium case shows $41.1M.'},
  {match:/4m|four million|20m|twenty million|year 1 budget|rollout spend/i,answer:'The $20M is a round planning assumption for added AI use, tools, training, and quality checks across three years. I assigned $4M, $6M, and $10M to Years 1–3 as usage grows. This is not an OpenAI budget or vendor quote. Finance would price invoice lookup and product guidance pilots first.'},
  {match:/financ|saving|cost|budget|onshore|offshore|dollar|money|upside|return on investment|risk and reward|low.*medium.*high/i,answer:'The low, medium, and high cases use the same demand path. The low case saves about $6.5M in vendor costs and spends an assumed $20M, leaving a $13.5M loss. The high case saves $134.1M before that spending. Savings depend on AI results, vendor case share, rep capacity, and existing staffing arrangements.'},
  {match:/attribution|contribut|holdout|false containment|abandon|who resolved/i,answer:'I would use one issue ID across AI, partners, and internal specialists, then compare quality and repeat contact for similar cases. I would also sample AI closures to find customers who left without an answer. That keeps an unresolved exit from counting as success.'},
  {match:/approval|leadership|help from|ask from/i,answer:'I would ask leadership to approve two bounded pilots, name decision owners across Product, Engineering, Trust & Safety, Support Delivery, Operations, and Product Engagement, and have Finance price the investment before wider rollout.'},
  {match:/how.*(work|happen|build)|invest|enablement|priority|priorities|product.people.process|operating model/i,answer:'The investment order starts with Process. Operations links issue history, guidance, and quality checks so we know AI solved the issue. Product and Engineering then add approved AI help and actions in the product. Support Delivery trains partners and specialists for complex cases, exceptions, and AI review.'},
  {match:/eligible|eligibility|90.*possible|feasib|safe.*automat/i,answer:'The 90% target requires enough issues that AI can handle safely. For example, if 95% of issues are eligible and 95% of those finish with a checked answer, the overall result is about 90%. The first audit would test the actual issue mix. A lower eligible share would lower the target and keep more human coverage.'},
  {match:/redeploy|released capacity|freed (hours|time)|staff|headcount|vendor|partner|who|owner|responsib|sla/i,answer:'The high-case model implies about 940 vendor seats today, 1,030 in Years 1 and 2, and 780 in Year 3. For Year 3, 500k weekly issues times a 10% human share times 52 weeks times a 90% vendor share, divided by 3,000 yearly cases per rep, gives 780. These are modeled seats, not OpenAI headcount.'},
  {match:/idea|vision|strategy|future/i,answer:'AI would turn Support into a connected system that anticipates needs, completes approved actions in the product, and learns from exceptions. The 90% AI path is an illustrative stretch target for the assignment.'},
  {match:/90|80|automation|automated/i,answer:'A 90% automated-resolution rate means 90 of every 100 started issues finish without human help. Unanswered exits do not count. At 500k weekly issues, 50k would reach people. The low case assumes 80% automated resolution in Year 3, leaving about 100k weekly cases for people.'},
  {match:/year|glide|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 500k in Year 3. Automated resolutions rise from 90k to 450k in the plan, while cases reaching people rise to 66k in Year 1, stay near 66k in Year 2, and fall to 50k in Year 3. The remaining human queue is likely to contain more sensitive cases and exceptions.'},
  {match:/meta|metric|score|sales|revenue|success/i,answer:'I would review Quality, Productivity, Capacity, and Cost to Serve every quarter. In top-to-top meetings, OpenAI and each vendor would compare results with shared targets. Any gap would have a vendor-specific plan, an owner, milestones, and a follow-up date.'},
  {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'Three risks could change the plan. If AI gives a harmful or incomplete answer, stop that action and route cases to people. If too few issues are safe for AI, lower the 90% target and keep human coverage. If Finance cannot reduce future vendor spend, report the customer result without counting a financial saving.'},
  {match:/first|90|pilot|start|invoice|receipt/i,answer:'In the first 90 days, I would audit demand, align owners and scorecards, and pilot invoice lookup and product guidance. I chose those proposed journeys because answers are easier to check and a person can take over when needed. The audit would confirm volume and risk before launch.'},
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
