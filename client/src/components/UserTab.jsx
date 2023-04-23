import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const UserTab = ({ userName, image }) => {
  return (
    <Box
      display={"flex"}
      gap={"20px"}
      padding={5}
      alignItems={"center"}
      h={"80px"}
      border={"1px solid white"}
    >
      <Avatar src={'image'}></Avatar>
      <Text fontSize={"xl"}>{'userName'}</Text>
    </Box>
  );
};

export default UserTab;
