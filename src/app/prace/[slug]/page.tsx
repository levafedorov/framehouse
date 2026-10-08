import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryTrigger from "@/components/InquiryTrigger";
import { ArrowRight } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import {
  kindLabel,
  projectBySlug,
  projects,
  relatedProjects,
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
    title: `${project.caption} — ${site.name}`,
    description: project.brief,
  };
}

function offer(project: Project) {
  if (project.kind === "concept") {
    return {
      title: `Chcete ${project.service.toLowerCase()} pro svou firmu?`,
      text: `Napište, co děláte. ${site.announcement}.`,
    };
  }
  return {
    title: "Chcete něco podobného?",
    text: `Napište, co potřebujete. ${site.announcement}.`,
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const others = relatedProjects(project);
  const cta = offer(project);
  const facts = [
    ...(project.facts ?? []),
    ...(project.context ? [{ label: "Kontext", value: project.context }] : []),
  ];

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} id="top">
          <div className={styles.copy}>
            <Link href="/#work" className={`eyebrow ${styles.back}`}>
              <ArrowRight size={12} className={styles.backArrow} />
              Naše práce
            </Link>
            <p className={`eyebrow ${styles.kind}`}>
              {kindLabel[project.kind]}
            </p>
            <h1 className={styles.title}>{project.caption}</h1>

            {facts.length > 0 && (
              <dl className={styles.facts}>
                {facts.map((f) => (
                  <div key={f.label} className={styles.fact}>
                    <dt className="eyebrow">{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className={styles.media}>
            <Image
              src={project.cover}
              alt=""
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 58vw"
              className={styles.cover}
            />
          </div>
        </section>

        {project.stills && project.stills.length > 0 && (
          <section className={styles.section} aria-label="Detaily">
            <ul className={styles.stills}>
              {project.stills.map((still) => (
                <li key={still.src}>
                  <span className={styles.still}>
                    <Image
                      src={still.src}
                      alt={`${project.name}: ${still.label}`}
                      fill
                      sizes="(max-width: 600px) 100vw, 33vw"
                      quality={75}
                      className={styles.stillImg}
                    />
                  </span>
                  <span className={styles.caption}>{still.label}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {others.length > 0 && (
          <section className={styles.section} aria-labelledby="others-title">
            <div className={styles.head}>
              <h2 id="others-title" className={`eyebrow ${styles.heading}`}>
                Další práce
              </h2>
              <Link href="/#work" className={styles.headLink}>
                Všechny práce
                <ArrowRight size={12} />
              </Link>
            </div>
            <ul className={styles.others}>
              {others.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.cta} aria-label="Nabídka">
          <h2 className={styles.ctaTitle}>{cta.title}</h2>
          <p className={styles.ctaText}>{cta.text}</p>
          <InquiryTrigger
            request={{ kind: "obecna" }}
            button={{ variant: "outline", arrow: false }}
            className={styles.pill}
          >
            Popište nám projekt
          </InquiryTrigger>
        </section>
      </main>
      <Footer />
    </>
  );
}
