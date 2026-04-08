import { cn } from "@/lib/utils";
import { FileCategory } from "../types";

interface FilterTab {
  value: FileCategory | null;
  label: string;
}

const TABS: FilterTab[] = [
  { value: null, label: "All Files" },
  { value: FileCategory.image, label: "Images" },
  { value: FileCategory.video, label: "Videos" },
  { value: FileCategory.audio, label: "Audio" },
  { value: FileCategory.document_, label: "Documents" },
];

interface FilterTabsProps {
  activeCategory: FileCategory | null;
  onChange: (category: FileCategory | null) => void;
  counts?: Partial<Record<string | "all", number>>;
}

export function FilterTabs({
  activeCategory,
  onChange,
  counts,
}: FilterTabsProps) {
  return (
    <div
      className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none"
      role="tablist"
      aria-label="Filter by file type"
      data-ocid="filter-tabs"
    >
      {TABS.map((tab) => {
        const isActive = activeCategory === tab.value;
        const key = tab.value ?? "all";
        const count = counts?.[key];

        return (
          <button
            type="button"
            key={String(tab.value)}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            data-ocid={`filter-tab-${String(tab.value ?? "all")}`}
            className={cn(
              "relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {tab.label}
            {count != null && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
