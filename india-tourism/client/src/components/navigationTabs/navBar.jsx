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

import { getCategories } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
const NavBar = ({access_token}) =>{

    const navigate = useNavigate();
     const location = useLocation();
    const { notification } = useContext(NavContext);
     const [items, setItems] = useState('')
    
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

          const showList = ({categoryID}) =>{
            


          }

          useEffect(()=>{
            let mounted = true;

            const timer = setTimeout(() =>{
                
                    const getTripCategories = async () =>{
                    let req_data = {
                        access_token:access_token
                    }
                    let categories = await getCategories(req_data);

                    if(categories)
                    {
                        console.log('categories...',categories);
                        setItems(categories);
                    }
                };
                if(items==='')
                {
                    getTripCategories();
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
                 
                <Grid item xs = {12} sm={4}  key={item.categoryID}>

                    <Card className="card">
                    
                    <CardMedia component= "img"  height="100"
                    image = {item.image} alt={item.categoryDesc} 
                    onClick={}
                    />

                    
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div">
                {item.categoryName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.categoryDesc}
              </Typography>
              </CardContent>
                    </Card>
                </Grid>
                
                </div>
                )
                ):<div>Cannot load categories</div>
                
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
export default NavBar;