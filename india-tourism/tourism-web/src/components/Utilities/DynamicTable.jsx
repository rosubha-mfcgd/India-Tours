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
    IconButton,
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
    DialogActions
  } from "@mui/material";
import React, { useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBooking from "../modal/editBooking";

const DynamicTable = ({ columns, data, setData }) =>{

  // State for dialog management
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // stores the item being edited
  const [editIndex,setEditIndex] = useState(null);
  // --- DELETE Function ---
  const handleDelete = (index) => {
    let rowcount = 0;
    const result = [];
    for(let output of data)
    {
      if(index !== rowcount)
      {
        result.push(output);
      }
      rowcount++;
    }
    setData(result);
   // setData(data.filter(item => item.id !== id));
  };


   const updateBookingData = (updatedData) =>{
    console.log('updated data in dynamice table...',updatedData)
      setEditingItem(updatedData);
      let result = [];
      let index = 0;
    for(let output of data)
    {
      if(index !== editIndex)
      {
        result.push(output);
      }else{
        result.push(updatedData);
      }
    }
    setData(result);
      setOpenDialog(false);
  }

  // --- EDIT Function ---
  const handleEdit = (item,index) => {
    setEditingItem(item);
    setEditIndex(index);
    setOpenDialog(true);
  };
      return(
        <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            <TableCell key="Edit"><Typography variant="body2" color="text.secondary">Edit</Typography></TableCell>
             <TableCell key="Delete"><Typography variant="body2" color="text.secondary">Delete</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.field} component="th" scope="row">
                  {row[column.field]}
                </TableCell>
                
              ))}
              <TableCell key={"edit-"+index}>
              <IconButton onClick={() => handleEdit(row,index)} color="primary">
                  <EditIcon />
                </IconButton>
                </TableCell>
                <TableCell key={"delete-"+index}>
                <IconButton onClick={() => handleDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          {
            openDialog ? 
            <EditBooking isOpen={openDialog} onClose={() => setOpenDialog(false)}
    updateBookingData = {updateBookingData}  editingItem = {editingItem} 
     />
        
        :<div/> 
          }
    </div>
      )
    }

    export default DynamicTable