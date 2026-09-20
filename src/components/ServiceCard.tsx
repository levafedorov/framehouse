import Image from "next/image";
import { bundleTitle } from "@/data/bundles";
import { serviceAnchor, type Service } from "@/data/services";
import styles from "./ServiceCard.module.css";

/**
 * A coloured tile — the same visual as the category tiles in the reference —
 * carrying only what a visitor needs to decide to click: a frame from real
 * work (or the service pictogram), the name top-left, the result, the price
 * and the lead time. Pictograms are white line art on transparent PNG in
 * public/media/services/<id>.png, generated with GPT Image 2 via Higgsfield.
 */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`${styles.tile} ${styles[service.tone]} ${
        service.image ? styles.photo : ""
      } ${service.shape === "oval" ? styles.oval : ""}`}
      id={serviceAnchor(service.id)}
    >
      {service.image ? (
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 600px) 50vw, (max-width: 900px) 46vw, 25vw"
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

      <div className={styles.meta}>
        <p className={styles.result}>{service.result}</p>
        <p className={styles.pricing}>
          <span className={styles.from}>{service.from}</span>
          <span className={styles.days}>{service.days}</span>
        </p>
      </div>
    </article>
  );
}
