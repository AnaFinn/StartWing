import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowNavBars = ({ children }) => {
  const location = useLocation();

  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    if (location.pathname === "/home" || location.pathname === "/communication") {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  });
  return <div>{showNavBar && children}</div>;
};

export default ShowNavBars;
