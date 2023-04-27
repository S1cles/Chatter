import React from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Text } from "@chakra-ui/react";
import MyLinkButton from "./../components/MyLinkButton/MyLinkButton";
import Upload from "./../components/Upload";

const AvatarPage = () => {
  const navigate = useNavigate();

  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);
  const [name, updateName] = useAuthGlobal((state) => [
    state.name,
    state.updateName,
  ]);


  return (
    <Box>
      {isAuth ? (
        <Box
          gap={10}
          flexDirection={"column"}
          alignItems={"center"}
          padding={5}
          display={"flex"}
          justifyContent={"center"}
        >
          <Text fontWeight={"bold"} fontSize={"2xl"} m={0} padding={0}>
            {name}
          </Text>
          <Avatar
            src={`/avatar/${name}.png`}
            size={"3xl"}
            width={300}
            h={300}
          ></Avatar>

          <Upload name={name} />

          <MyLinkButton to={"/chat"}>Back</MyLinkButton>
        </Box>
      ) : (
        navigate("/register")
      )}
    </Box>
  );
};

export default AvatarPage;
