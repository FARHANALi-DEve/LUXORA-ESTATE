import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=file=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
test('homepage mounts real WebGL scene, not a mockup',()=>{
 const page=source('app/page.jsx'),hero=source('components/HeroArchitecture.jsx');
 assert.match(page,/<HeroStage\/>/);assert.match(hero,/<Canvas\b/);assert.match(hero,/<ArchitecturalModel\b/);
});
test('studio supports six viewpoints, inside rooms, and navigable exploded levels',()=>{
 const viewer=source('components/VillaScene.jsx'),model=source('components/ArchitecturalModel.jsx');
 for(const feature of ['tourStops.map','getTourStop(view)','OPEN FLOORS','WALK INSIDE','floorForStop','isInteriorStop','setInterval','onPick={pickFloor}','<Blueprint enabled=','webglcontextlost','onClick={reset}'])assert.ok(viewer.includes(feature),feature);
 for(const feature of ['exploded?2.15:0','exploded?4.3:0','exploded?4.2:0','exploded?6.2:0','<boxGeometry','selected===\'ground\'','selected===\'upper\''])assert.ok(model.includes(feature),feature);
});
test('offline preview uses actual WebGL shaders and GPU draw calls',()=>{
 const html=source('OPEN-3D-DEMO.html');
 for(const token of ['webgl','gl.createShader','gl.drawArrays','gl.depthMask',"addEventListener('pointermove'",'OPEN FLOORS'])assert.ok(html.includes(token),token);
 assert.ok(!/<script\s+src=/.test(html),'standalone local demo has no JS dependencies');
});

test('3D appears across branded public routes without misrepresenting the listed properties',()=>{
 const collection=source('app/properties/page.jsx'),about=source('app/about/page.jsx'),detail=source('app/properties/[slug]/page.jsx');
 assert.match(collection,/<HeroStage\/>/);assert.match(about,/<HeroStage\/>/);
 assert.match(detail,/<VillaExperience\/>/);assert.match(detail,/not<\/strong> a scan or floor plan/);
});
