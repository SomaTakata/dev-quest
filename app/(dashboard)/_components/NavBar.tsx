"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className="bg-white w-full h-12 flex items-center justify-end p-5">
      <UserButton afterSignOutUrl="/sign-in" />
      <p className="text-xs ml-3">{user.fullName}</p>
    </div>
  );
};

export default NavBar;
