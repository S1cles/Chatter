import React, { useEffect } from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import jwtName from "../utils/user";
import UserTab from "./../components/UserTab";
import Message from "./../components/Message";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);
  const [token, updateToken] = useAuthGlobal((state) => [
    state.token,
    state.updateToken,
  ]);

  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    const localIsAuth = window.localStorage.getItem("isAuth");
    updateIsAuth(localIsAuth);
    updateToken(localToken);
  }, []);

  useEffect(() => {
    console.log(isAuth);
    const verify = async () => {
      try {
        if (!token) {
          return console.log("No token");
        }
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.get("http://localhost:5555/api/test");
        if (res.status === 401) {
          updateIsAuth(false);
        } else {
          updateIsAuth(true);
        }
      } catch (err) {
        console.error(err);
        useAuthGlobal.updateIsAuth(() => false);
      }
    };
    verify();
  }, [token]);

  const getUsers = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios
        .get("http://localhost:5555/api/test")
        .then((res) => console.log(res.data.user));
      return console.log(res);
    } catch (error) {
      navigate("/register");
    }
  };

  return (
    <div >
      {isAuth ? (
        <Container
          maxW={"8xl"}
          minH={"80vh"}
          bg={"#131320"}
          borderRadius={"20px"}
          display={"flex"}
          justifyContent={"space-between"}
          p={0}
          overflow={"auto"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            flex={1}
            border={"1px solid blue"}
          >
            <Avatar
              margin={"0 auto"}
              width={"auto"}
              padding={1}
              color={"blackAlpha.500"}
            >
              {jwtName?.user?.name?.length >= 12
                ? jwtName?.user?.name.slice(0, 12) + "..."
                : jwtName?.user?.name}
            </Avatar>
            <UserTab name={"name"} image={"#"} />
            <UserTab name={"name"} image={"#"} />
            <UserTab name={"name"} image={"#"} />
          </Box>
          <Box flex={4} border={"1px solid green"} flexDirection={"column"}>
            <Box flex={2} minH={"80vh"} padding={"50px 50px 0px 50px"}>
              <Message name={jwtName.user.name}>123123</Message>
              <Message name={"1231232"}>12312312312321312321321312</Message>
              <Message name={"123123"}>123123</Message>
              <Message name={jwtName.user.name}>
                12312321738128312378127312731298321398123123fudshbnfsdnfjsdnfdsmflsdmflksdfksldfmlsdlfkmlskdfmsdldsadasdasdasdasdasdasdasdassdsdadasdasdasdasdas
              </Message>
            </Box>
            <Box display={"flex"} flex={" 1 100%"} width={"100% "}>
              <InputGroup size="md">
                <Input />
                <InputRightElement width="4.5rem">
                  <Button mt={4} colorScheme="teal" margin={"0 auto"}>
                    Submit
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Box>
        </Container>
      ) : (
        // </Container>
        navigate("/register")
      )}
    </div>
  );
};

export default ChatPage;
