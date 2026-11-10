import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProducts } from "@/lib/shopify";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Not found — The Candle Studio" };
  return {
    title: `${product.name} — The Candle Studio`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 font-sans sm:py-14">
      <Link
        href="/#collection"
        className="text-sm font-medium text-stone-500 transition hover:text-stone-900"
      >
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-stone-100">
          {product.image ? (
            <Image
              src={product.image.url}
              alt={product.image.alt}
              fill
              priority
              quality={90}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="text-[11rem]">🕯️</span>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="font-serif text-4xl font-semibold text-stone-900">
            {product.name}
          </h1>
          <p className="mt-5 font-serif text-3xl font-semibold text-stone-900">
            {formatPrice(product.price, product.currencyCode)}
          </p>
          <p className="mt-2 text-sm font-medium text-stone-500">
            {product.availableForSale ? "In stock" : "Sold out"}
          </p>

          {product.description && (
            <p className="mt-6 whitespace-pre-line leading-relaxed text-stone-600">
              {product.description}
            </p>
          )}

          <AddToCartButton product={product} className="mt-8 w-full sm:w-auto" />

          {product.tags.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xs uppercase tracking-wide text-stone-400">
                Scent notes
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
