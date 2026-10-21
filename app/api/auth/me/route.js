import {NextResponse} from 'next/server';
import {requireAdmin,adminConfigured} from '../../../../lib/auth.js';
export const dynamic='force-dynamic';
export async function GET(){return NextResponse.json({authenticated:await requireAdmin(),configured:adminConfigured()});}
