import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle/ThemeToggle";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

const Navbar = ({ session }) => {
  console.log("session in navbar", session);

  return (
    <main className="w-full h-full flex justify-between">
      <div className="w-1/3 flex items-center p-3">
        <RocketIcon className="w-[2rem] h-[2rem]" />
        <span className=" font-sans font-bold">Reverse Image Search</span>
      </div>
      <div className="w-1/3 items-center flex justify-end gap-x-2">
        <div className="">{session ? <LogoutButton /> : <LoginButton />}</div>
        <ThemeToggle />
      </div>
    </main>
  );
};

export default Navbar;
