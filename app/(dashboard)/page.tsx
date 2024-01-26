import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="h-full w-[280px] bg-[#5A57FF]">
      </div>
      <div className="w-full ">
      <div className="bg-white w-full h-16 flex items-center justify-end p-5">
      <UserButton afterSignOutUrl="/sign-in" />
      </div>
      <div className="h-full bg-[#FAF9FF]">

      </div>
      </div>
    </div>
  )
}