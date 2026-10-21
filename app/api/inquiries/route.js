import { NextResponse } from 'next/server';
import { addInquiry,listInquiries,setInquiryStatus,deleteInquiry } from '../../../lib/store.js';
import { requireAdmin } from '../../../lib/auth.js';
import { validateInquiry } from '../../../lib/validate.js';
import { classifyError } from '../../../lib/api-errors.js';
export const dynamic='force-dynamic';
export async function GET(){if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{return NextResponse.json({inquiries:await listInquiries()});}catch(e){const x=classifyError(e,503);return NextResponse.json({error:x.message},{status:x.status});}}
export async function POST(request){try{
  const raw=await request.json();if(raw.website)return NextResponse.json({ok:true}); // Honeypot.
  const {value,error}=validateInquiry(raw);if(error)return NextResponse.json({error},{status:400});
  await addInquiry(value);return NextResponse.json({ok:true},{status:201});
}catch(e){const x=classifyError(e,503);return NextResponse.json({error:x.message},{status:x.status});}}
export async function PATCH(request){if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const {id,status}=await request.json();if(!['New','Contacted','Closed'].includes(status))return NextResponse.json({error:'Invalid status'},{status:400});const ok=await setInquiryStatus(id,status);return NextResponse.json({ok},{status:ok?200:404});}catch(e){const x=classifyError(e,500);return NextResponse.json({error:x.message},{status:x.status});}}
export async function DELETE(request){if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const {id}=await request.json();const ok=await deleteInquiry(id);return NextResponse.json({ok},{status:ok?200:404});}catch(e){const x=classifyError(e,500);return NextResponse.json({error:x.message},{status:x.status});}}
