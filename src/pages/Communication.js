import React, { useEffect, useState } from "react";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/ChatComp/SideDrawer";
import MyChats from "../components/ChatComp/MyChats";
import ChatBox from "../components/ChatComp/ChatBox";
import { Box } from "@mui/material";
function Communication() {
  const { user } = ChatState();

  return (
    <div>
      {<SideDrawer/>}
      <Box sx={{
        display: "flex",
        justifyContent:"space-between",
        width:"100%",
      }}>
        {<MyChats />}
        {<ChatBox />}
      </Box>
    </div>
  );
}

export default Communication;
