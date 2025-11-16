import { Text, View ,ScrollView, FlatList} from 'react-native';
import TourCommonStyle from '../../styles/tourCommonStyle.js'; 
import TextStyle from '../../styles/textStyles.js'
import {getTourManagers,getCities,persistDataInCache,getDataFromCache} from "../../admin/admin";
import { TouchableOpacity, Image} from 'react-native';
import {tourManagerImages} from "../../admin/imageManager";
import Pagination from  '../../admin/pagination';

import { Table, THead, TH, TBody, TR, TD } from '@expo/html-elements';
import { useLocalSearchParams,Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function getTourOperatos()
{
    const[tourManagers, setTourManagers] = useState([])
    const[tourMgrListForDisplay, setTourMgrListForDisplay] = useState([])
    const[cityList, setCityList] = useState([])
    const ITEM_PER_PAGE = 2; // Number of items to display per "page"
      
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 


    const getTourManagersList = async()=>{

        console.log('tour manager list search...')
           let tourOps =  await getDataFromCache("touroperators");
           
            if(tourOps=== null)
            {
                console.log('tourOps.....',tourOps);
                tourOps = await getTourManagers();
                if(tourOps=== null)
                {
                     console.log('tourOps from DB.....',tourOps);
                    await persistDataInCache("touroperators",tourOps);
                }
            }
            if(tourOps !== null){
                 console.log('tour manager list result...',tourOps)
                 
           // setTourManagers(tourOps);

           
            for(let idx=0 ;  idx<tourOps.length;idx++)
            {
               tourManagers[idx] = tourOps[idx];
            }

            console.log('tourManagers here...',tourManagers);
            let countOfTourManagers  = tourManagers.length/ITEM_PER_PAGE;
            if(tourManagers.length%ITEM_PER_PAGE>0)
            {
                countOfTourManagers = countOfTourManagers+1;
            }
            setTotalPages(countOfTourManagers);
        }
       
        }

          const handlePageChange = (page) => {
            console.log('current Page then....',currentPage);
            console.log('page....',page);
            if(currentPage != page)
            {
                setCurrentPage(page);
               // console.log('current Page now....',currentPage);
            }
            
        }

        const RenderTourManagers = ({item}) =>{
            return(
                <View>
                
                <Table>
               
                      <TR>

             <TH style={TourCommonStyle.cell}>
                <Image source={tourManagerImages[item.tourManagerName]}  style={{flex: 1, 
                width: 300, height: 350, borderRadius:20 }}/>  
                </TH>  
                </TR>
               <TR>
                <TD>
                    <View>
                        <Text style={TextStyle.body}>{item.tourManagerName}</Text>
                    </View>
                    </TD>
                    </TR>
                    <TR>
                <TD>
                    <View>
                        <Text style={TextStyle.body}>{item.contact}</Text>
                    </View>
                    </TD>
                    </TR>

                      <TR>
                     <TD>
                    <View>
                        <Text style={TextStyle.body}>{getCityOfTourManagers(`${item.citycode}`)}</Text>
                    </View>
                    </TD>
                    </TR>
                    </Table>
                    </View>
                )      
        }
        const getCityOfTourManagers = async(cityid)=>{

           let cities = getDataFromCache('cities');
                              if(!cities)
                              {
                                cities = await  getCities();
                                
                                if(cities)
                                    {
                                       persistDataInCache('cities',cities);
                                    }
                              }
                    for(let idx=0;idx<cities.length;idx++)
                        {
                             console.log('cities...',cities);
                             cityList[idx] = cities[idx].cityname;
                        }
                              
                             

            if(!cityList && cityList.length>0)
            {
               return cityList[cityid];
            }
        }

        // const populateTourMgrListForDisplay= ()=> {
             
        //      console.log('currentPage...',currentPage);
        //      let startIdx = (currentPage-1)*ITEM_PER_PAGE;
        //          console.log('start index....',startIdx);
        //          let index = 0;
        //          console.log('tourManagers found....',tourManagers);
        //            for(let page = startIdx;page<(startIdx+ITEM_PER_PAGE);page++)
        //           {
        //               console.log('in the loop , tourManagers...',tourManagers[page]);
        //               tourMgrListForDisplay[index++] = tourManagers[page];
        //           }
        // }

           

        useEffect(()=>{
            let mounted = true;
                const timer = setTimeout(() =>{
                              
                                  const getTourOperators = async () =>{
                                     if(tourManagers.length === 0)
                                     {
                                        await getTourManagersList();
                                     }
                                     if(tourManagers)
                                    {
                                       let startIndex = (currentPage-1)*ITEM_PER_PAGE;
                                       let endIndex = startIndex+ITEM_PER_PAGE;
                                       if(endIndex<tourManagers.length)
                                       {
                                            setTourMgrListForDisplay(tourManagers.slice(startIndex,endIndex));
                                       }else{
                                        setTourMgrListForDisplay(tourManagers.slice(startIndex));
                                       }
                                    }
                             
                                                                              
                              };
                             
                             
                                     getTourOperators();
                              
                              
                            },100);
                      
                  return () => {
                      mounted = false; // Set flag to false on cleanup
                      clearTimeout(timer); // Clean up the timer
                  };
              
                    },[currentPage]);
    
       

    return (
        <View style={{backgroundColor:'#8a41df7e'}} 
          
        >
            {tourManagers && tourManagers.length>0 ?
            <Pagination totalPages={totalPages} currentPage={currentPage} 
            onPageChange={handlePageChange}/>:<View/>
            }
            {
                tourMgrListForDisplay && tourMgrListForDisplay.length>0 ?
                    <FlatList data={tourMgrListForDisplay}  
                    keyExtractor={item=>`${item.tourManagerId}`}
                    renderItem={({item}) => <RenderTourManagers item= {item}/>}
                    />:<View/>
            }
            
        </View>
    )
}