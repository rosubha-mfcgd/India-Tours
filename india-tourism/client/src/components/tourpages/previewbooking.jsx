import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
import '../../styles/bookingForm.css';
import { useEffect, useState, useContext } from "react";
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
    Typography,
    CardMedia,
    CardContent,
    FormGroup,
    FormControl,  
    Input,
    Switch,
    InputLabel,
    TextareaAutosize
  } from "@mui/material";

import { getCategories } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ClassNames } from "@emotion/react";

const PreviewForm = ({access_token,bookingDetails,triggerDisplayBookings}) =>{
    return(<div className = "center-container">
            <div className="original-content">
                <Box sx={{my:2}}>
                    <Typography variant="h4" sx = {{my:2}}></Typography>
                    

                </Box>

            </div>
    </div>)
}

export default PreviewForm;