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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={cn(
          "sticky top-14 inset-x-0 bg-background/70 backdrop-blur-xl z-40 "
        )}
      >
        <div className="container mx-auto py-2 px-6 flex gap-4">
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
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center mt-6">
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

        {/* Scroll trigger positioned better */}
        <div ref={ref} className="py-8 text-center">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">
                Loading more content...
              </span>
            </div>
          ) : hasNextPage ? (
            <p className="text-sm text-gray-500">Scroll to load more</p>
          ) : (
            <div className="py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-gray-500">No content available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
