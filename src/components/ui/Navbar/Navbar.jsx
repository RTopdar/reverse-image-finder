import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/ui/ThemeToggle/ThemeToggle";
import ShimmerButton from "@/components/magicui/shimmer-button";
const Navbar = () => {
  return (
    <main className="w-full h-full flex justify-between">
      <div className="w-1/3 flex items-center p-3">
        <RocketIcon className="w-[2rem] h-[2rem]" />
        <span className=" font-sans font-bold">Reverse Image Search</span>
      </div>
      <div className="w-1/3 items-center flex justify-end gap-x-2">
      <ShimmerButton className="shadow-2xl">
        <span className="whitespace-pre-wrap text-center  leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 ">
          Log In
        </span>
      </ShimmerButton>
        <Button variant="secondary">Sign Up</Button>
        <ThemeToggle />
  
      
      </div>
    </main>
  );
};

export default Navbar;
