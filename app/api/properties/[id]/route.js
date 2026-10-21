import { NextResponse } from 'next/server';
import { editProperty,removeProperty } from '../../../../lib/store.js';
import { requireAdmin } from '../../../../lib/auth.js';
import { validateProperty } from '../../../../lib/validate.js';
import { classifyError } from '../../../../lib/api-errors.js';
export const dynamic='force-dynamic';
export async function PUT(request,{params}){
  if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
  try{const {id}=await params;const r=validateProperty(await request.json());if(r.error)return NextResponse.json({error:r.error},{status:400});const property=await editProperty(id,r.value);return property?NextResponse.json({property}):NextResponse.json({error:'Not found'},{status:404});}
  catch(e){const x=classifyError(e,500);return NextResponse.json({error:x.message},{status:x.status});}
}
export async function DELETE(request,{params}){
  if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
  try{const {id}=await params;const deleted=await removeProperty(id);return deleted?NextResponse.json({ok:true}):NextResponse.json({error:'Not found'},{status:404});}
  catch(e){const x=classifyError(e,500);return NextResponse.json({error:x.message},{status:x.status});}
}
