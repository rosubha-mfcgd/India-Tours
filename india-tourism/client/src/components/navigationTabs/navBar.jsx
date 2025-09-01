import { NavLink } from "react-router-dom";
import '../../styles/Navbar.css';
const NavBar = () =>{

    const navLinkStyles = ({isActive})=>{
            return {
                fontWeight:isActive?'bold':'normal',
                textDecoration:isActive?'none':'underline',
            }
        }

        const activeState = ({ isActive, isPending }) => {
            return {
            color: isPending ? "rgb(253 230 138)" : "",
            backgroundColor: isActive ? "rgb(69 26 3)" : "",
            fontWeight: isActive ? "bold" : ""
            };
          };
    return (
        <div>
        <nav className="navbar">
             
         <NavLink style={navLinkStyles} to='/hillstation'>Hill Stations</NavLink>
         <NavLink style={navLinkStyles}>Sea Beaches</NavLink>
         <NavLink style={navLinkStyles}>Desert Safari</NavLink>
         <NavLink style={navLinkStyles}>My Choice</NavLink>
        </nav>
        </div>

    )
}
export default NavBar;