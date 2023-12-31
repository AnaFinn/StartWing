import { Avatar, Box } from "@mui/material"
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ searchResult, handleFunction }) => {
 
 // const { searchResult } = ChatState();
  console.log(searchResult);
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={searchResult.name}
        src={searchResult.pic}
      />
      <Box>
        <h4>{searchResult.name}</h4>
        <p>
          <b>Email : </b>
          {searchResult.email}
        </p>
      </Box>
    </Box>
  );
};

export default UserListItem;