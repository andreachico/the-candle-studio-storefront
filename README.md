# The Candle Studio — Storefront

A small, hand-built storefront for **The Candle Studio** — a boutique brand of hand-poured soy candles. Products, images, and pricing are pulled live from Shopify via the Storefront API, with a lightweight client-side basket on top.

Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

- 🕯️ **Live Shopify catalog** — products, photos and prices fetched from the Storefront API
- 🛒 **Client-side basket** — add/remove items, adjust quantities, persisted to `localStorage`
- 🎨 **Editorial design** — warm candle-studio palette, serif branding, responsive layout
- ⚡ **Statically generated** product pages with incremental revalidation

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4
- Shopify Storefront API (GraphQL)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-public-storefront-token
NEXT_PUBLIC_SHOPIFY_API_VERSION=2025-07
```

The Storefront access token is a **public** token (Shopify admin → *Settings → Apps and sales channels → Develop apps → Storefront API*). Never commit `.env.local` — it's already git-ignored.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/                  # Routes (home + product detail /products/[handle])
├── components/           # Header, footer, basket drawer, product card, cart context
└── lib/
    ├── shopify.ts        # Storefront API client + product mapping
    └── format.ts         # Currency formatting
```

## Notes

- Checkout is currently a placeholder — the next step is wiring up a real Shopify cart and hosted checkout.
- Product "scent notes" are derived from Shopify product tags.

