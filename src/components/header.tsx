"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-(--cream)/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-stone-900 transition-opacity hover:opacity-70"
        >
          The Candle Studio
        </Link>

        <button
          type="button"
          onClick={openCart}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-stone-800 transition hover:bg-[#e8dcc8]"
          aria-label={`Open cart, ${count} items`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
            />
          </svg>
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1 text-xs font-semibold text-white">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
