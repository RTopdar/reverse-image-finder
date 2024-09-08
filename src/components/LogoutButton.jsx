"use client";
import React, { useEffect } from "react";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  useEffect(() => {});
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div
      className=""
      onClick={() => {
        handleLogout();
      }}
    >
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center  leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
          Log Out
        </span>
      </ShimmerButton>
    </div>
  );
};

export default LogoutButton;
