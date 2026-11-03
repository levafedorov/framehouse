import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/data/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Ochrana osobních údajů a cookies — ${site.name}`,
  description: `Jak ${site.name} zpracovává osobní údaje a používá cookies.`,
};

const cookies = [
  {
    name: "heartflect-consent",
    kind: "Nezbytné",
    purpose: "Pamatuje si Vaši volbu cookies.",
    storage: "Local storage, 12 měsíců",
  },
  {
    name: "heartflect-attribution",
    kind: "Nezbytné",
    purpose:
      "Pamatuje si, z jaké kampaně jste na web přišli, aby to poptávka obsahovala.",
    storage: "Session storage, do zavření prohlížeče",
  },
  {
    name: "__ph_opt_in_out_*",
    kind: "Nezbytné",
    purpose: "Pamatuje si, zda analytika smí běžet.",
    storage: "Local storage / cookie, 12 měsíců",
  },
  {
    name: "ph_*_posthog, ph_*_posthog_cpm",
    kind: "Analytické",
    purpose:
      "Anonymní identifikátor návštěvníka a relace pro měření návštěvnosti.",
    storage: "Cookie a local storage, 12 měsíců",
  },
  {
    name: "ph_*_window_id, ph_*_primary_window_exists",
    kind: "Analytické",
    purpose: "Rozlišuje okna a záložky během jedné návštěvy.",
    storage: "Session storage, do zavření prohlížeče",
  },
];

export default function PrivacyPage() {
  const { operator } = site;
  const controller = [
    operator.name || site.name,
    operator.ico && `IČO ${operator.ico}`,
    operator.address,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={`eyebrow ${styles.eyebrow}`}>Právní informace</p>
          <h1 className={styles.title}>Ochrana osobních údajů a cookies</h1>
          <p className={styles.updated}>Platné od 3. 11. 2026</p>
        </section>

        <div className={styles.body}>
          <section className={styles.section}>
            <h2>Kdo údaje zpracovává</h2>
            <p>
              Správcem osobních údajů je {controller}. Kontaktovat nás můžete na{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Poptávkový formulář</h2>
            <p>
              Když nám pošlete poptávku, zpracováváme jméno, e-mail, telefon
              (pokud ho vyplníte), text zprávy, vybranou službu a stránku, ze
              které poptávka přišla. Údaje potřebujeme, abychom Vám mohli
              odpovědět a připravit nabídku. Právním základem je jednání o
              smlouvě na Vaši žádost (čl. 6 odst. 1 písm. b GDPR).
            </p>
            <p>
              Formulář odesíláme přes službu Web3Forms, která nám zprávu doručí
              e-mailem. Údaje uchováváme po dobu jednání o zakázce, a pokud
              spolupráce nevznikne, nejdéle 2 roky.
            </p>
            <p>
              Pokud jste souhlasili s analytickými cookies, propojíme Váš
              e-mail s anonymním záznamem návštěvy, abychom věděli, které
              stránky jste před poptávkou viděli a mohli lépe připravit
              nabídku.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Analytika</h2>
            <p>
              Ke zlepšování webu používáme nástroj PostHog (PostHog Inc.,
              data uložená na serverech v EU, Frankfurt). Bez Vašeho souhlasu
              měří jen anonymní a souhrnnou návštěvnost, bez cookies a bez
              možnosti Vás rozpoznat.
            </p>
            <p>S Vaším souhlasem navíc zaznamenává:</p>
            <ul>
              <li>navštívené stránky, odkud jste přišli a jak dlouho jste zůstali,</li>
              <li>kliknutí, posouvání stránky a pohyb po webu,</li>
              <li>
                záznam průchodu webem (obsah formulářových polí se nezaznamenává),
              </li>
              <li>typ zařízení, prohlížeče a přibližnou polohu podle IP adresy.</li>
            </ul>
            <p>
              Právním základem je Váš souhlas (čl. 6 odst. 1 písm. a GDPR).
              Data uchováváme nejdéle 12 měsíců. Souhlas můžete kdykoliv
              odvolat v{" "}
              <CookieSettingsButton className={styles.inlineButton} />.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Cookies a podobné technologie</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Název</th>
                    <th>Typ</th>
                    <th>Účel</th>
                    <th>Uložení a platnost</th>
                  </tr>
                </thead>
                <tbody>
                  {cookies.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <code>{c.name}</code>
                      </td>
                      <td>{c.kind}</td>
                      <td>{c.purpose}</td>
                      <td>{c.storage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Vaše práva</h2>
            <p>
              Máte právo na přístup ke svým údajům, jejich opravu nebo výmaz,
              omezení zpracování, přenositelnost a právo vznést námitku.
              Souhlas můžete kdykoliv odvolat. Stačí napsat na{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
              Pokud nejste spokojeni, můžete podat stížnost u Úřadu pro ochranu
              osobních údajů (uoou.gov.cz).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
