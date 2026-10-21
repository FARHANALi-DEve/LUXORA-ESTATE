import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'node:crypto';
const cookieName = 'luxora_admin';
const secret = () => {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error('Configure AUTH_SECRET with at least 32 characters.');
  return new TextEncoder().encode(value);
};
export function safePasswordMatch(a,b) {
  const x=Buffer.from(typeof a==='string'?a:''); const y=Buffer.from(typeof b==='string'?b:'');
  return x.length > 0 && x.length === y.length && timingSafeEqual(x,y);
}
export function adminConfigured() { return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET?.length>=32); }
export async function login(email,password) {
  if(!adminConfigured()) throw new Error('Admin login is not configured. See .env.example.');
  if(String(email).trim().toLowerCase()!==process.env.ADMIN_EMAIL.trim().toLowerCase()||!safePasswordMatch(password,process.env.ADMIN_PASSWORD))return false;
  const token=await new SignJWT({role:'admin'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('12h').sign(secret());
  (await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:60*60*12,path:'/'});
  return true;
}
export async function requireAdmin() {
  try { const token=(await cookies()).get(cookieName)?.value; if(!token)return false; const {payload}=await jwtVerify(token,secret());return payload.role==='admin'; }
  catch { return false; }
}
export async function logout() { (await cookies()).delete(cookieName); }
