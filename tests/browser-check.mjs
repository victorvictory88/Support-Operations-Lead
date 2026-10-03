import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const origin=process.env.BASE_URL || 'http://127.0.0.1:4176/';await page.goto(origin);await page.locator('.scenario').first().waitFor();
const copy=[];
const names={quality:'Quality',productivity:'Productivity',capacity:'Capacity',cost:'Cost to serve'};
for(const [id,name] of Object.entries(names)){
 await page.locator(`[data-scenario="${id}"]`).click();
 assert.equal(await page.locator('.scenario').count(),4);assert.equal(await page.locator('.scenario[aria-pressed=true]').count(),1);
 assert.equal(await page.locator('[data-agent]').count(),4);assert.equal(await page.locator('.trace-panel,#trace,#flow-status,[data-step]').count(),0);
 assert.ok((await page.locator('#rail').innerText()).includes(name));assert.equal(await page.locator('#analysis .metric-row').count(),{quality:2,productivity:5,capacity:5,cost:4}[id]);
 assert.equal(await page.locator('.action-table tbody tr').count(),id==='cost'?4:3);
 assert.equal(await page.locator('.action-table time').count(),id==='cost'?4:3);
 assert.equal(await page.locator('.status-box').count(),id==='cost'?4:3);
 assert.ok((await page.locator('.plan-context').innerText()).includes('Oct 15, 2026'));
 await page.locator('.action-proof summary').first().click();
 assert.equal(await page.locator('#analysis .record').count(),3);assert.equal(await page.locator('.evidence-details').getAttribute('open'),null);
 assert.deepEqual(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#record-"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)),[]);
 await page.locator('#handoff .refs a').first().click();assert.equal(await page.locator('.evidence-details').getAttribute('open'),'');assert.equal(await page.locator('.record:target').count(),1);
 await page.locator('.evidence-details summary').click();
 assert.equal(await page.locator('#analysis h2 .tip button,#handoff h2 .tip button').count(),2);
 if(id==='quality')assert.ok((await page.locator('.agent-grid').innerText()).includes('Quality analyst'));
 if(id==='productivity')assert.ok((await page.locator('.agent-grid').innerText()).includes('Sales coach'));
 if(id==='capacity')assert.ok((await page.locator('.agent-grid').innerText()).includes('Workforce planner'));
 if(id==='cost'){assert.ok((await page.locator('.agent-grid').innerText()).includes('Cost analyst'));assert.ok((await page.locator('.cost-summary').innerText()).includes('$34.00'));}
 await page.screenshot({path:`qa/v4-desktop-${id}.png`,fullPage:true});await writeFile(`qa/rendered-${id}.html`,await page.content());copy.push(...await page.locator('p,.tooltip,tbody td,tbody th').allTextContents());
}
await page.locator('[data-scenario="capacity"]').click();await page.waitForFunction(()=>document.querySelectorAll('[data-edge]').length===4);
assert.equal(await page.locator('[data-edge].active').count(),1);
const packet=await page.locator('.flow-packet').getAttribute('cx');await page.waitForTimeout(450);assert.notEqual(await page.locator('.flow-packet').getAttribute('cx'),packet);
await page.waitForTimeout(6200);assert.equal(await page.locator('.agent.active').getAttribute('data-agent'),'1');
await page.locator('#motion').click();const frozen=await page.locator('.flow-packet').getAttribute('cx');await page.waitForTimeout(300);assert.equal(await page.locator('.flow-packet').getAttribute('cx'),frozen);assert.equal(await page.locator('.flow-packet').evaluate(e=>getComputedStyle(e).visibility),'hidden');
for(const scope of ['.picker','#team-heading','#analysis h2','#handoff h2','.quality h2','.project-notes h2','.project-notes h3','.evidence-details summary','.communication-details summary']){
 const button=page.locator(`${scope} .tip button`).first();await button.focus();assert.equal(await button.locator('..').locator('.tooltip').evaluate(e=>getComputedStyle(e).visibility),'visible');await page.keyboard.press('Escape');assert.equal(await button.locator('..').locator('.tooltip').evaluate(e=>getComputedStyle(e).visibility),'hidden');
}
await page.locator('#guide-launcher').click();await page.locator('[data-question="Who owns the next handoff?"]').click();assert.ok((await page.locator('#guide-log').innerText()).includes('Maya Chen'));
await page.locator('#question').fill('<img src=x onerror=alert(1)>');await page.locator('#guide-form button').click();assert.equal(await page.locator('#guide-log img').count(),0);await page.keyboard.press('Escape');assert.equal(await page.locator('#guide').isVisible(),false);assert.equal(await page.locator('#guide-launcher').evaluate(e=>e===document.activeElement),true);
for(const width of [1440,960,390,375]){
 await page.setViewportSize({width,height:1000});await page.goto(origin);await page.locator('.scenario').first().waitFor();await page.waitForFunction(()=>document.querySelectorAll('[data-edge]').length===4);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);await page.screenshot({path:`qa/v4-viewport-${width}.png`,fullPage:true});
 for(const id of Object.keys(names)){await page.locator(`[data-scenario="${id}"]`).click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${id} at ${width}`);}
 await page.locator('[data-scenario="quality"]').click();await page.locator('#top').scrollIntoViewIfNeeded();
 if(width===1440)await page.screenshot({path:'qa/v4-desktop-top.png'});
 if(width===390){assert.ok(await page.locator('.picker').evaluate(e=>e.getBoundingClientRect().top<110));await page.screenshot({path:'qa/v4-mobile-top.png'});await page.locator('.team').scrollIntoViewIfNeeded();await page.screenshot({path:'qa/v4-mobile-chart.png'});await page.locator('#analysis').scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.keyboard.press('Escape');await page.waitForTimeout(250);await page.screenshot({path:'qa/v4-mobile-analysis.png'});}
}
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();assert.equal(await page.locator('#motion').innerText(),'Resume trace');assert.equal(await page.locator('.flow-packet').evaluate(e=>getComputedStyle(e).visibility),'hidden');
await page.setViewportSize({width:960,height:1000});await page.addStyleTag({content:'html{font-size:200%} body{font-size:32px}'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow at enlarged text');await page.screenshot({path:'qa/v4-enlarged-text.png',fullPage:true});
assert.deepEqual(errors,[]);await writeFile('qa/visible-copy.md',copy.join('\n\n'));console.log(JSON.stringify({scenarios:4,rolesPerScenario:4,metricsPerScenario:[2,5,5,4],viewports:[1440,960,390,375],pageErrors:errors,sectionHelp:'pass',evidenceDisclosure:'pass',motion:'pass',keyboard:'pass',reducedMotion:'pass',enlargedText:'pass'}));await browser.close();
