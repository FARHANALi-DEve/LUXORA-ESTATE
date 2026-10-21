'use client';
import dynamic from 'next/dynamic';
import {useEffect,useRef,useState} from 'react';
const HeroArchitecture=dynamic(()=>import('./HeroArchitecture.jsx'),{ssr:false,loading:()=>null});
export default function HeroStage(){
 const anchor=useRef(null);
 const [visible,setVisible]=useState(false);
 const [supported,setSupported]=useState(null);
 useEffect(()=>{
  try{const canvas=document.createElement('canvas');setSupported(Boolean(canvas.getContext('webgl2')));}catch{setSupported(false);}
  if(!anchor.current)return;
  if(!('IntersectionObserver' in window)){setVisible(true);return;}
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'250px 0px'});
  observer.observe(anchor.current);
  return()=>observer.disconnect();
 },[]);
 return <div ref={anchor} className="luxora-hero-stage">
  {supported===false?<img className="hero-3d-fallback" src="/villa-fallback.svg" alt="Architectural villa preview"/>:visible&&supported===true?<HeroArchitecture/>:null}
 </div>;
}
