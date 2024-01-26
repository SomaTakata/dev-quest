import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SideBar from "./(dashboard)/_components/SideBar";
import NavBar from "./(dashboard)/_components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Quest",
  description:
    "「Dev」はデベロッパー（エンジニア）を、「Quest」は探求や冒険を意味し、自分自身のキャリアや目標についての探求をサポートするサービスであることを表しています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-full">
            <SideBar />
            <div className="w-full ">
              <NavBar />
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
