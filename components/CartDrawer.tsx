"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { formatPrice, useCart } from "@/lib/cart";
import { getUi } from "@/lib/i18n";
import { whatsapp } from "@/lib/site";
import { CartIcon, Close } from "./icons";

export default function CartDrawer() {
  const {
    items,
    count,
    total,
    isOpen,
    locale,
    closeCart,
    setQty,
    removeItem,
    clear,
  } = useCart();
  const t = getUi(locale);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const orderMessage =
    locale === "fr"
      ? [
          "Bonjour Restaurant M’, je souhaite commander à emporter :",
          ...items.map(
            (item) =>
              `• ${item.qty} × ${item.name} — ${formatPrice(item.price * item.qty)}`,
          ),
          "",
          `Total : ${formatPrice(total)}`,
          "Merci de me confirmer l’heure de retrait.",
        ].join("\n")
      : [
          "Hello Restaurant M’, I would like to place a takeaway order:",
          ...items.map(
            (item) =>
              `• ${item.qty} × ${item.name} — ${formatPrice(item.price * item.qty)}`,
          ),
          "",
          `Total: ${formatPrice(total)}`,
          "Please confirm the pickup time.",
        ].join("\n");

  return (
    <div className="cart-layer">
      <button
        type="button"
        className="cart-scrim"
        aria-label={t.common.close}
        onClick={closeCart}
      />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.cart.title}
      >
        <header className="cart-head">
          <div>
            <span className="cart-eyebrow">{t.cart.title}</span>
            <span className="cart-count-label">
              {count} {count > 1 ? t.cart.countMany : t.cart.countOne}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label={t.common.close}
          >
            <Close width={18} height={18} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <CartIcon width={36} height={36} />
            <p>{t.cart.empty}</p>
            <Link className="btn btn-gold" href="/carte" onClick={closeCart}>
              {t.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`${t.cart.decrease} ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`${t.cart.increase} ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <div className="cart-total">
                <span>{t.cart.total}</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className="cart-note">{t.cart.note}</p>
              <a
                className="btn btn-gold cart-order"
                href={whatsapp(orderMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cart.order}
              </a>
              <button type="button" className="cart-clear" onClick={clear}>
                {t.cart.clear}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
