'use client';
import {useEffect,useRef} from 'react';
export default function Reveal({children,className='',delay=0}){
  const ref=useRef(null);
  useEffect(()=>{let ctx;let cleanup=false;
    async function run(){if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const el=ref.current;if(!el)return;
      const {gsap}=await import('gsap');const {ScrollTrigger}=await import('gsap/ScrollTrigger');if(cleanup)return;
      gsap.registerPlugin(ScrollTrigger);ctx=gsap.context(()=>gsap.fromTo(el,{y:36,opacity:0},{y:0,opacity:1,duration:1.05,delay,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 93%',once:true}}),el);
    }run();return()=>{cleanup=true;ctx?.revert();};
  },[delay]);return <div ref={ref} className={className}>{children}</div>;
}
