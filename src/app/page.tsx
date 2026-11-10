import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/product-card";

export default async function Home() {
  const products = await getProducts();
  const heroImage = products[0]?.image ?? null;
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Hand-poured in small batches
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-none text-stone-900 sm:text-7xl">
              Light, <em className="italic text-[#b25a3a]">slowly.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-600">
              Ten signature scents from The Candle Studio — natural soy wax,
              cotton wicks and fragrances made for quiet moments.
            </p>
            <Link
              href="#collection"
              className="mt-8 inline-block border-b border-stone-400 pb-1 text-xs font-semibold uppercase tracking-[0.15em] text-stone-800 transition hover:border-stone-900 hover:text-stone-900"
            >
              Shop the collection
            </Link>
          </div>

          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-stone-100">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[9rem]">
                🕯️
              </span>
            )}
          </div>
        </div>
      </section>

      {/* The collection */}
      <section
        id="collection"
        className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 sm:py-20"
      >
        <div className="flex items-end justify-between border-b border-stone-300 pb-5">
          <h2 className="font-serif text-4xl text-stone-900">The collection</h2>
          <span className="text-sm text-stone-500">
            {products.length} scent{products.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.handle}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
