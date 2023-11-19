import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const navigate = useNavigate();

  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
//    const userInfo = {
//     "_id": "6540869619a2569f499bc028",
//     "name": "sem ru",
//     "email": "sem@exp.com",
//     "password": "$2a$10$jNxY2NXkOCuQPa/nIVXIA.qKcJZDYfvAHRlrKpvSRfIOIxs3M80H2",
//     "pic": "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
//     "__v": 0
// }
    setSearchResult(userInfo);

    if (!userInfo) {
        navigate("/home");
    }
  }, [navigate]
  );

  return (
    <ChatContext.Provider value={{ searchResult, setSearchResult, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
