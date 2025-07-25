import CreateContentForm from "@/components/CreateContentForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteContent, useMyContents } from "@/hooks/useMyContents";
import { CircuitBoard, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { toast } from "sonner";

function MyUploadsPage() {
  const {
    data: myContents,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMyContents();
  const { ref, inView } = useInView();
  const deleteContent = useDeleteContent();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <div>Loading....</div>;

  let sno = 1;

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">My Uploads</h1>
        <CreateContentForm />
      </div>
      <div className="mt-8 bg-card border rounded-lg">
        <div className="overflow-x-auto">
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow className="font-bold ">
                <TableHead>S.No</TableHead>
                <TableHead>Content Info</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead>Updated Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myContents?.pages.map((page) =>
                page.data.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell>{sno++}</TableCell>
                    <TableCell>
                      <div className="flex gap-4 lg:items-center">
                        <img
                          src={content.imageUrl}
                          alt="PDF Thumbnail"
                          className="h-20 w-20 min-h-20 min-w-20"
                        />
                        <div className="flex flex-col justify-center">
                          <div className="font-bold">{content.Unit.name}</div>
                          <div className="text-muted-foreground text-xs">
                            {content.Semester.name} | {content.Subject.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(content.uploadedDate, "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(content.updatedAt, "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <CircuitBoard className="text-red-500 ml-2"></CircuitBoard>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size={"icon"}>
                          <Pencil className="w-4 h-4" />
                        </Button>

                        <Button
                          size={"icon"}
                          onClick={() =>
                            deleteContent.mutate(content.id, {
                              onSuccess: () => {
                                toast.success("Content deleted successfully!");
                              },
                              onError: () => {
                                toast.error("Failed to delete content");
                              },
                            })
                          }
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div ref={ref} className="py-6 text-center text-sm text-gray-500">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Scroll to load more"
              : "No more contents"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyUploadsPage;
