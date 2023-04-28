import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import DragDrop from "./DragDrop/DragDrop";
import { Box, Button } from "@chakra-ui/react";
import useAuthGlobal from "../State/useAuthGlobal";

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const fileTypes = ["PNG"];

  const [token] = useAuthGlobal((state) => [state.token]);

  const fileData = new FormData();

  const handleChange = (files) => {
    setFile(files);
  };

  const handleSkinFile = async () => {
    if (file === null) {
      return console.log("file not loaded");
    } else {
      fileData.set("skin", file);
      fileData.set("name", props.name);
      axios.defaults.headers.common["x-auth-token"] = token;
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/upload`, fileData)
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <FileUploader
        className={"upload"}
        handleChange={handleChange}
        name="file"
        maxSize={10}
        types={fileTypes}
        children={<DragDrop t1="Drag your image" t2="PNG" />}
      />

      <Button m={3} onClick={handleSkinFile} bg={"rgb(158, 41, 190)"}>
        Upload
      </Button>
    </Box>
  );
};

export default Upload;
