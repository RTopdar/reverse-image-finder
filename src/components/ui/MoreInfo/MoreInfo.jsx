"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/box-reveal";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import LoginButton from "@/components/LoginButton";

const MoreInfo = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div className="w-full homepage-section-height bg-white dark:bg-black flex flex-col items-center justify-center">
      <div className="h-full w-full max-w-[32rem] items-center justify-center overflow-hidden pt-8">
        <BoxReveal
          boxColor={`${theme === "dark" ? "#ffffff" : "#000000"}`}
          duration={0.5}
        >
          <p className="text-[3.5rem] font-semibold">
            Easy Image Finder<span className="text-[#5046e6]">.</span>
          </p>
        </BoxReveal>

        <BoxReveal
          boxColor={`${theme === "dark" ? "#ffffff" : "#000000"}`}
          duration={0.5}
        >
          <h2 className="mt-[.5rem] text-[1rem]">
            Image search library for{" "}
            <span className="text-[#5046e6]">
              Design Engineers, Deep Learning Enthusiasts
            </span>
          </h2>
        </BoxReveal>

        <BoxReveal
          boxColor={`${theme === "dark" ? "#ffffff" : "#000000"}`}
          duration={0.5}
        >
          <div className="mt-[1.5rem]">
            <p>
              -&gt; Allows you to upload images and search for similar images.
              Made using
              <span className="font-semibold text-[#5046e6]"> NextJS</span>,
              <span className="font-semibold text-[#5046e6]"> MagicUI</span>,
              <span className="font-semibold text-[#5046e6]"> Tensorflow</span>,
              and
              <span className="font-semibold text-[#5046e6]"> Whatever</span>
              . <br />
              -&gt; 100% open-source. <br />
            </p>
          </div>
        </BoxReveal>

        <BoxReveal
          boxColor={`${theme === "dark" ? "#ffffff" : "#000000"}`}
          duration={0.5}
        >
          <div className="flex gap-x-2 mt-2">
            {session.data === null ? (
              <LoginButton />
            ) : (
              <Button
                onClick={() => {
                  router.push("/about");
                }}
              >
                Get Started
              </Button>
            )}
            {/* <SignUpButton /> */}
          </div>
        </BoxReveal>
      </div>
    </div>
  );
};

export default MoreInfo;
