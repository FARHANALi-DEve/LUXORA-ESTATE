import Link from 'next/link';
import { ArrowUpRight, BedDouble, Bath, Expand } from 'lucide-react';
import {formatPrice} from '../lib/validate.js';
export default function PropertyCard({property:p,index=0}){
  return <Link className="property-card" href={`/properties/${encodeURIComponent(p.slug)}`}>
    <div className="property-image-frame"><div className="property-cover" style={{backgroundImage:`url("${p.image}")`}}/><span className="property-top-tag">{p.tag||'Exclusive residence'}</span><span className="property-open-icon"><ArrowUpRight size={21}/></span><span className="property-image-count">0{index+1} / PRIVATE COLLECTION</span></div>
    <div className="property-info"><div><div className="property-location">{p.location}, {p.city}</div><h3>{p.name}</h3></div><span className="property-price">{formatPrice(p.price)}</span></div>
    <div className="property-meta"><span><BedDouble size={15}/>{p.beds} Beds</span><span><Bath size={15}/>{p.baths} Baths</span><span><Expand size={15}/>{Number(p.area).toLocaleString('en-US')} Sq. ft.</span></div>
  </Link>
}
