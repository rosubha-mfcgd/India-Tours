import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
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
    Snackbar,
    Card,
    Grid,
    Typography,
    CardMedia,
    CardContent
  } from "@mui/material";
   import Collapse from '@mui/material/Collapse';
import { getCategories,updateAsFavorite } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';

const NavBar = ({access_token,triggerDisplayOptionsByCatId,
    productID}) =>{

    
    const navigate = useNavigate();
     const location = useLocation();
    const { notification} = useContext(NavContext);
     const [items, setItems] = useState([])
    const [sections, setSections] = useState([])
      const [personalTripItems, setPersonalTripItems] = useState([])
    const [personalTripsections, setPersonalTripsections] = useState([])
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
         
       
          useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
                
                    const getTripCategories = async (productID) =>{
                   
                    let categories = await getCategories(productID);
                    
                    if(categories)
                    {
                        console.log('categories...',categories);
                       let operatedTourCategories = [];
                       let personalTripCategories = [];
                       for(let category of categories)
                       {
                            if(category && category.categoryID !== 10 && 
                                category.categoryID !== 9 && category.categoryID !== 7)
                            {
                                  operatedTourCategories.push(category);  
                            }
                            else
							{
                                personalTripCategories.push(category);
                            }
                           
                       }
                        setItems(operatedTourCategories);
                        setPersonalTripItems(personalTripCategories);
                        setSections(prev =>[...prev,{title:"Package Tours", data:items}])
                        setPersonalTripsections(prev =>[...prev,{title:"Family/Personal Tours", data:personalTripItems}])
                    }
                   
                };

                
                if(items && items.length===0)
                {
                    getTripCategories(productID);
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

          },[]);


    return (
        <div className="navbar-grid">
              
        
        <div className="navbar">
           
            <Collapse in={packageTripSectionOpen} timeout="auto" unmountOnExit>
            
            <div className="navbar-sectioned-list-container">
                
                {sections && sections.length>0 ?
                sections.map((section) =>(
                    <div key={section.title} className="navbar-section-group">
                        
                             <header className="app-header">
                                <div className="header-content">
                           <h1>{section.title}</h1>
                            {/* <Button variant="contained" onClick={handleToggle} sx={{ mb: 2 }}>
                             {packageTripSectionOpen ? 'Hide Details' : 'Show Details'}
                             </Button> */}
                           </div>
                           </header>
                            
                         <Grid container spacing={0.5} justify="center" width="70%" >
                       

             {
             items && items.length>0 ?
              

                items.map((item) => (
                    
               <div>
                 
                <Grid item xs = {12} sm={4} key={item.categoryID}  >

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {item.image} alt={item.categoryDesc} 
                    onClick={()=>triggerDisplayOptionsByCatId(item.categoryID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" sx={{whiteSpace: 'pre-wrap'}}>
                {item.categoryName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.categoryDesc}
              </Typography>
              {(item.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    item.categoryID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    item.categoryID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" class="button"  onClick={()=>triggerDisplayOptionsByCatId(item.categoryID)} 
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
                )):<div><Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load pacakage tour sections</Typography></div>
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
                            <Grid container spacing={0.5} justify="center" width="70%" >
                             
                                  {
             personalTripItems && personalTripItems.length>0 ?
              

                personalTripItems.map((personalTripItem) => (
                        <div>
                            <Grid item xs = {12} sm={4} key={personalTripItem.categoryID}  >

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {personalTripItem.image} alt={personalTripItem.categoryDesc} 
                    onClick={()=>triggerDisplayOptionsByCatId(personalTripItem.categoryID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" sx={{whiteSpace: 'pre-wrap'}}>
                {personalTripItem.categoryName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {personalTripItem.categoryDesc}
              </Typography>
              {(personalTripItem.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    personalTripItem.categoryID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    personalTripItem.categoryID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" class="button"  onClick={()=>triggerDisplayOptionsByCatId(personalTripItem.categoryID)} 
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



                )):<div><Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
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
       
        
    )
}
export default NavBar;