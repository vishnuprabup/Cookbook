import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  initialAuthData,
  isEmailValid,
  isPasswordValid,
} from "../../utils/authUtils";
import "./Auth.css";
import {
  authError,
  loginAction,
  signupAction,
} from "../../redux/features/userSlice/userSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authData, setAuthData] = useState(initialAuthData);

  const isError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const handleAuthSwitch = () => {
    dispatch(authError({ state: false, message: "" }));
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      password: "",
      confirmPassword: "",
    }));
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [name]: value,
    }));
  };
  const handleAuthBtn = async () => {
    try {
      dispatch(authError({ state: false, message: "" }));
      const { confirmPassword, ...others } = authData;
      if (isLogin) {
        dispatch(authError({ state: false, message: "" }));

        if (isEmailValid(authData.email)) {
          dispatch(authError({ state: false, message: "" }));

          dispatch(loginAction(others));
        } else {
          dispatch(authError({ state: true, message: "Invalid E-Mail" }));
        }
      } else {
        if (isEmailValid(authData.email)) {
          dispatch(authError({ state: false, message: "" }));

          if (isPasswordValid(authData.password)) {
            dispatch(authError({ state: false, message: "" }));

            if (authData.confirmPassword === authData.password) {
              dispatch(authError({ state: false, message: "" }));

              dispatch(signupAction(others));
            } else {
              dispatch(
                authError({
                  state: true,
                  message: "Password and Confirm Password does not match",
                })
              );
            }
          } else {
            dispatch(
              authError({ state: true, message: "Password is too short" })
            );
          }
        } else {
          dispatch(authError({ state: true, message: "Invalid E-Mail" }));
        }
      }
    } catch (error) {
      dispatch(authError({ state: true, message: error.message }));
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="auth-component">
        <div className="auth-inner-component">
          <div className="auth-contents">
            <div className="auth-header">
              <h1>Welcome to Cookbook</h1>
              <p>Please enter your {isLogin ? "login" : "signup"} details</p>
            </div>
            <div className="auth-inputs">
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={authData.email}
                onChange={handleInputs}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={authData.password}
                onChange={handleInputs}
              />
              {!isLogin && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={authData.confirmPassword}
                  onChange={handleInputs}
                />
              )}
            </div>
            {isError.state && (
              <div className="auth-error">*{isError.message}*</div>
            )}
            <div className="auth-actions">Forgot Password ?</div>
            <div className="auth-button">
              <button onClick={handleAuthBtn}>
                {isLogin ? "Login" : "Sign up"}
              </button>
            </div>
            <div className="auth-switch">
              <p>
                {isLogin
                  ? "Don't have an account ?"
                  : "Have an account already ?"}
              </p>
              <span onClick={handleAuthSwitch}>
                {isLogin ? "Sign up" : "Log in"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
