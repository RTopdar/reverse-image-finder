"use client";
import React, { createContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [toLogin, setToLogin] = useState(false);
  const [isDark, setisDark] = useState(false);
  const [hasLoggedIn, sethasLoggedIn] = useState(false);

  const handleHasLoggedIn = (value)=>{
    sethasLoggedIn(value);
  }

  const handleLoginClick = () => {
    setToLogin(true);
  };
  const handleSignUpClick = () => {
    setToLogin(true);
    setIsLogin(false);
  };

  const handleDarkModeClick = () => {
    setisDark(!isDark);
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        toLogin,
        setToLogin,
        handleLoginClick,
        handleDarkModeClick,
        handleSignUpClick,
        isDark,
        hasLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
