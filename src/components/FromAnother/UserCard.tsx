"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const UserCard = ({ type }: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {

  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // TODO: enable when API is ready
        // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/count`);
        // const json = await res.json();
        // setData(json.count);

        // temporary dummy fallback
        const fallback =
          type === "admin" ? 3 :
            type === "teacher" ? 25 :
              type === "student" ? 540 :
                120;

        setData(fallback);
      } catch {
        setData(0);
      }
    }

    load();
  }, [type]);


  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>

      <h1 className="text-2xl font-semibold my-4">
        {data === null ? "…" : data}
      </h1>

      <h2 className="capitalize text-sm font-medium text-gray-500">
        {type}s
      </h2>
    </div>
  );
};

export default UserCard;
