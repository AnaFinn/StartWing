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
      padding: 3,
      backgroundColor: 'white',
      width: { base: '100%', md: '68%' },
      borderRadius: 'lg',
      borderWidth: '1px',
     //height:"100vh"
    }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};


export default ChatBox
