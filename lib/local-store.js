import {promises as fs} from 'node:fs';
import path from 'node:path';
import {randomUUID} from 'node:crypto';

/** A single-process, local-dev JSON store. Not safe as distributed production storage. */
export function createLocalStore(filename,initialProperties=[],options={}){
  let pending=Promise.resolve();
  async function read(){
    if(options.enabled===false)throw new Error('Configure MONGODB_URI for production persistence.');
    try{return JSON.parse(await fs.readFile(filename,'utf8'));}
    catch(e){
      if(e.code!=='ENOENT')throw e;
      await fs.mkdir(path.dirname(filename),{recursive:true});
      try{await fs.writeFile(filename,JSON.stringify({properties:initialProperties,inquiries:[]},null,2),{flag:'wx'});}
      catch(writeError){if(writeError.code!=='EEXIST')throw writeError;}
      return JSON.parse(await fs.readFile(filename,'utf8'));
    }
  }
  function update(updater){
    const operation=pending.then(async()=>{
      const state=await read();
      const outcome=updater(state);
      const temp=`${filename}.${randomUUID()}.tmp`;
      try{await fs.writeFile(temp,JSON.stringify(state,null,2));await fs.rename(temp,filename);}
      finally{await fs.rm(temp,{force:true}).catch(()=>{});}
      return outcome;
    });
    pending=operation.catch(()=>{});
    return operation;
  }
  return {read,update};
}
