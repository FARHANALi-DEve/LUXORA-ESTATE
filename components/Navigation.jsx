'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
export default function Navigation(){
  const pathname=usePathname();const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const handler=()=>setScrolled(window.scrollY>35);handler();window.addEventListener('scroll',handler,{passive:true});return()=>window.removeEventListener('scroll',handler);},[]);
  useEffect(()=>setOpen(false),[pathname]);
  const links=[['Residences','/properties'],['3D experience','/experience'],['Our story','/about'],['Contact','/contact']];
  return <>
    <header className={`site-header ${pathname==='/'&&!scrolled?'site-header-transparent':''} ${scrolled?'site-header-scrolled':''}`}>
      <Link className="brand" href="/" aria-label="Luxora Estate homepage"><span className="brand-symbol" aria-hidden="true"><span/><span/><span/></span><span>LUXORA<span className="brand-sub">E S T A T E</span></span></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([name,href])=><Link key={href} href={href} className={pathname===href?'nav-active':''}>{name}</Link>)}</nav>
      <div className="header-actions"><Link href="/contact" className="nav-cta">Private consultation <ArrowUpRight size={16}/></Link><button className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X size={24}/>:<Menu size={24}/>}</button></div>
    </header>
    <div className={`mobile-menu ${open?'mobile-menu-open':''}`} aria-hidden={!open}><nav aria-label="Mobile navigation">{links.map(([label,href],i)=><Link key={href} href={href} tabIndex={open?0:-1}><span className="menu-num">0{i+1}</span>{label}<ArrowUpRight size={25}/></Link>)}<Link href="/admin" tabIndex={open?0:-1}><span className="menu-num">05</span>Owner access<ArrowUpRight size={25}/></Link></nav><span className="mobile-menu-foot">CURATED SPACES. CONSIDERED LIVING.</span></div>
  </>;
}
