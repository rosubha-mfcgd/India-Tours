import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useEffect, useState, useContext } from "react";
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
    IconButton,
    Snackbar,
    Fab,
    Card,
    Grid,
    Typography,
    CardMedia,
    CardContent,
    CircularProgress
  } from "@mui/material";
   import Collapse from '@mui/material/Collapse';
import { getCategories,updateAsFavorite,getImageById,getRecommendedTours} 
from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext';
import SideBarNotification from './sideBarNotification'
import FavoriteIcon from '@mui/icons-material/Favorite';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavBar = ({access_token,triggerDisplayOptionsByCatId,
    productID,showDetails}) =>{

    
    const navigate = useNavigate();
     const location = useLocation();
    const { notification,loading, setLoading} = useContext(NavContext);
    const [images, setImages] = useState([]);
    const [tourimages, setTourimages] = useState([]);
     const [items, setItems] = useState([]);
     const[recommendedtours,setRecommendedtours] = useState([])
     
    const [sections, setSections] = useState([])
      const [personalTripItems, setPersonalTripItems] = useState([])
    const [personalTripsections, setPersonalTripsections] = useState([])
    const [recommendedTripSections, setRecommendedTripSections] = useState([])
     const [packageTripSectionOpen, setPackageTripSectionOpen] = useState(true);
     const [personalTripSectionOpen, setpersonalTripSectionOpen] = useState(true);

      const [personalTripOpen, setPersonalTripOpen] = useState(true);
 
  const handleToggle = () => {
    setPackageTripSectionOpen(!packageTripSectionOpen);
  };
    const handleFamilyTripToggle = () => {
    setpersonalTripSectionOpen(!personalTripSectionOpen);
  };
    const navLinkStyles = ({isActive})=>{
            return {
                fontWeight:isActive?'bold':'normal',
                textDecoration:isActive?'none':'underline',
            }
        }

        const activeState = ({ isActive, isPending }) => {
            return {
            color: isPending ? "rgb(253 230 138)" : "",
            backgroundColor: isActive ? "rgb(69 26 3)" : "",
            fontWeight: isActive ? "bold" : ""
            };
          };

       const updateFavorites = async(categoryid, status,event) =>{

        if(status === 'Y') {
             event.target.style.color='#f04646ff';
        }else{
           event.target.style.color='#140202ff'; 
        }
        let data = {
                    "categoryId":categoryid,
                    "status" : status
                    }
                    let result = await updateAsFavorite(data);
                    if(result)
                    {
                       console.log('favorite result...',result)
                    }else{
                        console.log('could not update favorite')
                    }
       }

       const getCategoryImageFromFileId = async(imageid,bucketname) =>{

        console.log('image id is.... ',imageid)
                   if(imageid != null){
                    
                       let imageData = await getImageById(imageid,bucketname);
                       if(imageData)
                        {
                        console.log('imageData...',imageData);
                           return imageData;
                       }
                   }
           }
            //Change the date to words
            function changeDateToWords(dateObject)
                {
                    const date = new Date(dateObject);
                    console.log('date....',date)
                    console.log('formatted date...', date.toLocaleDateString('en-GB')); // Or 'en-GB' for a different locale
                    return date.toLocaleDateString('en-GB');
                }

                 const handleGoBack = () => {
                        console.log('Go back...')
                    };
       
          useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
                
                    const getTripCategories = async (productID) =>{
                     //Fetch the list of categories
                    let categories = await getCategories(productID);
                    //Fetch the list of recommended tours
                    let recommendedTours = await getRecommendedTours();
                    //if categories and recommended tour list populated
                    if(categories && recommendedTours)
                    {
                       console.log('categories and recommendedTours...',categories,recommendedTours);
                       let operatedTourCategories = [];
                       let personalTripCategories = [];
                       //iterate on list of categories and prepare the category section
                       for(let category of categories)
                       {
                            if(category && category.name !== 'Office Trips' && 
                                category.name !== 'Sports Tour')
                            {
                                  operatedTourCategories.push(category);  
                            }
                            else
							{
                              personalTripCategories.push(category);
                            }
                            //populate the category images
                            let imageData = await 
                              getCategoryImageFromFileId(category.image,'categoryImages');
                           if(imageData)
                           {
                            images[category._id] = imageData;
                           }
                       }
                       setRecommendedtours(recommendedTours);
                       //iterate on list of recommended tours and prepare the recommended tour section
                       for(let recommendedtour of recommendedTours)
                       {
                        console.log('recommendedtour image fileId....',recommendedtour.image.fileId)
                        //prepare the recommended trip image   
                        let imageData = await 
                           getCategoryImageFromFileId(recommendedtour.image.fileId,'tourImages');
                              
                           if(imageData)
                           {
                            console.log('recommended tour id....',recommendedtour._id)
                            tourimages[recommendedtour._id] = imageData;
                           }
                       }
                       setItems(operatedTourCategories);
                        setPersonalTripItems(personalTripCategories);
                        setSections(prev =>[...prev,{title:"Package Tours", data:items}])
                        setPersonalTripsections(prev =>[...prev,{title:"Family/Personal Tours", 
                            data:personalTripItems}])
                            setRecommendedTripSections(prev =>[...prev,{title:"Recommended Tours", 
                            data:recommendedtours}])
                       setLoading(false);
                    }
                    
                   
                   
                };

              
                if(items && items.length===0)
                {
                    setLoading(true)
                    getTripCategories(productID);
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

          },[]);


    return (
               
        <div className="navbar-grid">
            {
                loading ? 

                 ( 
                 <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Optional: Centers vertically within the viewport
      }}
    >
                <CircularProgress/>
                </Box>)
                :
                (
                <div>

            <div className="navbar">
                 
                    <IconButton onClick={handleGoBack}  sx={{
          backgroundColor: 'primary.main', // styles the button background
          '&:hover': {
            backgroundColor: 'primary.dark', // styles the hover background
          },
          // Target the icon part using its class name MuiSvgIcon-root
          '& .MuiSvgIcon-root': {
            color: 'white', // styles the icon color
            fontSize: '2rem', // styles the icon size
          },
        }}>
                        <ArrowBackIcon/>
                    </IconButton> 
                    
            <Collapse in={packageTripSectionOpen} timeout="auto" unmountOnExit>
             <div className="navbar-sectioned-list-container">
                
                {
                recommendedTripSections && recommendedTripSections.length>0 ?
                    recommendedTripSections.map((recommendedTripSection) =>(
                    <div key={recommendedTripSection.title} className="navbar-section-group">
                        
                             <header className="app-header">
                                <div className="header-content">
                           <h1>{recommendedTripSection.title}</h1>
                           </div>
                           </header>
                            
                         <Grid container spacing={0.5} justify="center" width="100%" >
                       

             {
             recommendedtours && recommendedtours.length>0  ?
              

                recommendedtours.map((item) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={3} key={item._id}  >

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {tourimages[item._id]} 
                    alt={item.description} 
                    onClick={()=>showDetails(item,item.tourOperator)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.cityName}, {item.stateName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {changeDateToWords(item.startDate)} - {changeDateToWords(item.endDate)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {item.tourOperator.firstName} - {item.tourOperator.lastName}
              </Typography>

              {(item.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    item._id,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    item._id,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" class="button"  onClick={()=>showDetails(item,item.tourOperator)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</button>
                    </Card>
                    
                </Grid>
                
                </div>
                )
                ):<div> <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load recommended tours sections</Typography></div>
                
             }

             </Grid>
              
            </div>
                )):
                <div>
                    <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                        Cannot load recommended tours sections
                 </Typography>
                 </div>
            }
          
           
             </div>
            </Collapse>
                    <IconButton 
                     aria-label="forward"
        sx={{
          backgroundColor: 'primary.main', // styles the button background
          '&:hover': {
            backgroundColor: 'primary.dark', // styles the hover background
          },
          // Target the icon part using its class name MuiSvgIcon-root
          '& .MuiSvgIcon-root': {
            color: 'white', // styles the icon color
            fontSize: '2rem', // styles the icon size
          },
        }}
                    
                    onClick={handleGoBack}>
                        <ArrowForwardIcon/>
                    </IconButton>   
            </div>
        <div className="navbar">
           
            <Collapse in={packageTripSectionOpen} timeout="auto" unmountOnExit>
            
            <div className="navbar-sectioned-list-container">
                
                {
                sections && sections.length>0 ?
                    sections.map((section) =>(
                    <div key={section.title} className="navbar-section-group">
                        
                             <header className="app-header">
                                <div className="header-content">
                           <h1>{section.title}</h1>
                           </div>
                           </header>
                            
                         <Grid container spacing={0.5} justify="center" width="70%" >
                       

             {
             items && items.length>0  ?
              

                items.map((item) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={4} key={item._id}  >

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {images[item._id]} 
                    alt={item.description} 
                    onClick={()=>triggerDisplayOptionsByCatId(item._id)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.description}
              </Typography>
              {(item.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    item._id,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    item._id,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" class="button"  onClick={()=>triggerDisplayOptionsByCatId(item._id)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</button>
                    </Card>
                    
                </Grid>
                
                </div>
                )
                ):<div> <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load pacakage tours</Typography></div>
                
             }

             </Grid>
              
            </div>
                )):
                <div>
                    <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                        Cannot load pacakage tour sections
                 </Typography>
                 </div>
            }
          
           
             </div>
             </Collapse>
            </div>
 <div className="navbar">
        
            <Collapse in={personalTripSectionOpen} timeout="auto" unmountOnExit>
             <div className="navbar-sectioned-list-container">
                  {personalTripsections && personalTripsections.length>0 ?
                personalTripsections.map((personalTripsection) =>(
                      <div key={personalTripsection.title} className="navbar-section-group">
                        
                             <header className="app-header">
                                <div className="header-content">
                           <h1>{personalTripsection.title}</h1>
                           </div>
                           </header>
                            {/* <Button variant="contained" onClick={handleFamilyTripToggle} sx={{ mb: 2 }}>
                             {personalTripSectionOpen ? 'Hide Details' : 'Show Details'}
                             </Button> */}
                            <Grid container spacing={0.5} justify="center" width="100%" >
                             
                                  {
             personalTripItems && personalTripItems.length>0 ?
              

                personalTripItems.map((personalTripItem) => (
                        <div>
                            <Grid item xs = {12} sm={3} key={personalTripItem._id}  >

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {images[personalTripItem._id]} alt={personalTripItem.description} 
                    onClick={()=>triggerDisplayOptionsByCatId(personalTripItem._id)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" sx={{whiteSpace: 'pre-wrap'}}>
                {personalTripItem.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {personalTripItem.description}
              </Typography>
              {(personalTripItem.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    personalTripItem._id,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    personalTripItem._id,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              </CardContent>
              <button type="submit" class="button"  onClick={()=>triggerDisplayOptionsByCatId(personalTripItem._id)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</button>
                    </Card>
                    
                </Grid>
                        </div>
                       )
                        ):<div> 
                    <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load personal tours</Typography></div>
                        }
                             </Grid>
                           </div>
                     )):<div>
            <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load personal tour sections</Typography></div>
                    }
           </div>
            </Collapse>
            </div>
          {notification ?
               <div style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </div> 
            :<div></div>
             }
             </div>
            )}
            </div>
            )
}
export default NavBar;