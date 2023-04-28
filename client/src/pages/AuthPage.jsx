import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import { ToastContainer } from "react-toastify";
import Typewriter from "typewriter-effect";

const RegisterPage = () => {
  useEffect(() => {
    window.localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      overflow={"hidden"}
    >
      <Box
        fontSize={{ base: "xl", sm: "3xl", md: "5xl", lg: "7xl" }}
        style={{ rotate: "-90deg" }}
        position="absolute"
        left={{ base: "-20px", sm: "-30px", md: "-10px", lg: "-20px" }}
        display={{ sm: "none", md: "none", lg: "flex" }}
      >

        <Typewriter
  options={{
    strings: ['Ragnarok'],
    autoStart: true,
    loop: true,
    deleteSpeed: 999999,
    delay:60
  }}
/>
      </Box>
      <Box
        fontSize={{ base: "xl", sm: "3xl", md: "5xl", lg: "7xl" }}
        style={{ rotate: "90deg" }}
        position="absolute"
        right={{ base: "-20px", sm: "-30px", md: "-70px", lg: "-70px" }}
        display={{ sm: "none", md: "none", lg: "flex" }}
      >

        <Typewriter
  options={{
    strings: ['is comming...'],
    autoStart: true,
    loop: true,
    deleteSpeed: 999999,
    delay:60
  }}
/>
      </Box>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Container>
            <Box
              border={`3px solid #f6aa35`}
              padding={"10px"}
              borderRadius={20}
            >
              <Tabs isFitted variant="enclosed">
                <img src="/Logo.png" width={"xl"} margin={"0 auto"} />
                <TabList mb="1em">
                  <Tab>Registration</Tab>
                  <Tab>Login</Tab>
                </TabList>
                <TabPanels>
                  <Register />
                  <TabPanel>
                    <Login />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </Grid>
      </Box>
      <ToastContainer
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
      />
    </Box>
  );
};

export default RegisterPage;
