import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-row relative">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <main className={cn("mt-14 p-6", isSidebarOpen ? "ml-64" : "ml-16")}>
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
