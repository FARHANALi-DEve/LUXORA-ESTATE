export function cleanText(s, limit = 500) {
  return typeof s === 'string' ? s.trim().slice(0, limit) : '';
}
export const VIEWING_TIME_SLOTS = ['Morning (09:00–12:00)', 'Afternoon', 'Evening (17:00–20:00)'];
export function validImageURL(url) { return typeof url === 'string' && (/^https:\/\/[^\s"'<>]+$/i.test(url) || /^\/uploads\/[a-f0-9-]+\.(jpe?g|png|webp)$/i.test(url) || /^\/api\/media\/[a-f0-9]{24}$/i.test(url)); }
export function isValidISODate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T12:00:00.000Z`);
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0,10) === value;
}
export function validateInquiry(raw = {}, now = new Date()) {
  const name = cleanText(raw.name, 90);
  const email = cleanText(raw.email, 160).toLowerCase();
  const message = cleanText(raw.message, 3000);
  const property = cleanText(raw.property, 160);
  const phone = cleanText(raw.phone, 40);
  const requestType = raw.requestType === 'Viewing' ? 'Viewing' : 'Inquiry';
  const viewingDate = cleanText(raw.viewingDate, 10);
  const viewingTime = cleanText(raw.viewingTime, 60);
  if (name.length < 2) return { error: 'Enter your full name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.' };
  if (message.length < 10) return { error: 'Your message needs at least 10 characters.' };
  if (requestType === 'Viewing') {
    if (!isValidISODate(viewingDate)) return {error:'Choose a valid date for your viewing.'};
    const day = now.getFullYear().toString()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
    if (viewingDate <= day) return {error:'Choose a future date for your viewing.'};
    if (!VIEWING_TIME_SLOTS.includes(viewingTime)) return {error:'Choose a viewing time slot.'};
    if (!property) return {error:'Choose a residence for your viewing.'};
  }
  return { value: { name, email, phone, property, message, requestType, viewingDate: requestType === 'Viewing' ? viewingDate : '', viewingTime: requestType === 'Viewing' ? viewingTime : '', status: 'New', createdAt: now.toISOString() } };
}
export function validateProperty(raw = {}) {
  const name = cleanText(raw.name, 130);
  const city = cleanText(raw.city, 90);
  const location = cleanText(raw.location, 140);
  const price = Number(raw.price);
  const beds = Number(raw.beds), baths = Number(raw.baths), area = Number(raw.area);
  const image = cleanText(raw.image, 1200);
  if (!name || !city || !location) return { error: 'Name, city and neighborhood are required.' };
  if (![price,beds,baths,area].every(Number.isFinite) || price <= 0 || beds < 0 || baths < 0 || area <= 0) return { error: 'Enter valid property measurements and price.' };
  if (!validImageURL(image)) return { error: 'Image must be an HTTPS URL or an uploaded image.' };
  const slug = cleanText(raw.slug || name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''), 140);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: 'Invalid slug.' };
  return { value: {
    slug, name, city, location, country: cleanText(raw.country, 75), price, beds, baths, area,
    category: cleanText(raw.category || 'Villa', 40), tag: cleanText(raw.tag || 'New listing', 100),
    image, gallery: Array.isArray(raw.gallery) ? raw.gallery.filter(validImageURL).slice(0, 8) : [],
    description: cleanText(raw.description, 3000),
    features: Array.isArray(raw.features) ? raw.features.map(x=>cleanText(x,70)).filter(Boolean).slice(0, 20) : [],
    featured: raw.featured === true, status: ['Available','Reserved','Sold'].includes(raw.status) ? raw.status : 'Available'
  } };
}
export function formatPrice(price) {
  if (!Number.isFinite(Number(price))) return 'On request';
  return '$' + Number(price).toLocaleString('en-US');
}
