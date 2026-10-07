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
  {match:/break.?even|cover.*invest|minimum.*result/i,answer:'One near break-even path has AI resolving about 62%, 63%, and 65% of weekly issues across Years 1–3. In Year 3, people would handle about 175k of 500k weekly issues, and the high-case staffing assumptions imply about 2,730 vendor reps. The rounded path saves about $22M in vendor costs over three years, slightly above the assumed $20M investment.'},
  {match:/41.*111|111.*41|medium.*high|high.*medium|why.*high/i,answer:'Both medium and high cases reach 90% AI resolution in Year 3. Medium assumes vendors receive 70% of human cases and each rep handles 4,000 yearly, giving about 455 vendor reps in Year 3. High assumes 90% vendor assignment and 3,000 cases per rep, giving about 780. That larger starting vendor footprint, plus more future vendor spending removed, produces the larger modeled saving.'},
  {match:/111|100m|hundred million|hypergrowth|size of prize/i,answer:'The potential $111M is the high-case net saving across three years. It compares the plan with keeping automated resolution at 60% while demand grows. The case assumes 90% automated resolution in Year 3, vendor costs that can leave future plans, and an illustrative $20M in added AI and rollout spending. The medium case shows $41M.'},
  {match:/4m|four million|20m|twenty million|year 1 budget|rollout spend/i,answer:'The $20M is an illustrative three-year planning budget. It assigns $6M to Process, $10M to Product, and $4M to People. Spending continues every year for linked issue data, AI use, quality checks, training, and embedded specialist coverage. Finance would price the invoice/billing reconciliation and product guidance pilots before approving a wider rollout.'},
  {match:/financ|saving|cost|budget|onshore|offshore|dollar|money|upside|opportunity|return on investment|risk and reward|low.*medium.*high/i,answer:'The low, medium, and high cases use the same demand path. The low case saves about $7M in vendor costs and spends an assumed $20M, leaving about a $14M loss. The medium case nets $41M, and the high case nets $111M. The gap comes from different vendor case assignment, cases handled per rep, and future vendor spending that Finance can remove.'},
  {match:/attribution|contribut|holdout|false containment|abandon|who resolved/i,answer:'I would use one issue ID across AI, partners, and internal specialists, then compare quality and repeat contact for similar cases. I would also sample AI closures to find customers who left without an answer. That keeps an unresolved exit from counting as success.'},
  {match:/how.*(measure|know|verify)|scorecard|quarterly/i,answer:'The quarterly scorecard covers Quality, Productivity, Capacity, and Cost to Serve. In the two 90-day pilots, I would review at least 100 randomly selected AI closures per journey each week, check seven-day repeat contact, and compare the result with the agreed SLA and backlog targets. At Day 90, the proposed tests are 10% fewer eligible issues reaching people and a five-point gain in checked resolution.'},
  {match:/approval|leadership|help from|ask from/i,answer:'I would ask leadership to approve two bounded pilots, assign decision owners for shared issue history and embedded Support specialists at vendor sites, and have Finance price the three-year investment before wider rollout.'},
  {match:/interoperab|embedded|vendor site|specialist.*sales|sales.*specialist/i,answer:'Interoperability means one issue history across Sales, Product, Support, AI, and vendor teams. Support Delivery would embed specialists at selected vendor sites to help sales reps resolve complex questions, coach customer self-service, and send recurring blockers into Product and quality reviews.'},
  {match:/self.service|customer.*(train|teach)|enablement/i,answer:'AI and vendor reps would show customers how to complete approved tasks inside the product before escalating. I would track customer self-service completion and repeat contact, so guidance counts only when it helps the customer finish the task.'},
  {match:/how.*(work|happen|build)|invest|priority|priorities|product.people.process|operating model/i,answer:'The three-year planning split is $6M for Process, $10M for Product, and $4M for People. Process links issue history and quality checks. Product expands AI actions and customer self-service. People funding supports training and embedded specialists at vendor sites. All three continue across the three years as usage grows.'},
  {match:/eligible|eligibility|90.*possible|feasib|safe.*automat/i,answer:'The 90% target requires enough issues that AI can handle safely. For example, if 95% of issues are eligible and 95% of those finish with a checked answer, the overall result is about 90%. The first audit would test the actual issue mix. A lower eligible share would lower the target and keep more human coverage.'},
  {match:/redeploy|released capacity|freed (hours|time)|staff|headcount|vendor|partner|who|owner|responsib|sla/i,answer:'The exercise gives no vendor rep count, so I estimate it from cases assigned to vendors and cases handled per rep. The high case needs about 940 vendor reps today, 1,030 in Year 1, 940 in Year 2, and 780 in Year 3. Year 2 assumes AI assistance raises cases handled per rep to 3,300. Year 3 uses 3,000 because the remaining human cases may take longer.'},
  {match:/idea|vision|strategy|future/i,answer:'AI would turn Support into a connected system that anticipates needs, completes approved actions in the product, and learns from exceptions. The 90% AI path is an illustrative stretch target for the assignment.'},
  {match:/90|80|automation|automated/i,answer:'A 90% automated-resolution rate means 90 of every 100 started issues finish without human help. Unanswered exits do not count. At 500k weekly issues, 50k would reach people. The low case assumes 80% automated resolution in Year 3, leaving about 100k weekly cases for people.'},
  {match:/year|glide|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 500k in Year 3. Automated resolutions rise from 90k to 450k in the plan, while cases reaching people rise to 66k in Year 1, stay near 66k in Year 2, and fall to 50k in Year 3. The remaining human queue is likely to contain more sensitive cases and exceptions.'},
  {match:/meta|metric|score|sales|revenue|success/i,answer:'I would review Quality, Productivity, Capacity, and Cost to Serve every quarter. In top-to-top meetings, OpenAI and each vendor would compare results with shared targets. Any gap would have a vendor-specific plan, an owner, milestones, and a follow-up date.'},
  {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'Three risks could change the plan. If AI gives a harmful or incomplete answer, stop that action and route cases to people. If too few issues are safe for AI, lower the 90% target and keep human coverage. If Finance cannot reduce future vendor spend, report the customer result without counting a financial saving.'},
  {match:/first|90|pilot|start|invoice|receipt/i,answer:'In the first 90 days, I would audit demand, align owners and scorecards, and pilot invoice/billing reconciliation and product guidance with a human escalation route. At Day 90, I would check resolution quality, severe AI errors, SLA, backlog, and the share of eligible cases reaching people before expansion.'},
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
