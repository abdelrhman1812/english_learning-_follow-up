import { DashboardShell } from "@/components/app/dashboard-shell";
import { TopNav } from "@/components/app/top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Follow-up system ",
  description: "Follow-up system. Choose a level below to get started.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex   `}
      >
        <SidebarProvider defaultOpen={true} className="">
          <div className=" flex h-screen dark:bg-background  w-full ">
            <DashboardShell />
            <main className="flex flex-col  flex-1 w-full ">
              <TopNav />
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
