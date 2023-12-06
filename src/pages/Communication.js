import React, { useEffect, useState } from "react";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/ChatComp/SideDrawer";
import MyChats from "../components/ChatComp/MyChats";
import ChatBox from "../components/ChatComp/ChatBox";
import { Box, Divider } from "@mui/material";
function Communication() {
  const {searchResult}=ChatState();
  const [fetchAgain, setFetchAgain]  = useState(false);
  return (
    <div>
      {/* {searchResult&&<SideDrawer/>} */}
      <Box sx={{
        display: "flex",
        flexDirection:"row",
        //justifyContent:"space-between",
        width:"100%",
        height: "88vh",
        
      }}>
        {searchResult&&<MyChats fetchAgain={fetchAgain}/>}
        <Divider orientation="vertical" variant="middle" flexItem />
        {searchResult&&<ChatBox fetchAgain={fetchAgain}/>}
      </Box>
    </div>
  );
}

export default Communication;
