"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    subtotal,
    currencyCode,
    updateQuantity,
    removeItem,
    count,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-stone-900/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-(--cream) shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-start justify-between px-6 pb-5 pt-6">
          <div>
            <h2 className="font-serif text-3xl text-stone-900">Your basket</h2>
            <p className="mt-1 text-sm text-stone-500">
              {count === 0
                ? "Your basket is empty"
                : `${count} item${count === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="-mr-1 rounded-full p-1 text-2xl leading-none text-stone-400 transition hover:text-stone-900"
            aria-label="Close basket"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12 text-stone-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
              />
            </svg>
            <p className="text-stone-500">
              Nothing here yet — find a scent you love.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-6 overflow-y-auto px-6 pt-2">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative h-24 w-24 flex-none overflow-hidden rounded-lg bg-stone-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-3xl">
                        🕯️
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif text-lg text-stone-900">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-stone-500">
                          {formatPrice(item.price, item.currencyCode)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="-mt-1 p-1 text-stone-400 transition hover:text-stone-700"
                        aria-label={`Remove ${item.name}`}
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="flex h-9 w-10 items-center justify-center rounded-lg text-sm text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-600 transition hover:border-stone-400 hover:text-stone-900"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-200 px-6 py-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-wide text-stone-500">
                  Total
                </span>
                <span className="font-serif text-2xl text-stone-900">
                  {formatPrice(subtotal, currencyCode)}
                </span>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#b25a3a] py-3.5 text-sm font-medium text-white transition hover:bg-[#9c4d31]"
                onClick={() =>
                  alert("This is a demo storefront — checkout coming soon!")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
