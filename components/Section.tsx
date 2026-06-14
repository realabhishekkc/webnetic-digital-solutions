import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const Tag = as;
  return (
    <Reveal
      className={`flex flex-col gap-4 ${align === "center" ? "mx-auto max-w-2xl text-center items-center" : "max-w-2xl"}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="text-display-md font-semibold text-ink">{title}</Tag>
      {intro && <p className="text-lg leading-relaxed text-ink-muted">{intro}</p>}
    </Reveal>
  );
}
