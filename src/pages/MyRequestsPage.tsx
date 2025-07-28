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
import { Trash } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import CreateRequestForm from "@/components/CreateRequestForm";
import { useMyRequests } from "@/hooks/useMyRequests";
import { data } from "react-router-dom";

function MyRequestsPage() {
  const {
    data: myContents,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMyRequests();
  const { ref, inView } = useInView();
  const deleteContent = useDeleteContent();
  const [open, setOpen] = useState(false);

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

  if (isPending) return <div>Loading....</div>;

  let sno = 1;

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">My Request</h1>
        <CreateRequestForm open={open} setOpen={setOpen} />
      </div>
      <div className="mt-8 bg-card border rounded-lg">
        <div className="overflow-x-auto">
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow className="font-bold ">
                <TableHead>S.No</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Request Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rejection Reason</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myContents?.pages.map((page) =>
                page.data.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{sno++}</TableCell>
                    <TableCell>
                      <p className="font-semibold text-wrap">{request.title}</p>
                    </TableCell>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell>
                      <p>{request.status}</p>
                    </TableCell>
                    <TableCell>
                      {request.rejectionReason ? request.rejectionReason : "NA"}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button size={"sm"}>
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
                              onClick={() => handleDeleteContent(request.id)}
                              className="bg-red-700 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default MyRequestsPage;
