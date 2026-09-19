import Image from "next/image";
import { IconsIcon, LogoIcon, VideoIcon, WebsiteIcon } from "./Icons";
import { bundleTitle } from "@/data/bundles";
import { serviceAnchor, type Service } from "@/data/services";
import styles from "./ServiceCard.module.css";

const icon = {
  video: VideoIcon,
  logo: LogoIcon,
  identity: LogoIcon,
  icons: IconsIcon,
  web: WebsiteIcon,
  eshop: WebsiteIcon,
  social: IconsIcon,
  print: IconsIcon,
} as const;

/**
 * Only what a visitor needs to decide to click: a frame from real work,
 * the name, the result, the price and the lead time. No "what's included".
 */
export default function ServiceCard({ service }: { service: Service }) {
  const Icon = icon[service.id];
  return (
    <article className={styles.card} id={serviceAnchor(service.id)}>
      <div className={`${styles.media} ${styles[service.tone]}`}>
        {service.bundle && (
          <span className={`eyebrow ${styles.badge}`}>
            Součást balíčku {bundleTitle(service.bundle)}
          </span>
        )}
        {service.image ? (
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 46vw, 25vw"
            className={styles.img}
          />
        ) : (
          <Icon size={120} className={styles.icon} />
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaText}>
          <h3 className={`eyebrow ${styles.name}`}>{service.title}</h3>
          <p className={`muted ${styles.result}`}>{service.result}</p>
        </div>
        <div className={styles.pricing}>
          <span className={styles.from}>{service.from}</span>
          <span className={`muted ${styles.days}`}>{service.days}</span>
        </div>
      </div>
    </article>
  );
}
