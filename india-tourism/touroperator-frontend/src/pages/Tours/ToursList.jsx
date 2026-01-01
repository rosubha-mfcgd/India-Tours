import React, { useEffect, useState } from 'react';
import { getTours, deleteTour } from '../../apiconfig/tourApi';
import { Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
export default function ToursList(){
  const [tours, setTours] = useState([]);
  useEffect(()=>{ load(); },[]);
  const load = async ()=>{ try{ const res = await getTours(); setTours(res.data); }catch(e){ console.error(e); } };
  const handleDelete = async (id)=>{ if(!window.confirm('Delete tour?')) return; await deleteTour(id); load(); };
  return (
    <div>
      <Typography variant="h4" gutterBottom> Tours </Typography>
      <Button component={RouterLink} to="/tours/new" variant="contained" sx={{ mb:2 }}>Create Tour</Button>
      <Grid container spacing={2}>
        {tours.map(t=>(
          <Grid item xs={12} md={6} key={t._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{t.locationName} — {t.triplength}</Typography>
                <Typography variant="body2">{t.desc?.substring(0,140)}</Typography>
                <Typography variant="caption">{new Date(t.startDate).toLocaleDateString()} - {new Date(t.endDate).toLocaleDateString()}</Typography>
                <div style={{marginTop:10}}>
                  <Button size="small" component={RouterLink} to={`/tours/${t._id}`} >View</Button>
                  <Button size="small" component={RouterLink} to={`/tours/edit/${t._id}`}>Edit</Button>
                  <Button size="small" color="error" onClick={()=>handleDelete(t._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
