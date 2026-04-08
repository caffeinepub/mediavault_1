import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  FileWarning,
} from "lucide-react";
import { useState } from "react";
import { FileCard, FileCardSkeleton } from "../components/FileCard";
import { FilterTabs } from "../components/FilterTabs";
import { SearchBar } from "../components/SearchBar";
import { SortControls } from "../components/SortControls";
import { useFileList } from "../hooks/useFileList";
import type { FileCategory, FileMetadata } from "../types";
import { SortField, SortOrder } from "../types";
import { getCategoryLabel } from "../utils/fileUtils";

const PAGE_SIZE = 20;
const SKELETON_COUNT = 8;
const SKELETON_KEYS = Array.from(
  { length: SKELETON_COUNT },
  (_, i) => `sk-lib-${i}`,
);

interface LibraryPageProps {
  activeCategory: FileCategory | null;
  onCategoryChange: (category: FileCategory | null) => void;
  onFileClick?: (file: FileMetadata) => void;
}

export function LibraryPage({
  activeCategory,
  onCategoryChange,
  onFileClick,
}: LibraryPageProps) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>(SortField.uploadDate);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.desc);
  const [page, setPage] = useState(1);

  // Reset to page 1 when filters change
  function handleCategoryChange(cat: FileCategory | null) {
    onCategoryChange(cat);
    setPage(1);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleSortFieldChange(field: SortField) {
    setSortField(field);
    setPage(1);
  }

  function handleSortOrderChange(order: SortOrder) {
    setSortOrder(order);
    setPage(1);
  }

  const { data, isLoading, isError, isFetching } = useFileList({
    category: activeCategory,
    searchQuery: search,
    sortField,
    sortOrder,
    page: page - 1, // 0-indexed for backend
    pageSize: PAGE_SIZE,
  });

  const files = data?.files ?? [];
  const totalCount = data?.totalCount ?? 0n;
  const totalPages =
    totalCount > 0n ? Math.ceil(Number(totalCount) / PAGE_SIZE) : 1;

  const isEmpty = !isLoading && !isError && files.length === 0;

  return (
    <div className="flex flex-col min-h-full" data-ocid="library-page">
      {/* Sticky top toolbar */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        {/* Filter tabs */}
        <div className="px-4 md:px-6 pt-3 pb-0">
          <FilterTabs
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Search + sort row */}
        <div className="flex items-center gap-2 px-4 md:px-6 py-2.5">
          <SearchBar value={search} onChange={handleSearchChange} />
          <SortControls
            sortField={sortField}
            sortOrder={sortOrder}
            onSortFieldChange={handleSortFieldChange}
            onSortOrderChange={handleSortOrderChange}
          />
        </div>

        {/* Result count */}
        {!isLoading && (
          <div className="px-4 md:px-6 pb-2">
            <p
              className="text-xs text-muted-foreground"
              data-ocid="result-count"
            >
              {isFetching
                ? "Updating…"
                : totalCount > 0n
                  ? `${Number(totalCount)} ${getCategoryLabel(activeCategory).toLowerCase()} file${Number(totalCount) !== 1 ? "s" : ""}${search ? ` matching "${search}"` : ""}`
                  : ""}
            </p>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 px-4 md:px-6 py-4 pb-8">
        {/* Error state */}
        {isError && (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="library-error-state"
          >
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
              <FileWarning className="w-7 h-7 text-destructive" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg mb-1">
              Failed to load files
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Something went wrong. Please refresh the page to try again.
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            data-ocid="library-skeleton"
          >
            {SKELETON_KEYS.map((k) => (
              <FileCardSkeleton key={k} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="library-empty-state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <CloudUpload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg mb-1">
              {search
                ? "No files match your search"
                : `No ${getCategoryLabel(activeCategory).toLowerCase()} yet`}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {search
                ? "Try a different search term or clear the filter."
                : "Upload photos, videos, documents, or audio files to get started."}
            </p>
          </div>
        )}

        {/* File grid */}
        {!isLoading && !isError && files.length > 0 && (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            data-ocid="library-files-grid"
          >
            {files.map((file) => (
              <FileCard key={file.id} file={file} onClick={onFileClick} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && (
          <div
            className="flex items-center justify-center gap-2 mt-8"
            data-ocid="library-pagination"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
              data-ocid="pagination-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => {
                const p = i + 1;
                const near =
                  p === 1 ||
                  p === totalPages ||
                  (p >= page - 1 && p <= page + 1);
                const ellipsis = p === page - 2 || p === page + 2;

                if (near) {
                  return (
                    <button
                      key={`page-${p}`}
                      type="button"
                      onClick={() => setPage(p)}
                      data-ocid={`pagination-page-${p}`}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  );
                }
                if (ellipsis) {
                  return (
                    <span
                      key={`ellipsis-${p}`}
                      className="text-muted-foreground px-1 text-sm"
                    >
                      …
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
              data-ocid="pagination-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
