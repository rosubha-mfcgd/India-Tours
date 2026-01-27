
import * as Yup from 'yup'; // Import Yup for schema validation

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};
const allowedAgeGroup = ['Minor', 'Adult', 'SeniorCitizen']
const allowedGender = ['Male', 'Female']

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
    .min(2, 'Name is too short - should be 2 chars minimum.')
    .max(50, 'Name is too long - should be 50 chars maximum.')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces') // Optional: enforce format
    .required('Tourist Name is invalid'),
  email: Yup.string().email('Invalid email address')
   .required('Email is required'),
  mobile: Yup.string().required('Mobile number is required')
  .matches(/^[0-9]{10}$/, 'Mobile number is not valid') // Example regex for a 10-digit number
    .required('Mobile number is invalid'),
  ageGroup: Yup.string()
    .required('Confirm your age group')
    .oneOf(allowedAgeGroup,'Age group must be Minor,Adult,SeniorCitizen'),   
     gender: Yup.string()
    .required('Confirm your Gender')
    .oneOf(allowedGender,'Gender must be Male,Female')
     
 });

export const updateBooking = (key,name,value, booking,setBooking) =>{
            console.log('booking...',booking)
            console.log('VALUE...',value)
            console.log('key....',key)
            booking.bookingData[key-1][name] = value;
            booking.bookingData[key-1]["index"] = key-1;
            setBooking(booking);
            console.log('final booking....',booking)
        }

export const validateBookingData =async (bookingData) =>{
  let errMsg = null;
  
      for(let index = 0;index<bookingData.length;index++)
      {
        try{
        console.log('booking to be validated....',bookingData[index])
       await validationSchema.validate(bookingData[index]);
        }
        catch(error){
          errMsg = error.message;
       // console.error("Validation error:", error.message)
        break;
  }
    }
        return errMsg;
  }

  export const calculateTotalPages = async(dataSize,itemPerPage) =>{
    return Math.ceil(dataSize / itemPerPage);
  }

