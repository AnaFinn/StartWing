import React from 'react'
import {ChatState} from "../../Context/ChatProvider";
import { Box, Button, Stack } from "@mui/material";
import SingleChat from './SingleChat';


const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
    sx={{
      display: { base: selectedChat ? 'flex' : 'none', md: 'flex' },
      alignItems: 'center',
      flexDirection: 'column',
      padding: "1rem",
      backgroundColor: 'white',
      width: { base: '100%', md: '68%' },
      borderRadius: '10px',
      borderWidth: '1px',
      backgroundColor:"#E8F2FA"
     //height:"100vh"
    }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};


export default ChatBox
