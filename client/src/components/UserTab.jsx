import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import useChat from '../State/useChat'

const UserTab = ({ name }) => {

  const [currentChat, updateChat] = useChat((state) => [
    state.currentChat,
    state.updateChat,
  ]);
  return (
    <Box
      display={"flex"}
      gap={"20px"}
      padding={5}
      alignItems={"center"}
      h={"80px"}
      border={"1px solid white"}
      onClick={()=> updateChat(name)}
    >
      <Avatar src={`/avatar/${name}.png`}></Avatar>
      <Text fontSize={"xl"}>{name}</Text>
    </Box>
  );
};

export default UserTab;
