import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/searchbar.css';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useEffect, useState, useContext } from "react";
import {
    
    Box,
    Card,
    Grid,
    Link,
    Typography,
    CardMedia,
    CardContent,
    CircularProgress
  } from "@mui/material";
   import Collapse from '@mui/material/Collapse';
import { getCategories,updateAsFavorite,getImageById,getRecommendedTours} 
from "../admin/admin";
import { useDeviceType } from '../admin/checkDeviceType';
import { NavContext } from '../navigationContext/navigationContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchBar from "./searchBar";

const PersonalTrip = ({access_token,setShowCategories,cityList}) =>{
    
        const [showHotel,setShowHotel] = useState(false);
         const [dataList,setDataList] = useState([]);
        
        useEffect (()=>{
            cityList.push({value:0,label:'Choose your city'})
             // 1. Transform the entire array at once using .map()
                const formattedCities = cityList.map((city) => ({
                    value: city._id,
                    label: city.name
                }));
                 // 2. Set the state once with the complete array
            setDataList(formattedCities);
           },[cityList]);
    return (

        <div className="navbar">
            {dataList && dataList.length>0 &&
            <SearchBar access_token={access_token} dataList={dataList}/>
            }
        </div>
    )
    }
export default PersonalTrip;