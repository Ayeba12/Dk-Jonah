type EmphasisProps = {
  text: string;
  phrase: string;
  className?: string;
};

/**
 * Renders `text` with the first occurrence of `phrase` wrapped in <strong>.
 * Used where the locked copy marks a phrase in bold.
 */
export const Emphasis = ({
  text,
  phrase,
  className = "font-semibold text-current",
}: EmphasisProps) => {
  const index = text.indexOf(phrase);
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <strong className={className}>{phrase}</strong>
      {text.slice(index + phrase.length)}
    </>
  );
};
