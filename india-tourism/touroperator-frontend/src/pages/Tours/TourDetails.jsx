import React, { useEffect, useState } from 'react';
import { getTour } from '../../apiconfig/tourApi';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, Card, CardContent, Button } from '@mui/material';
export default function TourDetails(){
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  useEffect(()=>{ if(id){ getTour(id).then(res=>setTour(res.data)); } },[id]);
  if(!tour) return <div>Loading...</div>;
  return (
    <Card sx={{p:2}}>
      <CardContent>
        <Typography variant="h4">{tour.locationName}</Typography>
        <Typography>{tour.desc}</Typography>
        <Typography sx={{mt:1}}>Dates: {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}</Typography>
        <Button component={RouterLink} to="/checkout" variant="contained" sx={{mt:2}}>Buy / Checkout</Button>
      </CardContent>
    </Card>
  );
}
