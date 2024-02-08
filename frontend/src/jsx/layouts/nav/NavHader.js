import React, { useState } from "react";
import { useDispatch , useSelector } from 'react-redux';

/// React router dom
import { Link } from "react-router-dom";

//
import { navtoggle } from "../../../store/actions/AuthActions";

/// images
import logo from "../../../images/dreamhomelogo.jpg";
import logoText from "../../../images/dreamhomelogo.jpg";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   const dispatch = useDispatch();
   const sideMenu = useSelector(state => state.sideMenu);
   const handleToogle = () => {
     dispatch(navtoggle());
   };
   return (
      <div className="nav-header">
         <Link to="/" className="brand-logo">
            {/* <img className="logo-abbr"src={logo}  alt="FRC" /> */}
            <img className="logo-compact"src={logo}   alt="FPC PORTAL"/>
            <img className="brand-title" src={logo}   alt="FPC PORTAL"/>         
         </Link>

         <div className="nav-control" 
            onClick={() =>{
               setToggle(!toggle)
               handleToogle()
            }}               
         >
            <div className={`hamburger ${sideMenu ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
