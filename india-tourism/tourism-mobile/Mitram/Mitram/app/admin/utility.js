import { Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for schema validation

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const validationSchema = Yup.object().shape({
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid') // Example regex for a 10-digit number
    .required('Phone number is required'),
  age: Yup.number()
    .required('Age is required')
    .integer('Age must be an integer')
   .max(92, 'You must be younger than 92 years old') // Sets a maximum age
    .positive('Age must be a positive number'),
  fullName: Yup.string()
    .min(2, 'Name is too short - should be 2 chars minimum.')
    .max(50, 'Name is too long - should be 50 chars maximum.')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces') // Optional: enforce format
    .required('Tourist Name is required')
});