import Navbar from "@/components/ui/Navbar/Navbar";
import PageInfo from "@/components/ui/PageInfo/PageInfo";
import { AccessibilityIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col gap-x-2 scrollable-element bg-white dark:bg-black text-black dark:text-white">
      <header className="h-[50px] w-full ">
        <Navbar />
      </header>
      <section className="flex gap-x-2">
        <div className="homepage-section-height w-1/2 bg-white dark:bg-black">
          <PageInfo />
        </div>
        <div className="homepage-section-height w-1/2 bg-white dark:bg-black">
          World
        </div>
      </section>
    </main>
  );
}
