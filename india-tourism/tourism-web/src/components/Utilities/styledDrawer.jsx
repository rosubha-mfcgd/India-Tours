import styled from "styled-components";
import {Drawer} from "@mui/material";
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: "#01130ad5" // Set your desired background color here
     },
    }));
export default StyledDrawer