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

import {updateAsFavorite,getProducts } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';

const Products = ({access_token,triggerDisplayTripsByProductId}) =>{

    
    const navigate = useNavigate();
     const location = useLocation();
    const { notification} = useContext(NavContext);
     const [items, setItems] = useState('')
    
    
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
                
                    const fetchProducts = async () =>{
                   
                    let products = await getProducts();

                    if(products)
                    {
                        console.log('products...',products);
                        setItems(products);
                    }
                };
                if(items==='')
                {
                   fetchProducts();
                }},100);
        
    return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

          },[]);


    return (
        <div className="navbar-grid">
        <nav className="navbar">
            <Grid container spacing={10} justify="center" width="70%">
             {items && items.length>0 ?

                items.map((item) => (
               <div>
                 
                <Grid item xs = {12} sm={4}  key={item.productID}>

                    <Card className="card"
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {item.image} alt={item.productDesc} 
                    onClick={()=>triggerDisplayTripsByProductId(item.productID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div">
                {item.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                {item.productDesc}
              </Typography>
              {(item.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateFavorites(
                    item.productID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateFavorites(
                    item.productID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" className="button"  
              onClick={()=>triggerDisplayTripsByProductId(item.productID)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</button>
                    </Card>
                </Grid>
                
                </div>
                )
                ):<div>Cannot load products</div>
                
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

    )
}
export default Products;