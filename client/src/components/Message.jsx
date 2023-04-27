import { Avatar, Box  } from "@chakra-ui/react";
import React from "react";
import useAuthGlobal from "../State/useAuthGlobal";


const Message = ({ props , children}) => {
  
  const [name, updateName] = useAuthGlobal((state) => [
    state.name,
    state.updateName,
  ]);


  return (
    <Box
      style={ 
        props.from === name
          ? { clear: "both", float: "right" }
          : { clear: "both", float: "left" }
      }
      display={'flex'} gap={3} alignItems={'center'} m={2}
    >
      {props.from === name ? null : <Avatar size={'sm'}></Avatar>}
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
