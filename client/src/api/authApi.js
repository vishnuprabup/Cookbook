import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const loginHandler = (authData) => API.post("/auth/login", authData);
export const signupHandler = (authData) => API.post("/auth/signup", authData);
export const logoutHandler = () => API.get("auth/logout");
