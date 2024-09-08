import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Provider } from "@/context/Context";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["greek"] });

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);
 
  return (
    <html suppressHydrationWarning>
      <head />
      <body className="min-h-screen max-h-screen min-w-screen max-w-screen overflow-hidden pt-[50px]">
        <Provider>
          <ThemeProvider enableSystem defaultTheme="dark" attribute="class">
            <div className="z-50 w-full bg-white dark:bg-black fixed top-0">
              <Navbar session={session} />
            </div>
            <div>{children}</div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
