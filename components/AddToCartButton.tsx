"use client";

import { useCart } from "@/lib/cart";
import { Plus } from "./icons";

export default function AddToCartButton({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: number;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className="add-btn"
      onClick={() => addItem({ id, name, price })}
      aria-label={`Ajouter ${name} au panier`}
      title="Ajouter au panier"
    >
      <Plus width={11} height={11} />
    </button>
  );
}
