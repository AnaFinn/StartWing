import React, { useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Link } from "react-router-dom";
import BackIcon from "../../assets/back_arr.png"
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Alert, Typography, Divider } from "@mui/material";
import { getSender } from "../../config/ChatLogics";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/system";
import SideDrawer from "./SideDrawer";

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
      backgroundColor={"#E9F3FA"}
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
        <Link to={`/browse`}>
          <img style={{width:"30px"}} className="back-icon" src={BackIcon} />
        </Link>

        {searchResult && <SideDrawer />}
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.8rem",
            color: "#005892",
          }}
        >
          My Chats
        </Typography>
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
          padding: 2,
          backgroundColor: "#E9F3FA",
          width: "100%",
          //height:"30rem",
          borderRadius: "10px",
          borderWidth: "2px",
          borderColor: "black",
          overflow: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none", // For WebKit (Chrome, Safari, etc.)
          },
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
                    selectedChat === chat ? "#CBDCFD" : "#E8E8E8",
                  color: selectedChat === chat ? "#005892" : "gray",
                  paddingX: 3,
                  paddingY: 2,
                  borderRadius: "10px",
                  marginY: "2px",
                }}
                key={chat._id}
              >
                <Typography sx={{ fontWeight: "", fontSize: "1.1rem" }}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography
                    sx={{
                      marginTop: "6px",
                      fontSize: "0.9rem",
                      //color: "gray",
                    }}
                  >
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
