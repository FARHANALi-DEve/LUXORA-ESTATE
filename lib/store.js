import mongoose from 'mongoose';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {createLocalStore} from './local-store.js';
import {seedProperties} from './seed.js';
import {getDatabaseConfig} from './database-config.js';
import {connectMongo} from './mongodb.js';
import Property from '../models/Property.js';
import Inquiry from '../models/Inquiry.js';

const local = createLocalStore(path.join(process.cwd(), 'data', 'local-store.json'), seedProperties);
const isMongo = () => getDatabaseConfig().mode === 'mongodb';
const serialize = record => {
  if (!record) return null;
  const {_id, __v, ...fields} = record.toObject ? record.toObject() : record;
  return {...fields, id: String(_id)};
};
const validId = id => typeof id === 'string' && /^[a-f0-9]{24}$/i.test(id);

export async function listProperties() {
  if (isMongo()) {
    await connectMongo();
    return (await Property.find().sort({createdAt:-1}).lean()).map(serialize);
  }
  return (await local.read()).properties;
}
export async function findProperty(slug) {
  if (isMongo()) {
    await connectMongo();
    const query = validId(slug) ? {$or:[{slug},{_id:slug}]} : {slug};
    return serialize(await Property.findOne(query).lean());
  }
  return (await local.read()).properties.find(p=>p.slug===slug||p.id===slug)||null;
}
export async function addProperty(value) {
  if (isMongo()) {
    await connectMongo();
    return serialize(await Property.create(value));
  }
  return local.update(db=>{
    if(db.properties.some(x=>x.slug===value.slug))throw new Error('A residence with this slug already exists.');
    const item={...value,id:randomUUID(),createdAt:new Date().toISOString()};db.properties.unshift(item);return item;
  });
}
export async function editProperty(id,value) {
  if (isMongo()) {
    await connectMongo();
    if(!validId(id))return null;
    return serialize(await Property.findByIdAndUpdate(id,{$set:value},{new:true,runValidators:true}).lean());
  }
  return local.update(db=>{
    const idx=db.properties.findIndex(x=>x.id===id);if(idx<0)return null;
    if(db.properties.some(x=>x.id!==id&&x.slug===value.slug))throw new Error('A residence with this slug already exists.');
    db.properties[idx]={...db.properties[idx],...value,updatedAt:new Date().toISOString()};return db.properties[idx];
  });
}
export async function removeProperty(id) {
  if(isMongo()) {await connectMongo();return validId(id)?Boolean(await Property.findByIdAndDelete(id)):false;}
  return local.update(db=>{const n=db.properties.length;db.properties=db.properties.filter(p=>p.id!==id);return n!==db.properties.length;});
}
export async function addInquiry(value) {
  if(isMongo()) {await connectMongo();const record=await Inquiry.create(value);return {id:String(record._id)};}
  return local.update(db=>{const item={...value,id:randomUUID()};db.inquiries.unshift(item);return {id:item.id};});
}
export async function listInquiries() {
  if(isMongo()){await connectMongo();return (await Inquiry.find().sort({createdAt:-1}).lean()).map(serialize);}
  return (await local.read()).inquiries;
}
export async function setInquiryStatus(id,status) {
  if(isMongo()){await connectMongo();return validId(id)?Boolean(await Inquiry.findByIdAndUpdate(id,{$set:{status}},{runValidators:true})):false;}
  return local.update(db=>{const item=db.inquiries.find(x=>x.id===id);if(!item)return false;item.status=status;return true;});
}
export async function deleteInquiry(id) {
  if(isMongo()){await connectMongo();return validId(id)?Boolean(await Inquiry.findByIdAndDelete(id)):false;}
  return local.update(db=>{const n=db.inquiries.length;db.inquiries=db.inquiries.filter(x=>x.id!==id);return n!==db.inquiries.length;});
}
