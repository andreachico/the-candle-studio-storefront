import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-white">
              The Candle Studio
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-stone-400">
            Hand-poured soy candles made in small batches. Clean burning, richly
            scented, always cruelty-free.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#collection" className="hover:text-white">
                All candles
              </Link>
            </li>
            <li>
              <Link href="/#collection" className="hover:text-white">
                Best sellers
              </Link>
            </li>
            <li>
              <Link href="/#collection" className="hover:text-white">
                Gift sets
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Help
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <span className="cursor-default">Our story</span>
            </li>
            <li>
              <span className="cursor-default">Shipping & returns</span>
            </li>
            <li>
              <span className="cursor-default">Contact</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
            Stay in the glow
          </h4>
          <p className="mt-4 text-sm text-stone-400">
            Join the list for new scents & 10% off your first order.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-full border border-stone-700 bg-stone-800 px-4 py-2 text-sm text-white placeholder:text-stone-500 focus:border-amber-600 focus:outline-none"
            />
            <button
              type="button"
              className="rounded-full bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-600"
            >
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">
        © 2026 The Candle Studio. All rights reserved.
      </div>
    </footer>
  );
}
