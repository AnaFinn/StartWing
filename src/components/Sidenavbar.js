import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../assets/account.png';
import SettingPic from '../assets/setting.png';
import ExitPic from '../assets/exit.png';
import '../styles/Sidebar.css';

function Sidenavbar() {
  return (
    <div className = "sidebar">
      <div className="top"><img className = "profilePic" src = {ProfilePic}/></div>
      <div className="mid">
        <Link to="/"> Dashboard </Link>
        <Link to="/browse"> Browse </Link>
        <Link to="/communication"> Communication </Link>
      </div>
      <div className="bot">
        <Link><img className = "set-pic" src = {ProfilePic}/></Link>
        <Link><img className = "set-pic" src = {SettingPic}/></Link>
        <Link><img className = "set-pic" src = {ExitPic}/></Link>
      </div>
    </div>
  )
}

export default Sidenavbar
