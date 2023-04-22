import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const resolver = async (values) => {
    return {
      values: values.Name
        ? values
        : {} || values.Email
        ? values
        : {} || values.Password
        ? values
        : {} || values.ConfirmPassword
        ? values
        : {},
      errors: !values.Name
        ? {
            Name: {
              type: "required",
              message: "This is requred.",
            },
          }
        : values.Name.length < 1 || values.Name.length > 25
        ? {
            Name: {
              type: "required",
              message: "Name must be at least 1 characters up to 25",
            },
          }
        : !values.Email
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
        : !values.ConfirmPassword || values.ConfirmPassword !== values.Password
        ? {
            ConfirmPassword: {
              type: "required",
              message: "Wrong Compare",
            },
          }
        : {},
    };
  };

  const validateName = (value) => {
    if (!(value.length >= 1 && value.length <= 25)) {
      return "max 25";
    }
    return value.trim().length > 0 || "Name empty";
  };

  const validatePassword = (value) => {
    return (value.length >= 6 && value.length <= 25) || "min 6 max 25";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        {
          name: data.Name,
          email: data.Email,
          password: data.Password,
        }
      );
      if (response.status === 200) {
        toast.success("Registration successful!");
      }
      if (response.status === 400){
        console.log(response.data.message)
        toast.error(response.data.message);
      }
      return response;
    } catch (error) {
      console.log(error.response)
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred. Please try again later.");
      }
      throw error;
    }
  });


  return (
    <TabPanel>
      <form onSubmit={onSubmit}>
        <Text fontSize={32} mb={5}>
          Registration
        </Text>
        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Name" />
          <Input
            type={"text"}
            variant="filled"
            {...register("Name", { required: true, validate: validateName })}
            placeholder="Donald"
          />
        </InputGroup>
        {errors?.Name && (
          <Text color={"red"} fontSize={14}>
            {errors.Name.message}
          </Text>
        )}
        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Email" />
          <Input
            variant="filled"
            type={"email"}
            {...register("Email", { required: true })}
            placeholder="yourtruemail@gmail.com"
          />
        </InputGroup>
        {errors?.Email && (
          <Text color={"red"} fontSize={14}>
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

        <InputGroup margin={0} mt={5}>
          <InputLeftAddon children="Confirm" />
          <Input
            type={"password"}
            variant="filled"
            {...register("ConfirmPassword", {
              required: true,
            })}
            placeholder="***********"
          />
        </InputGroup>
        {errors?.ConfirmPassword && (
          <Text color={"red"} fontSize={14}>
            {errors.ConfirmPassword.message}
          </Text>
        )}

        <Button
          mt={5}
          variant={"outline"}
          color={"cyan"}
          type="submit"
          w={"100%"}
        >
          Create account
        </Button>
      </form>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
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
  </div>
    </TabPanel>
  );
};

export default Register;
