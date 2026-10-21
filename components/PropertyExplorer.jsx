'use client';
import {useMemo,useState,useEffect} from 'react';
import {Search,SlidersHorizontal,ArrowUpRight,X} from 'lucide-react';
import PropertyCard from './PropertyCard.jsx';
import {applyPropertyFilters,PROPERTY_SORT_OPTIONS} from '../lib/property-filters.js';
export default function PropertyExplorer({initial=[]}){
  const [properties,setProperties]=useState(initial),[search,setSearch]=useState(''),[city,setCity]=useState('All locations'),[type,setType]=useState('All types'),[price,setPrice]=useState('Any price'),[sort,setSort]=useState('Featured first'),[loading,setLoading]=useState(initial.length===0);
  useEffect(()=>{let active=true;fetch('/api/properties').then(r=>r.json()).then(data=>{if(active&&data.properties)setProperties(data.properties);}).catch(()=>{}).finally(()=>{if(active)setLoading(false)});return()=>{active=false};},[]);
  const cities=useMemo(()=>['All locations',...new Set(properties.map(p=>p.city).filter(Boolean))].sort((a,b)=>a==='All locations'?-1:b==='All locations'?1:a.localeCompare(b)),[properties]);
  const types=useMemo(()=>['All types',...new Set(properties.map(p=>p.category).filter(Boolean))],[properties]);
  const results=useMemo(()=>applyPropertyFilters(properties,{search,city,type,price,sort}),[properties,search,city,type,price,sort]);
  const reset=()=>{setSearch('');setCity('All locations');setType('All types');setPrice('Any price');setSort('Featured first');};
  return <div><div className="filter-bar"><label className="filter-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search destinations or residences" aria-label="Search properties"/></label>
    <label className="filter-select"><span className="sr-only">Location</span><select value={city} onChange={e=>setCity(e.target.value)}>{cities.map(c=><option key={c}>{c}</option>)}</select></label>
    <label className="filter-select"><span className="sr-only">Property type</span><select value={type} onChange={e=>setType(e.target.value)}>{types.map(c=><option key={c}>{c}</option>)}</select></label>
    <label className="filter-select"><span className="sr-only">Price range</span><select value={price} onChange={e=>setPrice(e.target.value)}>{['Any price','Under $5M','$5M – $10M','Over $10M'].map(c=><option key={c}>{c}</option>)}</select></label>
  </div><div className="results-top"><span><SlidersHorizontal size={15}/> {results.length} {results.length===1?'residence':'residences'} in the collection</span><div className="results-actions"><label className="sort-control">Sort by <select aria-label="Sort residences" value={sort} onChange={e=>setSort(e.target.value)}>{PROPERTY_SORT_OPTIONS.map(item=><option key={item}>{item}</option>)}</select></label><button onClick={reset}>Clear filters <X size={15}/></button></div></div>
  {results.length?<div className="property-grid">{results.map((p,i)=><PropertyCard key={p.id||p.slug} property={p} index={i}/>)}</div>:<div className="no-results"><h3>{loading?'Loading residences…':'No residences found'}</h3><p>Try another destination or adjust your filters.</p><button className="button-dark" onClick={reset}>Reset your search <ArrowUpRight size={16}/></button></div>}
  </div>;
}
