import test from 'node:test';
import assert from 'node:assert/strict';
import {validImageURL,validateProperty} from '../lib/validate.js';
const path='/api/media/507f1f77bcf86cd799439011';
test('MongoDB GridFS media URL is valid for property cover and gallery',()=>{
  assert.equal(validImageURL(path),true);
  const result=validateProperty({name:'Resort',city:'Dubai',location:'Marina',price:2_000_000,beds:2,baths:2,area:2200,image:path,gallery:[path]});
  assert.equal(result.error,undefined);assert.deepEqual(result.value.gallery,[path]);
});
test('MongoDB media links reject malformed and path traversal payloads',()=>{
  for(const value of ['/api/media/../../../foo','/api/media/z','/api/media/507f1f77bcf86cd799439011/extra','/api/media/507f1f77bcf86cd799439011?download=1'])assert.equal(validImageURL(value),false,value);
});
