"use client";

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const totalPages = Math.ceil(count / ITEM_PER_PAGE);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pt-6 flex items-center justify-between border-t border-gray-100">
      {/* Results info */}
      <p className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-700">{page}</span> of{" "}
        <span className="font-medium text-gray-700">{totalPages}</span>
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          disabled={!hasPrev}
          className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
          onClick={() => changePage(page - 1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center gap-1 mx-2">
          {getPageNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-gray-400"
              >
                ···
              </span>
            ) : (
              <button
                key={pageNum}
                className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-150 ${
                  page === pageNum
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => changePage(pageNum as number)}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        {/* Mobile page indicator */}
        <span className="sm:hidden mx-3 text-sm text-gray-500">
          {page} / {totalPages}
        </span>

        {/* Next button */}
        <button
          className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200"
          disabled={!hasNext}
          onClick={() => changePage(page + 1)}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
