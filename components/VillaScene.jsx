'use client';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {OrbitControls,ContactShadows,Html} from '@react-three/drei';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {Vector3,MeshBasicMaterial} from 'three';
import {Maximize2,Minimize2,RotateCcw,Move3D,Sun,Moon,ScanLine,Pause,Play,Layers3,Eye,MapPin} from 'lucide-react';
import {ArchitecturalModel} from './ArchitecturalModel.jsx';
import {tourStops,getTourStop,nextTourStop,floorForStop,isInteriorStop} from '../lib/scene-tour.js';

function CameraDirector({view,controls}){
 const {camera}=useThree();
 const dest=useRef(new Vector3(...getTourStop('aerial').camera));
 const target=useRef(new Vector3(...getTourStop('aerial').target));
 const traveling=useRef(true);
 useEffect(()=>{
  const stop=getTourStop(view);
  dest.current.set(...stop.camera);target.current.set(...stop.target);traveling.current=true;
 },[view]);
 useFrame((_,delta)=>{
  if(!controls.current||!traveling.current)return;
  const factor=1-Math.exp(-delta*1.8);
  camera.position.lerp(dest.current,factor);
  controls.current.target.lerp(target.current,factor);
  const nextFov=getTourStop(view).fov;
  camera.fov+=(nextFov-camera.fov)*factor;
  camera.updateProjectionMatrix();
  controls.current.update();
  if(camera.position.distanceTo(dest.current)<.03 && controls.current.target.distanceTo(target.current)<.025 && Math.abs(camera.fov-nextFov)<.1)traveling.current=false;
 });
 return null;
}
function Blueprint({enabled}){
 const {scene}=useThree();
 const material=useMemo(()=>new MeshBasicMaterial({color:'#9bdde6',wireframe:true,transparent:true,opacity:.65}),[]);
 useEffect(()=>{scene.overrideMaterial=enabled?material:null;return()=>{scene.overrideMaterial=null};},[scene,enabled,material]);
 useEffect(()=>()=>material.dispose(),[material]);
 return null;
}
function FeaturePin({position,title,subtitle,onClick}){
 return <Html position={position} center distanceFactor={14} occlude={false} style={{pointerEvents:'auto'}}>
  <button type="button" className="building-pin" onClick={e=>{e.stopPropagation();onClick();}} aria-label={`Open ${title} in 3D`}>
   <span className="building-pin-dot">+</span><span className="building-pin-caption"><b>{title}</b><small>{subtitle}</small></span>
  </button>
 </Html>;
}
function World({autoRotate,timeOfDay,blueprint,exploded,view,selected,onPick,onInteract}){
 const controls=useRef();
 const dark=timeOfDay==='night';
 const inside=isInteriorStop(view);
 return <>
  <color attach="background" args={[blueprint?'#0a1e26':dark?'#171f2d':'#bfc4ba']}/>
  <fog attach="fog" args={[blueprint?'#0a1e26':dark?'#171f2d':'#bfc4ba',24,60]}/>
  <ambientLight intensity={dark?.48:1.45} color={dark?'#92b7da':'#fff7ea'}/>
  <hemisphereLight intensity={dark?.5:1.2} color={dark?'#a5b9dc':'#fff6d9'} groundColor="#586a5a"/>
  <directionalLight position={[6,13,10]} intensity={dark?1.1:3.15} color={dark?'#bec7ec':'#fff6e0'} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-15} shadow-camera-right={15} shadow-camera-top={15} shadow-camera-bottom={-15} shadow-normalBias={.04}/>
  <pointLight position={[-1.5,2.5,.9]} color="#ffdba5" intensity={dark?23:0} distance={10}/>
  <pointLight position={[1.8,4.3,1]} color="#f9d99b" intensity={dark?26:0} distance={10}/>
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.99,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color={blueprint?'#153039':dark?'#313c3b':'#929d8e'}/></mesh>
  {!inside&&!blueprint&&<ContactShadows position={[0,-.94,0]} opacity={dark?.24:.32} scale={24} blur={2.6} far={10}/>}
  <ArchitecturalModel exploded={exploded} selected={selected} onSelect={onPick}/>
  {!blueprint&&!inside&&<>
   <FeaturePin position={[-3.3,2.65,1.7]} title="GROUND LEVEL" subtitle="CLICK TO OPEN" onClick={()=>onPick('ground')}/>
   <FeaturePin position={[.1,5.32+(exploded?2.15:0),2.65]} title="UPPER LEVEL" subtitle="OPEN THE ARCHITECTURE" onClick={()=>onPick('upper')}/>
  </>}
  <OrbitControls ref={controls} makeDefault enablePan={false} enableZoom minDistance={inside?.35:7.3} maxDistance={inside?10:33} minPolarAngle={inside?.05:.14} maxPolarAngle={inside?Math.PI*.93:Math.PI*.48} autoRotate={autoRotate&&!inside&&!exploded} autoRotateSpeed={.43} target={[0,2.3,0]} onStart={onInteract} enableDamping dampingFactor={.075}/>
  <CameraDirector view={view} controls={controls}/>
  <Blueprint enabled={blueprint}/>
 </>;
}
const floorDetails={
 all:{number:'00',title:'The architectural study',detail:'Explore the whole residence, or open its shell to discover how each level is organized.'},
 ground:{number:'01',title:'Ground · living',detail:'A glass-fronted lounge, courtyard and seamless connection to the outdoor pool.'},
 upper:{number:'02',title:'Upper · private suite',detail:'An elevated bedroom retreat, study and balcony looking toward the gardens.'}
};
function WebGLFallback({onRetry}){
 return <div className="webgl-fallback" role="status">
  <img src="/villa-fallback.svg" alt="Illustrated view of the residence"/>
  <h3>WebGL2 is unavailable on this device</h3>
  <p>Try the latest Chrome, Edge or Safari with WebGL2 hardware acceleration enabled. You can still explore every listing.</p>
  <button className="webgl-retry" type="button" onClick={onRetry}>Retry interactive 3D <RotateCcw size={14}/></button>
 </div>;
}
export default function VillaScene(){
 const [supported,setSupported]=useState(null);
 const [version,setVersion]=useState(0);
 const [autoRotate,setAutoRotate]=useState(true);
 const [timeOfDay,setTimeOfDay]=useState('day');
 const [blueprint,setBlueprint]=useState(false);
 const [exploded,setExploded]=useState(false);
 const [view,setView]=useState('aerial');
 const [selected,setSelected]=useState('all');
 const [immersive,setImmersive]=useState(false);
 const [playing,setPlaying]=useState(false);
 const stop=getTourStop(view);
 useEffect(()=>{
  try{const c=document.createElement('canvas');setSupported(!!c.getContext('webgl2'));}catch{setSupported(false);}
 },[version]);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>{setAutoRotate(!media.matches);if(media.matches)setPlaying(false);};change();
  media.addEventListener?.('change',change);return()=>media.removeEventListener?.('change',change);
 },[]);
 useEffect(()=>{document.body.classList.toggle('luxora-tour-open',immersive);return()=>document.body.classList.remove('luxora-tour-open');},[immersive]);
 const changeView=useCallback(next=>{
  setView(next);setSelected(floorForStop(next));setExploded(false);setAutoRotate(false);
 },[]);
 const pickFloor=useCallback(floor=>{
  setSelected(floor);setExploded(true);setAutoRotate(false);setPlaying(false);
  setView(floor==='ground'?'facade':'terrace');
 },[]);
 const toggleExploded=useCallback(()=>{
  setExploded(old=>!old);setPlaying(false);setAutoRotate(false);setSelected('all');
  setView('facade');
 },[]);
 const reset=useCallback(()=>{
  setVersion(n=>n+1);setView('aerial');setExploded(false);setSelected('all');setBlueprint(false);setAutoRotate(false);setPlaying(false);setTimeOfDay('day');
 },[]);
 useEffect(()=>{
  if(!playing)return;
  const id=window.setInterval(()=>changeView(nextTourStop(view).id),5300);
  return()=>window.clearInterval(id);
 },[playing,view,changeView]);
 useEffect(()=>{
  const handler=e=>{
   if(e.target instanceof HTMLElement&&e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
   if(e.key==='Escape'){setImmersive(false);setPlaying(false);}
  };
  window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);
 },[]);
 const retry=()=>{setSupported(true);setVersion(n=>n+1);};
 return <div className={`villa-canvas-container luxora-3d-viewer${immersive?' is-immersive':''}`} aria-label="Interactive three-dimensional architecture viewer">
  <div className="villa-hud"><span className="scene-live-dot"/> LIVE 3D / WEBGL <span className="scene-hud-right">LUXORA — INTERACTIVE ARCHITECTURE / STUDY 001</span></div>
  {supported===true?<Canvas key={version} shadows camera={{position:getTourStop('aerial').camera,fov:39,near:.055,far:100}} dpr={[1,1.5]} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}} onCreated={({gl})=>{
    gl.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();setSupported(false);},{once:true});
   }} fallback={<WebGLFallback onRetry={retry}/>}>
    <World autoRotate={autoRotate} timeOfDay={timeOfDay} blueprint={blueprint} exploded={exploded} view={view} selected={selected} onPick={pickFloor} onInteract={()=>{setAutoRotate(false);setPlaying(false);}}/>
   </Canvas>:supported===false?<WebGLFallback onRetry={retry}/>:<div className="villa-loading" aria-live="polite">Initializing the 3D renderer…</div>}
  <div className="scene-top-actions"><button type="button" onClick={()=>setImmersive(v=>!v)} aria-label={immersive?'Exit immersive view':'Open full-screen immersive tour'}>{immersive?<Minimize2 size={15}/>:<Maximize2 size={15}/>}<span>{immersive?'EXIT TOUR':'FULL SCREEN'}</span></button></div>
  <div className="architectural-tour-nav" role="group" aria-label="Explore architectural camera positions">
   {tourStops.map(scene=><button type="button" key={scene.id} aria-pressed={view===scene.id} className={view===scene.id?'active':''} onClick={()=>{changeView(scene.id);setPlaying(false);}}><span>{scene.number} / {scene.title}</span><small>{scene.caption}</small></button>)}
  </div>
  <div className="floor-information">
   <span className="floor-tag">DISCOVER / {floorDetails[selected].number}</span>
   <h3>{isInteriorStop(view)?stop.title:floorDetails[selected].title}</h3>
   <p>{isInteriorStop(view)?'You are inside the 3D structure. Drag to look around, or continue the guided route.':floorDetails[selected].detail}</p>
   <div className="floor-buttons">
    <button type="button" className={!exploded&&!isInteriorStop(view)?'active':''} onClick={()=>{changeView('aerial');setPlaying(false);}}><Eye size={14}/> WHOLE HOME</button>
    <button type="button" className={exploded?'active':''} onClick={toggleExploded} aria-pressed={exploded}><Layers3 size={14}/> {exploded?'CLOSE FLOORS':'OPEN FLOORS'}</button>
    <button type="button" onClick={()=>{changeView('lounge');setPlaying(false);}}><MapPin size={14}/> WALK INSIDE</button>
   </div>
  </div>
  <div className="scene-toolbar" role="group" aria-label="3D scene controls">
   <button type="button" aria-pressed={timeOfDay==='day'} className={timeOfDay==='day'?'is-selected':''} onClick={()=>setTimeOfDay('day')}><Sun size={16}/> Day</button>
   <button type="button" aria-pressed={timeOfDay==='night'} className={timeOfDay==='night'?'is-selected':''} onClick={()=>setTimeOfDay('night')}><Moon size={16}/> Night</button>
   <button type="button" aria-pressed={blueprint} className={blueprint?'is-selected':''} onClick={()=>setBlueprint(v=>!v)}><ScanLine size={16}/> Wireframe</button>
   <button type="button" aria-pressed={playing} onClick={()=>{setPlaying(v=>!v);setAutoRotate(false);}}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'Stop tour':'Play tour'}</button>
   <button type="button" aria-pressed={autoRotate} onClick={()=>{setAutoRotate(v=>!v);setPlaying(false);}}><Move3D size={16}/> {autoRotate?'Pause orbit':'Auto orbit'}</button>
  </div>
  <div className="villa-canvas-bottom"><span><Move3D size={16}/> {isInteriorStop(view)?'INSIDE THE MODEL · DRAG TO LOOK AROUND':'DRAG TO ORBIT · PINCH TO ZOOM · CLICK THE BUILDING'}</span><button type="button" onClick={reset} className="scene-reset" title="Reset 3D camera" aria-label="Reset 3D camera"><RotateCcw size={16}/> RESET</button></div>
  <div className="scene-sr-status" aria-live="polite">{stop.title}. {exploded?'Building shell opened, floors separated.':'Building intact.'} {timeOfDay} mode.</div>
 </div>;
}
