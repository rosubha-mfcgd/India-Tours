import React, { useEffect,useState,useContext } from "react"; 
import  { useNavigate } from "react-router-dom"; 
import '../../styles/TripDetails.css';
import '../../styles/loginsignup.css';
import SideBarNotification from '../navigationTabs/sideBarNotification';
import { NavContext } from '../navigationContext/navigationContext';
import { getImageById } from "../admin/admin";
import OperatorReviews from "../modal/operatorReview";
import plus from '../Assets/images/plus.png';
import { Pressable, Text,  Alert,View, Image,  StyleSheet, ScrollView } from 'react-native';
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
    CircularProgress,
    CardMedia,
    CardContent
  } from "@mui/material";
  //Shows the complete details of the trip
  const TripDetails = ({tourDetails,triggerDisplayOptionsByCatId,openBookingForm,
    cityList,access_token,triggerEditBookingForm}) =>{

  const navigate = useNavigate();

  const [image,setImage] = useState(null);

  const[showReview, setShowReview] = useState(true);
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
    
      function removeNextLineCharacterFromString(mixedString)
      {
       // This targets both \r and \n, and collapses multiple back-to-back newlines into a single space
        const cleanString = mixedString.replace(/\n/g, " ");

        console.log(cleanString);
        // Output: "Line1 Line2 Line3"
        return cleanString;
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
        const { notification,loading, setLoading} = useContext(NavContext);
      
        useEffect(()=>{
           async function getTourImage() {
                let imageData = await getImageFromFileId(tourDetails.image.fileId,'tourImages');
                if(imageData)
                {
                  setImage(imageData);
                  setLoading(false);
                }
          }
          if(!image){
            setLoading(true);
              getTourImage();
          }
        },[]);
        



    return (
     
  
        <div>
      
        {loading ?
          <div>
           <Box
            sx={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             minHeight: '100vh', // Optional: Centers vertically within the viewport
                           }}
                         >
                           <CircularProgress/>
                          </Box>
                          </div>:
        
        
        image &&
            <div className="div-align-center">
        
         
      <CardMedia
        component="img"
        style={{ height: "200px",width: "350px" , objectFit: 'cover', // or 'contain'
    objectPosition: 'center',
    display: 'block',
    margin: '0 auto'}}
    image={image}
        alt={tourDetails.locationName}
      />
           <Grid 
  container 
  columnSpacing={1}
  justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
  >
            <Grid item xs={6}>
                     <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.description}
                         </Typography>
                 </Grid>
                 </Grid>
                 <Grid 
  container 
  columnSpacing={1}
  justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
   >
                     <Grid item xs={6}>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                          This tour is operated by :- <strong>{tourDetails.tourManagerName}</strong>
                      </Typography>
                   </Grid>
                   </Grid>
                   <Grid 
  container 
  columnSpacing={1}
  justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
  >
                  <Grid item xs={6}>
            <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                Operator Contact :- <strong>{tourDetails.contact}</strong>
             </Typography>
             </Grid>
             </Grid>
             <Grid 
  container 
  columnSpacing={1} 
  justifyContent="center" 
  alignItems="center"     
  >
             <Grid item xs={6}>
             
             <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                    Operator secondary Contact :- {tourDetails.secondarycontact}
             </Typography>
             </Grid>   
             </Grid>          
                 <Grid 
  container 
  columnSpacing={1} 
  justifyContent="center"  
  alignItems="center"
  style={{ minHeight: '10vh' }}      
  >
   <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        LocationName   
                        </Typography>
                       </Grid>
                         <Grid item xs={6}>
                          <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                          <strong>{tourDetails.locationName}</strong>    
                          </Typography>
                     </Grid>
                       <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Length 
                        </Typography>  
                     </Grid>
                      <Grid item xs={6}>
                          <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                          <strong>{tourDetails.triplength}</strong>    
                          </Typography>
                      </Grid>
                       
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Trip Type
                        </Typography>  
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        <strong> {tourDetails.domesticOrInternational}  </strong>
                        </Typography>  
                    </Grid>
                    </Grid>
                    <Grid 
  container 
  columnSpacing={1}
 justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
 >
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       Start Date
                        </Typography>  
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        <strong> {changeDateToWords(new Date(tourDetails.startDate))}</strong>  
                        </Typography>  
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       End Date
                        </Typography>  
                    </Grid>
                               
                    <Grid item xs={6}>
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        <strong> {changeDateToWords(new Date(tourDetails.endDate))}</strong>  
                        </Typography>  
                   </Grid>
            </Grid>
<Grid 
  container 
  columnSpacing={1}
  justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
  style={{ minHeight: '10vh' }} 
  >
                     <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Package Cost/person
                        </Typography>   
                    </Grid>
                       <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       <strong>{tourDetails.currency} {tourDetails.package_cost}</strong> 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Max Tourist
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                       <strong>{tourDetails.max_tourist}</strong> 
                        </Typography>
                    </Grid>
                     <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                        Seats left    
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                          <strong>{tourDetails.seats_left}</strong>    
                        </Typography>
                   </Grid>
</Grid>

<Grid 
  container 
  columnSpacing={1}
  justifyContent="center"  /* Centers horizontally */
  alignItems="center"      /* Centers vertically */
       
 >

                   <Grid >
                        <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                      Itinerary Details: 
                        </Typography>  
                         <Typography variant="body2" style={{ color: '#FFFFFF' }}>
                           {tourDetails.itinerary.split('\n').map((line,index)=>(
                          <p key={index}><strong>{removeNextLineCharacterFromString(line)}</strong></p>
                      ))}    
                        </Typography> 
                    </Grid>
                     
                     {/* <Grid item xs={6}>
                           <Image
                                    style={{
                                  borderColor: 'red',
                                  borderWidth: 0,
                                  height: 40,
                                  width: 40,
                                }}
                                    source={plus} id="add" 
                                    />
                    </Grid> */}
                  </Grid>
                 
                  <div className = "center-container" style={{
                    width: "fit-content",
                    margin: "auto",
                  }}>
            {
              showReview ? 
                <OperatorReviews isOpen={showReview} onClose={() => setShowReview(false)} 
                tourManagerId={tourDetails.tourManagerId} 
                tourManagerName = {tourDetails.tourManagerName}
                />:<div/>
            }        
       
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

                         <button type="submit" 
                       class="button" 
                       onClick={()=>triggerEditBookingForm(tourDetails)}>Edit your Booking</button>

                        <button type="submit" 
                       class="button" 
                       onClick={()=>setShowReview(true)}>Check Reviews</button>
              </div>

         </div>
      
        </div> 
        
           

                    {notification &&
                                <div style={{position: 'fixed', top:70,right:0}} >    
                                <SideBarNotification/> 
                             </div> 
                    }
            </div>
                            }
                     
        </div>
        
       
    );
  }

  export default TripDetails;