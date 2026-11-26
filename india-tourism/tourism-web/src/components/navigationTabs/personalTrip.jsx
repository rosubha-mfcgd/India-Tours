import { NavLink , useLocation,useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/showHotels.css';
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
import { getCategories,updateAsFavorite,getImageById,getRecommendedTours,
  searchHotelsForSearchParam
} 
from "../admin/admin";
import { useDeviceType } from '../admin/checkDeviceType';
import { NavContext } from '../navigationContext/navigationContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchBar from "./searchBar";

const PersonalTrip = ({access_token,setShowCategories,cityList}) =>{
    
     const [searchData, setSearchData] = useState({ selectedDest: '',
        startDate: '',
        endDate: '',touristCount:'', childtouristCount:'', rating: ''
      });
        const [showHotel,setShowHotel] = useState(false);
         const [dataList,setDataList] = useState([]);
        const [loading,setLoading] = useState(false);
        const [showSearchBar,setShowSearchBar] = useState(true);
        const [hotelList, setHotelList] = useState([]);
        const [checkinDate, setCheckinDate] = useState('');
        const [checkoutDate, setCheckoutDate] = useState('');
        
        const deviceType = useDeviceType();


        const formSearchData = (dataFromSearchComp)=>{
           console.log('searchData is..',dataFromSearchComp) 
          setSearchData(dataFromSearchComp);
           
        }
        
       
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

           useEffect (()=>{
            console.log('useeffect invoked here...',searchData.selectedDest,
              searchData.startDate,searchData.endDate,searchData.touristCount,
              searchData.childtouristCount,searchData.rating);
              
              if(searchData.selectedDest && searchData.startDate && 
                searchData.endDate && searchData.touristCount && 
                searchData.childtouristCount && searchData.rating
               )
               {
                  setCheckinDate((searchData.startDate).format("DD-MM-YYYY"));
                  setCheckoutDate((searchData.endDate).format("DD-MM-YYYY"));
                  console.log('checkin date', (searchData.startDate).format("DD-MM-YYYY"))
                  console.log('checkout date', (searchData.endDate).format("DD-MM-YYYY"))
                
                let req_data = {"travelDestination": searchData.selectedDest.label,
                  "checkInDate": (searchData.startDate).format("YYYY-MM-DD"),
                   "checkOutDate":(searchData.endDate).format("YYYY-MM-DD"),
                  "noOfTourists":searchData.touristCount.value,
                  "childTourists": searchData.childtouristCount.value,
                  "hotelrating": searchData.rating.value
                }
                console.log('req Data is...',req_data);
                let mounted = true;

            const timer = setTimeout(() =>{
              const fetchHotelsBySearchCriteria = async (searchdata) =>{
                
                 let hotelsearchResult =  await searchHotelsForSearchParam(searchdata);
                  
                  if(hotelsearchResult)
                  {
                      console.log('hotelsearchResult...',hotelsearchResult);
                    setHotelList(hotelsearchResult);
                    setLoading(false);
                    setShowSearchBar(false)
                  
                  }
                
              };
            if(hotelList && hotelList.length===0)
                {
                    setLoading(true)
                    fetchHotelsBySearchCriteria(req_data);
                }
            
            },300);
          return () => {
            mounted = false; // Set flag to false on cleanup
            clearTimeout(timer); // Clean up the timer
          };
            }else{

            }},
            [searchData]);
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
        <div className="navbar">
            {dataList && dataList.length>0 && showSearchBar &&
            <SearchBar access_token={access_token} dataList={dataList} 
            prepareSearchData={formSearchData}/>
            }
            <Box
      sx={{
        display: 'grid',
        // 1 col on mobile, 2 on small tablets, 3 on medium, max 5 on desktop
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: 2.5, // Uniform horizontal & vertical gap between cards
      }}>
        {

          hotelList && hotelList.length>0 && 
            hotelList.map((item) => (
               
              <div>
                  

                    <Card className="navbar-card" sx={{ marginBottom: 2 }}
                     >
                           <CardMedia component= "img"  height="60"
                    image = {item.main_photo} 
                    alt={item.thumbnail} 
                    style={{ cursor: 'pointer' }} 
                     />

                  <CardContent>
                        <Typography gutterBottom variant="body1" component="div" 
                        sx={{whiteSpace: 'pre-wrap'}}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'pre-wrap'}}>
                {item.name}, {item.stars}
              </Typography>
              </CardContent>
                      </Card>
                      
              </div>
              
            ))
        }
       </Box>
        </div>

        }
        </div>

    )
    }
export default PersonalTrip;