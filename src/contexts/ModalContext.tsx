import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ModalContextType {
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isProfileModalOpen, setIsProfileModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}