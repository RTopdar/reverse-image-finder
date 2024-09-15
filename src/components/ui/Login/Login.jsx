"use client";
import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useTransition,
} from "react";
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
import { getSession, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { signUp } from "@/actions/signUp";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    toLogin,
    setToLogin,
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
  } = useContext(Context);
  const [isSignUp, setisSignUp] = useState(false);
  const loginRef = useRef(null);
  const { theme } = useTheme();
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  useEffect(() => {
    if (toLogin) {
      loginRef.current.scrollIntoView({ behavior: "smooth" });
      setToLogin(false);
    }
  }, [toLogin, setToLogin]);
  useEffect(() => {}, [session]);

  // const handleCredentialsSignIn = async () => {
  //   console.log("inside login");
  //   if (email === "" || password === "") {
  //     console.error("Email and password are required");
  //     toast.error("Email and password are required");
  //     return null;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }

  //   const loginStatus = await login({ email, password });
  //   console.log("loginStatus", loginStatus);
  //   if (loginStatus.success) {
  //     toast.success(loginStatus.message);
  //     await getSession();
  //     router.push("/about");
  //   } else {
  //     toast.error(loginStatus.message);
  //   }
  // };
  const handleCredentialsSignIn = async () => {
    console.log("inside login");
    if (email === "" || password === "") {
      console.error("Email and password are required");
      toast.error("Email and password are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const loginStatus = await login({ email, password });
    console.log("loginStatus", loginStatus);
    if (loginStatus.success) {
      toast.success(loginStatus.message);
      // Manually handle redirection
      router.push("/about");
    } else {
      toast.error("Invalid credentials");
    }
  };
  const handleSignUp = async () => {
    console.log("inside signup");
    if (name === "" || email === "" || password === "") {
      console.error("Name, email, and password are required");
      toast.error("Name, email, and password are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const signUpStatus = await signUp({ name, email, password });
    if (signUpStatus.success) {
      toast.success(signUpStatus.message);
      setisSignUp(false);
      handleEmailChange({ target: { value: "" } });
      handlePasswordChange({ target: { value: "" } });
      handleNameChange({ target: { value: "" } });
    } else {
      toast.error(signUpStatus.message);
    }
  };

  const oauthSignIn = async (provider) => {
    const signInStatus = await signIn(provider, { callbackUrl: "/about" });
    if (signInStatus.success) {
      toast.success(signInStatus.message);
      router.push("/about");
    } else {
      toast.error(signInStatus.message);
    }
  };
  return (
    <main
      ref={loginRef}
      className="homepage-section-height bg-white dark:bg-black flex flex-col items-center justify-center"
    >
      <ToastContainer theme={`${theme === "dark" ? "dark" : "light"}  `} />
      {session === null ? (
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
                    // disabled={isPending}
                    onChange={(e) => handleNameChange(e)}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  // disabled={isPending}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  // disabled={isPending}
                  onChange={(e) => handlePasswordChange(e)}
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
                className="w-full flex gap-x-2"
                // disabled={isPending}
                onClick={() => oauthSignIn("google")}
              >
                <FcGoogle />{" "}
                {isSignUp ? "Sign Up with Google" : "Log In with Google"}
              </Button>

              <Button
                variant="outline"
                className="w-full flex gap-x-2"
                // disabled={isPending}
                onClick={() => oauthSignIn("github")}
              >
                <FaGithub />{" "}
                {isSignUp ? "Sign Up with Github" : "Log In with Github"}
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
      ) : (
        <div
          className=""
          onClick={() => {
            router.push("/about");
          }}
        >
          <Button>About</Button>
        </div>
      )}
    </main>
  );
};

export default Login;
