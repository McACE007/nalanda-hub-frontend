import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { ModalProvider } from "@/contexts/ModalContext";
import { UserProfileModal } from "@/components/UserProfileModal";
import { useModal } from "@/contexts/ModalContext";

function HomeLayoutContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isProfileModalOpen, setIsProfileModalOpen } = useModal();

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main
        className={cn(
          "mt-14 flex-1 transition-all duration-300",
          "lg:ml-16",
          isSidebarOpen && "lg:ml-64"
        )}
      >
        <Outlet />
      </main>
      <UserProfileModal 
        open={isProfileModalOpen} 
        onOpenChange={setIsProfileModalOpen} 
      />
    </div>
  );
}

function HomeLayout() {
  return (
    <ModalProvider>
      <HomeLayoutContent />
    </ModalProvider>
  );
}

export default HomeLayout;
