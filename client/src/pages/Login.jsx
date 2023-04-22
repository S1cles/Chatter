import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.minimal.css";
import useAuthGlobal from "../State/useAuthGlobal";

const Login = () => {
  const resolver = async (values) => {
    return {
      values: values.Email ? values : {} || values.Password ? values : {},
      errors: !values.Email
        ? {
            Email: {
              type: "required",
              message: "Invalid email",
            },
          }
        : !values.Password ||
          values.Password.length < 6 ||
          values.Password.length > 25
        ? {
            Password: {
              type: "required",
              message: "(min6 max25).",
            },
          }
        : {},
    };
  };

  const validatePassword = (value) => {
    return (value.length >= 6 && value.length <= 25) || "min 6 max 25";
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });


  const [isAuth, updateIsAuth] = useAuthGlobal(
    (state) => [state.isAuth, state.updateIsAuth],
  )
  const [token, updateToken] = useAuthGlobal(
    (state) => [state.token, state.updateToken],
  )
    const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_API_URL}/api/login`, {
          email: data.Email,
          password: data.Password,
        })
        .then((res) => {
          
          const token = res.data.token;
          console.log(res.data);
          updateIsAuth(true);
          updateToken(token);
          window.localStorage.setItem('isAuth', res.data.isAuth)
          window.localStorage.setItem('token', res.data.token)
          navigate("/chat");
        })
        .catch(navigate("/register"));
      return response;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
      throw error;
    }
  });

  return (
    <TabPanel padding={0}>
      <form onSubmit={onSubmit}>
        <Text fontSize={32} mb={5}>
          Login
        </Text>
        <InputGroup mt={5}>
          <InputLeftAddon children="Email" />
          <Input
            variant="filled"
            type={"email"}
            {...register("Email", { required: true })}
            placeholder="yourtruemail@gmail.com"
          />
        </InputGroup>
        {errors?.Email && (
          <Text color={"red"} fontSize={24}>
            {errors.Email.message}
          </Text>
        )}
        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Password" />
          <Input
            variant="filled"
            type={"password"}
            {...register("Password", {
              required: true,
              validate: validatePassword,
            })}
            placeholder="***********"
          />
        </InputGroup>
        {errors?.Password && (
          <Text color={"red"} fontSize={14}>
            {errors.Password.message}
          </Text>
        )}

        <Button
          mt={"20px"}
          variant={"outline"}
          color={"cyan"}
          type="submit"
          w={"100%"}
        >
          Login
        </Button>
      </form>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </TabPanel>
  );
};

export default Login;
