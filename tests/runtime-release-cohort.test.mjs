import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');
test('all access-dependent modules share the entry module identity and one release version',()=>{
 const entry=read('index.html').match(/src="(access-gate\.mjs\?v=[^"]+)"/)[1];
 const version=entry.split('?v=')[1];
 for(const name of ['cloud-sync.mjs','student-mode.mjs','student-supports.mjs'])assert.ok(read(name).includes('./'+entry),`${name}: one shared access module`);
 const gate=read('access-gate.mjs');
 for(const name of ['script.js','instructional-support.js','educator-workspace.js','student-supports.mjs','cloud-sync.mjs','student-mode.mjs'])assert.ok(gate.includes(`./${name}?v=${version}`),`${name}: fresh release code`);
 assert.ok(read('index.html').includes(`style.css?v=${version}`));
});
