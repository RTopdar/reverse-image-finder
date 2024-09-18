"use client";
import React, { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [toLogin, setToLogin] = useState(false);
  const [isDark, setisDark] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasLoggedIn, sethasLoggedIn] = useState(false);
  const [searchText, setsearchText] = useState("");
  const [openUpload, setopenUpload] = useState(false);
  const router = useRouter();

  const handleHasLoggedIn = (value) => {
    sethasLoggedIn(value);
  };

  const handleSearchText = (value) => {
    setsearchText(value);
  };

  const handleNameChange = (e) => {
    setname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const handleLoginClick = () => {
    setToLogin(true);
    setIsLogin(true);
    router.push("/");
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
        handleHasLoggedIn,
        name,
        email,
        password,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
        searchText,
        handleSearchText,
     
      }}
    >
      {children}
    </Context.Provider>
  );
};
