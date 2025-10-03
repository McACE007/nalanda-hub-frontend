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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PDFThumbnail } from "@/components/PDFThumbnail";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "react-router-dom";

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
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [open, setOpen] = useState(Boolean(searchQuery.get("open")) || false);

  useEffect(() => {
    if (!open) setSearchQuery({ open: "true" });
  }, []);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const handleDeleteContent = async (contentId: number) => {
    deleteContent.mutate(contentId, {
      onSuccess: () => {
        toast.success("Content deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete content");
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading uploads...</p>
        </div>
      </div>
    );
  }

  let sno = 1;

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">My Uploads</h1>
        <CreateContentForm open={open} setOpen={setOpen} />
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
                        {content.File?.type === 'pdf' && content.File?.url && (!content.imageUrl || content.imageUrl.trim() === '') ? (
                          <PDFThumbnail
                            url={content.File.url}
                            width={80}
                            height={80}
                            className="min-h-20 min-w-20 rounded"
                          />
                        ) : (
                          <img
                            src={content.imageUrl}
                            alt="Content Thumbnail"
                            className="h-20 w-20 min-h-20 min-w-20 object-cover rounded"
                          />
                        )}
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

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Button size={"icon"}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your content.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteContent(content.id)}
                                className="bg-red-700 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
