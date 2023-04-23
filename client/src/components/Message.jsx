import { Avatar, Box, position } from "@chakra-ui/react";
import React from "react";
import jwtName from "../utils/user";

const Message = ({ name, children }) => {
  return (
    <Box
      style={
        name === jwtName.user.name
          ? { clear: "both", float: "right" }
          : { clear: "both", float: "left" }
      }
      display={'flex'} gap={3} alignItems={'center'} m={2}
    >
      {name === jwtName.user.name ? null : <Avatar size={'sm'}></Avatar>}
      <Box
        border={"1px solid rgb(158, 41, 190)"}
        borderRadius={"10px"}
        p={5}
        whiteSpace={"wrap"}
        maxWidth={"40vw"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Message;
