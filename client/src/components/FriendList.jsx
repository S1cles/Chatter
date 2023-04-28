import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserTab from "./UserTab";
import useAuthGlobal from "../State/useAuthGlobal";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const FriendList = () => {
  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);
  const [name] = useAuthGlobal((state) => [state.name]);
  const [token] = useAuthGlobal((state) => [state.token]);

  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuth);
    const verify = async () => {
      try {
        if (!token) {
          return console.log("No token");
        }
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getAllUsers`
        );
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        type="button"
        onClick={onOpen}
        key={"full"}
        colorScheme="orange"
        mr={2}
      >
        Friend List
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={"sm"}>
        <DrawerOverlay />
        <DrawerContent background={"#11061f"}>
          <DrawerCloseButton />
          <DrawerHeader
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            {" "}
            <Avatar
              border={"2px solid white"}
              src={`/avatar/${name}.png`}
            ></Avatar>
            <Text color={"white"}>
              {" "}
              {name?.length >= 15 ? name?.slice(0, 15) + "..." : name}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} flexDirection={"column"} flex={1} h={"85vh"}>
              <Box
                margin={"0 auto"}
                p={2}
                alignItems={"center"}
                gap={3}
                display={"flex"}
              ></Box>
              <Box
                maxH={"100%"}
                overflow={"auto"}
                gap={5}
                display={"flex"}
                flexDirection={"column"}
              >
                {allUsers.map((user) =>
                  user !== name ? (
                    <UserTab onClose={onClose} name={user} key={user} />
                  ) : null
                )}
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FriendList;
