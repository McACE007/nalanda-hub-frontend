import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "react-intersection-observer";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useAssignedRequests,
  useAssignAction,
  type Request,
} from "@/hooks/useAssignedRequests";

type TabType = "pending" | "approved" | "rejected";

type RequestWithRelations = Request & {
  User?: {
    fullName: string;
    email: string;
  };
  Subject?: {
    name: string;
  };
  Branch?: {
    name: string;
  };
  Semester?: {
    name: string;
  };
  Unit?: {
    name: string;
  };
  Content?: {
    title: string;
    description: string;
    uploadedDate: string;
    uploader?: {
      fullName: string;
    };
    File?: {
      type: string;
      name: string;
      size: number;
      url: string;
    };
  };
};

function AssignedRequestPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [selectedRequest, setSelectedRequest] =
    useState<RequestWithRelations | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showPdfViewer, setShowPdfViewer] = useState(false);
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
          setIsDialogOpen(false);
          setSelectedRequest(null);
          setRejectionReason("");
        },
        onError: () => {
          toast.error(`Failed to ${action} request`);
        },
      }
    );
  };

  const openRequestDialog = (request: RequestWithRelations) => {
    setSelectedRequest(request);
    setRejectionReason(request.rejectionReason || "");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedRequest(null);
    setRejectionReason("");
    setShowPdfViewer(false);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    handleAction(selectedRequest.id, "reject", rejectionReason);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    handleAction(selectedRequest.id, "approve");
  };

  // Group requests by status
  const groupedRequests = useMemo(() => {
    if (!assignedRequests?.pages)
      return { pending: [], approved: [], rejected: [] };

    const allRequests = assignedRequests.pages.flatMap((page) => page.data);

    return {
      pending: allRequests.filter(
        (req) => req.status.toLowerCase() === "pending"
      ),
      approved: allRequests.filter(
        (req) => req.status.toLowerCase() === "approved"
      ),
      rejected: allRequests.filter(
        (req) => req.status.toLowerCase() === "rejected"
      ),
    };
  }, [assignedRequests]);

  if (isPending) return <div>Loading....</div>;

  const renderTable = (requests: RequestWithRelations[]) => (
    <div className="bg-card border rounded-lg">
      <div className="overflow-x-auto">
        <Table className="text-nowrap">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead>S.No</TableHead>
              <TableHead>Request Title</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Subject</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No requests found
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request, index) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openRequestDialog(request)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <p className="font-semibold text-wrap">{request.title}</p>
                  </TableCell>
                  <TableCell>{request.requestType}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status.toLowerCase() === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>{request.User?.fullName || "Unknown"}</TableCell>
                  <TableCell>{request.Subject?.name || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Infinite scroll trigger - only show when there are requests */}
        {requests.length > 0 && (
          <div ref={ref} className="py-6 text-center text-sm text-gray-500">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Scroll to load more"
              : "No more contents"}
          </div>
        )}
      </div>
    </div>
  );

  const getCurrentRequests = () => {
    return groupedRequests[activeTab] || [];
  };

  const getTabColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      return {
        yellow: "bg-yellow-500 text-white border-yellow-500",
        green: "bg-green-500 text-white border-green-500",
        red: "bg-red-500 text-white border-red-500",
      }[color];
    } else {
      return {
        yellow: "bg-white text-yellow-700 border-yellow-200 hover:bg-yellow-50",
        green: "bg-white text-green-700 border-green-200 hover:bg-green-50",
        red: "bg-white text-red-700 border-red-200 hover:bg-red-50",
      }[color];
    }
  };

  if (isPending) return <div>Loading....</div>;

  const tabs = [
    {
      key: "pending" as TabType,
      label: "Pending",
      count: groupedRequests.pending.length,
      color: "yellow",
    },
    {
      key: "approved" as TabType,
      label: "Approved",
      count: groupedRequests.approved.length,
      color: "green",
    },
    {
      key: "rejected" as TabType,
      label: "Rejected",
      count: groupedRequests.rejected.length,
      color: "red",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assigned Requests</h1>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 border ${getTabColorClasses(
                tab.color,
                activeTab === tab.key
              )}`}
            >
              {tab.label}
              <span className="ml-2 px-1.5 py-0.5 bg-black bg-opacity-20 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Tab Content */}
      <div>{renderTable(getCurrentRequests())}</div>

      {/* Request Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Request Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="flex-1 overflow-y-auto">
              <div className="flex h-full gap-6">
                {/* Left Panel - Request Information */}
                <div
                  className={`${
                    showPdfViewer ? "w-1/2" : "w-full"
                  } overflow-y-auto`}
                >
                  <div className="grid gap-6 py-4 pr-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Request ID
                        </Label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.id}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Status
                        </Label>
                        <span
                          className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            selectedRequest.status.toLowerCase() === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedRequest.status.toLowerCase() ===
                                "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedRequest.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Title
                      </Label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedRequest.title}
                      </p>
                    </div>

                    {selectedRequest.description && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Description
                        </Label>
                        <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                          {selectedRequest.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Request Type
                        </Label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.requestType}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Requester
                        </Label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedRequest.User?.fullName || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {selectedRequest.User?.email}
                        </p>
                      </div>
                    </div>

                    {/* New Content URL */}
                    {selectedRequest.newContentUrl && (
                      <div className="border-t pt-4">
                        <Label className="text-sm font-medium text-gray-700">
                          New Content URL
                        </Label>
                        <a
                          href={selectedRequest.newContentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline break-all block"
                        >
                          {selectedRequest.newContentUrl}
                        </a>
                      </div>
                    )}

                    {/* Rejection Reason */}
                    {selectedRequest.status === "PENDING" ? (
                      <div className="border-t pt-4">
                        <Label
                          htmlFor="rejectionReason"
                          className="text-sm font-medium text-gray-700"
                        >
                          Rejection Reason (required for rejection)
                        </Label>
                        <Textarea
                          id="rejectionReason"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Enter reason for rejection..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    ) : (
                      selectedRequest.rejectionReason && (
                        <div className="border-t pt-4">
                          <Label className="text-sm font-medium text-gray-700">
                            Rejection Reason
                          </Label>
                          <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap bg-red-50 p-3 rounded-md">
                            {selectedRequest.rejectionReason}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Right Panel - PDF Viewer */}
                {showPdfViewer &&
                  selectedRequest.Content?.File?.type === "PDF" && (
                    <div className="w-1/2 border-l pl-6">
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-gray-900">
                            PDF Preview
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPdfViewer(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ✕
                          </Button>
                        </div>
                        <div className="flex-1 border rounded-lg overflow-hidden bg-gray-100">
                          <iframe
                            src={`${selectedRequest.Content.File.url}#toolbar=1&navpanes=1&scrollbar=1`}
                            className="w-full h-full"
                            title="PDF Preview"
                            style={{ minHeight: "500px" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          <DialogFooter>
            {selectedRequest?.status.toLowerCase() === "pending" && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={closeDialog}
                  disabled={assignAction.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="disabled:grayscale-100"
                  onClick={handleReject}
                  disabled={assignAction.isPending || !rejectionReason.trim()}
                >
                  {assignAction.isPending ? "Processing..." : "Reject"}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={assignAction.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {assignAction.isPending ? "Processing..." : "Approve"}
                </Button>
              </div>
            )}
            {selectedRequest?.status.toLowerCase() !== "pending" && (
              <Button variant="outline" onClick={closeDialog}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AssignedRequestPage;
