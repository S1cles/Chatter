import React from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import { Link, useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoIosSettings } from "react-icons/io";
// import { jwtName } from './../utils/user';
const NavBar = () => {
  const navigate = useNavigate();

  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);
  const [token, updateToken] = useAuthGlobal((state) => [
    state.token,
    state.updateToken,
  ]);
  const Logout = () => {
    window.localStorage.removeItem("isAuth");
    window.localStorage.removeItem("token");
    updateIsAuth(false);
    updateToken(null);
    navigate("/register");
  };

  // const jwtName = 'sadjaksbbdkabsdasbdasbdhkbasjdnaskjdnasjndasjndasjkdsna'

  return (
    <Box>
      <Container
        maxW="6xl"
        h={"80px"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<IoIosSettings />}
            variant="outline"
          />
          <MenuList>
            <Link to={"/avatar"}>
              <MenuItem>Avatar</MenuItem>
            </Link>
            <MenuItem command="⌘N">New Window</MenuItem>
            <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
            <MenuItem command="⌘O">Open File...</MenuItem>
          </MenuList>
        </Menu>
        <Button bg={"red.300"} color={"black"} onClick={() => Logout()}>
          Log out
        </Button>
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
