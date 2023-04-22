import React, { useEffect } from "react";
import useAuthGlobal from "../State/useAuthGlobal";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate()
  const [isAuth, updateIsAuth] = useAuthGlobal((state) => [
    state.isAuth,
    state.updateIsAuth,
  ]);
  const [token, updateToken] = useAuthGlobal((state) => [
    state.token,
    state.updateToken,
  ]);

  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    const localIsAuth = window.localStorage.getItem("isAuth");
    updateIsAuth(localIsAuth);
    updateToken(localToken);
  }, []);

  useEffect(() => {
    console.log(isAuth);
    const verify = async () => {
      try {
        if(!token) {
          return console.log('first')
        }
        axios.defaults.headers.common["x-auth-token"] = token;
        const res = await axios.get("http://localhost:5555/api/test");
        if (res.status === 401) {
          updateIsAuth(false);
        } else {
          updateIsAuth(true);
        }
      } catch (err) {
        console.error(err);
        useAuthGlobal.updateIsAuth(() => false);
      }
    };
    verify();
  }, [token]);

  const getUsers = async () => {
    try {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios
        .get("http://localhost:5555/api/test")
        .then((res) => console.log(res.data.user));
      return console.log(res);
    } catch (error) {
      navigate('/register')
    }

  };

  return (
    <div>
      {isAuth ? (
        <div>
          Logged in with token {token}
          <button onClick={getUsers}>GET</button>
        </div>
      ) : navigate('/register')
      }
      
    </div>
  );
};

export default ChatPage;
