import { NextResponse } from 'next/server';
import { login } from '../../../../lib/auth.js';
const attempts = new Map();
export async function POST(request){
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'local';
  const now=Date.now();const r=attempts.get(ip)||{count:0,reset:now+15*60*1000};if(now>r.reset){r.count=0;r.reset=now+15*60*1000;}
  if(r.count>=8)return NextResponse.json({error:'Too many attempts. Try again in 15 minutes.'},{status:429});
  try{const {email,password}=await request.json();const ok=await login(email,password);if(!ok){r.count++;attempts.set(ip,r);return NextResponse.json({error:'Incorrect credentials'},{status:401});}attempts.delete(ip);return NextResponse.json({ok:true});}
  catch(e){return NextResponse.json({error:e.message},{status:503});}
}
