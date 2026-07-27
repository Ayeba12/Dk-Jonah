"use client";

import { useState } from "react";

type FaqAccordionProps = {
  items: string[][];
};

export const FaqAccordion = ({ items }: FaqAccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="border-t border-[#ded2c1]">
      {items.map(([question, answer], index) => {
        const active = activeIndex === index;

        return (
          <div className="border-b border-[#ded2c1]" key={question}>
            <button
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setActiveIndex(active ? -1 : index)}
              type="button"
            >
              <span className="font-display text-2xl font-medium">
                {question}
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fffaf2] text-xl">
                {active ? "-" : "+"}
              </span>
            </button>
            {active ? (
              <p className="max-w-3xl pb-6 text-lg leading-8 text-[#7a7065]">
                {answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
