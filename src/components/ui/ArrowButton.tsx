import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ArrowButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass = {
  dark: "border-[#201a16] bg-[#201a16] text-white",
  light: "border-white/70 bg-white/10 text-white",
  accent: "border-[#b68a3a] bg-[#b68a3a] text-[#111111]",
};

const sizeClass = {
  sm: "h-9 pl-4 text-sm",
  md: "h-12 pl-5 text-base",
  lg: "h-16 pl-7 text-lg",
};

const arrowSize = {
  sm: "h-7 w-10",
  md: "h-9 w-12",
  lg: "h-12 w-16",
};

export const ArrowButton = ({
  children,
  href,
  variant = "dark",
  size = "md",
  className = "",
  ...buttonProps
}: ArrowButtonProps) => {
  const classes = `group inline-flex w-fit items-center gap-3 overflow-hidden rounded-2xl border pr-1 font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b68a3a] ${variantClass[variant]} ${sizeClass[size]} ${className}`;
  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[inherit] bg-[#b68a3a] text-[#111111] ${arrowSize[size]}`}
        aria-hidden="true"
      >
        <span className="transition-transform duration-300 group-hover:translate-x-7">
          <ArrowIcon />
        </span>
        <span className="absolute -translate-x-7 transition-transform duration-300 group-hover:translate-x-0">
          <ArrowIcon />
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <button className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
};

const ArrowIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12h13m0 0-5-5m5 5-5 5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
