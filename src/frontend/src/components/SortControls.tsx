import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp, ArrowUpDown, ChevronDown } from "lucide-react";
import { SortField, SortOrder } from "../types";

interface SortControlsProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

const SORT_FIELD_LABELS: Record<SortField, string> = {
  [SortField.uploadDate]: "Upload Date",
  [SortField.fileSize]: "File Size",
  [SortField.name]: "Name",
};

export function SortControls({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}: SortControlsProps) {
  const toggleOrder = () =>
    onSortOrderChange(
      sortOrder === SortOrder.desc ? SortOrder.asc : SortOrder.desc,
    );

  return (
    <div className="flex items-center gap-1.5" data-ocid="sort-controls">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-sm font-medium border-input bg-muted/40 hover:bg-muted"
            data-ocid="sort-field-trigger"
          >
            {SORT_FIELD_LABELS[sortField]}
            <ChevronDown size={14} className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(Object.values(SortField) as SortField[]).map((field) => (
            <DropdownMenuItem
              key={field}
              onClick={() => onSortFieldChange(field)}
              className={
                sortField === field ? "font-semibold text-primary" : ""
              }
              data-ocid={`sort-field-${field}`}
            >
              {SORT_FIELD_LABELS[field]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleOrder}
        aria-label={`Sort ${sortOrder === SortOrder.asc ? "descending" : "ascending"}`}
        className="h-9 w-9 p-0 border-input bg-muted/40 hover:bg-muted"
        data-ocid="sort-order-toggle"
      >
        {sortOrder === SortOrder.desc ? (
          <ArrowDownUp size={15} className="text-muted-foreground" />
        ) : (
          <ArrowUpDown size={15} className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
