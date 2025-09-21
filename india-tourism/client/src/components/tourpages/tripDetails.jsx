import React, { useEffect,useState } from "react"; 
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

  const TripDetails = (tourDetails,access_token) =>{

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
        const detailFlds = getFieldsForTripDetailsScreen();
        console.log('tourDetails...',tourDetails);
    return (
        <div className="grid-container">

            <div className="grid-item">
            <Grid item xs = {10} sm={4}>
                 <Card className="card">
                    <CardMedia
        component="img"
        style={{ height: "200px",width: "350px" }}
        image={tourDetails.tourDetails.image}
        alt={tourDetails.tourDetails.locationName}
      />
           </Card>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.tourDetails.desc}
                         </Typography>
                 </Grid>
            </div>
            <div className="grid-item">
                 <Grid item xs = {10} sm={4}>
                <TableContainer style={{width: "500px"}}>
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
                <TableContainer style={{width: "500 px"}}>
                 <Table>
                    <TableBody>
                       
                        <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.locationName}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.tourManagerName}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.triplength}  
                        </Typography>  
                    </TableCell>
                      </TableRow>
                    <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.contact}
                        </Typography>
                         
                    </TableCell>
                    </TableRow>
                   
                      <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.startDate}  
                        </Typography>  
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.endDate}    
                        </Typography>
                    </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.package_cost} 
                        </Typography>   
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.max_tourist}    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.ticket_cost} 
                        </Typography>   
                    </TableCell>
                   </TableRow>
                        
                     <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        {tourDetails.tourDetails.desc} 
                        </Typography>   
                    </TableCell>
                   </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </Grid>
                  </div>
                
        </div>
    );
  }

  export default TripDetails;