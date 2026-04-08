import { cn } from "@/lib/utils";
import { FileText, Image, LayoutGrid, Music, Video, X } from "lucide-react";
import { FileCategory } from "../types";
import { StorageMeter } from "./StorageMeter";

interface SidebarProps {
  activeCategory: FileCategory | null;
  onCategoryChange: (category: FileCategory | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "All Files", icon: LayoutGrid, category: null },
  { label: "Documents", icon: FileText, category: FileCategory.document_ },
  { label: "Images", icon: Image, category: FileCategory.image },
  { label: "Videos", icon: Video, category: FileCategory.video },
  { label: "Audio", icon: Music, category: FileCategory.audio },
] as const;

export function Sidebar({
  activeCategory,
  onCategoryChange,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          role="button"
          tabIndex={-1}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-14 left-0 bottom-0 z-30 w-56 flex flex-col",
          "bg-card border-r border-border",
          "transition-transform duration-200 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="sidebar-nav"
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-3 pt-3 pb-1 lg:hidden">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:block">
            Library
          </p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ label, icon: Icon, category }) => {
              const isActive = activeCategory === category;
              return (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => {
                      onCategoryChange(category);
                      onClose();
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted",
                    )}
                    data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Storage meter */}
        <div className="px-3 pb-4">
          <StorageMeter />
        </div>
      </aside>
    </>
  );
}
