import React, { useEffect, useState } from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import { Link, useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { Avatar, Box } from "@chakra-ui/react";
import DragDrop from "../components/DragDrop/DragDrop";
import MyLinkButton from './../components/MyLinkButton/MyLinkButton';
const AvatarPage = () => {
  const navigate = useNavigate();
  const fileTypes = ["JPG", "PNG"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);

  function checkAuth() {
    if (isAuth === false) {
      navigate("/register");
    }
  }

  useEffect(() => {
    checkAuth();
  }, [isAuth]);

  return (
    <Box>
      <Box
        gap={10}
        flexDirection={"column"}
        alignItems={"center"}
        padding={20}
        display={"flex"}
        justifyContent={"center"}
      >

        <Avatar
          src="https://bit.ly/dan-abramov"
          name={"1"}
          size={"6xl"}
        ></Avatar>

        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          children={<DragDrop t1="Drag your image" t2="PNG" />}
        />
              <MyLinkButton to={'/chat'}>
        Back
      </MyLinkButton>
      </Box>

    </Box>
  );
};

export default AvatarPage;
