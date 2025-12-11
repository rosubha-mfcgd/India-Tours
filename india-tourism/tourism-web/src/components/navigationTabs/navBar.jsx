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
                         
                        setItems(categories);
                        setSections(prev =>[...prev,{title:"Tour Categories", data:items}])

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
           
            
            <div className="navbar-sectioned-list-container">
                
                {sections && sections.length>0 ?
                sections.map((section) =>(
                    <div key={section.title} className="navbar-section-group">
                        
                            <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                            {section.title}
                            </Typography>
                            
                         <Grid container spacing={5} className="navbar-grid-container" >
                        <ul className="navbar-list-container">

             {
             items && items.length>0 ?
              

                items.map((item) => (
                    <li key={item.title} className="navbar-list-item-style">
               <div>
                 
                <Grid item xs = {12} sm={4}  key={item.categoryID} className="navbar-grid-container" >

                    <Card className="navbar-card"
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
                
                </div></li>
                )
                ):<div> <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load categories</Typography></div>
                
             }
             
            </ul>
            </Grid>
            </div>
                )):<div><Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                    Cannot load tour sections</Typography></div>
            }
          
           
             </div>
          {notification ?
               <div style={{position: 'fixed', top:70,right:0}} >    
               <SideBarNotification/> 
            </div> 
            :<div></div>
             }
            </div>
        </div>

    )
}
export default NavBar;