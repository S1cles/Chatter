import { Avatar, Box } from "@chakra-ui/react";
import React from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import useChat from "../State/useChat";

const Message = ({ props, children }) => {
  const [name] = useAuthGlobal((state) => [
    state.name,
    state.updateName,
  ]);
  const [currentChat] = useChat((state) => [
    state.currentChat,
  ]);


  return (
    <Box
      style={
        props.from === name
          ? { clear: "both", float: "right" }
          : { clear: "both", float: "left" }
      }
      display={"flex"}
      gap={3}
      alignItems={"center"}
      m={2}
    >
      {props.from === name ? null : <Avatar src={`/avatar/${currentChat}.png`} size={'sm'}></Avatar>}
      <Box
        style={
          props.from === name
            ? { border: "1px solid rgb(158, 41, 190)" }
            : { border: "2px solid rgb(246, 50, 50)" }
        }
        borderRadius={"10px"}
        p={5}
        whiteSpace={"wrap"}
        maxWidth={"50vw"}
        background={'Background'}
        filter={'drop-shadow(0 0 0.25rem crimson)'}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Message;
