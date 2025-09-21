import React, { useEffect,useState } from "react";  

import '../../styles/loginsignup.css';
import { getTripList,getTourManagers } from "../admin/admin";
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
  import FavoriteIcon from '@mui/icons-material/Favorite';
const TripList = ({access_token,categoryId,showDetails}) =>{
    
   console.log('categoryID is...',categoryId); 
    const[tours,setTours] = useState('');
    const[tourDetails,setTourDetails] = useState('');//combined state variable holding info from tours and tour managers
   const [ tourManagers, setTourManagers] = useState('');
    // const { name,email,mobile,categoryId} = location.state || {};
    //const[mount,setMount] = useState(false);
   
   console.log('categoryId...',categoryId);

    const [tourMgrMap, setTourMgrMap] = useState(new Map());
    const tourManagerMap = new Map(tourMgrMap);
    const updateTourMgrMap = (key,value) => {
       
        tourManagerMap.set(key,value);
        setTourMgrMap(tourManagerMap);
    }

     function getValuesFromTourManagerMap(key) {
       
        return tourManagerMap.get(key);
        
    }

   
    function changeDateToWords(dateObject)
     {
        const date = new Date(dateObject);
        console.log('date....',date)
        console.log('formatted date...', date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
        return date.toLocaleDateString('en-GB');
    }
  
       const getTripListByCategoryId = async (categoryId) =>{
                       console.log('categoryId...',categoryId);
                       let tourOps = '';
                        if(!tourManagers)
                        {
                             tourOps = await getTourManagers();
                        }
                            if(tourOps)
                            {
                                console.log('tourOps...',tourOps);
                                tourOps.map((tourManager) =>{
                                    updateTourMgrMap(tourManager.tourManagerId,
                                        {"tourManagerName":tourManager.tourManagerName,
                                          "contact" : tourManager.contact,
                                          "secondarycontact":tourManager.backupcontact,
                                          "citycode":tourManager.citycode,
                                          "desc": tourManager.desc,
                                          "website":tourManager.website
                                        });
                                }
                            );
                        }else{
                            console.log('Could not find tour managers');
                        }
                      
                          let plannedTours = await getTripList(categoryId);
      
                          if(plannedTours)
                          {
                              console.log('plannedTours...',plannedTours);
                              setTours(plannedTours);
                          }
                }
                    if(tours === '')
                    {
                        getTripListByCategoryId(categoryId);
                    }
                
      
    return(
        
        <div>
           
           
             <div className="navbar-grid">
        <nav className="navbar">
            <Grid container spacing={10} justify="center" width="70%">
             {tours && tours.length>0 ?

                tours.map((tour) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={4}  key={tour.categoryID}>

                    <Card className="card">
                    
                    <CardMedia component= "img"  height="100"
                    image = {tour.image} alt={tour.desc} 
                    onClick={()=>showDetails(tour,access_token)}
                    style={{ cursor: 'pointer' }}
                    />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" >
                {tour.categoryName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tour.locationName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {changeDateToWords(tour.startDate)} - {changeDateToWords(tour.endDate)}
              </Typography>

               <Typography variant="body2" color="text.secondary">
                {getValuesFromTourManagerMap(tour.tourManagerId).tourManagerName}
              </Typography>
                    <Typography variant="body2" color="text.secondary">
                 {getValuesFromTourManagerMap(tour.tourManagerId).contact}
              </Typography>
                <FavoriteIcon sx={{ color: '#ece2e2ff' }} />
              </CardContent>
                    </Card>
                </Grid>
                
                </div>
                ))
                :<div>Cannot load Tour details</div>
                
             }
             </Grid>
             </nav>
             </div>
             </div>
        )
}
export default TripList;


