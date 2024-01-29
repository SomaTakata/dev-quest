import React from "react";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";

const dashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="w-full overflow-y-scroll">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default dashboardLayout;
