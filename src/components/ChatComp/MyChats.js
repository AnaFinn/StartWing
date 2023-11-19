import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Alert, Typography } from "@mui/material";
import { getSender } from "../../config/ChatLogics";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/system";

import axios from "axios";
import GroupChatModal from "../UIElements/GroupChatModal";
import ChatLoading from "../UIElements/ChatLoading";

const MyChats = ({ fetchAgain }) => {
  const theme = useTheme();
  const [loggedUser, setLoggedUser] = useState();
  const {
    selectedChat,
    setSelectedChat,
    searchResult,
    setSearchResult,
    chats,
    setChats,
  } = ChatState();
  console.log(chats);
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            searchResult?.token ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDA4NmM0MTlhMjU2OWY0OTliYzAyYiIsImlhdCI6MTY5ODcyNzY3MSwiZXhwIjoxNzAxMzE5NjcxfQ.phNsAIxBqPWWoatX7wErhS-mhxyJd1pKEhGJbVJKRB4"
          } `,
        },
      };
      const { data } = await axios.get("/api/communication", config);
      console.log("API Response:", data);
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    
    <Box
      display={{ xs: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      padding={3}
      bgcolor="white"
      width={{ xs: "100%", md: "31%" }}
      borderRadius={theme.shape.borderRadius}
      borderWidth={1}
      borderColor={theme.palette.divider}
      margin={0}
    >
      <Box
        sx={{
          paddingBottom: 3,
          paddingLeft: 3,
          fontSize: { xs: "28px", md: "30px" },
          fontFamily: "Work Sans",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            //rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          backgroundColor: "#F8F8F8",
          width: "100%",
          //height:"30rem",
          borderRadius: "lg",
          overflow: 'auto',
        }}
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                sx={{
                 
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#005892" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "#005892",
                  paddingX: 3,
                  paddingY: 2,
                  borderRadius: "15px",
                  marginY:"2px"
                }}
                key={chat._id}
              >
                <Typography sx={{ fontWeight: '', fontSize: '1.1rem' }}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography sx={{ marginTop: '6px', fontSize: '0.9rem', color:"#C37C15" }}>
                    <>{chat.latestMessage.sender.name}: </>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
