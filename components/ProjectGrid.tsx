import Image from "next/image";
import { PROJECTS, type Project } from "@/lib/projects";
import { ArrowUpRight } from "./icons";
import { Reveal } from "./Reveal";

export function ProjectGrid({ projects = PROJECTS }: { projects?: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <Reveal as="article" key={p.slug} delay={i * 0.05}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
          >
            {/* screenshot of the live site */}
            <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${p.accent}`}>
              <Image
                src={p.image}
                alt={`${p.name} website homepage screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-top transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
              />
              {/* gradient scrim for badge legibility */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg/55 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-bg/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {p.category}
              </span>
              <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/55 text-white backdrop-blur-md transition-transform duration-300 group-hover:rotate-12">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-medium text-ink">{p.name}</h3>
              <p className="mt-1 text-xs font-medium text-brand-bright">{p.domain}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.what}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">What we did. </span>
                {p.did}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-hairline px-2.5 py-1 text-xs text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
