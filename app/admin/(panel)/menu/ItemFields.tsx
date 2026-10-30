type Item = {
  name?: { fr: string; en: string };
  description?: { fr: string; en: string };
  price?: number;
  tag?: { fr: string; en: string };
  available?: boolean;
};

export default function ItemFields({
  item = {},
  categories,
  defaultCategoryId,
}: {
  item?: Item;
  categories: { id: string; label: string }[];
  defaultCategoryId?: string;
}) {
  return (
    <>
      <div className="afield">
        <label>Nom du plat (français) *</label>
        <input name="nameFr" required defaultValue={item.name?.fr} maxLength={120} autoFocus />
      </div>
      <div className="afield">
        <label>Nom du plat (anglais)</label>
        <input name="nameEn" defaultValue={item.name?.en} maxLength={120} placeholder="Laisser vide pour reprendre le français" />
      </div>
      <div className="afield">
        <label>Catégorie *</label>
        <select name="categoryId" defaultValue={defaultCategoryId ?? categories[0]?.id}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="afield">
        <label>Prix (FCFA) *</label>
        <input name="price" inputMode="numeric" required defaultValue={item.price} placeholder="5000" />
      </div>
      <div className="afield afield--full">
        <label>Description (français)</label>
        <input name="descriptionFr" defaultValue={item.description?.fr} maxLength={300} />
      </div>
      <div className="afield afield--full">
        <label>Description (anglais)</label>
        <input name="descriptionEn" defaultValue={item.description?.en} maxLength={300} />
      </div>
      <div className="afield">
        <label>Étiquette (français)</label>
        <input name="tagFr" defaultValue={item.tag?.fr} maxLength={40} placeholder="Menu Rose, Spécialité…" />
      </div>
      <div className="afield">
        <label>Étiquette (anglais)</label>
        <input name="tagEn" defaultValue={item.tag?.en} maxLength={40} placeholder="Pink Menu…" />
      </div>
      <div className="afield" style={{ justifyContent: "flex-end" }}>
        <label className="check">
          <input type="checkbox" name="available" defaultChecked={item.available ?? true} /> Visible sur la carte
        </label>
      </div>
    </>
  );
}
