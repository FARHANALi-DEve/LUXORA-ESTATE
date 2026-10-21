'use client';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {ArchitecturalModel} from './ArchitecturalModel.jsx';
import {useEffect,useState} from 'react';
export default function HeroArchitecture(){
 const [motion,setMotion]=useState(true);
 const [interactive,setInteractive]=useState(false);
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const precise=window.matchMedia('(pointer: fine)');
  const update=()=>{setMotion(!reduced.matches);setInteractive(precise.matches);};update();
  reduced.addEventListener?.('change',update);precise.addEventListener?.('change',update);
  return()=>{reduced.removeEventListener?.('change',update);precise.removeEventListener?.('change',update);};
 },[]);
 return <div className="luxora-hero-canvas" aria-label="Rotating interactive live 3D model of a fictional architectural residence">
  <Canvas camera={{position:[14,9,14.5],fov:39,near:.1,far:80}} dpr={[1,1.3]} gl={{alpha:true,antialias:true,powerPreference:'high-performance'}} shadows>
   <ambientLight intensity={1.7}/><hemisphereLight intensity={1.4} color="#fff5e7" groundColor="#425b4f"/>
   <directionalLight castShadow position={[8,12,5]} intensity={3.2} shadow-mapSize={[1024,1024]} shadow-camera-top={15} shadow-camera-bottom={-15} shadow-camera-left={-15} shadow-camera-right={15}/>
   <ArchitecturalModel animated={false}/>
   <OrbitControls makeDefault target={[0,2.3,0]} enablePan={false} enableZoom={false} enableRotate={interactive} autoRotate={motion} autoRotateSpeed={.36}/>
  </Canvas>
 </div>;
}
