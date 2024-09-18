import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle/ThemeToggle";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import NavBarButton from "./NavBarButton";
import { Input } from "@/components/ui/input";
import SearchBar from "../SearchBar/SearchBar";
import UploadButton from "../uploadButton";

const Navbar = ({ session }) => {
  console.log("session in navbar", session);

  return (
    <main className="w-full h-full flex justify-between items-center">
      <div className="w-1/3 h-full  flex items-center p-3">
        <RocketIcon className="w-[2rem] h-[2rem]" />
        <span className=" font-sans font-bold">Reverse Image Search</span>
      </div>
      {session && (
        <div className="w-1/3 h-full flex items-center justify-center">
          <SearchBar />
        </div>
      )}
      <div className="w-1/3 items-center flex justify-end gap-x-2">
        {session && <UploadButton />}
        <div className="">{<NavBarButton />}</div>
        <ThemeToggle />
      </div>
    </main>
  );
};

export default Navbar;
