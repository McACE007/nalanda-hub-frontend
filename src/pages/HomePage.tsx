import ContentCard from "@/components/ContentCard";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { useContents } from "@/hooks/useContents";
import { useSemesters } from "@/hooks/useSemeters";
import { useSubjects } from "@/hooks/useSubjects";
import { useUnits } from "@/hooks/useUnits";
import { sortingOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useFilters } from "@/stores/useFilterStore";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function HomePage() {
  const { inView, ref } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useContents();
  const semester = useFilters((state) => state.filters.semester);
  const subject = useFilters((state) => state.filters.subject);
  const unit = useFilters((state) => state.filters.unit);
  const sortBy = useFilters((state) => state.filters.sortBy);
  const setFilters = useFilters((state) => state.setFilters);

  const { data: semesters } = useSemesters();
  const { data: subjects } = useSubjects(semester);
  const { data: units } = useUnits(subject);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "sticky top-14 inset-x-0 bg-background/70 backdrop-blur-xl z-40 "
        )}
      >
        <div className="container mx-auto py-2 px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="col-span-1">
              <div className="space-y-1 w-full">
                <Label className="font-normal text-xs sm:text-sm">Semester</Label>
                <Select
                  onValueChange={(value) =>
                    setFilters({ semester: value, subject: "all", unit: "all" })
                  }
                  value={semester}
                >
                  <SelectTrigger className="bg-gray-50 w-full h-8 sm:h-10 text-xs sm:text-sm">
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

            <div className="col-span-1">
              <div className="space-y-1 w-full">
                <Label className="font-normal text-xs sm:text-sm">Subject</Label>
                <Select
                  disabled={semester === "all"}
                  onValueChange={(value) =>
                    setFilters({ subject: value, unit: "all" })
                  }
                  value={subject}
                >
                  <SelectTrigger className="bg-gray-50 w-full h-8 sm:h-10 text-xs sm:text-sm">
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

            <div className="col-span-1">
              <div className="space-y-1 w-full">
                <Label className="font-normal text-xs sm:text-sm">Unit</Label>
                <Select
                  disabled={subject === "all"}
                  onValueChange={(value) => setFilters({ unit: value })}
                  value={unit}
                >
                  <SelectTrigger className="bg-gray-50 w-full h-8 sm:h-10 text-xs sm:text-sm">
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

            <div className="col-span-1">
              <div className="space-y-1 w-full">
                <Label className="font-normal text-xs sm:text-sm">Sort</Label>
                <Select
                  onValueChange={(value) => setFilters({ sortBy: value })}
                  value={sortBy}
                >
                  <SelectTrigger className="bg-gray-50 w-full h-8 sm:h-10 text-xs sm:text-sm">
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
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {data?.pages.map((page) =>
            page.data.map((content) => (
              <ContentCard
                key={content.id} // Use id instead of title for better uniqueness
                title={content.title}
                uploadedBy={"Unknown"}
                uploadedDate={new Date(content.uploadedDate)}
                imageUrl={content.imageUrl}
                href={`/content/${content.id}`}
              />
            ))
          )}

          {/* Infinite scroll trigger - moved outside grid */}
        </div>

        <div ref={ref} className="col-span-full py-12 text-center">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 font-medium">
                Loading more content...
              </span>
            </div>
          ) : hasNextPage ? (
            <div className="space-y-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto animate-pulse"></div>
              <p className="text-sm text-gray-500">Scroll to load more</p>
            </div>
          ) : data?.pages[0]?.data.length === 0 ? (
            <div className="py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No content found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more content.</p>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-gray-600 font-medium">You've reached the end!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
