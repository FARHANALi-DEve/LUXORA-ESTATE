import test from 'node:test';
import assert from 'node:assert/strict';
import {seedProperties} from '../lib/seed.js';
test('demo inventory has unique IDs and slugs',()=>{
 assert.equal(new Set(seedProperties.map(x=>x.id)).size,seedProperties.length);
 assert.equal(new Set(seedProperties.map(x=>x.slug)).size,seedProperties.length);
});
test('demo inventory entries contain complete information',()=>{
 for(const item of seedProperties){
  assert.ok(item.name && item.city && item.location && item.country);
  assert.ok(item.price>0 && item.area>0);
  assert.ok(Array.isArray(item.features));
  assert.ok(item.image.startsWith('https://'));
 }
});
test('featured properties exist for the homepage',()=>{
 assert.ok(seedProperties.filter(x=>x.featured).length>=3);
});
