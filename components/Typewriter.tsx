"use client";

import { useEffect, useState } from "react";

// Live typewriter effect cycling real lines of agency work. Static first line under reduced motion.
export function Typewriter({ lines }: { lines: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce) {
      setText(lines[0]);
      return;
    }
    const current = lines[index % lines.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? 26 : 52
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, lines, reduce]);

  return (
    <span className="font-mono text-sm text-brand-bright">
      {text}
      {!reduce && <span className="ml-0.5 inline-block w-2 animate-blink bg-brand-bright text-transparent">.</span>}
    </span>
  );
}
