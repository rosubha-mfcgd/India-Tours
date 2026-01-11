import React, { useContext, useEffect,useState } from "react";  

import '../../styles/loginsignup.css';
import { getTripList,getTourManagers,getImageById } from "../admin/admin";

 import {
      Box,
     Card,
    Grid,
    Typography,
    CardMedia,
    CardContent,
    IconButton
  } from "@mui/material";
  
 import MenuIcon from '@mui/icons-material/Menu'; // Or any other icon

  import SideBarFilter from '../navigationTabs/sideBarFilter.jsx';
  import SideBarNotification from '../navigationTabs/sideBarNotification.jsx';
  import { NavContext } from '../navigationContext/navigationContext.jsx';
//Populate the list of planned trips
const TripList = ({access_token,categoryId,cityList,showDetails}) =>{
    
   //console.log('categoryID is...',categoryId); 
    const[tours,setTours] = useState([]);
    const[alltours,setAlltours] = useState([]);
    //combined state variable holding info from tours and tour managers
   const [ tourManagers, setTourManagers] = useState('');
    // const { name,email,mobile,categoryId} = location.state || {};
    //const[mount,setMount] = useState(false);
    const[isOpen,setOpen] = useState(false);
    const [images,setImages] = useState([]);
   const [anchorEl, setAnchorEl] = useState(null);
   const {triggerSorting,sortTrip} = useContext(NavContext);
    const { notification} = useContext(NavContext);
   
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
    const[priceValue, setPriceValue] = useState('100000');
    const [triplengthValue, setTriplengthValue] = useState('30');
    const [cityvalue, setCityvalue] = useState('0');  
   
    const tourManagerMap = new Map(tourMgrMap);
   
    const updateTourMgrMap = (key,value) => {
       
        tourManagerMap.set(key,value);
        setTourMgrMap(tourManagerMap);
    }

     function getValuesFromTourManagerMap(key) {
       console.log('tourMgrMap...',tourMgrMap)
        return tourMgrMap.get(key.toString());
        
    }

    function getCityOfTourOperator(citycode){
        console.log('city code...',citycode)
        console.log('city List...',cityList)
        for(let city of cityList){
            console.log('citycode...',citycode);
            if(city.citycode === citycode)
            {
                return city.cityname;
            }
        }
        return "";
    }
   
    const getImageFromFileId = async(data,bucketname) =>{
            if(data != null){
              
                let imageData = await getImageById(data,bucketname);
                if(imageData){
                    return imageData;
                }
            }
    }
    function changeDateToWords(dateObject)
     {
        const date = new Date(dateObject);
        console.log('date....',date)
        console.log('formatted date...', date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
        return date.toLocaleDateString('en-GB');
    }
   


   useEffect(()=>{
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
                                        {"tourManagerId":tourManager.tourManagerId,
                                        "tourManagerName":tourManager.tourManagerName,
                                          "contact" : tourManager.contact,
                                          "secondarycontact":tourManager.backupcontact,
                                          "citycode":tourManager.citycode,
                                          "tourOpLocation": getCityOfTourOperator(tourManager.citycode),
                                          "desc": tourManager.desc,
                                          "website":tourManager.website,
                                          "categoryId":categoryId
                                        });
                                }
                            );

                        }else{
                            console.log('Could not find tour managers');
                        }
                      
                          let plannedTours = await getTripList(categoryId);
      
                          if(plannedTours)
                          {
                            //populate images for each planned trip
                            for(let plannedTour of plannedTours)
                            {
                                  let imageData = await 
                              getImageFromFileId(plannedTour.image.fileId,'tourImages');
                                    if(imageData)
                                    {
                                        // images[category._id] = imageData;
                                        setImages(img=>[...img,imageData]);
                                    }
                            }

                              console.log('plannedTours...',plannedTours);
                              setTours(plannedTours);
                              setAlltours(plannedTours);
                          }
                        }
                if(tours.length===0)
                {
                    getTripListByCategoryId(categoryId);
                }
   },[]);
         useEffect(()=>{
            const selectedTours = [];
                // console.log('alltours in useEffect...',alltours)
                
               
                    if(tours.length === 0)
                    {
                         
                        if(selectedValue === 'International' || selectedValue === 'Domestic'){
                      
                        for(let tour of alltours)
                        {
                            let tripLength = (new Date(tour.endDate).getTime() - 
                            new Date(tour.startDate).getTime())/(24*3600*1000);
                                console.log('tripLength....',tripLength);
                            if(tour.tourType === selectedValue  && 
                                Number(tour.packageCost)<=(Number(priceValue)) && 
                            Number(tripLength)<=Number(triplengthValue) && (
                                tourManagerMap.get(tour.tourOperator._id) && 
                                ((tourManagerMap.get(tour.tourOperator._id)).citycode == cityvalue)||
                        (tourManagerMap.get(tour.tourManagerId).citycode == '0')
                        ))
                            {
                                selectedTours.push(tour);
                                
                            }
                           
                        }
                        
                        }else if(selectedValue === 'B'){
                            console.log('selectedTours....',selectedTours)
                             for(let tour of alltours)
                            {
                                 let tripLength = (new Date(tour.endDate).getTime() - 
                            new Date(tour.startDate).getTime())/(24*3600*1000);
                                if(Number(tour.packageCost)<=(Number(priceValue)) && 
                            Number(tripLength)<=Number(triplengthValue) && (tourManagerMap.get(tour.tourManagerId) && 
                            (tourManagerMap.get(tour.tourManagerId)).citycode == cityvalue)||
                        (tourManagerMap.get(tour.tourManagerId).citycode == '0'))
                        {
                                  selectedTours.push(tour);
                        }
                        }
                        }
                         
                         setTours(selectedTours);
                         console.log('tours....',tours)
                    } 
                
             },
             [selectedValue,priceValue,triplengthValue,cityvalue]); 
             
             
            
      
    return(
        
        <div sx={{ display: 'flex',justifyContent:'flex-end'}}>
           
           
             <div className="navbar-grid">
        <nav className="navbar">
            <Grid container spacing={10} justify="center" width="70%">
             {tours && tours.length>0 ?

                tours.map((tour,index) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={4}  key={tour.category._id}>

                    <Card className="card" onClick={()=>showDetails(tour,
                    getValuesFromTourManagerMap(tour.tourOperator._id),
                        access_token)} style={{ cursor: 'pointer' }}>
                    
                    <CardMedia component= "img"  height="100"
                    image = {images[index]} alt={tour.image.fileId} 
                    />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" >
                {tour.category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tour.cityName}, {tour.stateName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {changeDateToWords(tour.startDate)} - {changeDateToWords(tour.endDate)}
              </Typography>

               <Typography variant="body2" color="text.secondary">
                {tour.tourOperator.firstName}- {tour.tourOperator.lastName}
              </Typography>
             <Typography variant="body2" color="text.secondary">
                 {getValuesFromTourManagerMap(tour.tourOperator._id).contact}
              </Typography>
             
                    <Typography variant="body2" color="text.secondary">
                 {tour.tourType === "Domestic"? "Domestic":"International"}
              </Typography>
                 <button type="submit" class="button"  onClick={()=>showDetails(tour,getValuesFromTourManagerMap(tour.tourOperator._id))} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                       Details</button>
              </CardContent>
                    </Card>
                </Grid>
                
               
                </div>
                ))
                :<div>Cannot load Tour List</div>
                
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
                <SideBarFilter selectedValue={selectedValue} setSelectedValue={setSelectedValue} 
                priceValue={priceValue} setPriceValue={setPriceValue} 
                cityList={cityList}
                triplengthValue={triplengthValue} 
                setTriplengthValue={setTriplengthValue} cityvalue={cityvalue} setCityvalue={setCityvalue}/>
            </div>:<div></div>
           }
             </Grid>
               {notification ?
               <div style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </div> 
            :<div></div>
             }
             </nav>
             </div>
             </div>
        )
    }
export default TripList;


