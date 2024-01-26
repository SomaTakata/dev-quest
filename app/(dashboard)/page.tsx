import { UserButton } from "@clerk/nextjs";
import SideBar from "./_components/SideBar";

export default function Home() {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="w-full ">
        <div className="bg-white w-full h-16 flex items-center justify-end p-5">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
        <div className=" bg-[#FAF9FF]"></div>
      </div>
    </div>
  );
}
