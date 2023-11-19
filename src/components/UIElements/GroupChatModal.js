import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Alert
} from "@mui/material";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [thisSeacrhResult, setThisSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchResult, chats, setChats } = ChatState();


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${searchResult?.token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDA4NmM0MTlhMjU2OWY0OTliYzAyYiIsImlhdCI6MTY5ODcyNzY3MSwiZXhwIjoxNzAxMzE5NjcxfQ.phNsAIxBqPWWoatX7wErhS-mhxyJd1pKEhGJbVJKRB4"} `,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setThisSearchResult(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      alert("Please fill in all the fields")
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${searchResult.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/communication/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      alert("New group chat created")
    } catch (error) {
      alert("failed to create chat")
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("user already added")
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: "1rem" }}
            >
              Create group chat
            </Typography>
            <FormControl variant="standard">
              <Input
                id="component-simple"
                placeholder="Chat name"
                sx={{ marginBottom: "1rem" }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl variant="standard">
              <Input
                id="component-simple"
                placeholder="Add users by typing in their names"
                sx={{ marginBottom: "1rem" }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
                <div>Loading</div>
            ) : (
                thisSeacrhResult?.slice(0,4).map((searchResult) => <UserListItem key={searchResult._id} searchResult={searchResult} handleFunction={()=>handleGroup(searchResult)}/>)
            )}
            <Box>
              <Button onClick={handleSubmit} sx={{ mt: 2 }}>
                Create
              </Button>
              <Button onClick={handleSubmit} sx={{ mt: 2, color: "red" }}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default GroupChatModal;
