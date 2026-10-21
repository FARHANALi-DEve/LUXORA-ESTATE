import test from 'node:test';
import assert from 'node:assert/strict';
import {validateInquiry,validateProperty,formatPrice} from '../lib/validate.js';
test('inquiry rejects invalid name/email/message',()=>{
  assert.match(validateInquiry({name:'A',email:'broken',message:'hi'}).error,/name/);
  assert.match(validateInquiry({name:'Anita',email:'bad',message:'Hello there from Anita'}).error,/email/);
  assert.match(validateInquiry({name:'Anita',email:'a@example.com',message:'hi'}).error,/message/);
});
test('inquiry sanitizes and normalizes text',()=>{
  const r=validateInquiry({name:' Anita ',email:' A@EXAMPLE.COM ',message:'Please contact me about this property.'});
  assert.equal(r.value.name,'Anita');assert.equal(r.value.email,'a@example.com');
});
test('property validates core fields and generates slug',()=>{
  const r=validateProperty({name:'Villa One',city:'Dubai',location:'The Palm',price:100000,beds:3,baths:4,area:2000,image:'https://images.unsplash.com/example.jpg'});
  assert.equal(r.value.slug,'villa-one');assert.equal(r.value.price,100000);
});
test('property blocks malformed image URL',()=>{
  const r=validateProperty({name:'X',city:'Dubai',location:'Palm',price:1,beds:2,baths:2,area:100,image:'javascript:alert(1)'});
  assert.match(r.error,/Image/);
});
test('property rejects negative price',()=>{
  const r=validateProperty({name:'X',city:'Dubai',location:'Palm',price:-1,beds:2,baths:2,area:100,image:'https://example.com/a.jpg'});
  assert.match(r.error,/valid property/);
});
test('price formats US dollars',()=>assert.equal(formatPrice(12800000),'$12,800,000'));
