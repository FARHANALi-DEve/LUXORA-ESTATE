'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
const VillaScene=dynamic(()=>import('./VillaScene.jsx'),{ssr:false,loading:()=><div className="villa-loading" aria-live="polite">Preparing the live 3D experience…</div>});
export default function VillaExperience(){
 const element=useRef(null);const [near,setNear]=useState(false);
 useEffect(()=>{
  if(!element.current)return;
  if(!('IntersectionObserver' in window)){setNear(true);return;}
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setNear(true);observer.disconnect();}},{rootMargin:'450px 0px'});
  observer.observe(element.current);return()=>observer.disconnect();
 },[]);
 return <div ref={element} className="luxora-lazy-stage">{near?<VillaScene/>:<div className="villa-loading" aria-label="3D tour loads when in view">Scroll here to load the interactive architectural tour</div>}</div>;
}
