"use client";
import React, { useRef, useEffect, useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../button";
import Link from "next/link";
import { Context } from "@/context/Context";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const Login = () => {
  const { toLogin, setToLogin } = useContext(Context);
  const [isSignUp, setisSignUp] = useState(false);
  const loginRef = useRef(null);
  useEffect(() => {
    if (toLogin) {
      loginRef.current.scrollIntoView({ behavior: "smooth" });
      setToLogin(false);
    }
  }, [toLogin, setToLogin]);

  return (
    <main
      ref={loginRef}
      className="w-full homepage-section-height bg-white dark:bg-black flex flex-col items-center justify-center"
    >
      {!isSignUp ? (
        <Card className="mx-auto max-w-[300px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="underline"
                onClick={() => {
                  setisSignUp(true);
                }}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto max-w-[300px]">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your email below to create new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="#"
                className="underline"
                onClick={() => {
                  setisSignUp(false);
                }}
              >
                Log In
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Login;
