import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ProfilePic from "../assets/account.png";
import SettingPic from "../assets/setting.png";
import ExitPic from "../assets/exit.png";
import "../styles/Sidebar.css";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";

import axios from "axios";

function Sidenavbar() {
  const{searchResult} =ChatState();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("Logged user check", user)
  return (
    <div className="sidebar">
      <img className="profilePic" src={user.pic} />
      <Typography variant="h6" color={"#055E99"} mb={"35px"}>
           {user.name}
      </Typography>
      <div className="links">
        <Link to="/"> Dashboard </Link>
        <Link to="/browse"> Browse </Link>
        <Link to="/communication"> Communication </Link>
      </div>
      <div className="bot">
        <Link>
          <img className="set-pic" src={ProfilePic} />
        </Link>
        <Link>
          <img className="set-pic" src={SettingPic} />
        </Link>
        <Link>
          <img className="set-pic" src={ExitPic} />
        </Link>
      </div>
    </div>
  );
}

export default Sidenavbar;
