import test from 'node:test';
import assert from 'node:assert/strict';
import { getDatabaseConfig } from '../lib/database-config.js';

const base = {NODE_ENV:'development'};
test('an Atlas URI selects MongoDB and database name',()=>{
  const config=getDatabaseConfig({...base,MONGODB_URI:'mongodb+srv://guest:pw@example.mongodb.net/luxora_estate?retryWrites=true&w=majority'});
  assert.equal(config.mode,'mongodb');
  assert.equal(config.name,'luxora_estate');
});
test('local URI selects MongoDB; database name can be overridden',()=>{
  const config=getDatabaseConfig({...base,MONGODB_URI:'mongodb://127.0.0.1:27017',MONGODB_DB_NAME:'luxora_demo'});
  assert.equal(config.mode,'mongodb');assert.equal(config.name,'luxora_demo');
});
test('development without Mongo URI permits local demo storage',()=>{
  assert.equal(getDatabaseConfig(base).mode,'local');
});
test('production refuses silent fallback without Mongo',()=>{
  assert.throws(()=>getDatabaseConfig({NODE_ENV:'production'}),/MONGODB_URI/i);
});
test('production demo storage requires explicit opt-in',()=>{
  assert.equal(getDatabaseConfig({NODE_ENV:'production',DEMO_MODE:'1'}).mode,'local');
});
test('invalid Mongo URI is never silently used as local',()=>{
  assert.throws(()=>getDatabaseConfig({...base,MONGODB_URI:'postgres://oops'}),/MongoDB URI/i);
});
test('mongodb mode without a URI must be configured',()=>{
  assert.throws(()=>getDatabaseConfig({...base,DATABASE_MODE:'mongodb'}),/MONGODB_URI/i);
});
test('invalid database name is rejected',()=>{
  assert.throws(()=>getDatabaseConfig({...base,MONGODB_URI:'mongodb://127.0.0.1:27017',MONGODB_DB_NAME:'bad name'}),/database name/i);
});
