import { type ReactNode, useState } from "react";
import type { FileCategory } from "../types";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  activeCategory: FileCategory | null;
  onCategoryChange: (category: FileCategory | null) => void;
  onUploadClick: () => void;
}

export function Layout({
  children,
  activeCategory,
  onCategoryChange,
  onUploadClick,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onUploadClick={onUploadClick}
        onMenuToggle={() => setSidebarOpen((v) => !v)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
