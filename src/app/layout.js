import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar/Navbar";
import { Provider } from "@/context/Context";

const inter = Inter({ subsets: ["greek"] });

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className="min-h-screen max-h-screen min-w-screen max-w-screen overflow-hidden pt-[50px]">
        <Provider>
          <ThemeProvider enableSystem defaultTheme="system" attribute="class">
            <div className="z-50 w-full bg-white dark:bg-black fixed top-0">
              <Navbar />
            </div>
            <div>{children}</div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
