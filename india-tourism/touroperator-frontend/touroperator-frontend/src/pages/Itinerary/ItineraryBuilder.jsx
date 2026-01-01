import React, { useState } from 'react';
import { createItinerary, getItineraries, updateItinerary, deleteItinerary }  from '../../apiconfig/itineraryApi';
import { TextField, Button, Typography } from '@mui/material';
export default function ItineraryBuilder(){
  const [form, setForm] = useState({ locationName:'', categoryID:1, tourManagerId:'', startDate:'', endDate:'', itinerary:[] });
  const [dayText, setDayText] = useState('');
  const addDay = ()=>{ if(!dayText) return; setForm({...form, itinerary:[...form.itinerary, { day: form.itinerary.length+1, plan: dayText }] }); setDayText(''); };
  const submit = async ()=>{ await createItinerary(form); alert('Itinerary saved'); setForm({ locationName:'', categoryID:1, tourManagerId:'', startDate:'', endDate:'', itinerary:[] }); };
  return (
    <div>
      <Typography variant="h5">Itinerary Builder</Typography>
      <TextField label="Location" value={form.locationName} onChange={e=>setForm({...form, locationName:e.target.value})} />
      <div style={{marginTop:8}} />
      <TextField label="Add day plan" value={dayText} onChange={e=>setDayText(e.target.value)} />
      <Button onClick={addDay} sx={{ml:2}}>Add Day</Button>
      <div style={{marginTop:10}}>
        {form.itinerary.map(d=> <div key={d.day} className="card">Day {d.day}: {d.plan}</div>)}
      </div>
      <Button variant="contained" onClick={submit} sx={{mt:2}}>Save Itinerary</Button>
    </div>
  );
}
