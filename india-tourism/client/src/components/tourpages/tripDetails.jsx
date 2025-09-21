import React, { useEffect,useState } from "react"; 
import  { useNavigate } from "react-router-dom"; 
import '../../styles/TripDetails.css';
import '../../styles/loginsignup.css';

 import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Modal,
    Box,
    Snackbar,
    Card,
    Grid,
    Typography,
    CardMedia,
    CardContent
  } from "@mui/material";

  const TripDetails = ({tourDetails,triggerDisplayTripsByCatId,access_token}) =>{

  const navigate = useNavigate();

        const goBack = () =>{
            navigate(-1);
        }
  
    function getFieldsForTripDetailsScreen(){

     let detailFields = process.env.REACT_APP_TRIP_DETAIL_FIELDS;
        console.log('detailFields...',process.env.REACT_APP_TRIP_DETAIL_FIELDS)
       // console.log('detailFields...',detailFields)
        if(detailFields)
            {
            let detailFieldArr = detailFields.split(",");
            return detailFieldArr;
            }
        }
        function changeDateToWords(dateObject)
     {
        const date = new Date(dateObject);
        console.log('date....',date)
        console.log('formatted date...', date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
        return date.toLocaleDateString('en-GB');
    }
        const detailFlds = getFieldsForTripDetailsScreen();
        console.log('tourDetails...',tourDetails);
    return (
        <div className="center-container" style={{ display: 'flex', flexDirection: 'column', 
        justifycontent: 'flex-end',
        gap: '20px' }}>
        <div className="grid-container">

            <div className="grid-item">
            <Grid item xs = {10} sm={4}>
                 <Card className="card">
                    <CardMedia
        component="img"
        style={{ height: "200px",width: "350px" }}
        image={tourDetails.image}
        alt={tourDetails.locationName}
      />
           </Card>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.desc}
                         </Typography>
                 </Grid>
            </div>
            <div className="grid-item">
                 <Grid item xs = {3} sm={2}>
                <TableContainer sx={{boxShadow: 'none'}}>
                 <Table>
                    <TableHead>
                        {
                           detailFlds &&  detailFlds.length>0 ?
                          detailFlds.map((details) =>(
                        <TableRow>
                    <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {details} :     
                        </Typography>
                    </TableCell>
                      </TableRow>
                        )):<div></div>
                    }
                   </TableHead>
                  </Table>
                </TableContainer>
                    </Grid>
            </div>
             <div className="grid-item">
                <Grid item xs = {6} sm={4}>
                <TableContainer sx={{boxShadow: 'none'}}>
                 <Table>
                    <TableBody>
                       
                        <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.locationName}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourManagerName}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                     <TableRow>
                      
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.contact}
                        </Typography>
                         
                    </TableCell>
                      </TableRow>
                    <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.triplength}  
                        </Typography>  
                    </TableCell>
                    </TableRow>
                   
                      <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {changeDateToWords(new Date(tourDetails.startDate))}  
                        </Typography>  
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {changeDateToWords(new Date(tourDetails.endDate))}    
                        </Typography>
                    </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.package_cost} 
                        </Typography>   
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.max_tourist}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.ticket_cost} 
                        </Typography>   
                    </TableCell>
                   </TableRow>
                        
                     <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.itinerary} 
                        </Typography>   
                    </TableCell>
                   </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </Grid>
                  </div>
                
        </div>
        
         <div className='submit-container'>
                    <button type="submit" onClick={()=>{
                        triggerDisplayTripsByCatId(tourDetails.categoryId)}}>Go Back</button>
        </div>
        
        </div>
    );
  }

  export default TripDetails;