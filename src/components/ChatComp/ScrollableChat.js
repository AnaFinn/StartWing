import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChatProvider";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
  isSameSenderMargin,
} from "../../config/ChatLogics";

const ScrollableChat = ({messages}) => {
  const { searchResult } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex",}} key={m._id}>
            {(isSameSender(messages, m, i, searchResult._id) ||
              isLastMessage(messages, i, searchResult._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === searchResult._id ? "#F7EEE0" : "#E9F3FA"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, searchResult._id),
                marginTop: isSameUser(messages, m, i, searchResult._id) ? 3 : 15,
                borderRadius: "10px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginRight:"15px",
                marginBottom:"10px"
                
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
