import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { bundleTitle, czk, priceById, priceTerms } from "@/data/pricing";
import {
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

const stepArt = ["brief", "navrh", "doladeni", "predani"].map(
  (n) => `/media/services/steps/${n}.png`,
);

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = serviceById(id);
  if (!service) notFound();

  const examples = serviceExamples(service);
  const price = priceById(service.id);
  const includes = price?.includes.length
    ? price.includes
    : (service.deliverables ?? []);
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(service.title)}`;

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} id="top">
          <p className={`eyebrow ${styles.eyebrow}`}>Služba</p>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.lead}>{service.result}</p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt className="eyebrow">od</dt>
              <dd className={styles.statValue}>
                {service.from.replace(/^od\s+/, "")}
              </dd>
            </div>
            <div className={styles.stat}>
              <dt className="eyebrow">dodání</dt>
              <dd className={styles.statValue}>{service.days}</dd>
            </div>
          </dl>

          <ul className={styles.facts}>
            {service.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        {includes.length > 0 && (
          <section className={styles.get} aria-labelledby="get-title">
            <h2 id="get-title" className={`eyebrow ${styles.getLabel}`}>
              Co dostanete
            </h2>
            <ul className={styles.getList}>
              {includes.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {examples.length > 0 && (
          <section className={styles.section} aria-labelledby="examples-title">
            <div className={styles.head}>
              <h2 id="examples-title" className={`eyebrow ${styles.heading}`}>
                Příklady prací
              </h2>
              <Link href="/#work" className={styles.headLink}>
                Všechny práce
                <ArrowRight size={12} />
              </Link>
            </div>
            <ul className={styles.examples}>
              {examples.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.section} aria-labelledby="steps-title">
          <div className={styles.head}>
            <h2 id="steps-title" className={`eyebrow ${styles.heading}`}>
              Jak to probíhá
            </h2>
            <p className={styles.hint}>{serviceTerms.payment}</p>
          </div>
          <ol className={styles.steps}>
            {service.steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <Image
                  src={stepArt[i]}
                  alt=""
                  width={600}
                  height={600}
                  sizes="(max-width: 600px) 50vw, 240px"
                  className={styles.stepArt}
                />
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepText}>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.pair} aria-label="Cena a termín">
          <div className={`${styles.big} ${styles.dark}`}>
            <p className="eyebrow">Investice</p>
            <p className={styles.bigValue}>{service.from}</p>
            <p className={styles.bigNote}>{service.priceNote}</p>
            {price?.parts && (
              <ul className={styles.priceParts}>
                {price.parts.map((part) => (
                  <li key={part.name}>
                    <span>{part.name}</span>
                    <span>od {czk(part.priceFrom)}</span>
                  </li>
                ))}
              </ul>
            )}
            {price?.unit && <p className={styles.bigFine}>Cena {price.unit}.</p>}
            {price?.note && <p className={styles.bigFine}>{price.note}</p>}
            <p className={styles.bigFine}>{priceTerms.vat}</p>
            {service.bundle && (
              <Link href="/#bundles" className={styles.bigLink}>
                Součást balíčku {bundleTitle(service.bundle)}
                <ArrowRight size={12} />
              </Link>
            )}
            <Button
              href={mailto}
              variant="outline"
              arrow={false}
              className={styles.pill}
            >
              Chci nabídku
            </Button>
          </div>
          <div className={`${styles.big} ${styles.light}`}>
            <p className="eyebrow">Dodání</p>
            <p className={styles.bigValue}>{service.days}</p>
            <p className={styles.bigNote}>{service.termNote}</p>
            <p className={styles.bigFine}>{serviceTerms.licence}</p>
          </div>
        </section>

        <section className={styles.cta} aria-label="Poptávka">
          <h2 className={styles.ctaTitle}>{service.ctaTitle}</h2>
          <Button
            href={mailto}
            variant="outline"
            arrow={false}
            className={styles.pill}
          >
            Chci nabídku
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
