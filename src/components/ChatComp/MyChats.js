import React, { useEffect } from "react";
import { useState, axios } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Alert } from "@mui/material";

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, setUser, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorizaton: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/communication", config);
      setChats(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  
  return <div>My chats</div>;
};

export default MyChats;
