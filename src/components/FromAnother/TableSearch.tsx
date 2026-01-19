"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "@mui/material/utils";

const TableSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  // Initialize search value from URL on mount
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  // Create debounced search function with useMemo to avoid recreating on each render
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(window.location.search);
        
        if (value.trim()) {
          params.set("search", value.trim());
        } else {
          params.delete("search");
        }
        
        // Reset to page 1 when searching
        params.set("page", "1");
        
        router.push(`${window.location.pathname}?${params}`);
      }, 500), // 500ms delay
    [router]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    debouncedSearch.clear(); // Clear any pending debounced calls
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
        value={searchValue}
        onChange={handleChange}
      />
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-600 p-1"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default TableSearch;