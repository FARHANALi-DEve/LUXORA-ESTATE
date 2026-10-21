// Shared, testable camera choreography for LUXORA's WebGL architectural study.
// Values are conceptual model metres. The lounge and suite cameras are
// physically inside their respective floors, not an overhead "interior" pose.
export const tourStops = Object.freeze([
  {id:'aerial',number:'01',title:'The whole residence',caption:'AERIAL INTRODUCTION',camera:[13,10.2,16.5],target:[0,2.3,0],fov:39},
  {id:'facade',number:'02',title:'A sculpted silhouette',caption:'FRONT ELEVATION',camera:[2.2,4.7,18],target:[0,2.5,0],fov:39},
  {id:'pool',number:'03',title:'The pool and courtyard',caption:'POOL-SIDE APPROACH',camera:[10.5,3.6,11.5],target:[1,1.0,2.1],fov:40},
  {id:'lounge',number:'04',title:'Inside the living room',caption:'WALK INTO THE LOUNGE',camera:[-.7,1.68,.52],target:[-.9,1.55,-2.8],fov:68},
  {id:'suite',number:'05',title:'Inside the private suite',caption:'EXPLORE THE UPPER FLOOR',camera:[-2.05,4.2,.45],target:[-2.6,4.0,-2.4],fov:67},
  {id:'terrace',number:'06',title:'The terrace beyond',caption:'OVERLOOK THE GARDEN',camera:[3.4,4.0,5.7],target:[-.6,3.8,1.4],fov:55}
]);
export function getTourStop(id){return tourStops.find(stop=>stop.id===id)||tourStops[0]}
export function floorForStop(id){return id==='suite'?'upper':id==='lounge'?'ground':'all'}
export function isInteriorStop(id){return id==='lounge'||id==='suite'}
export function nextTourStop(id){const index=Math.max(0,tourStops.findIndex(stop=>stop.id===id));return tourStops[(index+1)%tourStops.length]}
