import {mkdir, cp, writeFile} from 'node:fs/promises';
import {SCENARIOS} from './src/scenarios.mjs';
import {evaluate} from './src/engine.mjs';
await mkdir('dist', {recursive:true});
await cp('src', 'dist', {recursive:true});
await cp('docs', 'dist/docs', {recursive:true});
await writeFile('dist/build-report.json', JSON.stringify({scenarios:SCENARIOS.map(s=>({id:s.id,decision:evaluate(s).decision,review:evaluate(s).review})),engine:'deterministic',generatedAt:new Date().toISOString()},null,2));
console.log(`Built ${SCENARIOS.length} scenarios and static assets into dist.`);
