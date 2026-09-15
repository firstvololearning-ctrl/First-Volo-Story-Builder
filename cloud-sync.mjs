import {supabase,getCurrentAccess} from './access-gate.mjs';
import {createLearnerLibrarySync} from './learner-library-sync.mjs';
const by=id=>document.getElementById(id);
let session=null,initialized=false,timer=null;
const local=window.FirstVoloStoryLibrary?.local;
const controller=createLearnerLibrarySync({client:supabase,library:local,storage:localStorage,onChange:render});
function signedIn(){const a=getCurrentAccess();return Boolean(session?.user?.id&&session.user.is_anonymous!==true&&a.mode==='educator'&&a.user?.id===session.user.id&&controller.owner===session.user.id)}
function status(text,error=false){by('cloudSyncStatus').textContent=text;by('cloudSyncStatus').classList.toggle('is-error',error)}
function options(node,entries,placeholder){const previous=node.value;node.replaceChildren();const first=document.createElement('option');first.value='';first.textContent=placeholder;node.append(first);for(const [id,label] of entries){const option=document.createElement('option');option.value=id;option.textContent=label;node.append(option)}if(entries.some(([id])=>id===previous))node.value=previous}
function render(){if(!by('cloudStoryPicker'))return;const active=signedIn();by('cloudSignInForm').hidden=active;by('cloudSignedIn').hidden=!active;by('cloudUserEmail').textContent=active?session.user.email||'signed-in account':'';by('cloudSyncBadge').textContent=active?'Linked stories':'Off';by('cloudSyncSummary').textContent='Choose a saved story and its authorized learner to enable cloud saving. Unlinked stories stay on this device.';by('myStoriesStorageNote').textContent='Only linked, authorized stories sync. Keep a Download Backup copy of local changes. Do not include information about other learners.';by('myStoriesEyebrow').textContent='Local stories and linked cloud stories';options(by('cloudStoryPicker'),(local?.list()||[]).map(s=>[s.storyId,s.title||'Untitled story']),'Choose a saved story');options(by('cloudLearnerPicker'),controller.learners.map(x=>[x.student_id,x.display_name]),'Choose an authorized learner');by('cloudLinkSave').disabled=!active}
async function report(action){try{const r=await action();if(!signedIn())return false;if(r?.busy){status('A cloud operation is already running. Try again shortly.');return false}status(r?.conflicts?'Some stories changed on another device. Your local copies were kept; download a backup before resolving.':r?.held?'Some stories could not sync because access changed or the cloud copy was removed. Local copies were kept.':'Cloud operation completed. Unlinked stories remain on this device.');return true}catch{if(signedIn())status('Cloud operation could not finish. Check learner authorization and keep a backup of your local changes.',true);return false}finally{render()}}
async function sync(){if(!signedIn())return false;return report(()=>controller.sync())}
export function suspendEducatorCloudSync(){session=null;clearTimeout(timer);controller.setOwner(null);render()}
async function accept(access){if(access?.mode!=='educator'||!access.user?.id||access.user.is_anonymous===true){suspendEducatorCloudSync();return false}const expected=access.user.id;const {data,error}=await supabase.auth.getSession();if(error||data?.session?.user?.id!==expected||getCurrentAccess().user?.id!==expected){suspendEducatorCloudSync();return false}session=data.session;controller.setOwner(expected);render();await sync();return signedIn()}
export async function initializeEducatorCloudSync(access){if(!local||!by('cloudLinkSave'))return false;if(!initialized){initialized=true;
 by('cloudSyncNow').addEventListener('click',sync);
 by('cloudUseVersion').addEventListener('click',()=>{if(by('cloudStoryPicker').value)report(()=>controller.useCloud(by('cloudStoryPicker').value))});
 by('cloudLinkSave').addEventListener('click',()=>{if(!by('cloudStoryPicker').value||!by('cloudLearnerPicker').value){status('Choose both a story and its learner.');return}report(()=>controller.bind(by('cloudStoryPicker').value,by('cloudLearnerPicker').value))});
 by('cloudSignInForm').addEventListener('submit',async event=>{event.preventDefault();const {error}=await supabase.auth.signInWithOtp({email:by('cloudEmail').value.trim(),options:{emailRedirectTo:window.location.origin+window.location.pathname}});status(error?'Could not send sign-in link.':'Check your email for the sign-in link.',Boolean(error))});
 by('cloudSignOut').addEventListener('click',async()=>{suspendEducatorCloudSync();const {error}=await supabase.auth.signOut();status(error?'Cloud saving stopped, but sign-out could not be confirmed.':'Signed out.',Boolean(error))});
 window.addEventListener('firstvolo:library-saved',()=>{render();if(controller.applying||!signedIn())return;clearTimeout(timer);timer=setTimeout(sync,1200)});
 window.addEventListener('firstvolo:library-removed',event=>{render();if(!controller.applying&&signedIn())report(()=>controller.remove(event.detail?.storyId))});
 window.addEventListener('online',sync);
 supabase.auth.onAuthStateChange((_event,next)=>{if(!next?.user||next.user.id!==session?.user?.id||next.user.is_anonymous===true)suspendEducatorCloudSync()});
 }return accept(access)}
export async function resumeEducatorCloudSync(access){return accept(access)}
window.FirstVoloStoryCloud=Object.freeze({isSignedIn:signedIn,syncNow:sync,getSession:()=>session,suspend:suspendEducatorCloudSync});
