// Import the UPI QR library
import QRCode from 'react-qr-code';
import '../../styles/bookingForm.css';
import '../../styles/aadharAuth.css';
import { useEffect, useState} from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import {validateBookingData} from "../admin/utility";
import failure_animation from '../Assets/images/failure_animation.gif';
import { styled } from '@mui/material/styles';
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
    OutlinedInput,
    Typography,
    CardMedia,
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    Select,
    InputLabel,
    
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem
  } from "@mui/material";

  
const AuthenticateTraveller = ({ isOpen, onClose}) => {


 
  
const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
   const [anonAadhaar] = useAnonAadhaar();
   
   // Handle file selection
  const onFileChange = (event) => {
    // Access the selected file(s) using event.target.files
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  // Handle file upload to the server
  const onFileUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first!');
      return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append(
      'idFile', // Name of the field for the server to pick up
      selectedFile,
      selectedFile.name
    );
    try {
      // Send the request to the backend server
    //   const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData);
       
      const response = ""; 
      setMessage(`File uploaded successfully: ${response.data.message}`);
      // Clear the selected file state after successful upload
      // let result =  useAnonAadhaar();
      //  if(result){
      //    setAnonAdhaar(result);
          setSelectedFile(null); 
     //  }
     

    } catch (error) {
      setMessage('File upload failed!');
      console.error('Upload error:', error);
    }
  };

    // Display file details or prompt user
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <ul>
            <li>Name: {selectedFile.name}</li>
            <li>Type: {selectedFile.type}</li>
            <li>Last Modified: {selectedFile.lastModifiedDate.toLocaleDateString()}</li>
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>Choose a file to see its details and upload.</p>
        </div>
      );
    }
  };

   useEffect(() => {
    if (anonAadhaar.status === "logged-in" ) {
      console.log("Proof: ", anonAadhaar.proof);
    }
  }, [anonAadhaar]);



if (!isOpen) return null;

  return (
     <AnonAadhaarProvider _artifactslinks={{
    zkey_url: "/aadhar_validation/circuit_final.zkey",
    vkey_url: "/aadhar_validation/vkey.json",
    wasm_url: "/aadhar_validation/aadhaar-verifier.wasm",
  }}>
    <div  className="modal-overlay">
      <div className="modal-content">
      <div>
        <h1>Upload Aadhar card for atleast one traveller</h1>
        <div>
          <input type="file" onChange={onFileChange} />
           <div className="button-container-2">
             <div className='submit-container'>
              <LogInWithAnonAadhaar nullifierSeed={1234} class="btn-aadhaar"/> 
              {/* <button onClick={onFileUpload} class="button">Validate Aadhar</button> */}
         </div>
            <div className='submit-container'>
        <button onClick={onClose} class="button">Close</button>
        
        </div>
         </div>
        </div>
        {fileData()}
        {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
      </div>
      </div>
      </div>
    </AnonAadhaarProvider>
)
};

export default AuthenticateTraveller;
