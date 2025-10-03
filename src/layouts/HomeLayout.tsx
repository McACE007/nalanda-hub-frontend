import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main
        className={cn(
          "mt-14 flex-1 transition-all duration-300",
          "lg:ml-16",
          isSidebarOpen && "lg:ml-64"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
