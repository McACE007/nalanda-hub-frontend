import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <main
        className={cn(
          "mt-14 ",
          isSidebarOpen
            ? "ml-64 w-[calc(100%-16rem)]"
            : "ml-16 w-[calc(100%-4rem)]"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
