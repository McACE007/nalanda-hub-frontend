import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  useAssignedRequests,
  useAssignAction,
} from "@/hooks/useAssignedRequests";

function AssignedRequestPage() {
  const {
    data: assignedRequests,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useAssignedRequests();

  const { ref, inView } = useInView();
  const assignAction = useAssignAction();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  const handleAction = async (
    requestId: number,
    action: "approve" | "reject",
    rejectionReason = ""
  ) => {
    assignAction.mutate(
      { id: requestId, action, rejectionReason },
      {
        onSuccess: () => {
          toast.success(`Request ${action}ed successfully!`);
        },
        onError: () => {
          toast.error(`Failed to ${action} request`);
        },
      }
    );
  };

  if (isPending) return <div>Loading....</div>;

  let sno = 1;

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold">Assigned Requests</h1>
      <div className="mt-8 bg-card border rounded-lg">
        <div className="overflow-x-auto">
          <Table className="text-nowrap">
            <TableHeader>
              <TableRow className="font-bold ">
                <TableHead>S.No</TableHead>
                <TableHead>Request Title</TableHead>
                <TableHead>Request Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedRequests?.pages.map((page) =>
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
                      <>
                        <button
                          className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleAction(request.id, "approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded"
                          onClick={() => {
                            const reason = prompt(
                              "Enter rejection reason:",
                              ""
                            );
                            if (reason !== null) {
                              handleAction(request.id, "reject", reason);
                            }
                          }}
                        >
                          Reject
                        </button>
                      </>
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

export default AssignedRequestPage;
