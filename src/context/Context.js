"use client";
import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [toLogin, setToLogin] = useState(false);

  const handleLoginClick = () => {
    setToLogin(true);
  };
  const handleSignUpClick = () => {
    setToLogin(true);
    setIsLogin(false);
  }

  return (
    <Context.Provider value={{ isLogin, setIsLogin, toLogin, setToLogin, handleLoginClick }}>
      {children}
    </Context.Provider>
  );
};