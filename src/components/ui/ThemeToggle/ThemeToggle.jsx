"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    console.log(theme);
  }, [theme]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <main>
      <Button
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        onClick = {
          ()=>{
            if(theme === "dark"){
              setTheme("light")
              document.documentElement.classList.remove("dark")
            }else{
              setTheme("dark")
              document.documentElement.classList.add("dark")
            }
          }
        }
      >
        {theme === "dark" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800  dark:text-neutral-200 " />
        ) : (
          <MoonIcon className=" h-[1.2rem] w-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
        )}
      </Button>
    </main>
  );
};

export default ThemeToggle;
