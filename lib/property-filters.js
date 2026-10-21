export const PROPERTY_SORT_OPTIONS = ['Featured first','Price: low to high','Price: high to low','Area: largest first'];
export function applyPropertyFilters(properties=[],filters={}) {
  const { search='',city='All locations',type='All types',price='Any price',sort='Featured first' }=filters;
  const q=String(search).trim().toLowerCase();
  const result=properties.filter(p=>{
    const matchSearch=(`${p.name} ${p.location} ${p.city} ${p.country}`).toLowerCase().includes(q);
    const matchCity=city==='All locations'||p.city===city;
    const matchType=type==='All types'||p.category===type;
    const matchPrice=price==='Any price'||(price==='Under $5M'?p.price<5000000:price==='$5M – $10M'?p.price>=5000000&&p.price<=10000000:p.price>10000000);
    return matchSearch && matchCity && matchType && matchPrice;
  });
  if(sort==='Price: low to high')result.sort((a,b)=>a.price-b.price);
  else if(sort==='Price: high to low')result.sort((a,b)=>b.price-a.price);
  else if(sort==='Area: largest first')result.sort((a,b)=>b.area-a.area);
  else result.sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured)));
  return result;
}
