import React, {useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Appbar,Avatar,Button,Card,Checkbox,Chip,Dialog,Divider,FAB,HelperText,
      IconButton,List,Menu,
Modal,Portal,ProgressBar,RadioButton,Searchbar,SegmentedButtons,Snackbar,
Surface,Switch,Text,TextInput,Tooltip,TouchableRipple} from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome';
import SidebarFilterStyle from  '../stylecomp/sidebarForSorting';

 const SideBarFilter=({selectedValue,setSelectedValue,priceValue, 
  setPriceValue,
    triplengthValue, setTriplengthValue,cityList,cityvalue,setCityvalue})=> {
     const[cityFilterList, setCityFilterList] = useState('')
   const [open, setOpen] = useState(true);
    const Drawer = createDrawerNavigator();
     // Handle changes to the slider's value
  const handlePriceSliderChange = (event) => {
    setPriceValue(event.target.value);
  };
  const handleTripLengthSliderChange = (event) => {
    setTriplengthValue(event.target.value);
  };
  const handleCityValueChange = (event) => {

    console.log('here....')
    setCityvalue(event.target.value);
  };
 const handleDrawerClose = () => {
            setOpen(false);
        };
    const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: "#01130ad5" // Set your desired background color here
     },
    }));

const handleChange = (event) => {
      setSelectedValue(event.target.value);
   }; 

  
  return (
            <View style={{ display: 'flex' }}>
            
                <StyledDrawer
                    variant="persistent" // Or "temporary", "permanent"
                    anchor="right"
                    open={open}
                    style={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { // Target the Paper component within the Drawer
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'lightblue', // Example background color
          borderRadius: '0 16px 16px 0', // Example rounded corners
        },
      }} 
                >
                    <View style={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <IconButton onPress={handleDrawerClose}>
                            <Icon name="chevron-right" size={20} color="#900" 
                            onPress={handleDrawerClose}/>
                        </IconButton>
                    </View>
                    <View style={{ display: 'flex', 
                      alignItems: 'center', justifyContent: 'flex-end', 
                      padding: 1 }}>
                        <Text variant="body2" color="common.white">Filter </Text>
                    </View>
                    <List>
                      <ListItem>
                         
                        <FormControl fullWidth>
                           <Text variant="body2" color="common.black">
                               Tour Operator Location
                            </Text>

  <NativeSelect
    defaultValue={cityvalue}
    inputProps={{
      name: 'cities',
      id: 'uncontrolled-native',
    }} onChange={handleCityValueChange}
   >
{
 cityList && cityList.length>0?
cityList.map((city) =>(

<option value={city.citycode}>{city.cityname}</option>

))
:<option  aria-label="None"  value="0">All</option>
}
</NativeSelect>
</FormControl>
                      </ListItem>
                        {
                        ['Price', 'TripLength','DomesticOrInternational'] .
                         map((text, index) => ( (
                            <ListItem>
                              {
                               text == 'Price'?
                              <View>
                            <Text variant="body2" color="common.black">
                                {text} - {priceValue}
                            </Text>
                                                   
                                <Slider style={SidebarFilterStyle.slider}
                                value= {priceValue} 
                                onValueChange={handlePriceSliderChange} 
                                minimumValue={10000} maximumValue={100000} step={20000}
                                thumbTintColor="#b9e4f4"
                                />  
                      {/* <datalist id="pricelist">
                        <option value="10000" label="10k"></option>
                       <option value="50000" label="50k"></option>
                        <option value="100000" label="100k"></option>
                       <option value="500000" label="500k"></option>
                        <option value="1000000" label=">=1000k"></option>
                        </datalist> */}
                                </View>:
                                text == 'TripLength'?
                              <View>
                            <Text variant="body2" color="common.black">
                                {text} - {triplengthValue}
                            </Text>
                                                   
                                {/*<Slider style={SidebarFilterStyle.slider}
                                value= {triplengthValue} 
                                onValueChange={handleTripLengthSliderChange} 
                                min="1" max="30" step={7}/>  */}
                        {/* <datalist id="triplengthlist">
                        <option value="1" label="1"></option>
                        <option value="7" label="7"></option>
                        <option value="14" label="14"></option>
                        <option value="21" label="21"></option>
                        <option value="30" label=">=30"></option>
                        </datalist> */}
                                </View>:
                            text === 'DomesticOrInternational'?
                                <View>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                               <Text variant="body2" color="common.black">Type of Tour?
                                </Text>
                               </FormLabel>
      <RadioGroup
        aria-label="options"
        name="my-radio-group"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel value="I" control={<Radio/>} label="International" />
        <FormControlLabel value="D" control={<Radio/>} label="Domestic" />
         <FormControlLabel value="B" control={<Radio/>} label="Both" />
     </RadioGroup>
     </FormControl>

     </View>:<View></View>
     }  
     </ListItem>
    )))}
                    </List> 
                </StyledDrawer>
                {/* Main content of your application */}
                <View component="main" style={{ flexGrow: 1, p: 3 }}>
                    {/* Your application's main content goes here */}
                </View>
            </View>
  );

  

}

export default SideBarFilter
