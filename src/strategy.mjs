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
 {match:/idea|vision|strategy|future/i,answer:'The three-year vision is Support that spots common needs and resolves approved problems inside the product before they become tickets. People govern AI, handle sensitive cases, and remove repeat causes. The 88% path is an illustrative stretch case for that vision.'},
 {match:/88|84|75|automation|automated|eligib/i,answer:'At Year 3 demand, verified automation must exceed about 84% to bring modeled human effort below today. The 88% stretch case leaves about 34k human cases and 44k effort units; a 75% path leaves about 70k cases and 91k units. The target requires enough eligible issue types, safe actions, and measured durable resolution.'},
 {match:/year|glide|capacity|effort|growth|graph|chart/i,answer:'The bars show weekly issues moving from 150k today to 281k in Year 3. In the stretch case, automated resolutions rise from 90k to about 247k, while human cases fall from 60k to about 34k. Human effort falls to about 44k units even though each remaining case is harder.'},
 {match:/staff|headcount|redeploy|vendor|partner|who|owner|responsib/i,answer:'I would redeploy released hours into quality review, difficult cases, and product fixes first. Partner capacity changes only after durable resolution, safety, backlog, and cost hold. OpenAI owns policy and final escalation; partners own defined human queues and coaching.'},
 {match:/meta|metric|score|sales|revenue|success/i,answer:'The lead customer outcome is durable resolution by issue type. I would read quality, productivity, capacity, and cost to serve together, then inspect AI, partner, and internal contributions using one issue history.'},
 {match:/risk|stop|error|privacy|fraud|policy|contingen/i,answer:'A severe privacy, policy, or access error stops the affected AI action and sends impacted cases to people. More repeat contact freezes expansion while the team repairs guidance or tools. If human effort stays high, staffing stays in place.'},
 {match:/first|90|pilot|start|invoice|receipt/i,answer:'The proposed pilots are invoice lookup and a common product how-to journey. I would confirm eligible volume and risk, set a baseline, and return by Day 90 with a scale or stop decision. The 5-point resolution gain, 10% effort reduction, and zero severe errors are illustrative pilot gates.'},
 {match:/source|assum|logic/i,answer:'The exercise supplies 1 billion weekly users, 150k weekly issues, and 60% automated resolution. Growth, case complexity, and the 70%, 80%, and 88% automation path are my illustrative assumptions. The appendix shows the numbers and the 75% downside case.'}
];
function ask(question){const q=question.trim();if(!q)return;const user=document.createElement('p');user.className='user';user.textContent=q;log.append(user);const reply=document.createElement('p');reply.textContent=(answers.find(item=>item.match.test(q))||{answer:'I can explain the 88% stretch case, year-by-year path, staffing plan, scorecard, owners, risks, and first 90 days shown on this page.'}).answer;log.append(reply);log.scrollTop=log.scrollHeight;input.value=''}
form.addEventListener('submit',e=>{e.preventDefault();ask(input.value)});document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>ask(button.dataset.question)));
