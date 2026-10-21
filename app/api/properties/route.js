import { NextResponse } from 'next/server';
import { listProperties,addProperty } from '../../../lib/store.js';
import { requireAdmin } from '../../../lib/auth.js';
import { validateProperty } from '../../../lib/validate.js';
import { classifyError } from '../../../lib/api-errors.js';
export const dynamic='force-dynamic';
export async function GET(){try{return NextResponse.json({properties:await listProperties()});}catch(e){const x=classifyError(e,503);return NextResponse.json({error:x.message},{status:x.status});}}
export async function POST(request){
  if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
  try{const r=validateProperty(await request.json());if(r.error)return NextResponse.json({error:r.error},{status:400});const property=await addProperty(r.value);return NextResponse.json({property},{status:201});}
  catch(e){const x=classifyError(e,500);return NextResponse.json({error:x.message},{status:x.status});}
}
