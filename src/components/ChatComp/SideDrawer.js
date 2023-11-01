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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { TabPanel, TabList, TabContext } from "@mui/lab";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [open, setOpen] = useState(false);

  const {
    setSelectedChat,
    user,
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

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(searchResult);
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      console.log("Set chat error" + error.message);
    }

  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
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
      //onClose();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Box sx={{ margin: "2rem" }}>
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
            // onClick={toggleDrawer(false)}
            // onKeyDown={toggleDrawer(false)}
          >
            <Box d="flex" pb={2}>
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
              "<ChatLoading />"
            ) : (
              searchResult?.map((user) => (
                
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat 
            // && <Spinner ml="auto" d="flex" />
            }
          </Box>
        </Drawer>
        <TabContext value={value}>
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
          <TabPanel value="1">Chats</TabPanel>
          <TabPanel value="2">Files</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default SideDrawer;
