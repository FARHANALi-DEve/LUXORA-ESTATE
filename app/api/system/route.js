import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../lib/auth.js';
import {getDatabaseStatus} from '../../../lib/mongodb.js';
export const runtime='nodejs';
export const dynamic='force-dynamic';
/** Authentication is mandatory; do not expose database names or availability publicly. */
export async function GET(){
  if(!await requireAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
  try{return NextResponse.json(await getDatabaseStatus(),{headers:{'Cache-Control':'no-store'}});}
  catch{return NextResponse.json({connected:false,error:'Database unavailable. Check the server configuration.'},{status:503,headers:{'Cache-Control':'no-store'}});}
}
