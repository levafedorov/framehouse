import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ArrowRight,
  CalendarIcon,
  ChevronLeft,
  ClapperIcon,
  ClockIcon,
  InstagramIcon,
  PhoneIcon,
  StoreIcon,
  TrophyIcon,
} from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import WorkVideo from "@/components/WorkVideo";
import {
  categoryTone,
  kindLabel,
  projectBySlug,
  projects,
  relatedProjects,
  storyLabels,
  type FactIcon,
  type Project,
} from "@/data/projects";
import { site } from "@/data/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.service} · ${site.name}`,
    description: project.brief,
  };
}

const factIcon: Record<FactIcon, typeof ClapperIcon> = {
  service: ClapperIcon,
  format: PhoneIcon,
  length: ClockIcon,
  year: CalendarIcon,
  channel: InstagramIcon,
  industry: StoreIcon,
  context: TrophyIcon,
};

/**
 * The offer under the work. A concept has no client behind it, so it asks
 * about the visitor's own firm instead of "something similar".
 */
function offer(project: Project) {
  if (project.kind === "concept") {
    return {
      title: `Chcete ${project.service.toLowerCase()} pro svou firmu?`,
      text: `Napište, co děláte. ${site.announcement}.`,
      subject: project.service,
    };
  }
  return {
    title: "Chcete něco podobného?",
    text: `Napište, co potřebujete. ${site.announcement}.`,
    subject: `Něco jako ${project.name} — ${project.service}`,
  };
}

/** First sentence set in serif, the rest in the small sans */
function splitLead(text: string): [string, string] {
  const i = text.indexOf(". ");
  if (i === -1) return [text, ""];
  return [text.slice(0, i + 1), text.slice(i + 2)];
}

function Story({ label, text }: { label: string; text: string }) {
  const [lead, rest] = splitLead(text);
  return (
    <div className={styles.story}>
      <h2 className={`eyebrow ${styles.label}`}>{label}</h2>
      <p className={`serif ${styles.lead}`}>{lead}</p>
      {rest && <p className={`muted ${styles.text}`}>{rest}</p>}
    </div>
  );
}

/**
 * One work, standing on its own: the piece itself next to a tile in the
 * category's colour, the brief and what we did, frames from the piece,
 * a strip of facts, three other works and the offer. The layout follows
 * the case-study mockup generated from the homepage (GPT Image 2).
 *
 * Kinds: client and realised work share the layout (the tag says which);
 * a concept (issue #19) names only the industry and the context, reads
 * "Výchozí bod / Co jsme zkoušeli" and ends with an offer for the
 * visitor's own firm.
 */
export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const tone = categoryTone[project.category];
  const concept = project.kind === "concept";
  const [briefLabel, solutionLabel] = storyLabels[project.kind];
  const others = relatedProjects(project);
  const cta = offer(project);
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
    cta.subject,
  )}`;

  return (
    <>
      <Header />
      <main>
        <section className={`shell ${styles.intro}`} id="top">
          <article className={`${styles.hero} ${styles[tone]}`}>
            <div
              className={`${styles.media} ${project.video ? "" : styles.mediaLogo}`}
            >
              {project.video ? (
                <WorkVideo project={project} />
              ) : (
                <Image
                  src={project.logo}
                  alt=""
                  width={260}
                  height={260}
                  preload
                  className={styles.logo}
                />
              )}
              <span className={`eyebrow ${styles.tag}`}>
                {kindLabel[project.kind]}
              </span>
              {project.isNew && (
                <span className={`eyebrow ${styles.tag} ${styles.new}`}>
                  Nové
                </span>
              )}
            </div>

            <div className={styles.copy}>
              <Link href="/#work" className={`eyebrow ${styles.back}`}>
                <ChevronLeft size={12} />
                Vybrané práce
              </Link>
              <h1 className={`serif ${styles.title}`}>
                {project.name}&nbsp;—
                <br />
                {project.service}
              </h1>
              <dl className={styles.meta}>
                {concept ? (
                  <>
                    <div className={styles.metaRow}>
                      <dt className={`eyebrow ${styles.metaKey}`}>Obor</dt>
                      <dd className={styles.metaValue}>{project.name}</dd>
                    </div>
                    {project.context && (
                      <div className={styles.metaRow}>
                        <dt className={`eyebrow ${styles.metaKey}`}>
                          Kontext
                        </dt>
                        <dd className={styles.metaValue}>{project.context}</dd>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.metaRow}>
                    <dt className={`eyebrow ${styles.metaKey}`}>
                      {kindLabel[project.kind]}
                    </dt>
                    <dd className={styles.metaValue}>{project.name}</dd>
                  </div>
                )}
                <div className={styles.metaRow}>
                  <dt className={`eyebrow ${styles.metaKey}`}>Rok</dt>
                  <dd className={styles.metaValue}>{project.year}</dd>
                </div>
              </dl>
            </div>
          </article>
        </section>

        {(project.brief || project.solution) && (
          <section className={`shell ${styles.stories}`} aria-label="O práci">
            {project.brief && <Story label={briefLabel} text={project.brief} />}
            {project.solution && (
              <Story label={solutionLabel} text={project.solution} />
            )}
          </section>
        )}

        {project.stills && project.stills.length > 0 && (
          <section className={`shell ${styles.frames}`} aria-label="Záběry">
            <ul className={styles.framesGrid}>
              {project.stills.map((still, i) => (
                <li key={still.src} className={styles.frame}>
                  <Image
                    src={still.src}
                    alt={`${project.name}: ${still.label}`}
                    fill
                    sizes="(max-width: 600px) 100vw, 33vw"
                    quality={75}
                    className={styles.frameImg}
                  />
                  <span className={`eyebrow ${styles.caption}`}>
                    {String(i + 1).padStart(2, "0")} / {still.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.facts && project.facts.length > 0 && (
          <section className={`shell ${styles.factsWrap}`} aria-label="Fakta">
            <dl className={styles.facts}>
              {project.facts.map((f) => {
                const Icon = factIcon[f.icon];
                return (
                  <div key={f.label} className={styles.fact}>
                    <Icon size={30} className={styles.factIcon} />
                    <dt className={`eyebrow ${styles.factKey}`}>{f.label}</dt>
                    <dd className={styles.factValue}>{f.value}</dd>
                  </div>
                );
              })}
            </dl>
          </section>
        )}

        {others.length > 0 && (
          <section
            className={`shell ${styles.others}`}
            aria-labelledby="others-title"
          >
            <div className={styles.head}>
              <h2 id="others-title" className={`eyebrow ${styles.heading}`}>
                Další práce
              </h2>
              <Link href="/#work" className={`muted ${styles.all}`}>
                Všechny práce
                <ArrowRight size={12} />
              </Link>
            </div>
            <ul className={styles.othersGrid}>
              {others.map((p) => (
                <li key={p.slug} className={styles.other}>
                  <ProjectCard project={p} />
                  <p className={styles.otherName}>
                    <span className={styles.otherClient}>{p.name}</span>
                    <span className="muted"> — {p.service}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={`shell ${styles.offer}`} aria-label="Nabídka">
          <div className={styles.cta}>
            <Image
              src="/media/work/cta-flat.webp"
              alt=""
              width={520}
              height={520}
              className={styles.wash}
            />
            <div className={styles.ctaCopy}>
              <h2 className={`serif ${styles.ctaTitle}`}>{cta.title}</h2>
              <p className={styles.ctaText}>{cta.text}</p>
            </div>
            <Button href={mailto} variant="light">
              Popište nám projekt
              <ArrowRight size={12} />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
