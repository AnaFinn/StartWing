import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Tab
} from "@mui/material";
import { TabPanel, TabList,TabContext } from '@mui/lab';

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../styles/Home.css";

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [navigate]);


  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: "40px",
          backgroundColor: "#F5F9FC",
          color:"#005892",
          display: "flex",
          borderRadius: "12px",
          borderWidth: "1px",
          justifyContent: "center",
        }}
      >
        <h2>StartWing</h2>
      </Box>
      <Box
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: "15px",
          backgroundColor: "#F5F9FC",
          borderRadius: "12px",
          borderWidth: "1px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom:"1em",margin:"auto" }}>
            <TabList onChange={handleChange} aria-label="">
              <Tab sx={{width:"50%"}} label="Login" value="1" />
              <Tab sx={{width:"50%"}} label="Sign up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><Login/></TabPanel>
          <TabPanel value="2"><Signup/></TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Home;
