import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext} from "react";
import { NavLink , useLocation,useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getOptions,updateAsFavorite} from "../admin/admin.js";
import SideBarNotification from './sideBarNotification.jsx';
import { NavContext } from '../navigationContext/navigationContext.jsx';
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
    FormGroup,
    FormControl,  
    Input,
    Switch,
    InputLabel,
    TextareaAutosize
  } from "@mui/material";

  const DisplayOptions = ({access_token,triggerDisplayTasksByOptionID,productID,categoryID}) =>{

 const navigate = useNavigate();
     const location = useLocation();
    const { notification} = useContext(NavContext);
     const [items, setItems] = useState('')

      const updateOptionsAsFavorites = async(optionid, status,event) =>{

        if(status === 'Y') {
             event.target.style.color='#f04646ff';
        }else{
           event.target.style.color='#140202ff'; 
        }
        let data = {
                    "optionId":optionid,
                    "status" : status
                    }
                
                    console.log('Option updates coming soon');
       }

     useEffect(()=>{
                 let mounted = true;
     
                 const timer = setTimeout(() =>{
                     
                         const getOptionsByProductAndCategory = async (productID,categoryID) =>{
                        
                         let options = await getOptions(productID,categoryID);
                         
                         if(options)
                         {
                             console.log('options...',options);
                             setItems(options);
                         }
                        
                     };
     
                     
                     if(items==='')
                     {
                         getOptionsByProductAndCategory(productID,categoryID);
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
                 
                <Grid item xs = {12} sm={4}  key={item.optionID}>

                    <Card className="card"
                     >
                    
                    <CardMedia component= "img"  height="100"
                    image = {item.image} alt={item.optionDesc} 
                    onClick={()=>triggerDisplayTasksByOptionID(item.optionID)} 
                    style={{ cursor: 'pointer' }} 
                     />
                                     
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" sx={{whiteSpace: 'pre-wrap'}}>
                {item.optionName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.optionDesc}
              </Typography>
              {(item.favorite === 'Y') ?
                <FavoriteIcon sx={{ color: '#f04646ff' }} onClick = {(event) => updateOptionsAsFavorites(
                    item.optionID,'N',event)} style={{ cursor: 'pointer' }}/>:
                <FavoriteIcon onClick = {(event) => updateOptionsAsFavorites(
                    item.optionID,'Y',event)} style={{ cursor: 'pointer' }}/>
              }
              
              </CardContent>
              <button type="submit" class="button"  onClick={()=>triggerDisplayTasksByOptionID(item.optionID)} 
                    style={{ cursor: 'pointer',backgroundColor: '#8a77f8ff',color:'#0c0c0fff'}}>
                        Click to View</button>
                    </Card>
                </Grid>
                
                </div>
                )
                ):<div>Cannot load options</div>
                
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

  )}

  export default DisplayOptions;