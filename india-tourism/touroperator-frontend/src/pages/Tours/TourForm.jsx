import React, { useState, useEffect } from 'react';
import { createTour, getTour, updateTour } from '../../apiconfig/tourApi';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
export default function TourForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ locationName:'', categoryID:1, tourManagerId:'', triplength:'', startDate:'', endDate:'', package_cost:0, max_tourist:0, seats_left:0, domesticOrinternational:'D', ticket_cost:0, desc:'', image:'', itinerary:'' });
  useEffect(()=>{ if(id){ load(); } },[id]);
  const load = async ()=>{ const res = await getTour(id); setForm({...res.data}); };
  const submit = async (e)=>{ e.preventDefault(); if(id){ await updateTour(id, form); } else { await createTour(form); } navigate('/tours'); };
  return (
    <div>
      <Typography variant="h5">{id? 'Edit Tour':'Create Tour'}</Typography>
      <form onSubmit={submit} style={{display:'grid', gap:10, maxWidth:600}}>
        <TextField label="Location" value={form.locationName} onChange={e=>setForm({...form, locationName:e.target.value})} required />
        <TextField label="Trip length" value={form.triplength} onChange={e=>setForm({...form, triplength:e.target.value})} />
        <TextField label="Start Date" type="date" InputLabelProps={{shrink:true}} value={form.startDate ? form.startDate.substring(0,10):''} onChange={e=>setForm({...form, startDate:e.target.value})} />
        <TextField label="End Date" type="date" InputLabelProps={{shrink:true}} value={form.endDate ? form.endDate.substring(0,10):''} onChange={e=>setForm({...form, endDate:e.target.value})} />
        <TextField label="Package Cost" type="number" value={form.package_cost} onChange={e=>setForm({...form, package_cost:e.target.value})} />
        <TextField label="Seats Left" type="number" value={form.seats_left} onChange={e=>setForm({...form, seats_left:e.target.value})} />
        <TextField label="Description" multiline rows={4} value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} />
        <Button variant="contained" type="submit">Save</Button>
      </form>
    </div>
  );
}
