import { useEffect, useState} from "react";

import {getOperatorReviews } from "../admin/admin";
const OperatorReviews = ({ isOpen, onClose,tourManagerId})=>{

    const[reviews,setReviews] = useState([]);

    function formatDate(inputdate)
    {
        let year = inputdate.getFullYear();
        let month = String(inputdate.getMonth() + 1).padStart(2, '0');
        let days = String(inputdate.getDate()).padStart(2, '0');

        return `${year}-${month}-${days}`;
    }

    const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const addMonths = (input, months) => {
    const date = new Date(input);
    date.setDate(1); // Set to 1st to avoid issues with short months
    date.setMonth(date.getMonth() + months); // Add/subtract months
    // Set the day back, ensuring it doesn't exceed the max days of the new month
    date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth() + 1)));
    return date;
};

useEffect(()=>{
let mounted = true;

            const timer = setTimeout(() =>{
                
                    const getTourOperatorReviews = async () =>{
                       
                        // 2. Create a new Date object for the prior date to avoid mutating the original
                    const sixMonthspriorDate = addMonths(new Date(), -6);
                    let reviewDate = formatDate(sixMonthspriorDate); 
                        // Output the result (example format: "Tue Aug 25 2026 ...")
                        console.log(reviewDate);   
                        let data = {tourManagerId:tourManagerId,reviewDate:reviewDate};
                        let result = await getOperatorReviews(data);
                        
                        if(result)
                        {
                            setReviews(result);
                            mounted = false;
                        }
                    }
              if(mounted && reviews && reviews.length===0)
                {
                   getTourOperatorReviews();
                }
},1000);
     return () => {
        mounted = false; // Set flag to false on cleanup
        clearTimeout(timer); // Clean up the timer
    };

},[]);
if (!isOpen) return null;
return (
     <div  className="modal-overlay">
      <div className="modal-content">
        <div>
             <TableContainer sx={{boxShadow: 'none'}}>

             </TableContainer>
        </div>
        </div>
        </div>
)
}
export default OperatorReviews;