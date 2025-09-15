import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import { useEffect, useState } from "react";
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



const NavBar = ({access_token}) =>{

    const navigate = useNavigate();
     const location = useLocation();

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
            <Grid container spacing={10} justify="center">
             {items && items.length>0 ?

                items.map((item) => (
               <div>
                 
                <Grid item xs = {12} sm={4}  key={item.categoryID}>

                    <Card className="card">
                    
                    <CardMedia component= "img" height="250" 
                    image = {item.image} alt={item.categoryDesc} />

                    
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
         {/* <NavLink style={navLinkStyles} to='/hillstation'>Hill Stations</NavLink>
         <NavLink style={navLinkStyles}>Sea Beaches</NavLink>
         <NavLink style={navLinkStyles}>Desert Safari</NavLink>
         <NavLink style={navLinkStyles}>My Choice</NavLink> */}
        </nav>
        </div>

    )
}
export default NavBar;