"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = ({ defaultDate }: { defaultDate?: string }) => {
  const [value, onChange] = useState<Value>(
    defaultDate ? new Date(defaultDate) : new Date()
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (value instanceof Date) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("date", value.toISOString());
      router.push(`?${params.toString()}`);
    }
  }, [value, router, searchParams]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
