import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortingOptions } from "@/lib/constants";
import { useFilters } from "@/stores/useFilterStore";
import { useSemesters } from "@/hooks/useSemeters";
import { useSubjects } from "@/hooks/useSubjects";
import { useUnits } from "@/hooks/useUnits";

function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { semester, subject, unit, sortBy } = useFilters(
    (state) => state.filters
  );
  const setFilters = useFilters((state) => state.setFilters);
  const { data: semesters } = useSemesters();
  const { data: subjects } = useSubjects();
  const { data: units } = useUnits();

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
                onValueChange={(value) =>
                  setFilters({ semester: value, subject: "all", unit: "all" })
                }
                value={semester}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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
                disabled={semester === "all"}
                onValueChange={(value) =>
                  setFilters({ subject: value, unit: "all" })
                }
                value={subject}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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
                disabled={subject === "all"}
                onValueChange={(value) => setFilters({ unit: value })}
                value={unit}
              >
                <SelectTrigger className="bg-gray-50 w-full">
                  <SelectValue placeholder="All"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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
                onValueChange={(value) => setFilters({ sortBy: value })}
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
