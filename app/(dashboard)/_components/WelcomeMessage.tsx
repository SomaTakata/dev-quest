"use client";
import { useUser } from "@clerk/nextjs";

const WelcomeMessage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return <></>;
  }
  return (
    <p className="text-muted-foreground font-bold text-xs">
      Welcome back {user.fullName}
    </p>
  );
};

export default WelcomeMessage;
