import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  GitPullRequestCreateArrow,
  Home,
  LogOut,
  Menu,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

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
  {
    name: "Logout",
    icon: LogOut,
    href: "",
  },
];

function Sidebar({ isOpen, toggle }: SidebarProps) {
  const logout = useAuthStore.getState().logout;
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
    toast.success("Logged out sucessfully!");
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-14 z-40 h-[calc(100%-56px)] bg-background/0 transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        "border-r"
      )}
    >
      <div className="flex h-16 items-center px-4">
        <Button variant={"ghost"} size={"icon"} onClick={toggle}>
          <Menu className="w-4 min-w-4" />
        </Button>
        <h1
          className={cn(
            "font-semibold whitespace-nowrap transition-all duration-300 ml-2 overflow-hidden",
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
          )}
        >
          User Panel
        </h1>
      </div>
      <hr></hr>
      <div className="space-y-1 py-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={
              item.name == "Logout" ? handleLogout : () => navigate(item.href)
            }
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
    </div>
  );
}

export default Sidebar;
