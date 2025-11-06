
import * as Yup from 'yup'; // Import Yup for schema validation

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const validationSchema = Yup.object().shape({
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid') // Example regex for a 10-digit number
    .required('Phone number is invalid'),
  age: Yup.number()
    .required('Age is required')
    .integer('Age must be an integer')
   .max(92, 'You must be younger than 92 years old') // Sets a maximum age
    .positive('Age must be a positive number'),
  name: Yup.string()
    .min(2, 'Name is too short - should be 2 chars minimum.')
    .max(50, 'Name is too long - should be 50 chars maximum.')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces') // Optional: enforce format
    .required('Tourist Name is invalid'),
  pincode:Yup.string()
    .required('Pincode is required')
    .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits') ,
    streetname:Yup.string()
    .min(5, 'Street name must be at least 5 characters')
    .max(50, 'Street name must not exceed 50 characters')
    .required('Street name is required')
    .matches(
      /^[a-zA-Z0-9\s.,#-]+$/,
      'Invalid street name format. Avoid special characters.'
    ) ,
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