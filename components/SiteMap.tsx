import { getLocale } from "@/lib/locale";
import { getUi } from "@/lib/i18n";
import { MAPS_URL } from "@/lib/site";
import { Pin } from "./icons";
import Image from "next/image";

/** Plan du quartier : image servie par le site, sans dépendance à un service tiers. */
export default async function SiteMap() {
  const locale = await getLocale();
  const label = getUi(locale).common.openMap;

  return (
    <div className="map-frame map-static">
      <Image
        src="/images/map-bangui.jpg"
        alt="Plan du quartier du Restaurant M’, rue de l’Industrie à Bangui"
        fill
        sizes="100vw"
      />
      <span className="map-pin" aria-hidden>
        <Pin width={18} height={18} />
      </span>
      <a
        className="map-open"
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Pin width={13} height={13} />
        {label}
      </a>
      <span className="map-credit">
        ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>
      </span>
    </div>
  );
}
