import React, { useState } from "react";
import axios from "axios";
import useAuthGlobal from "../State/useAuthGlobal";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";

const ChangePasswordPage = () => {
  const [token, updateToken] = useAuthGlobal((state) => [
    state.token,
    state.updateToken,
  ]);
  const [ updateName] = useAuthGlobal((state) => [
    state.updateName,
  ]);
  const emailJWT = jwt_decode(token).user.email;
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const [updateIsAuth] = useAuthGlobal((state) => [
    state.updateIsAuth,
  ]);

  const handlePassChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handlePassConfirmChange = (event) => {
    setNewPasswordConfirm(event.target.value);
  };
  const handlePasswordChange = async () => {
    try {
      if (newPassword !== newPasswordConfirm) {
        return alert("Password compare fail");
      }
      if (newPassword.length >= 25) {
        return alert("Your password is too long (max 26)");
      }
      if (newPassword.length < 6) {
        return alert("Your password is too short (min 6)");
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/password`, {
        email: emailJWT,
        newPassword: newPassword,
      });
      alert(response.data.message);
      Logout();
    } catch (error) {
      console.log("Password change fail");
    }
  };

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
      <Box
        textAlign={"center"}
        maxW={"xl"}
        margin={"0 auto"}
        display={"flex"}
        flexDirection={"column"}
        gap={"50px"}
      >
        <Box>
          <Text fontSize={"xl"}> Your new password</Text>{" "}
          <Input
            label="Your new password"
            type="password"
            onChange={handlePassChange}
            value={newPassword}
          />
        </Box>

        <Box>
          {" "}
          <Text fontSize={"xl"}> Confirm new password</Text>
          <Input
            label="Confirm your password"
            type="password"
            onChange={handlePassConfirmChange}
            value={newPasswordConfirm}
          />
        </Box>

        <Button onClick={handlePasswordChange}>Submit</Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordPage;
