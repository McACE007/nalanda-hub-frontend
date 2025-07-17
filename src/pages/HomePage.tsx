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
  const { data: subjects } = useSubjects();
  const { data: units } = useUnits();

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
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-6 justify-center mt-4">
          {data?.pages.map((page) =>
            page.data.map((content) => (
              <ContentCard
                key={content.title}
                title={content.title}
                uploadedBy="Ankit Nayak"
                imageUrl={content.imageUrl}
                href={`/content/${content.id}`}
              />
            ))
          )}

          <div ref={ref} className="py-6 text-center text-sm text-gray-500">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Scroll to load more"
              : "No more contents"}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
