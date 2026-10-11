import {handleNatureJournal} from "./lib/studio-journal.mjs";
export default { async fetch(request,env,ctx) {
  return handleNatureJournal(request,env,ctx,{staging:true});
}};
