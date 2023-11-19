import React, { useEffect, useState } from "react";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/ChatComp/SideDrawer";
import MyChats from "../components/ChatComp/MyChats";
import ChatBox from "../components/ChatComp/ChatBox";
import { Box } from "@mui/material";
function Communication() {
  const {searchResult}=ChatState();
  const [fetchAgain, setFetchAgain]  = useState(false);
  return (
    <div style={{width:"100%"}}>
      {searchResult&&<SideDrawer/>}
      <Box sx={{
        display: "flex",
        justifyContent:"space-between",
        width:"100%",
        height: "82vh"
      }}>
        {searchResult&&<MyChats fetchAgain={fetchAgain}/>}
        {searchResult&&<ChatBox fetchAgain={fetchAgain}/>}
      </Box>
    </div>
  );
}

export default Communication;
