import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import {
  Box,
  Button,
  Tooltip,
  TextField,
  Input,
  Tab,
  Drawer,
  Divider,
  ListItem,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Avatar,
  CircularProgress
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import ChatLoading from "../UIElements/ChatLoading";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [thisSeacrhResult, setThisSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [open, setOpen] = useState(false);

  const {
    setSelectedChat,
    searchResult,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  const [value, setValue] = useState("1");

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("userInfo"));
      console.log({ user });
      const config = {
        headers: {
          Authorization: `Bearer ${
            searchResult?.token ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDA4NmM0MTlhMjU2OWY0OTliYzAyYiIsImlhdCI6MTY5ODcyNzY3MSwiZXhwIjoxNzAxMzE5NjcxfQ.phNsAIxBqPWWoatX7wErhS-mhxyJd1pKEhGJbVJKRB4"
          } `,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setThisSearchResult(data);
      console.log(thisSeacrhResult);
    } catch (error) {
      console.log(error.message);
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${
            searchResult?.token ||
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDA4NmM0MTlhMjU2OWY0OTliYzAyYiIsImlhdCI6MTY5ODcyNzY3MSwiZXhwIjoxNzAxMzE5NjcxfQ.phNsAIxBqPWWoatX7wErhS-mhxyJd1pKEhGJbVJKRB4"
          }`,
        },
      };
      const { data } = await axios.post(
        `/api/communication`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
      console.log(data);
      console.log(chats);
    } catch (error) {
      setOpen(false);
      console.log(error.message);
    }
  };
  return (
    <div>
      <Box >
        <Tooltip title="Search chat">
          <Button size="small" variant="ghost" onClick={toggleDrawer(true)}>
            <SearchIcon fontSize="large" />
            {/* <TextField
              size="small"
              id="outlined-basic"
              label="Search User"
              variant="outlined"
            ></TextField> */}
          </Button>
        </Tooltip>
        <Drawer open={open} onClose={toggleDrawer(true)}>
          <Box
            role="presentation"
            //onClick={toggleDrawer(false)}
            // onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{d:"flex", paddingTop:6}}>
              <TextField
                size="small"
                id="outlined-basic"
                label="Search User"
                variant="outlined"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></TextField>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              thisSeacrhResult.map((searchResult) => (
                <UserListItem
                  key={searchResult._id}
                  searchResult={searchResult}
                  handleFunction={() => accessChat(searchResult._id)}
                />
              ))
            )}
            {loadingChat && (
              <Box
                sx={{ display: "flex", height: 250, justifyContent: "center" }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Drawer>
        {/* <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "1em",
              margin: "auto",
            }}
          >
            <TabList onChange={handleChange} aria-label="">
              <Tab sx={{ width: "50%" }} label="Chats" value="1" />
              <Tab sx={{ width: "50%" }} label="Files" value="2" />
            </TabList>
          </Box>

        </TabContext> */}
      </Box>
    </div>
  );
};

export default SideDrawer;
