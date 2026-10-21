'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,CheckCircle2,CalendarDays,MessageCircle} from 'lucide-react';
import {VIEWING_TIME_SLOTS} from '../lib/validate.js';
const empty=(property)=>({name:'',email:'',phone:'',message:property?`I would like to learn more about ${property}.`:'',website:'',requestType:'Inquiry',viewingDate:'',viewingTime:''});
function minViewingDate(){const d=new Date();d.setDate(d.getDate()+1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export default function InquiryForm({property='',heading='Start a conversation',compact=false,allowViewing=false}){
  const [values,setValues]=useState(()=>empty(property));
  const [status,setStatus]=useState('idle');
  const [error,setError]=useState('');
  const minDate=useMemo(minViewingDate,[]);
  const viewing=allowViewing&&values.requestType==='Viewing';
  const update=(key,value)=>setValues(previous=>({...previous,[key]:value}));
  async function submit(e){
    e.preventDefault();setStatus('loading');setError('');
    try{
      const r=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,property})});
      const data=await r.json();
      if(!r.ok)throw new Error(data.error||'Could not save your request. Please try again.');
      setStatus('success');setValues(empty(property));
    }catch(err){setError(err.message);setStatus('idle');}
  }
  if(status==='success')return <div className="success-message" role="status"><CheckCircle2 size={42}/><h3>Request received.</h3><p>We've saved your {allowViewing?'message or private viewing request':'inquiry'} in the management inbox. Viewing dates are requests, not confirmed appointments. No email is sent in demo mode.</p><button onClick={()=>setStatus('idle')} className="text-link" type="button">Send another request ↗</button></div>;
  return <form onSubmit={submit} className={`inquiry-form ${compact?'inquiry-form-compact':''}`}>
    {heading&&<h3>{heading}</h3>}
    {allowViewing&&<fieldset className="contact-intent"><legend>How can we help?</legend><div className="intent-options"><label className={values.requestType==='Inquiry'?'selected':''}><input type="radio" name="intent" checked={!viewing} onChange={()=>update('requestType','Inquiry')}/><MessageCircle size={16}/> Ask a question</label><label className={viewing?'selected':''}><input type="radio" name="intent" checked={viewing} onChange={()=>update('requestType','Viewing')}/><CalendarDays size={16}/> Request a viewing</label></div></fieldset>}
    <div className="form-row"><label>Your name *<input required minLength={2} maxLength={90} autoComplete="name" placeholder="Full name" value={values.name} onChange={e=>update('name',e.target.value)}/></label><label>Email address *<input required type="email" maxLength={160} autoComplete="email" placeholder="name@example.com" value={values.email} onChange={e=>update('email',e.target.value)}/></label></div>
    <label>Phone number <input type="tel" maxLength={40} autoComplete="tel" placeholder="+1 (555) 000-0000" value={values.phone} onChange={e=>update('phone',e.target.value)}/></label>
    {viewing&&<div className="form-row viewing-fields"><label>Preferred date *<input type="date" required min={minDate} value={values.viewingDate} onChange={e=>update('viewingDate',e.target.value)}/></label><label>Preferred time *<select required value={values.viewingTime} onChange={e=>update('viewingTime',e.target.value)}><option value="">Select a time window</option>{VIEWING_TIME_SLOTS.map(slot=><option key={slot} value={slot}>{slot}</option>)}</select></label></div>}
    <label>{viewing?'Additional notes *':'Tell us what you are looking for *'}<textarea required minLength={10} maxLength={3000} rows={compact?3:5} placeholder="I'd love to learn more about..." value={values.message} onChange={e=>update('message',e.target.value)}/></label>
    <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={values.website} onChange={e=>update('website',e.target.value)}/>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <button className="button-dark form-submit" type="submit" disabled={status==='loading'}>{status==='loading'?'Saving request…':viewing?'Request a viewing':'Send an inquiry'}<ArrowUpRight size={18}/></button>
    <p className="form-privacy">We only use your details to respond. Preferred viewing times are subject to confirmation.</p>
  </form>;
}
