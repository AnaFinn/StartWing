import React from 'react';
import Logo from '../assets/wings_logo.png';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';
function Navbar() {
  return (
    <div className="navbar">
        <div className="leftSide">
        <img src={Logo}/>
        </div>
        <div className="rightSide">
            <Link to="/"> About us </Link>
            <Link to="/menu"> Terms and services </Link>
            <Link to="/about"> Guied </Link>
        </div>
    </div>
  )
}

export default Navbar
