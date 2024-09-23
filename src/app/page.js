import Login from "@/components/ui/Login/Login";
import MoreInfo from "@/components/ui/MoreInfo/MoreInfo";
import PageInfo from "@/components/ui/PageInfo/PageInfo";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex homepage-section-height min-w-screen max-w-screen flex-col gap-x-2 scrollable-element bg-white dark:bg-black text-black dark:text-white">
      <main className="flex gap-x-2 ">
        <div className="homepage-section-height w-1/2 bg-white dark:bg-black">
          <PageInfo />
        </div>
        <div className="homepage-section-height w-1/2 bg-white dark:bg-black overflow-y-scroll overflow-x-hidden snap-y snap-mandatory flex flex-col">
          <div className="snap-start">
            <MoreInfo />
          </div>
          {session === null && (
            <div className="snap-start">
              <Login />
            </div>
          )}
        </div>
      </main>
    </main>
  );
}
