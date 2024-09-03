import Login from "@/components/ui/Login/Login";
import MoreInfo from "@/components/ui/MoreInfo/MoreInfo";
import Navbar from "@/components/ui/Navbar/Navbar";
import PageInfo from "@/components/ui/PageInfo/PageInfo";

export default function Home() {
  
  return (
    <main className="flex homepage-section-height min-w-screen max-w-screen flex-col gap-x-2 scrollable-element bg-white dark:bg-black text-black dark:text-white">
      {/* <header className="h-[50px] w-full fixed z-50 bg-white dark:bg-black ">
        <Navbar />
      </header> */}
      <main className="flex gap-x-2 ">
        {/* {children} */}

        <div className="homepage-section-height w-1/2 bg-white dark:bg-black">
          <PageInfo />
        </div>
        <div className="homepage-section-height w-1/2 bg-white dark:bg-black overflow-y-scroll overflow-x-hidden snap-y snap-mandatory flex flex-col">
          <div className="snap-start">
            <MoreInfo />
          </div>
          <div className="snap-start" >
            <Login />
          </div>
        </div>
      </main>
    </main>
  );
}
