'use client';
import {useEffect} from 'react';
import Link from 'next/link';
import {RefreshCw,ArrowUpRight} from 'lucide-react';
export default function ErrorPage({error,reset}) {
  useEffect(()=>{console.error('LUXORA page error',error);},[error]);
  return <section className="site-error-screen" role="alert">
    <div><span className="eyebrow light"><span className="small-dot"/> TEMPORARILY UNAVAILABLE</span>
      <h1>An unexpected<br/><em>interruption.</em></h1>
      <p>We could not load the collection right now. Your requests were not silently replaced with sample data. Please try again, or contact the team.</p>
      <div className="site-error-actions"><button className="button-light" onClick={()=>reset()}><RefreshCw size={16}/> Try again</button><Link href="/contact" className="hero-text-link">Contact us <ArrowUpRight size={17}/></Link></div>
    </div>
  </section>;
}
