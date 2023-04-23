import React, { useEffect } from "react";
import "./index.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import AvatarPage from "./pages/AvatarPage";
import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/register");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const auth = window.localStorage.getItem("isAuth");
    if (auth === "true" && location.pathname === "/register") {
      navigate("/chat");
    }
  }, [location.pathname, navigate]);

  return (
    <Box>
      {location.pathname !== "/register" && <NavBar />}
      <Routes>
        <Route  path={"/register"} element={<AuthPage />} />
        <Route  path={"/chat"} element={<ChatPage />} />
        <Route  path={"/avatar"} element={<AvatarPage />} />
        {/* <Route path="*" element={ <Navigate to="/register" replace={true} />} /> */}
      </Routes>
    </Box>
  );
};

export default Router;
