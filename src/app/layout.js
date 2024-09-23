import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Provider } from "@/context/Context";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["greek"] });

export default async function Layout({ children }) {
  const session = await auth();

  return (
    <html suppressHydrationWarning>
      <head />
      <body className="min-h-screen max-h-screen min-w-screen max-w-screen overflow-hidden pt-[50px]">
        <Provider>
          <ThemeProvider enableSystem attribute="class">
            <SessionProvider session={session}>
              <div className="z-50 w-full bg-white dark:bg-black fixed top-0">
                <Navbar session={session} />
              </div>
              <div className="w-full h-[calc(100vh-50px)] overflow-auto">
                <ToastContainer />
                {children}
              </div>
            </SessionProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
