// Explicit learner links. Server permission and revision checks remain authoritative.
export function createLearnerLibrarySync({client,library,storage,onChange=()=>{}}) {
 const key='firstVoloLearnerLibraryBindingsV2',queueKey='firstVoloLearnerLibraryDeletesV2';
 let owner=null,epoch=0,busy=false,applying=false,learners=[];
 const read=k=>{try{return JSON.parse(storage.getItem(k)||'{}')}catch{return {}}};
 const write=(k,v)=>storage.setItem(k,JSON.stringify(v));
 const bindings=()=>Object.assign(Object.create(null),read(key)[owner]||{});
 function saveBindings(value){const all=read(key);all[owner]=value;write(key,all)}
 const fingerprint=story=>JSON.stringify(story);
 function current(e){if(!owner||e!==epoch)throw Error('Account changed; operation discarded')}
 async function rpc(name,args,e){current(e);const {data,error}=await client.rpc(name,args);current(e);if(error)throw Error(error.code==='40001'?'Cloud story changed. Keep your local copy and resolve the conflict.':'Cloud operation denied or unavailable');return data}
 function validateRow(row){if(!row||row.user_id!==owner||typeof row.story_id!=='string'||!row.student_id||!Number.isSafeInteger(row.record_revision)||row.record_revision<1||row.story_data?.storyId!==row.story_id)throw Error('Unexpected cloud response');return row}
 function remember(row,map){map[row.story_id]={studentId:row.student_id,revision:row.record_revision,base:fingerprint(row.story_data)};saveBindings(map)}
 async function refreshLearners(e){const data=await rpc('list_story_library_learners',{},e);if(!Array.isArray(data)||data.some(x=>typeof x.student_id!=='string'||typeof x.display_name!=='string'))throw Error('Unexpected learner response');learners=data;onChange()}
 async function save(story,map,e){const link=map[story.storyId];if(!link||!learners.some(x=>x.student_id===link.studentId))throw Error('Current learner authorization required');const row=validateRow(await rpc('save_story_library_entry',{p_student_id:link.studentId,p_story_id:story.storyId,p_story_data:story,p_expected_revision:link.revision},e));if(row.student_id!==link.studentId||row.story_id!==story.storyId)throw Error('Unexpected learner response');remember(row,map)}
 async function flush(e){const all=read(queueKey),items=all[owner]||[];for(const id of items){await rpc('delete_story_library_entry',{p_story_id:id},e);const latest=read(queueKey);latest[owner]=(latest[owner]||[]).filter(x=>x!==id);write(queueKey,latest);const map=bindings();delete map[id];saveBindings(map)}}
 async function run(fn){if(busy)return {busy:true};if(!owner)throw Error('Educator sign-in required');busy=true;const e=epoch;try{return await fn(e)}finally{busy=false}}
 return {
  setOwner(id){if(owner!==id){owner=id;epoch++;learners=[]}onChange()},
  get learners(){return learners.slice()},get applying(){return applying},get owner(){return owner},
  async useCloud(storyId){return run(async e=>{const rows=await rpc('list_story_library_entries',{},e);if(!Array.isArray(rows))throw Error('Unexpected library response');const row=rows.find(x=>x.story_id===storyId);validateRow(row);const map=bindings();if(map[storyId]&&map[storyId].studentId!==row.student_id)throw Error('Learner scope differs');applying=true;try{library.save(row.story_data)}finally{applying=false}remember(row,map);onChange();return {downloaded:1}})},
  async bind(storyId,studentId){return run(async e=>{await refreshLearners(e);const story=library.get(storyId);if(!story)throw Error('Choose a saved story');const all=read(key);if(Object.entries(all).some(([other,map])=>other!==owner&&Object.hasOwn(map,storyId)))throw Error('This local story belongs to a different account');const map=bindings();if(map[storyId]&&map[storyId].studentId!==studentId)throw Error('A linked story cannot move to another learner');map[storyId]??={studentId,revision:0,base:null};await save(story,map,e);return {saved:1}})},
  async remove(storyId){const map=bindings();if(!owner||!map[storyId])return {localOnly:true};const all=read(queueKey);all[owner]=[...new Set([...(all[owner]||[]),storyId])];write(queueKey,all);return run(async e=>{await flush(e);return {deleted:true}})},
  async sync(){return run(async e=>{
   await flush(e);await refreshLearners(e);const rows=await rpc('list_story_library_entries',{},e);if(!Array.isArray(rows))throw Error('Unexpected library response');rows.forEach(validateRow);
   const map=bindings(),remote=new Map(rows.map(row=>[row.story_id,row]));let saved=0,downloaded=0,conflicts=0,held=0;
   for(const [id,link] of Object.entries(map)){
    const local=library.get(id),row=remote.get(id);remote.delete(id);
    if(!learners.some(x=>x.student_id===link.studentId)){held++;continue}
    if(row&&row.student_id!==link.studentId){conflicts++;continue}
    if(!row&&link.revision>0){held++;continue} // Never resurrect remotely removed records.
    if(row&&row.record_revision!==link.revision){
     if(local&&fingerprint(local)!==link.base){conflicts++;continue}
     applying=true;try{library.save(row.story_data)}finally{applying=false}remember(row,map);downloaded++;
    }else if(local&&fingerprint(local)!==link.base){await save(local,map,e);saved++}
   }
   for(const row of remote.values()){
    if(library.get(row.story_id)){conflicts++;continue} // Never overwrite an unlinked local copy.
    applying=true;try{library.save(row.story_data)}finally{applying=false}remember(row,map);downloaded++;
   }
   current(e);onChange();return {saved,downloaded,conflicts,held};
  })}
 };
}
