import Image from "next/image";
import { bundleTitle } from "@/data/bundles";
import { serviceAnchor, type Service } from "@/data/services";
import styles from "./ServiceCard.module.css";

/**
 * One service, carrying only what a visitor needs to decide to click: the
 * pictogram (or a frame from real work), the name, the result, the price and
 * the lead time.
 *
 * Desktop: a square coloured tile in the style of the reference category
 * tiles. Tablet and phone: the same parts laid out as a list row, with the
 * coloured tile shrunk to a thumbnail. Pictograms are white line art on
 * transparent PNG in public/media/services/<id>.png, generated with
 * GPT Image 2 via Higgsfield.
 */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`${styles.tile} ${styles[service.tone]} ${
        service.shape === "oval" ? styles.oval : ""
      }`}
      id={serviceAnchor(service.id)}
    >
      <div className={`${styles.media} ${service.image ? styles.photo : ""}`}>
        {service.image ? (
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 900px) 96px, 25vw"
            className={styles.img}
          />
        ) : (
          <Image
            src={`/media/services/${service.id}.png`}
            alt=""
            width={150}
            height={150}
            className={styles.icon}
          />
        )}
      </div>

      <div className={styles.top}>
        <h3 className={`eyebrow ${styles.name}`}>{service.title}</h3>
        {service.bundle && (
          <p className={`eyebrow ${styles.badge}`}>
            Součást balíčku{" "}
            <span className={styles.badgeName}>
              {bundleTitle(service.bundle)}
            </span>
          </p>
        )}
      </div>

      <p className={styles.result}>{service.result}</p>

      <p className={styles.pricing}>
        <span className={styles.from}>{service.from}</span>
        <span className={styles.days}>{service.days}</span>
      </p>
    </article>
  );
}
