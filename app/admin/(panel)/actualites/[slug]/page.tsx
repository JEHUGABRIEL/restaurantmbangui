import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flash from "@/components/admin/Flash";
import SubmitButton from "@/components/admin/SubmitButton";
import { getPost } from "@/lib/news";
import { saveNews } from "../actions";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "new") return { title: "Nouvelle actualité" };
  const post = await getPost(slug);
  return { title: post ? post.title : "Actualité" };
}

export default async function AdminNewsEdit({ params, searchParams }: Props) {
  const { slug } = await params;
  const { error } = await searchParams;
  const isNew = slug === "new";
  const post = isNew ? undefined : await getPost(slug);
  if (!isNew && !post) notFound();

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>{isNew ? "Nouvelle actualité" : "Modifier l’actualité"}</h1>
          <p>
            {isNew
              ? "Les paragraphes sont séparés par une ligne vide."
              : `Adresse publique : /actualites/${post?.slug}`}
          </p>
        </div>
        <Link href="/admin/actualites" className="abtn abtn--ghost">
          ← Retour
        </Link>
      </div>

      <Flash error={error} />

      <form action={saveNews} className="acard">
        <input type="hidden" name="slug" value={post?.slug ?? ""} />
        <div className="aform">
          <div className="afield afield--full">
            <label htmlFor="title">Titre</label>
            <input id="title" name="title" defaultValue={post?.title ?? ""} required maxLength={160} autoFocus />
          </div>
          <div className="afield">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)}
              required
            />
          </div>
          <div className="afield">
            <label htmlFor="category">Catégorie</label>
            <input id="category" name="category" defaultValue={post?.category ?? "La maison"} maxLength={60} />
          </div>
          <div className="afield afield--full">
            <label htmlFor="excerpt">Résumé (accroche des cartes)</label>
            <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} required maxLength={400} />
          </div>
          <div className="afield">
            <label htmlFor="image">Image (chemin public)</label>
            <input id="image" name="image" defaultValue={post?.image ?? "/images/plates.jpg"} maxLength={200} />
            <small>Ex. /images/terrace.jpg. Les envois de fichiers seront ajoutés avec Neon.</small>
          </div>
          <div className="afield">
            <label htmlFor="imageAlt">Texte alternatif de l’image</label>
            <input id="imageAlt" name="imageAlt" defaultValue={post?.imageAlt ?? ""} maxLength={200} />
          </div>
          <div className="afield afield--full">
            <label htmlFor="body">Corps de l’article</label>
            <textarea
              id="body"
              name="body"
              rows={12}
              defaultValue={post?.body.join("\n\n") ?? ""}
              placeholder={"Premier paragraphe…\n\nDeuxième paragraphe…"}
            />
          </div>
        </div>
        <div className="form-foot" style={{ marginTop: 16 }}>
          <Link href="/admin/actualites" className="abtn abtn--ghost">
            Annuler
          </Link>
          <SubmitButton>{isNew ? "Publier" : "Enregistrer"}</SubmitButton>
        </div>
      </form>
    </>
  );
}
