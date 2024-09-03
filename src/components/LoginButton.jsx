"use client";
import React, { useContext } from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Context } from "@/context/Context";
const LoginButton = () => {
  const { handleLoginClick } = useContext(Context);
  return (
    <div
      className=""
      onClick={() => {
        handleLoginClick();
        console.log("Login button clicked");
      }}
    >
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center  leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
          Log In
        </span>
      </ShimmerButton>
    </div>
  );
};

export default LoginButton;
