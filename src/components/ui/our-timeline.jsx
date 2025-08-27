import React from "react";
import { Timeline } from "./about/timeline"; 

export function OurTimeline() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium distinctio soluta quibusdam fugit
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://placehold.co/215x240"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://placehold.co/215x240"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://placehold.co/215x240"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="https://placehold.co/215x240"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p
            className="mb-8 text-lg font-bold text-neutral-800 md:text-3xl dark:text-neutral-200">
            70 Years of Excellence in Education
          </p>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            The School celebrated “70 Years of Excellence in Education” as an opportunity to reflect on the institution’s legacy, achievements, and contributions to education and society. It brought together the school community, inspired future generations, and underscored the importance of education in shaping individuals and communities over the years.
          </p>
        </div>
      ),
    },
    {
      title: "2017",
      content: (
        <div>
          <p
            className="mb-8 text-xl font-bold text-neutral-800 md:text-3xl dark:text-neutral-200">
            Indoor Sports Stadium
          </p>
          <p
            className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            To provide a safe, versatile, and accessible space for a wide range of sports and physical activities, an “Indoor Sports Stadium”, was constructed inside the school premises. It enables the children to play various games like, basket-ball, hand-ball, badminton, table tennis and many more.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
