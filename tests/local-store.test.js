import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {createLocalStore} from '../lib/local-store.js';

test('local backing store persists a property and viewing inquiry between reads',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'luxora-api-test-'));
  try{
    const store=createLocalStore(path.join(dir,'store.json'),[{id:'demo-1',name:'Villa'}]);
    const first=await store.read(); assert.equal(first.properties.length,1);
    await store.update(db=>db.inquiries.push({id:'req-1',requestType:'Viewing',viewingDate:'2026-12-30',viewingTime:'Afternoon',status:'New'}));
    const another=createLocalStore(path.join(dir,'store.json'),[]);
    const saved=await another.read();assert.equal(saved.inquiries.length,1);assert.equal(saved.inquiries[0].viewingTime,'Afternoon');
  }finally{await rm(dir,{recursive:true,force:true});}
});
test('concurrent inbox writes never silently lose a request',async()=>{
  const dir=await mkdtemp(path.join(tmpdir(),'luxora-queue-test-'));
  try{
    const store=createLocalStore(path.join(dir,'store.json'),[]);
    await Promise.all(Array.from({length:20},(_,i)=>store.update(db=>db.inquiries.push({id:`${i}`}))));
    const state=await store.read();assert.equal(state.inquiries.length,20);
  }finally{await rm(dir,{recursive:true,force:true});}
});
