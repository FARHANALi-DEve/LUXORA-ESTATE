import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../lib/auth.js';
import {getDatabaseConfig} from '../../../lib/database-config.js';
import {getGridFsBucket} from '../../../lib/mongodb.js';
import {classifyError} from '../../../lib/api-errors.js';
import {randomUUID} from 'node:crypto';
import {promises as fs} from 'node:fs';
import path from 'node:path';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const extensions={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
function validSignature(bytes,type) {
  if(type==='image/jpeg')return bytes.length>=3 && bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
  if(type==='image/png')return bytes.length>=8&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if(type==='image/webp')return bytes.length>=12&&bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';
  return false;
}
export async function POST(request) {
  if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
  try {
    const form=await request.formData();
    const file=form.get('file');
    if(!file||typeof file.arrayBuffer!=='function')return NextResponse.json({error:'Select an image.'},{status:400});
    if(!extensions[file.type]||file.size<=0||file.size>5*1024*1024)return NextResponse.json({error:'Only JPG, PNG or WebP under 5 MB.'},{status:400});
    const bytes=Buffer.from(await file.arrayBuffer());
    if(!validSignature(bytes,file.type))return NextResponse.json({error:'Invalid image file.'},{status:400});
    if(getDatabaseConfig().mode==='mongodb'){
      const bucket=await getGridFsBucket();
      const stream=bucket.openUploadStream(randomUUID()+'.'+extensions[file.type],{metadata:{contentType:file.type}});
      await new Promise((resolve,reject)=>{stream.once('finish',resolve);stream.once('error',reject);stream.end(bytes);});
      return NextResponse.json({url:'/api/media/'+String(stream.id)});
    }
    const filename=randomUUID()+'.'+extensions[file.type];
    const dest=path.join(process.cwd(),'public','uploads');
    await fs.mkdir(dest,{recursive:true});
    await fs.writeFile(path.join(dest,filename),bytes,{flag:'wx'});
    return NextResponse.json({url:'/uploads/'+filename});
  } catch(error) {
    const result=classifyError(error,500);return NextResponse.json({error:result.message},{status:result.status});
  }
}
