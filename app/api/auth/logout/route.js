import {NextResponse} from 'next/server';
import {logout} from '../../../../lib/auth.js';
export async function POST(){await logout();return NextResponse.json({ok:true});}
