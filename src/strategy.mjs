const panel=document.getElementById('guide');
const launcher=document.getElementById('guide-launcher');
const close=document.getElementById('guide-close');
const log=document.getElementById('guide-log');
const form=document.getElementById('guide-form');
const input=document.getElementById('question');
function setOpen(open){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));if(open)input.focus();else launcher.focus()}
launcher.addEventListener('click',()=>setOpen(panel.hidden));close.addEventListener('click',()=>setOpen(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)setOpen(false)});
const answers=[
 {match:/idea|vision|strategy|ai-led|artificial intelligence/i,answer:'My three-year idea is an AI-led Support system that learns from every interaction. AI resolves approved routine issues, helps people with harder cases, and sends repeated failures into better guidance and product changes. People retain judgment for sensitive cases.'},
 {match:/75|automation|automated/i,answer:'The 75% rate is a Year 3 planning assumption, not an OpenAI target. I would increase the verified rate from 60% in stages and check repeat contact and answer quality before expanding each journey.'},
 {match:/year|glide|capacity|effort|growth/i,answer:'The model moves from 150k weekly issues today to 186k in Year 1, 230k in Year 2, and 281k in Year 3. Human effort rises from 60k to 72k, 83k, and 91k units, so specialist skills and qualified coverage grow even as human case count flattens.'},
 {match:/owner|partner|who|responsib/i,answer:'OpenAI owns policy, routing, quality rules, forecasts, and final escalation decisions. Partners own staffing and coaching in approved queues. Product and Engineering own fixes for recurring product causes.'},
 {match:/meta|metric|score|sales|revenue/i,answer:'I translate Meta coverage, quality, workforce, funnel, and tool-adoption measures into Support equivalents. The main Support outcome is durable resolution by issue type, paired with quality, capacity, cost, and contributor measures.'},
 {match:/risk|stop|error|privacy|fraud|policy/i,answer:'A severe privacy, fraud, policy, or access error stops the affected route and sends the issue to a human owner. The team reviews the cause before using that route again.'},
 {match:/first|90|pilot|start/i,answer:'In the first 90 days, I would link issue and outcome data, establish the baseline, and pilot two low-risk journeys with human review. Each pilot would have an owner, outcome measure, and human handoff.'},
 {match:/source|assum|logic/i,answer:'The exercise supplies 1 billion weekly users, 150k weekly issues, and 60% automated resolution. The growth, complexity, and improvement figures are my illustrative assumptions. The appendix lists each one.'}
];
function ask(question){const q=question.trim();if(!q)return;const user=document.createElement('p');user.className='user';user.textContent=q;log.append(user);const reply=document.createElement('p');reply.textContent=(answers.find(item=>item.match.test(q))||{answer:'I can explain the planning assumptions, year-by-year path, support scorecard, owners, risks, and first 90 days shown on this page.'}).answer;log.append(reply);log.scrollTop=log.scrollHeight;input.value=''}
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>ask(button.dataset.question)));
