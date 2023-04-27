import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FriendList from "../FriendList";

const MyInput = ({ handleInput }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleInput(message);
      setMessage("");
      return;
    } else {
      return;
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };

  return (
    <form onSubmit={(e) => sendMessage(e)} style={{ width: "100%" }}>
      <Flex alignItems="center" justify="space-between">
      <FriendList />
        <InputGroup size="md" width="100%">
          <Input
            width="100%"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <InputRightElement width="4.5rem">
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </form>
  );
};

export default MyInput;
