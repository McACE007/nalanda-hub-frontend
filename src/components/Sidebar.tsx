import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  GitPullRequestCreateArrow,
  Home,
  Menu,
  Upload,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";


type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

const menuItems = [
  {
    name: "Home",
    icon: Home,
    href: "/",
  },
  {
    name: "My Uploads",
    icon: Upload,
    href: "/my-uploads",
  },
  {
    name: "My Requests",
    icon: GitPullRequestCreateArrow,
    href: "/my-requests",
  },
];

const modMenuItems = [
  {
    name: "Assigned Requests",
    icon: GitPullRequestCreateArrow,
    href: "/assigned-requests",
  },
];

function Sidebar({ isOpen, toggle }: SidebarProps) {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggle}
        />
      )}
      
      <div
        className={cn(
          "fixed z-50 bg-background border-r transition-all duration-300",
          // Mobile: fullscreen overlay
          "lg:left-0 lg:top-14 lg:h-[calc(100%-56px)]",
          // Mobile positioning and sizing
          "inset-0 lg:inset-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Width behavior
          isOpen ? "w-full lg:w-64" : "w-full lg:w-16"
        )}
      >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant={"ghost"} size={"icon"} onClick={toggle} className="lg:block">
            <Menu className="w-4 min-w-4" />
          </Button>
          <h1
            className={cn(
              "font-semibold whitespace-nowrap transition-all duration-300 ml-2 overflow-hidden",
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 lg:opacity-0 lg:w-0"
            )}
          >
            User Panel
          </h1>
        </div>
        {/* Close button for mobile */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggle}
          className="lg:hidden"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <hr></hr>
      <div className="space-y-1 py-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              navigate(item.href);
              // Close sidebar on mobile after navigation
              if (window.innerWidth < 1024) {
                toggle();
              }
            }}
            className={cn(
              "flex items-center px-6 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
            )}
          >
            <item.icon className="size-4 min-w-4" />
            <span
              className={cn(
                "ml-3 transition-all duration-300 whitespace-nowrap overflow-hidden",
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              )}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
      {user?.role === "MOD" && (
        <>
          <div className="flex h-16 items-center px-4">
            <h2
              className={cn(
                "font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden",
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
              )}
            >
              Moderator Panel
            </h2>
          </div>
          <hr></hr>

          <div className="py-4">
            {modMenuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 1024) {
                    toggle();
                  }
                }}
                className={cn(
                  "flex items-center px-6 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                )}
              >
                <item.icon className="size-4 min-w-4" />
                <span
                  className={cn(
                    "ml-3 transition-all duration-300 whitespace-nowrap overflow-hidden",
                    isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                  )}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      </div>
    </>
  );
}

export default Sidebar;
