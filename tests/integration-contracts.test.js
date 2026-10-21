import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry,validateProperty } from '../lib/validate.js';
import { applyPropertyFilters } from '../lib/property-filters.js';

const base = {name:'Lina Example',email:'lina@example.com',message:'I would love a private tour of this residence.',property:'The Atelier Villa'};
test('private viewing data is validated and saved alongside inquiry data',()=>{
  const result = validateInquiry({...base,requestType:'Viewing',viewingDate:'2026-12-30',viewingTime:'Afternoon'},new Date('2026-10-20T00:00:00Z'));
  assert.equal(result.error,undefined);
  assert.equal(result.value.requestType,'Viewing');
  assert.equal(result.value.viewingDate,'2026-12-30');
  assert.equal(result.value.viewingTime,'Afternoon');
  assert.equal(result.value.property,'The Atelier Villa');
});
test('a viewing requires a real future date and a valid time slot',()=>{
  assert.match(validateInquiry({...base,requestType:'Viewing',viewingDate:'2025-01-01',viewingTime:'Afternoon'},new Date('2026-10-20')).error,/future date/i);
  assert.match(validateInquiry({...base,requestType:'Viewing',viewingDate:'2026-02-30',viewingTime:'Afternoon'},new Date('2026-01-01')).error,/valid date/i);
  assert.match(validateInquiry({...base,requestType:'Viewing',viewingDate:'2026-12-30',viewingTime:'Midnight'},new Date('2026-10-20')).error,/time/i);
});
test('standard inquiries do not require viewing dates',()=>{
  const {value,error} = validateInquiry(base);
  assert.equal(error,undefined);
  assert.equal(value.requestType,'Inquiry');
  assert.equal(value.viewingDate,'');
});
test('property gallery accepts secured uploaded assets and rejects unsafe values',()=>{
 const r=validateProperty({name:'Residence',city:'Dubai',location:'Marina',price:200000,beds:3,baths:2,area:2200,image:'/uploads/5158c001-8482-46cf-a5cc-79f246e35aa4.jpg',gallery:['/uploads/5158c001-8482-46cf-a5cc-79f246e35aa4.jpg','javascript:alert(1)','https://example.com/pool.jpg']});
 assert.deepEqual(r.value.gallery,['/uploads/5158c001-8482-46cf-a5cc-79f246e35aa4.jpg','https://example.com/pool.jpg']);
});
const homes=[
 {name:'A',city:'Dubai',location:'Palm',country:'UAE',category:'Villa',price:12000000,area:4000,beds:4},
 {name:'B',city:'Miami',location:'South Beach',country:'US',category:'Penthouse',price:3000000,area:1500,beds:2},
 {name:'C',city:'Dubai',location:'Marina',country:'UAE',category:'Villa',price:6500000,area:3000,beds:3}
];
test('sort price ascending and filter by destination share a single deterministic contract',()=>{
 const names=applyPropertyFilters(homes,{search:'duBaI',city:'Dubai',type:'All types',price:'Any price',sort:'Price: low to high'}).map(x=>x.name);
 assert.deepEqual(names,['C','A']);
});
test('sort does not mutate initial property inventory',()=>{
 const first=homes[0];applyPropertyFilters(homes,{sort:'Price: low to high'});
 assert.equal(homes[0],first);
});
