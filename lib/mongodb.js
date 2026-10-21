import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { getDatabaseConfig } from './database-config.js';

const key = '__luxora_mongo_connection';

/** Cached promise survives Next.js hot reload. Failed connects can be retried. */
export async function connectMongo() {
  const config = getDatabaseConfig();
  if (config.mode !== 'mongodb') throw new Error('Set MONGODB_URI before using MongoDB.');
  if (mongoose.connection.readyState === 1 && mongoose.connection.name === config.name) return mongoose.connection;
  if (!globalThis[key]) {
    globalThis[key] = mongoose.connect(config.uri, {
      dbName: config.name,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 6500,
      socketTimeoutMS: 12000
    }).then(()=>mongoose.connection).catch(error=>{
      globalThis[key] = null;
      throw new Error(`MongoDB connection failed: ${error.message}`);
    });
  }
  return globalThis[key];
}

export async function getGridFsBucket() {
  const connection = await connectMongo();
  return new GridFSBucket(connection.db, { bucketName: 'property_media', chunkSizeBytes: 255 * 1024 });
}

export async function getDatabaseStatus() {
  const config = getDatabaseConfig();
  if (config.mode === 'local') return {mode:'local',connected:true,database:'local JSON demo',persistentAcrossRestarts:true,durableDatabase:false};
  const connection = await connectMongo();
  await connection.db.admin().ping();
  return {mode:'mongodb',connected:true,database:connection.name,persistentAcrossRestarts:true,durableDatabase:true};
}
