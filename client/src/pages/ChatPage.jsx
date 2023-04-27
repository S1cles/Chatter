import React, { useEffect, useState, useRef } from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import useChat from "../State/useChat";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import UserTab from "./../components/UserTab";
import Message from "./../components/Message";
import jwt_decode from "jwt-decode";
import Wallpaper from "../components/Wallpaper";
import MyInput from "./../components/MyInput/MyInput";
import { io } from "socket.io-client";
const ChatPage = () => {
  const socket = useRef();
  let scrollRef = useRef();
  const navigate = useNavigate();
  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);

  const [name, updateName] = useAuthGlobal((state) => [
    state.name,
    state.updateName,
  ]);
  const [token, updateToken] = useAuthGlobal((state) => [
    state.token,
    state.updateToken,
  ]);
  const [currentChat, updateChat] = useChat((state) => [
    state.currentChat,
    state.updateChat,
  ]);

  const [allUsers, setAllUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    console.log(isAuth);
    const verify = async () => {
      try {
        if (!token) {
          return console.log("No token");
        }
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.get("http://localhost:5555/api/getAllUsers");
        if (res.status === 401) {
          updateIsAuth(false);
          navigate("/register");
        } else {
          const users = res.data.user.map((user) => user.name);
          setAllUsers(users);
          updateIsAuth(true);
        }
      } catch (err) {
        console.error(err);
        updateIsAuth(false);
        navigate("/register");
      }
    };
    verify();
  }, []);
  useEffect(() => {
    socket.current = io("http://localhost:5555");
    socket.current.emit("add-user", name);
  }, [currentChat]);

  const [messages, setMessages] = useState([]);

  const handleInput = async (message) => {
    axios.defaults.headers.common["x-auth-token"] = token;
    await axios
      .post("http://localhost:5555/api/chat/addMessage", {
        from: name,
        to: currentChat,
        message: message,
      })
      .then((res) => setMessages(res.data));
    socket.current.emit("send-message", {
      to: currentChat,
      from: name,
      message: message,
    });
    const msgs = [...messages];
    msgs.push({ from: name, message: message });
    console.log(msgs);
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-recieve", (message) => {
        setArrivalMessage({ from: currentChat, message: message });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    async function fetchData() {
      if (currentChat) {
        const response = await axios.post(
          "http://localhost:5555/api/chat/getMessage",
          {
            from: name,
            to: currentChat,
          }
        );
        setMessages(response.data);
        console.log(response.data);
      }
    }
    fetchData();
  }, [currentChat]);

  // const getUsers = async () => {
  //   try {
  //     axios.defaults.headers.common["x-auth-token"] = token;
  //     const res = await axios.get("http://localhost:5555/api/getAllUsers");
  //     const users = res.data.user.map((user) => user.name);
  //     setAllUsers(users);
  //   } catch (error) {
  //     navigate("/register");
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUsers();
  // }, []);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {isAuth ? (
        <Container
          maxW={"8xl"}
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
            h={"85vh"}
          >
            <Box
              margin={"0 auto"}
              p={2}
              alignItems={"center"}
              gap={3}
              display={"flex"}
            >
              <Avatar
                border={"2px solid white"}
                src={`/avatar/${name}.png`}
              ></Avatar>
              <Text color={"white"}>
                {" "}
                {name?.length >= 12 ? name?.slice(0, 12) + "..." : name}
              </Text>
            </Box>
            <Box maxH={"100%"} overflow={"auto"}>
              {allUsers.map((user) =>
                user !== name ? <UserTab name={user} key={user} /> : null
              )}
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={"user"} />
              <UserTab name={null} />
            </Box>
          </Box>
          <Box flex={4} border={"1px solid green"} flexDirection={"column"}>
            {currentChat === null ? (
              <Box
                flex={2}
                minH={"80vh"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                padding={"50px 50px 0px 50px"}
              >
                <Wallpaper />
              </Box>
            ) : (
              <Box
                flex={2}
                minH={"80vh"}
                overflow={"auto"}
                maxH={"81vh"}
                padding={"50px 50px 0px 50px"}
              >
                {Array.isArray(messages) &&
                  messages.map((message) => (
                    <Message props={{ from: message.from }}>
                      {message.message}
                      <Box ref={messagesEndRef} />
                    </Message>
                  ))}
              </Box>
            )}

            <Box display={"flex"} flex={" 1 100%"} width={"100% "}>
              <MyInput handleInput={handleInput} currentChat={currentChat} />
            </Box>
          </Box>
        </Container>
      ) : (
        navigate("/register")
      )}
    </div>
  );
};

export default ChatPage;
