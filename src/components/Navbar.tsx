import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Brand from "./icons/Brand";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search, Upload, Menu } from "lucide-react";
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

interface NavbarProps {
  onMenuClick?: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
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
    <nav className="w-full h-14 fixed top-0 left-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="h-full flex justify-between items-center w-full px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="xl:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </Button>
          
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center h-full"
          >
            <Brand height="40" width="40" />
            <span className="hidden sm:flex font-semibold flex-col gap-0 leading-4 ml-2 text-[#203143]">
              <span>Nalanda</span>
              <span>Hub</span>
            </span>
          </Link>
        </div>

        {/* Search Bar - Responsive */}
        <div className="flex items-center h-8 sm:h-9 flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-6">
          <Input
            className="bg-white rounded-l-2xl h-full flex-1 rounded-r-none border-r-0 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-200 text-sm"
            placeholder="Search..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                setFilters({ searchQuery: inputRef.current?.value || "" });
            }}
          />
          <Button
            size="sm"
            className="h-8 sm:h-9 px-2 sm:px-3 rounded-l-none rounded-r-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 border border-l-0"
            variant="ghost"
            onClick={() =>
              setFilters({ searchQuery: inputRef.current?.value || "" })
            }
          >
            <Search size={14} className="sm:w-4 sm:h-4" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Upload Button */}
          <div className={cn("hidden sm:block", searchQuery.get("open") && "hidden")}>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              onClick={() => navigate("/my-uploads?open=true")}
            >
              <Upload size={16} className="mr-2" />
              <span className="hidden lg:inline">Upload</span>
            </Button>
          </div>
          
          {/* Mobile Upload Button */}
          <div className={cn("sm:hidden", searchQuery.get("open") && "hidden")}>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => navigate("/my-uploads?open=true")}
            >
              <Upload size={18} />
            </Button>
          </div>

          {/* Notification Dropdown */}
          <DropdownMenu
            open={isNotificationOpen}
            onOpenChange={setIsNotificationOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs p-0 min-w-[16px] sm:min-w-[20px]"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 sm:w-96 max-h-96 overflow-y-auto p-0 mx-4 sm:mx-0"
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

          {/* Avatar */}
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-sm">CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
