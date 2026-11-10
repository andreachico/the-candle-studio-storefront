"use client";

import { useCart } from "@/components/cart-context";
import { type Product } from "@/lib/shopify";

export function AddToCartButton({
  product,
  variant = "solid",
  className = "",
}: {
  product: Product;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const { addItem } = useCart();
  const soldOut = !product.availableForSale || !product.variantId;

  const variants = {
    solid:
      "bg-amber-700 text-white hover:bg-amber-800 disabled:bg-stone-300 disabled:text-white",
    outline:
      "border border-stone-300 bg-transparent text-stone-800 hover:border-[#dcccb0] hover:bg-[#e8dcc8] disabled:border-stone-200 disabled:text-stone-400",
  };

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => addItem(product)}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition active:scale-[0.99] disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${className}`}
    >
      {soldOut ? "Sold out" : "Add to basket"}
    </button>
  );
}
