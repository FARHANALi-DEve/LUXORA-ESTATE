import test from 'node:test';
import assert from 'node:assert/strict';
import {classifyError} from '../lib/api-errors.js';

test('Mongo duplicate slug is reported as conflict without exposing the database',()=>{
  assert.deepEqual(classifyError({code:11000,message:'duplicate key error'}),{status:409,message:'That residence URL is already in use. Choose another name or slug.'});
});
test('Mongo connection string must not escape via HTTP error message',()=>{
  const result=classifyError(new Error('MongoDB connection failed: mongodb+srv://user:password@host'));
  assert.equal(result.status,503);assert.doesNotMatch(result.message,/password|mongodb\+srv/);
});
