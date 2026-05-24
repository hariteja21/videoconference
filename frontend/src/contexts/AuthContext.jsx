import axios from "axios";
import httpStatus from "http-status";
import { createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";
import { ROUTES } from "../config/routes";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/users`,
});

const getErrorMessage = (error) => {
  return error?.response?.data?.message || "Something went wrong. Please try again.";
};

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const router = useNavigate();
  const handleRegister = useCallback(async (name, username, password) => {
    try {
      const request = await client.post("/register", {
        name,
        username,
        password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }

      return "Registration completed.";
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }, []);

  const handleLogin = useCallback(async (username, password) => {
    try {
      const request = await client.post("/login", {
        username,
        password,
      });

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router(ROUTES.HOME);
      }
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setUserData({});
    router(ROUTES.AUTH);
  }, [router]);

  const getHistoryOfUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const request = await client.get("/get_all_activity", {
        params: { token },
      });

      return request.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }, []);

  const addToUserHistory = useCallback(async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");
      const request = await client.post("/add_to_activity", {
        token,
        meeting_code: meetingCode,
      });

      return request;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }, []);

  const data = useMemo(
    () => ({
      userData,
      setUserData,
      addToUserHistory,
      getHistoryOfUser,
      handleRegister,
      handleLogin,
      handleLogout,
    }),
    [userData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
