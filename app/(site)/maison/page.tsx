import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { getLocale } from "@/lib/locale";
import { MENU_ROSE, l10n } from "@/lib/menu";

export const metadata: Metadata = {
  title: "La maison",
  description:
    "L’histoire du Restaurant M’ à Bangui : cuisine semi-gastronomique, terrasse, pizzéria et traiteur, face au Musée Barthélemy Boganda.",
};

export default async function MaisonPage() {
  const locale = await getLocale();

  return (
    <>
      <PageHero
        label="La maison · Bangui"
        title={
          <>
            Une maison
            <br />
            <em>de quartier.</em>
          </>
        }
        lead="Le Restaurant M’ est né d’une idée simple : offrir à Bangui une table soignée sans cérémonie, où l’on vient pour déjeuner, pour un café, pour fêter quelque chose ou simplement parce qu’on a faim."
      />

      <section className="page-section">
        <div className="container split-story">
          <div className="portrait">
            <Image
              src="/images/terrace.jpg"
              alt="La terrasse du Restaurant M’ en fin de journée"
              fill
              sizes="(max-width: 920px) 92vw, 520px"
            />
          </div>
          <div className="prose-block">
            <span className="caps">Notre façon de recevoir</span>
            <h2 className="script">
              Le produit d’abord,
              <br />
              le reste suit.
            </h2>
            <span className="ornament ornament-left" aria-hidden />
            <p>
              Nous travaillons avec une carte volontairement courte. Les légumes
              arrivent au fil du marché, les pièces de bœuf sont grillées à la
              commande et les sauces mijotent le matin. Cette contrainte nous
              oblige : tout doit être bon, parce que rien ne se cache derrière
              une longue liste.
            </p>
            <p>
              Le service traiteur reprend la même exigence : pour un buffet, un
              déjeuner d’entreprise ou une réception de famille, nous composons
              une carte adaptée au nombre d’invités et au moment de la journée.
            </p>
            <p>
              Enfin, il y a la terrasse. Un peu d’ombre, un service continu, la
              rue de l’Industrie qui passe : c’est souvent là que les habitués
              s’installent, et c’est très bien ainsi.
            </p>
          </div>
        </div>

        <div className="container values-row">
          <article className="value">
            <span className="value-num">01</span>
            <h3>Cuisine de saison</h3>
            <p>
              Une carte qui suit le marché, des cuissons à la commande et des
              produits choisis chaque semaine.
            </p>
          </article>
          <article className="value">
            <span className="value-num">02</span>
            <h3>Recevoir simplement</h3>
            <p>
              Une salle sans chichi, des tables spacieuses et une équipe qui
              connaît les habitués.
            </p>
          </article>
          <article className="value">
            <span className="value-num">03</span>
            <h3>Aller vers vous</h3>
            <p>
              Traiteur, pizzas à emporter et commandes WhatsApp pour les soirs
              où l’on préfère rester chez soi.
            </p>
          </article>
        </div>
      </section>

      <section className="photo-row-section">
        <div className="photo-row">
          <figure>
            <Image
              src="/images/plates.jpg"
              alt="Assiettes dressées sur une table en bois"
              fill
              sizes="33vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/salmon.jpg"
              alt="Saumon snacké et légumes verts"
              fill
              sizes="33vw"
            />
          </figure>
          <figure>
            <Image
              src="/images/steak.jpg"
              alt="Pièce de bœuf et frites maison"
              fill
              sizes="33vw"
            />
          </figure>
        </div>
      </section>

      <section className="quote-band">
        <div className="container quote-band-inner">
          <span className="script script-light">Le mot de la maison</span>
          <blockquote>{l10n(MENU_ROSE.quote, locale)}</blockquote>
          <cite>Le Menu Rose · Octobre 2026</cite>
        </div>
      </section>

      <section className="section">
        <div className="container center-copy">
          <span className="script">Venez</span>
          <span className="caps">Nous voir</span>
          <span className="ornament" aria-hidden />
          <p>
            Rue de l’Industrie, face au Musée Barthélemy Boganda. Réservation par
            WhatsApp ou par téléphone, du lundi au dimanche.
          </p>
          <Link className="btn btn-gold" href="/contact#reserver">
            Réserver une table
          </Link>
        </div>
      </section>
    </>
  );
}
