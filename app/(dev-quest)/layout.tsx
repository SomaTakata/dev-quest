import React from "react";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import Provider from "./_trpc/provider";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <NavBar />
        <Provider>{children}</Provider>
      </div>
    </div>
  );
};

export default dashboardLayout;
