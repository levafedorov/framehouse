import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, ChevronLeft } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { bundles } from "@/data/bundles";
import {
  defaultSteps,
  serviceById,
  serviceExamples,
  serviceTerms,
  services,
} from "@/data/services";
import { site } from "@/data/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = serviceById(id);
  if (!service) return {};
  return {
    title: `${service.title} — ${site.name}`,
    description: service.result,
  };
}

/**
 * One service, standing on its own for paid traffic (issue #21): the
 * heading with the same one-line result as the tile, examples of exactly
 * this work, then what you get, how it goes, price, lead time, what is not
 * included, the bundle it belongs to and the offer CTA.
 */
export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = serviceById(id);
  if (!service) notFound();

  const examples = serviceExamples(service);
  const steps = service.steps ?? defaultSteps;
  const bundle = service.bundle
    ? bundles.find((b) => b.id === service.bundle)
    : undefined;
  const aside = bundle || service.note;
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
    service.title,
  )}`;

  return (
    <>
      <Header />
      <main>
        <section className={`shell ${styles.intro}`} id="top">
          <div className={`${styles.card} ${styles[service.tone]}`}>
            <Image
              src={`/media/services/${service.id}.png`}
              alt=""
              width={150}
              height={150}
              className={styles.pictogram}
              priority
            />
            <Link href="/#services" className={`eyebrow ${styles.back}`}>
              <ChevronLeft size={12} />
              Služby a ceny
            </Link>
            <h1 className={`serif ${styles.title}`}>{service.title}</h1>
            <p className={styles.lead}>{service.result}</p>
            <p className={`eyebrow ${styles.meta}`}>
              {service.from} · {service.days}
            </p>
          </div>
        </section>

        {examples.length > 0 && (
          <section
            className={`shell ${styles.examples}`}
            aria-labelledby="examples-title"
          >
            <div className={styles.head}>
              <h2 id="examples-title" className={`eyebrow ${styles.heading}`}>
                Ukázky
              </h2>
              <p className={`muted ${styles.hint}`}>
                Co jsme v této službě už udělali.
              </p>
            </div>
            <ul className={styles.examplesGrid}>
              {examples.map((p) => (
                <li key={p.slug} className={styles.example}>
                  <ProjectCard project={p} />
                  <p className={styles.exampleName}>
                    <span className={styles.exampleClient}>{p.name}</span>
                    <span className="muted"> — {p.service}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={`shell ${styles.details}`} aria-label="Podrobnosti">
          <div className={styles.grid}>
            <div className={`${styles.box} ${styles.wide}`}>
              <h2 className={`eyebrow ${styles.label}`}>Co dostanete</h2>
              <ul className={`${styles.list} ${styles.checks}`}>
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.box} ${styles.wide}`}>
              <h2 className={`eyebrow ${styles.label}`}>Jak to probíhá</h2>
              <ol className={`${styles.list} ${styles.steps}`}>
                {steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p className={`muted ${styles.fine}`}>{serviceTerms.payment}</p>
            </div>

            <div className={`${styles.box} ${styles.narrow}`}>
              <h2 className={`eyebrow ${styles.label}`}>Cena</h2>
              <p className={`serif ${styles.big}`}>{service.from}</p>
              <p className={styles.text}>{service.priceNote}</p>
              <p className={`muted ${styles.fine}`}>{serviceTerms.licence}</p>
            </div>

            <div className={`${styles.box} ${styles.narrow}`}>
              <h2 className={`eyebrow ${styles.label}`}>Termín</h2>
              <p className={`serif ${styles.big}`}>obvykle {service.days}</p>
              <p className={styles.text}>{service.termNote}</p>
            </div>

            <div className={`${styles.box} ${styles.narrow}`}>
              <h2 className={`eyebrow ${styles.label}`}>Co není součástí</h2>
              <ul className={`${styles.list} ${styles.dashes}`}>
                {service.excluded.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>

            {bundle ? (
              <div className={`${styles.box} ${styles.narrow}`}>
                <h2 className={`eyebrow ${styles.label}`}>Součást balíčku</h2>
                <p className={`serif ${styles.big}`}>{bundle.title}</p>
                <p className={styles.text}>{bundle.audience}</p>
                <p className={`eyebrow ${styles.bundleFrom}`}>
                  {bundle.from} · {bundle.term}
                </p>
                <Link href="/#bundles" className={styles.more}>
                  Zobrazit balíček
                  <ArrowRight size={12} />
                </Link>
              </div>
            ) : (
              service.note && (
                <div className={`${styles.box} ${styles.narrow}`}>
                  <h2 className={`eyebrow ${styles.label}`}>Tip</h2>
                  <p className={styles.text}>{service.note.text}</p>
                  <Link href={service.note.href} className={styles.more}>
                    Balíčky
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )
            )}

            <div
              className={`${styles.box} ${styles.cta} ${styles[service.tone]} ${
                aside ? "" : styles.ctaFull
              }`}
            >
              <h2 className={`serif ${styles.ctaTitle}`}>
                Napište, co potřebujete. {site.announcement}.
              </h2>
              <div className={styles.ctaRow}>
                <Button href={mailto} variant="light" size="sm">
                  Chci nabídku
                  <ArrowRight size={12} />
                </Button>
                <p className={styles.ctaHint}>
                  Nebo rovnou na{" "}
                  <a href={mailto} className={styles.ctaMail}>
                    {site.contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
