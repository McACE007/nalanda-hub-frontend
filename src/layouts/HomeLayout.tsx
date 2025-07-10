import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { useContentStore } from "@/stores/useContentStore";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortingOptions } from "@/lib/constants";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    setSeletedSemester,
    semesters,
    subjects,
    units,
    setSeletedSubject,
    setSeletedUnit,
    selectedSemster,
    selectedSubject,
    selectedUnit,
    setSortBy,
    sortBy,
  } = useContentStore();

  return (
    <div className="h-screen flex flex-row relative">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar />
      <main
        className={cn("mt-14 p-6 relative", isSidebarOpen ? "ml-64" : "ml-16")}
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
            <div className="space-y-1 w-full">
              <Label className="font-normal">Semester</Label>
              <Select
                onValueChange={(value) => setSeletedSemester(value)}
                value={selectedSemster?.toString() || ""}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">All</SelectItem>
                  {semesters &&
                    semesters.map(({ name, id }) => (
                      <SelectItem key={id} value={id + ""}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-48">
            <div className="space-y-1 w-full">
              <Label className="font-normal">Subject</Label>
              <Select
                disabled={!selectedSemster}
                onValueChange={(value) => setSeletedSubject(value)}
                value={selectedSubject?.toString() || ""}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">All</SelectItem>
                  {subjects &&
                    subjects.map(({ name, id }) => (
                      <SelectItem key={id} value={id + ""}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-48">
            <div className="space-y-1 w-full">
              <Label className="font-normal">Unit</Label>
              <Select
                disabled={!selectedSubject}
                onValueChange={(value) => setSeletedUnit(value)}
                value={selectedUnit?.toString() || ""}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">All</SelectItem>
                  {units &&
                    units.map(({ name, id }) => (
                      <SelectItem key={id} value={id + ""}>
                        {name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-32 ml-auto">
            <div className="space-y-1 w-full">
              <Label className="font-normal">Sort</Label>
              <Select
                onValueChange={(value) => setSortBy(value)}
                value={sortBy}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {sortingOptions &&
                    sortingOptions.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className={cn("mt-[70px]")}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomeLayout;
