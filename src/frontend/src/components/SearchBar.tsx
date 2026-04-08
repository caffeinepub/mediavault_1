import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search files…",
}: SearchBarProps) {
  return (
    <div className="relative flex-1 min-w-0 max-w-sm" data-ocid="search-bar">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search files"
        data-ocid="search-input"
        className="pl-9 pr-9 h-9 bg-muted/40 border-input focus-visible:bg-background transition-colors duration-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
