import mongoose from 'mongoose';
import {Readable} from 'node:stream';
import {getGridFsBucket} from '../../../../lib/mongodb.js';

export const runtime='nodejs';
export const dynamic='force-dynamic';
/** Public read access is intentional; media IDs are random and contain only images. */
export async function GET(request,{params}){
  const {id}=await params;
  if(!/^[a-f0-9]{24}$/i.test(id))return Response.json({error:'Not found'},{status:404});
  try {
    const bucket=await getGridFsBucket();
    const fileId=new mongoose.Types.ObjectId(id);
    const file=await bucket.find({_id:fileId}).next();
    if(!file)return Response.json({error:'Not found'},{status:404});
    const mime=file.metadata?.contentType;
    if(!['image/jpeg','image/png','image/webp'].includes(mime))return Response.json({error:'Invalid media type'},{status:415});
    const download=bucket.openDownloadStream(fileId);
    return new Response(Readable.toWeb(download),{headers:{
      'Content-Type':mime,
      'Content-Length':String(file.length),
      'Cache-Control':'public, max-age=31536000, immutable',
      'X-Content-Type-Options':'nosniff',
      'Content-Disposition':'inline'
    }});
  }catch{return Response.json({error:'Media unavailable'},{status:503});}
}
