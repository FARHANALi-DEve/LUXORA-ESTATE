'use client';
import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {MathUtils} from 'three';

// The entire property is actual WebGL geometry, not a flat photo or CSS transform.
// All dimensions below are in a consistent conceptual metre scale.
const palette={stone:'#e8e2d6',chalk:'#f3efe6',limestone:'#c5bba8',wood:'#8a6043',charcoal:'#252e2d',bronze:'#a58d64',grass:'#677660',water:'#3b939a'};
function Solid({position=[0,0,0],size=[1,1,1],color=palette.stone,metalness=0,roughness=.78,...props}){
 return <mesh castShadow receiveShadow position={position} {...props}><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/></mesh>;
}
function Glass({position,size,color='#89b6b5',opacity=.29}){
 return <mesh position={position} receiveShadow><boxGeometry args={size}/><meshPhysicalMaterial color={color} roughness={.045} metalness={.24} transparent opacity={opacity} side={2} depthWrite={false}/></mesh>;
}
function Planter({x,z,size=1}){
 return <group position={[x,0,z]} scale={size}>
  <Solid position={[0,.1,0]} size={[.76,.32,.76]} color="#b4ac9a"/>
  <mesh castShadow position={[0,.65,0]}><cylinderGeometry args={[.055,.11,.95,7]}/><meshStandardMaterial color="#574536"/></mesh>
  {[[-.27,.98,0],[.24,1.04,.13],[0,1.34,0]].map(([a,b,c],i)=><mesh key={i} castShadow position={[a,b,c]}><icosahedronGeometry args={[i===2?.5:.37,1]}/><meshStandardMaterial color={i===1?'#6a8166':'#4a685a'} roughness={1}/></mesh>)}
 </group>;
}
function Furniture({upper=false}){
 return upper?<group>
  <Solid position={[-2.6,.18,-1.7]} size={[2.8,.36,1.9]} color="#cfbc9d"/>
  <Solid position={[-2.6,.53,-2.45]} size={[2.8,.65,.28]} color="#bca889"/>
  <Solid position={[-2.6,.28,-.67]} size={[2.6,.08,.15]} color="#8c684e"/>
  <Solid position={[1.45,.34,-1.35]} size={[2.4,.72,1.2]} color="#a68c71"/>
  <Solid position={[1.45,.74,-1.35]} size={[2.1,.12,1.05]} color="#e2ded0"/>
  <Solid position={[.1,.37,-2.45]} size={[.14,.75,.14]} color="#736452"/>
  <mesh position={[.1,.88,-2.45]}><sphereGeometry args={[.27,14,10]}/><meshStandardMaterial color="#dfc992" emissive="#bb8748" emissiveIntensity={.25}/></mesh>
 </group>:<group>
  <Solid position={[-2,.3,-1.35]} size={[2.25,.48,.75]} color="#b9a58a"/>
  <Solid position={[-2,.57,-1.72]} size={[2.25,.79,.2]} color="#b9a58a"/>
  <Solid position={[-2.9,.58,-1.35]} size={[.22,.64,.85]} color="#b9a58a"/>
  <Solid position={[-.25,.24,-1.25]} size={[1.17,.12,.77]} color="#80644c"/>
  <Solid position={[-.25,-.02,-1.25]} size={[.13,.46,.13]} color="#49423a"/>
  {[-1.5,-.5,.5].map(x=><Solid key={x} position={[x,.56,-3.02]} size={[.1,1.05,.11]} color="#bd9b77"/>)}
  <Solid position={[2.9,.4,-1.65]} size={[1.6,.87,.68]} color="#84725f"/>
 </group>;
}
function WindowFrames({xStart=-4.6,xEnd=3.9,yBottom=.4,yTop=2.5,z=1.05,spacing=1.35}){
 const count=Math.round((xEnd-xStart)/spacing);
 return <group>
  <Glass position={[(xStart+xEnd)/2,(yTop+yBottom)/2,z]} size={[xEnd-xStart,yTop-yBottom,.07]}/>
  <Solid position={[(xStart+xEnd)/2,yTop,z+.04]} size={[xEnd-xStart+.1,.10,.14]} color={palette.charcoal}/>
  <Solid position={[(xStart+xEnd)/2,yBottom,z+.04]} size={[xEnd-xStart+.1,.09,.14]} color={palette.charcoal}/>
  {Array.from({length:count+1},(_,i)=><Solid key={i} position={[xStart+(xEnd-xStart)*i/count,(yTop+yBottom)/2,z+.05]} size={[.065,yTop-yBottom,.15]} color={palette.charcoal}/>)}
 </group>;
}
function LowerFloor({selected,onSelect,exploded}){
 const facade=useRef();const ceiling=useRef();
 useFrame((_,delta)=>{if(facade.current)facade.current.position.z=MathUtils.damp(facade.current.position.z,exploded?4.2:0,3.4,delta);if(ceiling.current)ceiling.current.position.x=MathUtils.damp(ceiling.current.position.x,exploded?-10.3:0,2.7,delta);});
 return <group onClick={e=>{e.stopPropagation();onSelect?.('ground')}}>
  <Solid position={[0,.08,-.7]} size={[10.7,.24,6.45]} color="#e0d7c5"/>
  <Solid position={[0,.32,-3.82]} size={[10.5,.55,.26]} color={palette.limestone}/>
  <Solid position={[-5.28,1.56,-.7]} size={[.25,2.85,6.15]} color={palette.stone}/>
  <Solid position={[5.28,1.56,-.7]} size={[.25,2.85,6.15]} color={palette.stone}/>
  <Solid position={[0,1.58,-3.77]} size={[10.45,2.87,.25]} color="#d5ccbc"/>
  <group ref={ceiling}><Solid position={[-.02,2.95,-.8]} size={[10.8,.22,6.5]} color="#f2ede1"/></group>
  <group ref={facade}>
  <WindowFrames/>
  <Solid position={[4.5,1.55,1.07]} size={[1.25,2.55,.14]} color="#9b7b54"/>
  {Array.from({length:10},(_,i)=><Solid key={i} position={[4.01+i*.104,1.54,1.2]} size={[.045,2.4,.09]} color={i%2?'#c8a679':'#72563e'}/>)}
  </group>
  <Furniture/>
  {selected==='ground'&&<mesh position={[0,.23,-.7]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[10.25,6]}/><meshBasicMaterial color="#e9bf7c" transparent opacity={.17} depthWrite={false}/></mesh>}
  {/* Left side entry stairs and feature walls */}
  {[0,1,2,3].map((i)=><Solid key={i} position={[-5.57-i*.29,.03+i*.085,2.55]} size={[.31,.15+i*.06,1.5]} color="#ddd5c7"/>)}
  {[-4.7,-4.1,-3.5].map(x=><Solid key={x} position={[x,1.5,-3.53]} size={[.07,2.5,.19]} color={palette.wood}/>)}
 </group>;
}
function UpperFloor({onSelect,selected,exploded}){
 const facade=useRef();
 useFrame((_,delta)=>{if(facade.current)facade.current.position.x=MathUtils.damp(facade.current.position.x,exploded?6.2:0,3.2,delta);});
 return <group onClick={e=>{e.stopPropagation();onSelect?.('upper')}}>
  {/* Floating second floor with furniture and recessed glass */}
  <Solid position={[-.23,3.12,-.98]} size={[10.05,.23,5.5]} color="#e4d8c7"/>
  <Furniture upper/>
  <Solid position={[-5.22,4.31,-.9]} size={[.24,2.42,5.55]} color="#e5ddcf"/>
  <Solid position={[4.75,4.3,-.9]} size={[.24,2.44,5.55]} color="#e5ddcf"/>
  <Solid position={[-.2,4.34,-3.62]} size={[9.95,2.45,.22]} color="#c1b29e"/>
  <group ref={facade}>
  <WindowFrames xStart={-5.05} xEnd={4.62} yBottom={3.34} yTop={5.38} z={1.76} spacing={1.22}/>
  {/* Dark wood cube projecting in front of the upper wing */}
  <Solid position={[2.7,4.25,1.91]} size={[3.5,2.25,.35]} color="#695741"/>
  {Array.from({length:19},(_,i)=><Solid key={i} position={[1.05+i*.18,4.27,2.13]} size={[.045,2.15,.09]} color={i%3===0?'#b58e68':'#876448'}/>)}
  <Glass position={[-2.2,4.35,1.84]} size={[4.72,1.84,.1]} opacity={.33}/>
  <Solid position={[-.22,3.15,2.15]} size={[9.9,.12,.94]} color="#e5ded1"/>
  {/* Frameless glass balcony rail and slim handrail */}
  <Glass position={[-.5,3.73,2.53]} size={[8.8,1.04,.055]} opacity={.19}/>
  <Solid position={[-.5,4.24,2.54]} size={[8.82,.035,.06]} color="#626c68" metalness={.75}/>
  </group>
  {selected==='upper'&&<mesh position={[-.2,3.26,-.98]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[9.75,5.2]}/><meshBasicMaterial color="#e9bf7c" transparent opacity={.2} depthWrite={false}/></mesh>}
 </group>;
}
function Roof(){return <group>
 <Solid position={[-.23,5.61,-.98]} size={[10.65,.32,6.25]} color="#f0ebe1"/>
 <Solid position={[-.23,5.83,-.99]} size={[10.92,.12,6.53]} color="#d9d1c4"/>
 <Solid position={[3.54,5.97,-.85]} size={[2.25,.13,3.1]} color="#3b4540" metalness={.3}/>
 <Solid position={[-3.8,5.96,-2.8]} size={[1.3,.13,.7]} color="#e5e0d2"/>
 {/* Solar modules with distinct reflective slits */}
 {[-1.5,-.5,.5].map((x,i)=><Solid key={i} position={[x+2.95,6.044,-.72]} size={[.014,.014,2.75]} color="#93b5a6"/>)}
 </group>}
function PoolWater(){
 const ref=useRef();
 useFrame(({clock})=>{if(ref.current){ref.current.position.y=.245+Math.sin(clock.elapsedTime*1.8)*.007;ref.current.rotation.z=Math.sin(clock.elapsedTime*.72)*.001;}});
 return <mesh ref={ref} position={[2.05,.245,4.08]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.55,2.33]}/><meshPhysicalMaterial color={palette.water} metalness={.3} roughness={.12} transparent opacity={.92}/></mesh>;
}
function Landscape(){return <group>
  <Solid position={[0,-.5,.0]} size={[17,.85,12]} color="#7d8874"/>
  <Solid position={[0,-.055,.0]} size={[16.8,.12,11.8]} color="#8c9c80"/>
  <Solid position={[0,.01,4.38]} size={[15.1,.18,2.9]} color="#d4c7b6"/>
  {/* Pool: translucent surface + dark cavity and tile edge */}
  <Solid position={[2.05,.11,4.08]} size={[7.95,.14,2.72]} color="#f6efe2"/>
  <Solid position={[2.05,.16,4.08]} size={[7.62,.14,2.4]} color="#204a4c"/>
  <PoolWater/>
  {[0,1,2,3,4,5,6,7,8].map(i=><Solid key={i} position={[-7.5+i*.47,.08,4.1]} size={[.37,.17,2.1]} color={i%2?'#dbd2c1':'#cfc4b1'}/>)}
  {/* Outdoor lounge */}
  {[[-5.3,3.0],[-3.75,3.0]].map(([x,z],i)=><group key={i}>
   <Solid position={[x,.29,z]} size={[1.25,.12,2.1]} color="#ded9cb"/>
   <Solid position={[x,.22,z+.75]} size={[1.25,.17,.24]} color="#b3b7a8"/>
   {[x-.52,x+.52].map(xx=><Solid key={xx} position={[xx,.14,z-.5]} size={[.07,.24,.72]} color="#6b716a"/>)}
  </group>)}
  <Planter x={-7} z={-3} size={1.5}/><Planter x={6.6} z={-3.8} size={1.55}/><Planter x={6.8} z={2.6} size={.8}/>
  {[-3.7,-2.6,-1.5,-.4,.7,1.8,2.9].map(z=><Solid key={z} position={[7.7,.25,z]} size={[.18,.5,.5]} color="#bdc2aa"/>)}
  <Solid position={[0,-.38,-5.85]} size={[17,.11,.35]} color="#595e52"/>
 </group>}
export function ArchitecturalModel({exploded=false,onSelect,selected='all',animated=true}){
 const upper=useRef();const roof=useRef();const root=useRef();
 useFrame(({clock},delta)=>{
   if(upper.current)upper.current.position.y=MathUtils.damp(upper.current.position.y,exploded?2.15:0,3.0,delta);
  if(roof.current)roof.current.position.y=MathUtils.damp(roof.current.position.y,exploded?4.3:0,2.6,delta);
  if(root.current)root.current.rotation.y=MathUtils.damp(root.current.rotation.y,selected==='pool'?.09:0,1.3,delta);
 });
 return <group ref={root}>
  <Landscape/>
  <LowerFloor onSelect={onSelect} selected={selected} exploded={exploded}/>
  <group ref={upper}><UpperFloor onSelect={onSelect} selected={selected} exploded={exploded}/></group>
  <group ref={roof}><Roof/></group>
  {/* Upper/roof separate meshes let you see inside when the model is exploded. */}
 </group>;
}
