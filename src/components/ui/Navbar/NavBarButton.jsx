"use client";
import React, { useEffect } from "react";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";

const NavBarButton = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // console.log("session in navbarbutton", session);
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>{session ? <LogoutButton /> : <LoginButton />}</div>;
};

export default NavBarButton;
