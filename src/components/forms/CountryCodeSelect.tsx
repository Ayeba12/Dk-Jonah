"use client";

import { KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { dialCodes, type DialCode } from "@/content/dial-codes";

type Props = {
  value: string;
  onChange: (iso: string) => void;
  /** Id of the visible label above the field. */
  labelledBy: string;
  searchLabel: string;
  noMatchLabel: string;
  className?: string;
};

/**
 * The country code picker. A native select opens a list as wide as its longest option, which runs off
 * small screens. This one opens inside the field's own width, scrolls, and filters as you type.
 * Keyboard: Enter, Space or Down opens; Up and Down move; Enter chooses; Escape closes.
 */
export const CountryCodeSelect = ({ value, onChange, labelledBy, searchLabel, noMatchLabel, className = "" }: Props) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = dialCodes.find((entry) => entry.iso === value) ?? dialCodes[0];

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return dialCodes;
    return dialCodes.filter(
      (entry) => entry.name.toLowerCase().includes(q) || entry.dial.slice(1).startsWith(q) || entry.iso.toLowerCase() === q,
    );
  }, [query]);

  // A click or tap anywhere else closes the list.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  // The search box takes focus as the list opens; the highlighted row stays in view.
  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const row = listRef.current?.children[active] as HTMLElement | undefined;
    row?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openList = () => {
    setQuery("");
    setActive(Math.max(0, dialCodes.findIndex((entry) => entry.iso === value)));
    setOpen(true);
  };

  const choose = (entry: DialCode) => {
    onChange(entry.iso);
    setOpen(false);
  };

  const onListKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(matches.length - 1, index + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(0, index - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const entry = matches[active];
      if (entry) choose(entry);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const onButtonKey = (event: KeyboardEvent) => {
    if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openList();
    }
  };

  const activeEntry = matches[active];

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-controls={`${id}-list`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={labelledBy}
        className={`${className} flex cursor-pointer items-center justify-between gap-3 text-left`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onButtonKey}
        type="button"
      >
        <span className="min-w-0 truncate">{selected.name}</span>
        <span className="flex shrink-0 items-center gap-2 text-black/60">
          {selected.dial}
          <svg
            aria-hidden="true"
            className={`h-4 w-4 text-gold-shadow transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-black/15 bg-ivory shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          <div className="border-b border-black/10 px-4 py-2">
            <input
              aria-label={searchLabel}
              autoComplete="off"
              className="w-full bg-transparent py-2 text-base text-black placeholder:text-black/40 focus:outline-none focus-visible:outline-none"
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onListKey}
              placeholder={searchLabel}
              ref={searchRef}
              type="text"
              value={query}
            />
          </div>
          <ul
            aria-activedescendant={activeEntry ? `${id}-${activeEntry.iso}` : undefined}
            aria-labelledby={labelledBy}
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
            id={`${id}-list`}
            ref={listRef}
            role="listbox"
            tabIndex={-1}
          >
            {matches.map((entry, index) => {
              const isActive = index === active;
              const isSelected = entry.iso === value;
              return (
                <li
                  aria-selected={isSelected}
                  className={`flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm ${
                    isActive ? "bg-black text-ivory" : "text-black"
                  } ${isSelected && !isActive ? "font-semibold" : ""}`}
                  id={`${id}-${entry.iso}`}
                  key={entry.iso}
                  onClick={() => choose(entry)}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  role="option"
                >
                  <span className="min-w-0 truncate">{entry.name}</span>
                  <span className={`shrink-0 tabular-nums ${isActive ? "text-champagne" : "text-black/55"}`}>{entry.dial}</span>
                </li>
              );
            })}
            {matches.length === 0 ? <li className="px-4 py-3 text-sm text-black/55">{noMatchLabel}</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
