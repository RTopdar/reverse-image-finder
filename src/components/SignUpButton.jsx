"use client";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { Context } from "@/context/Context";

const SignUpButton = () => {
  const { handleSignUpClick } = useContext(Context);
  return (
    <div className="" onClick={()=>{
        handleSignUpClick();
        console.log("Sign Up button clicked");
    }}>
      <Button variant="secondary">Sign Up</Button>
    </div>
  );
};

export default SignUpButton;
