import React, { useState } from 'react';
import { createPayment } from '../../apiconfig/paymentsApi';
import { TextField, Button, Typography } from '@mui/material';
export default function Checkout(){
  const [form, setForm] = useState({ name:'', cardNumber:'', amount:0 });
  const [status, setStatus] = useState(null);
  const pay = async ()=>{ setStatus('processing'); const res = await createPayment(form); setStatus(res.data.status); alert('Payment '+res.data.status); };
  return (
    <div>
      <Typography variant="h5">Checkout (Mock)</Typography>
      <TextField label="Name on Card" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <TextField label="Card Number" value={form.cardNumber} onChange={e=>setForm({...form, cardNumber:e.target.value})} />
      <TextField label="Amount" type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
      <Button variant="contained" onClick={pay} sx={{mt:2}}>Pay</Button>
      {status && <div style={{marginTop:10}}>Status: {status}</div>}
    </div>
  );
}
