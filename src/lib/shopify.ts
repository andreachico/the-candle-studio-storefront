const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2025-07";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export type Product = {
  id: string;
  handle: string;
  name: string;
  description: string;
  price: number;
  currencyCode: string;
  image: { url: string; alt: string } | null;
  images: { url: string; alt: string }[];
  variantId: string;
  availableForSale: boolean;
  tags: string[];
  featured: boolean;
};

type Money = { amount: string; currencyCode: string };

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  priceRange: { minVariantPrice: Money };
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: { edges: { node: { id: string } }[] };
};

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Missing Shopify env vars. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local"
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate product data at most every 60s.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify returned no data");
  }

  return json.data;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    tags
    priceRange { minVariantPrice { amount currencyCode } }
    featuredImage { url altText }
    images(first: 6) { edges { node { url altText } } }
    variants(first: 1) { edges { node { id } } }
  }
`;

function mapProduct(node: ShopifyProduct): Product {
  const images = node.images.edges.map((e) => ({
    url: e.node.url,
    alt: e.node.altText ?? node.title,
  }));
  const featuredImage = node.featuredImage
    ? { url: node.featuredImage.url, alt: node.featuredImage.altText ?? node.title }
    : (images[0] ?? null);

  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    description: node.description,
    price: Number(node.priceRange.minVariantPrice.amount),
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    image: featuredImage,
    images,
    variantId: node.variants.edges[0]?.node.id ?? "",
    availableForSale: node.availableForSale,
    tags: node.tags,
    featured: node.tags.map((t) => t.toLowerCase()).includes("featured"),
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(
    `${PRODUCT_FRAGMENT}
    query Products {
      products(first: 50, sortKey: CREATED_AT, reverse: true) {
        edges { node { ...ProductFields } }
      }
    }`
  );

  return data.products.edges.map((e) => mapProduct(e.node));
}

export async function getProduct(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(
    `${PRODUCT_FRAGMENT}
    query Product($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }`,
    { handle }
  );

  return data.product ? mapProduct(data.product) : null;
}

export async function getFeaturedProducts(limit = 3): Promise<Product[]> {
  const all = await getProducts();
  const tagged = all.filter((p) => p.featured);
  return (tagged.length > 0 ? tagged : all).slice(0, limit);
}
