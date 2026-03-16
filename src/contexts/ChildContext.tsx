"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchChildrenOfParentAction } from "@/actions/admin";
import type { ChildItem } from "@/types/schemas";

interface ChildContextType {
  children: ChildItem[];
  selectedChildId: string | null;
  selectedChild: ChildItem | null;
  loading: boolean;
  setChild: (id: string) => void;
}

const ChildContext = createContext<ChildContextType>({
  children: [],
  selectedChildId: null,
  selectedChild: null,
  loading: false,
  setChild: () => {},
});

export function ChildProvider({
  children,
  initialChildId,
  role,
}: {
  children: ReactNode;
  initialChildId: string | null;
  role: string | null;
}) {
  const router = useRouter();
  const [childrenList, setChildrenList] = useState<ChildItem[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(initialChildId);
  const [loading, setLoading] = useState<boolean>(role === "parent");

  useEffect(() => {
    if (role !== "parent") {
      setLoading(false);
      return;
    }

    fetchChildrenOfParentAction()
      .then((res) => {
        if (!res.success || !res.data) {
          setChildrenList([]);
          return;
        }

        setChildrenList(res.data);

        // Keep selection stable and recover when cookie is missing/invalid.
        const exists = res.data.some((child) => child.id === initialChildId);
        if (!exists) {
          const fallback = res.data[0];
          if (fallback) {
            document.cookie = `selected_child_id=${fallback.id}; path=/; max-age=31536000`;
            setSelectedChildId(fallback.id);
          } else {
            setSelectedChildId(null);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [initialChildId, role]);

  const setChild = (id: string) => {
    document.cookie = `selected_child_id=${id}; path=/; max-age=31536000`;
    setSelectedChildId(id);
    router.refresh();
  };

  const selectedChild =
    childrenList.find((child) => child.id === selectedChildId) ?? childrenList[0] ?? null;

  return (
    <ChildContext.Provider
      value={{
        children: childrenList,
        selectedChildId,
        selectedChild,
        loading,
        setChild,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  return useContext(ChildContext);
}
