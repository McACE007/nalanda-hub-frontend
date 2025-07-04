import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  GitPullRequestCreateArrow,
  Home,
  ListOrdered,
  LogOut,
  Printer,
  SendToBack,
  Settings,
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
      <div className="flex h-16 items-center justify-between px-4">
        <h1
          className={cn(
            "font-semibold transition-all duration-300",
            !isOpen && "hidden"
          )}
        >
          User Panel
        </h1>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="ml-auto"
          onClick={toggle}
        >
          {isOpen ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
      </div>
      <div className="space-y-1 py-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={
              item.name == "Logout" ? handleLogout : () => navigate(item.href)
            }
            className={cn(
              "flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer",
              !isOpen && "justify-center"
            )}
          >
            <item.icon className="size-4" />
            <span
              className={cn(
                "ml-3 transition-all duration-300",
                !isOpen && "hidden"
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
