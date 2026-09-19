import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ArrowButtonProps = {
  children: ReactNode;
  href?: string;
  /**
   * dark: black pill, ivory text, gold arrow capsule (on ivory surfaces)
   * light: outlined ivory pill for black surfaces, gold arrow capsule
   * gold: solid gold pill, black text, black arrow capsule
   * ivory: solid ivory pill, black text, gold arrow capsule (on black surfaces)
   */
  variant?: "dark" | "light" | "gold" | "ivory" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass = {
  dark: "border-black bg-black text-ivory hover:bg-gold-shadow hover:border-gold-shadow",
  light: "border-ivory/35 bg-ivory/10 text-ivory hover:bg-ivory/20",
  gold: "border-gold bg-gold text-black hover:bg-champagne hover:border-champagne",
  ivory: "border-ivory bg-ivory text-black hover:bg-champagne hover:border-champagne",
  // Legacy alias used by pages not yet migrated.
  accent: "border-gold bg-gold text-black hover:bg-champagne hover:border-champagne",
};

const capsuleClass = {
  dark: "bg-gold text-black",
  light: "bg-gold text-black",
  gold: "bg-black text-ivory",
  ivory: "bg-gold text-black",
  accent: "bg-black text-ivory",
};

const sizeClass = {
  sm: "h-10 pl-4 text-sm gap-2.5",
  md: "h-12 pl-5 text-[15px] gap-3",
  lg: "h-14 pl-6 text-base gap-3.5",
};

const arrowSize = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

export const ArrowButton = ({
  children,
  href,
  variant = "dark",
  size = "md",
  className = "",
  ...buttonProps
}: ArrowButtonProps) => {
  const classes = `group inline-flex w-fit items-center overflow-hidden rounded-full border pr-1.5 font-medium transition-colors duration-200 ${variantClass[variant]} ${sizeClass[size]} ${className}`;

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        aria-hidden="true"
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${capsuleClass[variant]} ${arrowSize[size]}`}
      >
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-8">
          <ArrowIcon />
        </span>
        <span className="absolute -translate-x-8 transition-transform duration-300 ease-out group-hover:translate-x-0">
          <ArrowIcon />
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <button className={classes} type="button" {...buttonProps}>
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
