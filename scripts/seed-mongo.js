/** One-time, non-destructive sample inventory importer for a real MongoDB. */
import {getDatabaseConfig} from '../lib/database-config.js';
import {connectMongo} from '../lib/mongodb.js';
import Property from '../models/Property.js';
import {seedProperties} from '../lib/seed.js';
import mongoose from 'mongoose';

try {
  const settings=getDatabaseConfig();
  if(settings.mode!=='mongodb')throw new Error('Configure MONGODB_URI first. Seed does not run against the local demo store.');
  await connectMongo();
  await Property.init();
  let added=0,existing=0;
  for(const listing of seedProperties) {
    const {id,...data}=listing;
    const result=await Property.updateOne({slug:data.slug},{$setOnInsert:data},{upsert:true,runValidators:true,setDefaultsOnInsert:true});
    if(result.upsertedCount)added++;else existing++;
  }
  console.log(`MongoDB seed complete: ${added} new residence(s), ${existing} already present. Existing residences were not modified.`);
}catch(error){
  console.error('MongoDB seed failed:',error.message.replace(/mongodb(?:\+srv)?:\/\/[^\s]+/gi,'[redacted URI]'));
  process.exitCode=1;
}finally{await mongoose.disconnect();}
