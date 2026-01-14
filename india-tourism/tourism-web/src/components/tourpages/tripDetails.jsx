import React, { useEffect,useState,useContext } from "react"; 
import  { useNavigate } from "react-router-dom"; 
import '../../styles/TripDetails.css';
import '../../styles/loginsignup.css';
import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
import { NavContext } from '../navigationContext/navigationContext.jsx';
import { getImageById } from "../admin/admin";
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
//Shows the complete details of the trip
  const TripDetails = ({tourDetails,triggerDisplayOptionsByCatId,openBookingForm,cityList,access_token}) =>{

  const navigate = useNavigate();

  const [image,setImage] = useState(null);
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
        console.log('formatted date...', 
          date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
        return date.toLocaleDateString('en-GB');
    }
     const getImageFromFileId = async(data,bucketname) =>{
                if(data != null){
                  
                    let imageData = await getImageById(data,bucketname);
                    if(imageData){
                       return imageData;
                    }
                }
        }
        const detailFlds = getFieldsForTripDetailsScreen();
        console.log('tourDetails...',tourDetails);
        const { notification} = useContext(NavContext);
      
        useEffect(()=>{
           async function getTourImage() {
            let imageData = await getImageFromFileId(tourDetails.image.fileId,'tourImages');
            if(imageData)
            {
              setImage(imageData);
            }
          }
          if(!image){
              getTourImage();
          }
        },[]);
        



    return (
     
        <div style={{ display: 'flex', flexDirection: 'column', 
        justifycontent: 'center',
        alignitems: 'center',
        gap: '20px' }}>
        <div className="grid-container">
      <div className="grid-item">
        <Grid item xs = {10} sm={4}></Grid>
      </div>
        {image ?
            <div className="grid-item">
            <Grid item xs = {10} sm={4}>
              
                 <Card className="card">
                    <CardMedia
        component="img"
        style={{ height: "200px",width: "350px" }}
        image={image}
        alt={tourDetails.locationName}
      />
           </Card>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.description}
                         </Typography>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                          This tour is operated by :- <strong>{tourDetails.tourManagerName}</strong>
                         </Typography>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                Operator Contact :- <strong>{tourDetails.contact}</strong>
             </Typography>
             <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                    Operator secondary Contact :- {tourDetails.secondarycontact}
             </Typography>

              
                <div>
                    <TableContainer sx={{boxShadow: 'none'}}>
                 <Table>
                    <TableBody>
                       
                        <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        LocationName : <strong>{tourDetails.locationName}</strong>    
                        </Typography>
                    </TableCell>
                    </TableRow>
                   
                    <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Length : <strong> {tourDetails.triplength}  </strong>
                        </Typography>  
                    </TableCell>

                    </TableRow>
                     <TableRow>
                    <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Type : <strong> {tourDetails.domesticOrInternational}  </strong>
                        </Typography>  
                    </TableCell>
                    
                    </TableRow>
                   
                      <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Start Date : <strong> {changeDateToWords(new Date(tourDetails.startDate))}</strong>  
                        </Typography>  
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       End Date : <strong>{changeDateToWords(new Date(tourDetails.endDate))}</strong>    
                        </Typography>
                    </TableCell>
                      </TableRow>
                      <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Package Cost/person: <strong>{tourDetails.currency} {tourDetails.package_cost}</strong> 
                        </Typography>   
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Max Tourist: <strong> {tourDetails.max_tourist}</strong>    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        Seats left: <strong>{tourDetails.seats_left}</strong>    
                        </Typography>
                    </TableCell>
                    </TableRow>
                    <TableRow>
                     <TableCell>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Itinerary Details: <strong>{tourDetails.itinerary} </strong>
                        </Typography>   
                    </TableCell>
                   </TableRow>
                  </TableBody>
                  </Table>
                  </TableContainer>
                  </div>
                  <div className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                  }}>
                    
       
          
          
        <div className="button-container">
         <div className='submit-container'>
                    <button type="submit" onClick={()=>{
                        triggerDisplayOptionsByCatId(tourDetails.categoryId)}}
                        class="button"
                        >Go Back</button>

                            <button type="submit" onClick={()=>{
                        openBookingForm(tourDetails)}}
                       class="button" 
                        >Book My Trip</button>

              </div>

         </div>
      
        </div> 
        
           
                 </Grid>
                    {notification ?
                                <div style={{position: 'fixed', top:70,right:0}} >    
                                <SideBarNotification/> 
                             </div> 
                             :<div></div>
                              }
            </div>:<div></div>
                            }
                     
        </div>
        
        </div>
    );
  }

  export default TripDetails;