"use client";

import React from "react";
import {
  Ghost,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const SideBar = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <div className=" w-[280px] bg-primary flex flex-col justify-between">
      <div>
        <div
          onClick={() => router.push("/")}
          className=" text-white cursor-pointer font-medium flex gap-3 pl-10   mt-10"
        >
          <Ghost className="h-6 w-6" />
          <div>Dev Quest</div>
        </div>
        <div className="flex flex-col mt-24 text-sm">
          <div
            onClick={() => router.push("/dashboard")}
            className="text-white  flex gap-3 cursor-pointer items-center pl-10 py-3"
          >
            <LayoutDashboard className="h-5 w-5" />
            <div>Dashboard</div>
          </div>
          <div
            onClick={() => router.push("/history")}
            className="text-white  flex gap-3 cursor-pointer items-center pl-10 py-3"
          >
            <History className="h-5 w-5" />
            <div>History</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-4 text-sm">
        <div
          onClick={() => router.push("/setting")}
          className="text-white  flex gap-3 cursor-pointer items-center pl-10 py-2"
        >
          <Settings className="h-5 w-5" />
          <div>Setting</div>
        </div>
        <div
          onClick={() => signOut(() => router.push("/sign-in"))}
          className="text-white text-sm flex cursor-pointer gap-3 items-center pl-10 py-2"
        >
          <LogOut className="h-5 w-5" />
          <div>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
