import React from "react";
import '../../styles/Navbar.css';
import '../../styles/Cards.css';
import '../../styles/sidebar.css';
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
    CardContent
  } from "@mui/material";

import { getCategories } from "../admin/admin";
import { NavContext } from '../navigationContext/navigationContext.jsx';
import SideBarNotification from './sideBarNotification.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';

const BookingForm = () =>{

}
export default BookingForm