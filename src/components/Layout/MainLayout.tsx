import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-bg">
      <Sidebar />
      <div className="ml-[240px] flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
