import React from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
const NavBar = () => {
  const navigate = useNavigate();

  const [updateIsAuth] = useAuthGlobal((state) => [state.updateIsAuth]);
  const [updateToken] = useAuthGlobal((state) => [state.updateToken]);
  const [updateName] = useAuthGlobal((state) => [state.updateName]);

  const Logout = () => {
    window.localStorage.removeItem("isAuth");
    window.localStorage.removeItem("token");
    updateIsAuth(false);
    updateToken(null);
    updateName(null)
    navigate("/register");
  };



  return (
    <Box>
      <Container
        maxW={{ base: "full", md: "8xl", lg: "8xl" }}
        padding={2}
        h={"80px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Img src="/Logo.png" width={"auto"} p={0} m={0} h={"80px"} />
          <Text fontSize={"2xl"} ml={-5} fontFamily="Bruno Ace SC">
            KillaChat
          </Text>
        </Box>
        <Box display={"flex"} gap={5}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              color={"#f6aa35"}
              icon={<IoIosSettings />}
              variant="outline"
            />
            <MenuList>
              <Link to={"/chat"}>
                <MenuItem>Chat</MenuItem>
              </Link>
              <Link to={"/avatar"}>
                <MenuItem>Avatar</MenuItem>
              </Link>
              <Link to={"/password"}>
                <MenuItem>Change password</MenuItem>
              </Link>
            </MenuList>
          </Menu>
          <Button
            color={"red"}
            bg={"inherit"}
            border={"1px solid red"}
            onClick={() => Logout()}
          >
            <AiOutlinePoweroff />
          </Button>
        </Box>
      </Container>
      <hr />
      <Box
        display={"flex"}
        justifyContent={"center"}
        m={5}
        alignItems={"center"}
        gap={10}
      ></Box>
    </Box>
  );
};

export default NavBar;
