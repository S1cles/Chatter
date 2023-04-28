import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import useChat from "../State/useChat";

const UserTab = ({ name, onClose }) => {
  const [updateChat] = useChat((state) => [state.updateChat]);
  return (
    <Box
      display={"flex"}
      gap={"20px"}
      padding={5}
      alignItems={"center"}
      h={"80px"}
      // border={"1px solid white"}
      borderRadius={10}
      bg={"gray.500"}
      onClick={() => {
        updateChat(name);
        onClose();
      }}
    >
      <Avatar src={`/avatar/${name}.png`}></Avatar>
      <Text color={"black"} fontSize={"xl"}>
        {name}
      </Text>
    </Box>
  );
};

export default UserTab;
