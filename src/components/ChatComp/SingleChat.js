import React, { useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Typography,
  IconButton,
  FormControl,
  Input,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { useState } from "react";
import axios from "axios";
import io from "socket.io-client";
//import Lottie from "react-lottie";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    //animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { searchResult, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${searchResult.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error.message);
    }
  };


  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "content-Type": "Application/json",
            Authorization: `Bearer ${searchResult.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", searchResult);
    socket.on("connected", () => setSocketConnected(true));
    //socket.on("typing", () => setIsTyping(true));
   // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    // Set up event listeners
  
    return () => {
      // Clean up event listeners
      socket.off('disconnect');
    };
  }, []);


  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // if (!socketConnected) return;

    // if (!typing) {
    //   setTyping(true);
    //   socket.emit("typing", selectedChat._id);
    // }
    // let lastTypingTime = new Date().getTime();
    // var timerLength = 3000;
    // setTimeout(() => {
    //   var timeNow = new Date().getTime();
    //   var timeDiff = timeNow - lastTypingTime;
    //   if (timeDiff >= timerLength && typing) {
    //     socket.emit("stop typing", selectedChat._id);
    //     setTyping(false);
    //   }
    // }, timerLength);
  };

  return (
    <div style={{ width: "100%" }}>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              fontSize: { base: "28px", md: "30px" },
              paddingBottom: 3,
              paddingLeft: 2,
              width: "100%",
              fontFamily: "Work Sans",
              display: "flex",
              justifyContent: { base: "space-between" },
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                display: { base: "flex", md: "none" },
                backgroundColor: "black",
              }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(searchResult, selectedChat.users)}
                  {/* <ProfileModal
                    user={getSenderFull(searchResult, selectedChat.users)}
                  /> */}
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  {/* <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </>
              ))}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              // padding: 3,
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "65vh",
              borderRadius: "12px",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <Box
                sx={{ display: "flex", height: 250, justifyContent: "center" }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{ display: "flex-end", heigh: "400px", overflowY: "auto" }}
                className="messages"
              >
                <ScrollableChat messages={messages} />
              </Box>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              marginTop={3}
            >
              {istyping ? (
                <div>
                  {/* <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  /> */}
                </div>
              ) : (
                <></>
              )}
              <Input
                variant="filled"
                sx={{
                  backgroundColor: "#E0E0E0",
                  height: "50px",
                  padding: "1rem",
                  //position:"fixed"
                }}
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontFamily: "Work sans",
              color: "gray",
            }}
          >
            Click on the user to start chating
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;
