import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Brand from "./icons/Brand";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, Upload } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useRef, useState } from "react";
import { useFilters } from "@/stores/useFilterStore";
import { cn } from "@/lib/utils";
import { useNotification, type Notification } from "@/hooks/useNotifications";

function Navbar() {
  const setFilters = useFilters((state) => state.setFilters);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const {
    data: notificationData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotification();

  console.log(notificationData);
  const allNotifications =
    notificationData?.pages.flatMap((page) => page.data) || [];
  const unreadCount = allNotifications.length;

  const formatTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor(
      (now.getTime() - created.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "NewContentUpdate":
        return "📄";
      case "RequestForContent":
        return "📝";
      case "Approved":
        return "✅";
      case "Rejected":
        return "❌";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "Approved":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "NewContentUpdate":
        return "text-blue-600";
      case "RequestForContent":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.contentUrl) {
      navigate(notification.contentUrl);
    }
    setIsNotificationOpen(false);

    // TODO: Mark notification as read
    // markNotificationAsRead(notification.id);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <nav className="w-full h-14 fixed top-0 left-0 z-50 bg-background border-b border-border/40 py-2 px-4">
      <div className="h-full flex justify-between items-center w-full">
        <div className="h-full">
          <Link
            to={"/"}
            className="flex justify-center items-center h-full w-fit"
          >
            <Brand height="48" width="48" />
            <span className="font-semibold flex flex-col gap-0 leading-4 w-fit text-[#203143]">
              <span>Nalanda</span>
              <span>Hub</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center h-9 w-[600px]">
          <Input
            className="bg-background rounded-bl-2xl rounded-tl-2xl h-full flex-1 rounded-r-none focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-1"
            placeholder="Search"
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                setFilters({ searchQuery: inputRef.current?.value || "" });
            }}
          />
          <Search
            className="font-extralight bg-gray-100 h-full w-fit px-4 py-2 rounded-r-2xl border border-l-0 hover:bg-gray-200/80 cursor-pointer"
            onClick={() =>
              setFilters({ searchQuery: inputRef.current?.value || "" })
            }
          />
        </div>

        <div className="flex items-center gap-4">
          <div className={cn("mr-12", searchQuery.get("open") && "hidden")}>
            <Button
              variant={"outline"}
              className="rounded-2xl"
              onClick={() => navigate("/my-uploads?open=true")}
            >
              <Upload />
              Upload
            </Button>
          </div>

          {/* Notification Dropdown */}
          <DropdownMenu
            open={isNotificationOpen}
            onOpenChange={setIsNotificationOpen}
          >
            <DropdownMenuTrigger asChild>
              <div className="relative hover:bg-gray-200 p-1.5 rounded-full cursor-pointer">
                <Bell size={18} />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 max-h-96 overflow-y-auto p-0"
              sideOffset={8}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-base">Notifications</h3>
              </div>

              {/* Important Section */}
              {allNotifications.some(
                (n) => n.type === "Approved" || n.type === "Rejected"
              ) && (
                <>
                  <div className="px-4 py-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Important
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {allNotifications
                      .filter(
                        (n) => n.type === "Approved" || n.type === "Rejected"
                      )
                      .slice(0, 3)
                      .map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="p-0 h-auto cursor-pointer"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3 p-3 w-full hover:bg-gray-50">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-lg">
                                {getNotificationIcon(notification.type)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                {notification.title}
                              </p>
                              <p
                                className={`text-xs mt-1 ${getNotificationColor(
                                  notification.type
                                )}`}
                              >
                                {formatTimeAgo("12-12-2012")}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}

              {/* More Notifications Section */}
              <div className="px-4 py-2">
                <h4 className="text-sm font-medium text-gray-700">
                  More notifications
                </h4>
              </div>

              <div className="max-h-64 overflow-y-auto">
                <div className="space-y-1">
                  {allNotifications
                    .filter(
                      (n) => n.type !== "Approved" && n.type !== "Rejected"
                    )
                    .map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-0 h-auto cursor-pointer group"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start gap-3 p-4 w-full hover:bg-gray-50">
                          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span>
                              {getNotificationIcon(notification.type)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 line-clamp-2">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo("12-12-2012")}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                </div>

                {/* Load More */}
                {hasNextPage && (
                  <div className="p-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLoadMore}
                      disabled={isFetchingNextPage}
                      className="w-full"
                    >
                      {isFetchingNextPage
                        ? "Loading..."
                        : "Load more notifications"}
                    </Button>
                  </div>
                )}

                {/* Empty State */}
                {allNotifications.length === 0 && (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Bell size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No notifications yet
                    </p>
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
