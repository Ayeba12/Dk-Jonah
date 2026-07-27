type SectionHeadingProps = {
  label: string;
  title: string;
  intro: string;
  align?: "left" | "center" | "split";
  tone?: "light" | "dark";
};

export const SectionHeading = ({
  label,
  title,
  intro,
  align = "split",
  tone = "light",
}: SectionHeadingProps) => {
  const centered = align === "center";
  const split = align === "split";
  const labelColor = tone === "dark" ? "text-white/45" : "text-[#7a7065]";
  const titleColor = tone === "dark" ? "text-white" : "text-[#111111]";
  const introColor = tone === "dark" ? "text-white/62" : "text-[#7a7065]";

  return (
    <div
      className={
        centered
          ? "mx-auto mb-16 max-w-3xl text-center"
          : split
            ? "mb-16 grid gap-6 lg:grid-cols-[0.8fr_1fr]"
            : "mb-16 max-w-3xl"
      }
    >
      <div>
        <p className={`mb-4 text-sm font-medium ${labelColor}`}>{label}</p>
        <h2 className={`font-display text-4xl font-semibold leading-[0.92] md:text-5xl lg:text-6xl ${titleColor}`}>
          {title}
        </h2>
      </div>
      <p
        className={`text-base leading-7 md:text-lg ${introColor} ${
          split ? "lg:self-end lg:text-right" : "mt-5"
        }`}
      >
        {intro}
      </p>
    </div>
  );
};
