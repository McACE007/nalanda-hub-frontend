import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { semesters, sortingOptions, subjects, units } from "@/lib/constants";
import CustomSelect from "@/components/CustomSelect";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-row relative">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <main
        className={cn(
          "mt-[118px] p-6 relative",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div
          className={cn(
            "fixed top-14 bg-background/70 backdrop-blur-xl z-40 py-2 px-6 flex gap-4",
            isSidebarOpen
              ? "left-64 w-[calc(100%-256px)]"
              : "left-16 w-[calc(100%-64px)]"
          )}
        >
          <div className="w-48">
            <CustomSelect
              label="Semester"
              items={semesters}
              placeholder="All"
            />
          </div>

          <div className="w-48">
            <CustomSelect label="Subject" items={subjects} placeholder="All" />
          </div>

          <div className="w-48">
            <CustomSelect label="Unit" items={units} placeholder="All" />
          </div>

          <div className="w-32 ml-auto">
            <CustomSelect
              label="Sort"
              items={sortingOptions}
              placeholder="Sort By"
            />
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
