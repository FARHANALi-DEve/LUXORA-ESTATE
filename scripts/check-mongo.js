import {getDatabaseStatus} from '../lib/mongodb.js';
import mongoose from 'mongoose';
try {
  const status=await getDatabaseStatus();
  if(status.mode!=='mongodb')throw new Error('MONGODB_URI is not configured. Running in local demo mode.');
  console.log(`CONNECTED — MongoDB database "${status.database}" responded to ping.`);
}catch(error){console.error('NOT CONNECTED — Check MONGODB_URI, Docker/Atlas, network access and database credentials.');process.exitCode=1;}
finally{await mongoose.disconnect();}
