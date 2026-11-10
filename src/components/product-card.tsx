import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <div className="group flex flex-col">
      <Link
        href={`/products/${product.handle}`}
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-100"
      >
        {product.image ? (
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            priority={priority}
            quality={90}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-7xl">🕯️</span>
        )}
      </Link>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-serif text-xl text-stone-900">{product.name}</h3>
        </Link>
        <span className="flex-none text-sm text-stone-500">
          {formatPrice(product.price, product.currencyCode)}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
        {product.description}
      </p>

      <AddToCartButton
        product={product}
        variant="outline"
        className="mt-4 w-full"
      />
    </div>
  );
}
