import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {

useEffect(() => {
 window.localStorage.setItem('chakra-ui-color-mode','dark') 

}, []);

  return (
    <Box>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Container>
            <Box border={`3px solid`} padding={"10px"} borderRadius={20}>
              <Tabs isFitted variant="enclosed">
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
