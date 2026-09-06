import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../access-gate.mjs',import.meta.url),'utf8')
 .replace(/^import .*;\n/gm,'').replace(/export /g,'').split('const accessReady = reauthorize();')[0];
function harness(){
 const navigation=[];
 const context=vm.createContext({createClient:()=>({}),document:{getElementById:()=>null},window:{location:{reload:()=>navigation.push('reload'),replace:url=>navigation.push(url)}},console});
 vm.runInContext(source+'\nstudentRuntimeStarted=true; authorizationGeneration=1;',context);
 return {context,navigation};
}
test('student auth-state sign-out goes straight to neutral sign-in instead of reloading the product',async()=>{
 const {context,navigation}=harness();
 await vm.runInContext('publishAccess(lockedAccess, null, 1, {mode:"student"})',context);
 assert.deepEqual(navigation,['https://firstvololearning-ctrl.github.io/First-Volo-Account/student-login.html']);
});
test('a signed-in identity switch still reloads instead of treating it as sign-out',async()=>{
 const {context,navigation}=harness();
 await vm.runInContext('publishAccess(lockedAccess, {user:{id:"other"}}, 1, {mode:"student"})',context);
 assert.deepEqual(navigation,['reload']);
});
test('stale authorization result cannot navigate',async()=>{
 const {context,navigation}=harness();
 await vm.runInContext('publishAccess(lockedAccess, null, 0, {mode:"student"})',context);
 assert.deepEqual(navigation,[]);
});
