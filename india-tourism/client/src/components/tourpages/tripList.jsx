import React, { useEffect, useState  }from 'react'
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  
const TripList = ({categoryid}) =>{
    const[photo,setPhoto] = useState('');
    const image = "hillstation.png";
   
    useEffect = (() =>{
        //const rndInt = randomIntFromInterval(1, 5);
        setPhoto("hillstation.png");
    },[]);
    const rndInt = 1;
       
   
   return(
        
        <div>
            <img src = {photo} alt=''></img>
            <div className='submit-container'></div>
            
        </div>
   )
    
}

export default TripList