"use client";
import React, { useRef, useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import axios from "axios";
import { useRouter } from "next/navigation";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const Login = () => {
  const router = useRouter();
  const { toLogin, setToLogin } = useContext(Context);
  const [isSignUp, setisSignUp] = useState(false);
  const loginRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (toLogin) {
      loginRef.current.scrollIntoView({ behavior: "smooth" });
      setToLogin(false);
    }
  }, [toLogin, setToLogin]);
  useEffect(() => {
    console.log(isSignUp, email, password, name);
  }, [isSignUp, email, password, name]);

  const handleCredentialsSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Email and password are required");
      toast.error("Email and password are required");
      return;
    }

    // Handle log-in
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.status === 401 || result.status === 400) {
      toast.error(result.error);
    }
    localStorage.setItem("result", JSON.stringify(result));
    window.location.reload();

    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Signed in successfully");
      localStorage.setItem("token", result.token);
      toast.success("Signed in successfully");
    }
  };
  const handleSignUp = async () => {
    if (!email || !password || !name) {
      console.error("Email, password, and name are required");
      return;
    }

    try {
      const { data } = await axios.post("/api/user", {
        email,
        password,
        name,
      });
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <main
      ref={loginRef}
      className="homepage-section-height bg-white dark:bg-black flex flex-col items-center justify-center"
    >
      <ToastContainer theme={`${theme === "dark" ? "dark" : "light"}  `} />
      <Card className="w-96">
        <CardHeader>
          <CardTitle>{isSignUp ? "Sign Up" : "Log In"}</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Create an account to get started."
              : "Sign in to your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full ">
              <Button
                onClick={isSignUp ? handleSignUp : handleCredentialsSignIn}
                className="w-full"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              {isSignUp ? "Sign Up with Google" : "Log In with Google"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Link
                  href="#"
                  className="underline"
                  onClick={() => setisSignUp(false)}
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link
                  href="#"
                  className="underline"
                  onClick={() => {
                    setisSignUp(true);
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
