import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import CreateRequestForm from "@/components/CreateRequestForm";
import { useMyRequests } from "@/hooks/useMyRequests";

function MyRequestsPage() {
  const {
    data: myRequests,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMyRequests();
  const { ref, inView } = useInView();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading requests...</p>
        </div>
      </div>
    );
  }

  let sno = 1;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
        <CreateRequestForm open={open} setOpen={setOpen} />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">S.No</TableHead>
                <TableHead className="font-semibold text-gray-700">Request Title</TableHead>
                <TableHead className="font-semibold text-gray-700">Request Type</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Rejection Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myRequests?.pages.length === 0 || myRequests?.pages[0]?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                      <p className="text-gray-500 font-medium">No requests found</p>
                      <p className="text-sm text-gray-400">Create your first request to get started</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                myRequests?.pages.map((page) =>
                  page.data.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{sno++}</TableCell>
                      <TableCell>
                        <p className="font-semibold text-gray-900 line-clamp-2">{request.title}</p>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {request.requestType}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status.toLowerCase() === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status.toLowerCase() === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {request.rejectionReason || "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
        </div>
        
        <div ref={ref} className="border-t bg-gray-50 py-4 text-center">
          {isFetchingNextPage ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Loading more...</span>
            </div>
          ) : hasNextPage ? (
            <p className="text-sm text-gray-500">Scroll to load more</p>
          ) : (
            <p className="text-sm text-gray-400">No more requests</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyRequestsPage;
