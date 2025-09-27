import React, { useContext, useEffect,useState } from "react";  

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
    CardContent,
    IconButton
  } from "@mui/material";
 import MenuIcon from '@mui/icons-material/Menu'; // Or any other icon
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import SideBarForSorting from '../navigationTabs/sideBarForSorting.jsx';
  import { NavContext } from '../navigationContext/navigationContext.jsx';
const TripList = ({access_token,categoryId,cityList,showDetails}) =>{
    
   console.log('categoryID is...',categoryId); 
    const[tours,setTours] = useState('');
    const[alltours,setAlltours] = useState('');
    //combined state variable holding info from tours and tour managers
   const [ tourManagers, setTourManagers] = useState('');
    // const { name,email,mobile,categoryId} = location.state || {};
    //const[mount,setMount] = useState(false);
    const[isOpen,setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const {triggerSorting,sortTrip} = useContext(NavContext);
   const open = Boolean(anchorEl);

   function toggleSideBarForSorting()
{
  console.log('isOpen',isOpen)
  setOpen(!isOpen);
  triggerSorting(!isOpen);
}
   console.log('categoryId...',categoryId);

    const [tourMgrMap, setTourMgrMap] = useState(new Map());
    const [selectedValue, setSelectedValue] = useState('B');

    const tourManagerMap = new Map(tourMgrMap);
    
    const updateTourMgrMap = (key,value) => {
       
        tourManagerMap.set(key,value);
        setTourMgrMap(tourManagerMap);
    }

     function getValuesFromTourManagerMap(key) {
       console.log('tourMgrMap...',tourMgrMap)
        return tourMgrMap.get(key);
        
    }

    function getCityOfTourOperator(citycode){
        console.log('city code...',citycode)
        console.log('city List...',cityList)
        for(let city of cityList){
            console.log('citycode...',citycode);
            if(city.citycode === citycode)
            {
                return city.desc;
            }
        }
        return "";
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
                                          "tourOpLocation": getCityOfTourOperator(tourManager.citycode),
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
                              setAlltours(plannedTours);
                          }
                }
                if(tours === '')
                {
                    getTripListByCategoryId(categoryId);
                }
         useEffect(()=>{
            const selectedTours = [];
            console.log('alltours in useEffect...',alltours)
                
                //console.log('selectedValue in useEffect...',selectedValue)
                    if(tours)
                    {
                        if(selectedValue === 'I' || selectedValue === 'D'){
                        for(let tour of alltours)
                        {
                            
                              //  console.log('tour....',tour);
                            if(tour.domesticOrinternational === selectedValue)
                            {
                                selectedTours.push(tour);
                                
                            }
                        }
                        }else if(selectedValue === 'B'){
                            console.log('selectedTours....',selectedTours)
                             for(let tour of alltours)
                            {
                            selectedTours.push(tour);
                             }
                         }
                         
                         setTours(selectedTours);
                         console.log('tours....',tours)
                    } 
                
             },
             [selectedValue]);       
      
    return(
        
        <div sx={{ display: 'flex',justifyContent:'flex-end'}}>
           
           
             <div className="navbar-grid">
        <nav className="navbar">
            <Grid container spacing={10} justify="center" width="70%">
             {tours && tours.length>0 ?

                tours.map((tour) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={4}  key={tour.categoryID}>

                    <Card className="card" onClick={()=>showDetails(tour,getValuesFromTourManagerMap(tour.tourManagerId),
                        access_token)} style={{ cursor: 'pointer' }}>
                    
                    <CardMedia component= "img"  height="100"
                    image = {tour.image} alt={tour.desc} 
                                      
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
              <Typography variant="body2" color="text.secondary">
                 {getValuesFromTourManagerMap(tour.tourManagerId).tourOpLocation}
              </Typography>
                 <button type="submit" class="button"  onClick={()=>showDetails(tour,getValuesFromTourManagerMap(tour.tourManagerId))} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                       Details</button>
              </CardContent>
                    </Card>
                </Grid>
                
               
                </div>
                ))
                :<div>Cannot load Tour details</div>
                
             }
             <Box  sx={{position: 'fixed', top: '10', right: '0'
             }}>
                 <IconButton
      aria-label="menu"
       aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={(event) => {
        setAnchorEl(event.currentTarget)
        
      }}
        >
     
      <MenuIcon onClick={()=>toggleSideBarForSorting()}/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </IconButton>
   
            </Box>
            {
            sortTrip ? 
            <div style={{position: 'fixed', top:70,right:0}} >
                <SideBarForSorting selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
            </div>:<div></div>
           }
             </Grid>
              
             </nav>
             </div>
             </div>
        )
}
export default TripList;


