import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
export default function NotFound(){return <section className="not-found"><span className="eyebrow dark">NOT FOUND / 404</span><h1>Let's find a<br/><em>different path.</em></h1><p>The page you're looking for isn't here.</p><Link href="/properties" className="button-dark">Explore residences <ArrowUpRight size={18}/></Link></section>}
