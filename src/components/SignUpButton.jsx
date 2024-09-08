"use client";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Context } from "@/context/Context";

const SignUpButton = () => {
  const { handleSignUpClick } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("User created successfully");
      handleSignUpClick();
    } else {
      console.error("Failed to create user");
    }
  };

  return (
    <div className="" onClick={handleSignUp}>
      <Button variant="secondary">Sign Up</Button>
    </div>
  );
};

export default SignUpButton;
