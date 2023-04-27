import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";

const MyInput = ({ handleInput }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleInput(message);
      setMessage('');
      return
    } else {
      return;
    }
  };
  return (
    <form onSubmit={(e) => sendMessage(e)}>
      <InputGroup size="md">
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <InputRightElement width="4.5rem">
          <Button type="submit" mt={4} colorScheme="teal" margin={"0 auto"}>
            Submit
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MyInput;
