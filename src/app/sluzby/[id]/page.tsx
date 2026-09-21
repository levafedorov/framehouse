import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight } from "@/components/Icons";
import { bundleTitle } from "@/data/bundles";
import {
  serviceById,
  serviceExamples,
  serviceHero,
  serviceTerms,
  services,
  type Tone,
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

/** the lead-time card sits next to the price card in a contrasting tone */
const pairTone: Record<Tone, Tone> = {
  blue: "olive",
  brown: "sage",
  rose: "sage",
  sage: "brown",
  olive: "blue",
};

const stepArt = [1, 2, 3, 4].map((n) => `/media/services/steps/${n}-flat.jpg`);

/**
 * One service on its own page (issue #21), laid out after the Higgsfield
 * mockup derived from the homepage: hero card with a watercolor
 * illustration, three examples, what you get, four illustrated steps,
 * price and lead-time cards, what is not included, closing CTA.
 */
export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = serviceById(id);
  if (!service) notFound();

  const examples = serviceExamples(service);
  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(service.title)}`;

  return (
    <>
      <Header />
      <main>
        {/* hero */}
        <section className={`shell ${styles.heroWrap}`} id="top">
          <div className={`${styles.hero} ${styles[service.tone]}`}>
            <div className={styles.heroCopy}>
              <p className={`eyebrow ${styles.eyebrow}`}>Služba</p>
              <h1 className={`serif ${styles.title}`}>{service.title}</h1>
              <p className={styles.lead}>{service.result}</p>

              <dl className={styles.stats}>
                <div className={styles.stat}>
                  <dt className="eyebrow">od</dt>
                  <dd className={`serif ${styles.statValue}`}>
                    {service.from.replace(/^od\s+/, "")}
                  </dd>
                </div>
                <div className={styles.stat}>
                  <dt className="eyebrow">dodání</dt>
                  <dd className={`serif ${styles.statValue}`}>{service.days}</dd>
                </div>
              </dl>

              <ul className={styles.facts}>
                {service.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.heroArt}>
              <Image
                src={serviceHero(service.id)}
                alt=""
                width={520}
                height={520}
                priority
                sizes="(max-width: 900px) 60vw, 36vw"
                className={styles.heroImg}
              />
            </div>
          </div>
        </section>

        {/* examples */}
        {examples.length > 0 && (
          <section className={`shell ${styles.section}`} aria-labelledby="examples-title">
            <div className={styles.head}>
              <h2 id="examples-title" className={`eyebrow ${styles.heading}`}>
                Příklady prací
              </h2>
              <Link href="/#work" className={`eyebrow ${styles.headLink}`}>
                Zobrazit všechny práce
                <ArrowRight size={12} />
              </Link>
            </div>
            <ul className={styles.examples}>
              {examples.map((p) => (
                <li key={p.slug} className={styles.example}>
                  <Image
                    src={p.poster}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className={styles.exampleImg}
                  />
                  <span className={`eyebrow ${styles.exampleTag}`}>{p.service}</span>
                  <span className={`serif ${styles.exampleName}`}>{p.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* what you get */}
        <section className={`shell ${styles.section}`} aria-labelledby="get-title">
          <div className={styles.box}>
            <h2 id="get-title" className={`eyebrow ${styles.boxLabel}`}>
              Co dostanete
            </h2>
            <ul className={styles.checks}>
              {service.deliverables.map((d) => (
                <li key={d} className={styles.check}>
                  <span className={styles.mark} aria-hidden>
                    ✓
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* process */}
        <section className={`shell ${styles.section}`} aria-labelledby="steps-title">
          <div className={styles.head}>
            <h2 id="steps-title" className={`eyebrow ${styles.heading}`}>
              Jak to probíhá
            </h2>
            <p className={`muted ${styles.hint}`}>{serviceTerms.payment}</p>
          </div>
          <ol className={styles.steps}>
            {service.steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <div className={styles.stepHead}>
                  <span className={styles.stepNo}>{i + 1}</span>
                  <div>
                    <h3 className={`eyebrow ${styles.stepTitle}`}>{s.title}</h3>
                    <p className={styles.stepText}>{s.text}</p>
                  </div>
                </div>
                <Image
                  src={stepArt[i]}
                  alt=""
                  width={300}
                  height={300}
                  sizes="(max-width: 600px) 40vw, 22vw"
                  className={styles.stepArt}
                />
              </li>
            ))}
          </ol>
        </section>

        {/* price & lead time */}
        <section className={`shell ${styles.section}`} aria-label="Cena a termín">
          <div className={styles.pair}>
            <div className={`${styles.big} ${styles[service.tone]}`}>
              <p className="eyebrow">Investice</p>
              <p className={`serif ${styles.bigValue}`}>{service.from}</p>
              <p className={styles.bigNote}>{service.priceNote}</p>
              {service.bundle && (
                <Link href="/#bundles" className={styles.bigLink}>
                  Součást balíčku {bundleTitle(service.bundle)}
                  <ArrowRight size={12} />
                </Link>
              )}
              <Button href={mailto} size="sm" className={styles.bigCta}>
                Chci nabídku
                <ArrowRight size={12} />
              </Button>
            </div>
            <div className={`${styles.big} ${styles[pairTone[service.tone]]}`}>
              <p className="eyebrow">Dodání</p>
              <p className={`serif ${styles.bigValue}`}>{service.days}</p>
              <p className={styles.bigNote}>{service.termNote}</p>
              <p className={styles.bigFine}>{serviceTerms.licence}</p>
            </div>
          </div>
        </section>

        {/* not included */}
        <section className={`shell ${styles.section}`} aria-labelledby="not-title">
          <div className={`${styles.box} ${styles.outlined}`}>
            <h2 id="not-title" className={`eyebrow ${styles.boxLabel}`}>
              Co není součástí
            </h2>
            <ul className={styles.checks}>
              {service.excluded.map((e) => (
                <li key={e} className={styles.check}>
                  <span className={`${styles.mark} ${styles.cross}`} aria-hidden>
                    ×
                  </span>
                  {e}
                </li>
              ))}
            </ul>
            {service.note && (
              <p className={`muted ${styles.note}`}>
                {service.note.text}{" "}
                <Link href={service.note.href} className={styles.noteLink}>
                  Balíčky
                  <ArrowRight size={12} />
                </Link>
              </p>
            )}
          </div>
        </section>

        {/* closing CTA */}
        <section className={`shell ${styles.section} ${styles.last}`} aria-label="Poptávka">
          <div className={`${styles.cta} ${styles[service.tone]}`}>
            <Image src="/media/services/leaves-flat.webp" alt="" width={260} height={260} className={`${styles.leaf} ${styles.leafLeft}`} />
            <Image src="/media/services/leaves-flat.webp" alt="" width={260} height={260} className={`${styles.leaf} ${styles.leafRight}`} />
            <h2 className={`serif ${styles.ctaTitle}`}>{service.ctaTitle}</h2>
            <Button href={mailto} variant="light" size="sm">
              Chci nabídku
              <ArrowRight size={12} />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
