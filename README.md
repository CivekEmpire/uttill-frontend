# UTTILL.COM — Headless E-Commerce

**"Life, beautifully lived"**

Premium e-commerce headless frontend built with Next.js 14 + Shopify Storefront API.

---

## Stack

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS + Custom Grain Shader
- **Backend:** Shopify Storefront API (GraphQL)
- **Deploy:** Vercel
- **Domain:** uttill.com

---

## Features

### Core
- ✅ Server-side rendering (SSR) for SEO
- ✅ Static generation (ISG) for performance
- ✅ GraphQL Shopify integration
- ✅ Responsive design (mobile-first)
- ✅ Dark premium UI with grain texture

### Pages
- `/` — Landing hero
- `/shop` — Full catalog with filters
- `/shop/espacios-vivos` — Floors & Stone
- `/shop/wellbeing` — Dr.Vek & Sankom
- `/products/[handle]` — Product detail with gallery
- `/collections/[handle]` — Dynamic collections
- `/projects` — Projects gallery (coming soon)
- `/b2b` — B2B solutions hub
- `/about` — Brand story
- `/contact` — Contact info + payment methods

### Visual Identity
- Dark mode premium (#0a0a0a background)
- Gold accents (#c8a84b)
- Grain texture overlay (opacity 0.03)
- Gradients & animations
- Inter + Space Mono fonts

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=uttill.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=[YOUR_TOKEN]
```

**Get Storefront Access Token:**
1. Shopify Admin → Settings → Apps and sales channels
2. Develop apps → Create app: "Uttill Headless"
3. Configure Storefront API scopes (unauthenticated_read_*)
4. Install app → Copy token

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

**Custom Domain:**
- Domain: uttill.com (already DNS configured)
- TLS: Auto (Vercel)
- Deployment: Automatic on push

---

## Project Structure

```
uttill-frontend/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout + grain overlay
│   ├── page.tsx             # Landing page
│   ├── shop/                # Catalog pages
│   ├── products/            # Product detail pages
│   ├── collections/         # Collection pages
│   ├── projects/            # Projects gallery
│   ├── b2b/                 # B2B solutions
│   ├── about/               # About page
│   └── contact/             # Contact page
├── components/
│   ├── layout/              # Header, Footer, GrainOverlay
│   ├── shop/                # ProductCard, ProductGrid
│   └── ui/                  # Button, Card, Badge
├── lib/
│   ├── shopify/             # GraphQL client + queries
│   ├── utils/               # Currency, metrics
│   └── constants/           # Categories, navigation
├── styles/
│   └── globals.css          # Tailwind + custom styles
├── public/
│   ├── renders/             # ImagineArt renders
│   └── logos/               # Brand assets
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## Shopify Integration

### GraphQL Queries

All queries in `lib/shopify/queries.ts`:

- `GET_PRODUCTS_QUERY` — All products
- `GET_PRODUCT_BY_HANDLE_QUERY` — Single product
- `GET_COLLECTION_BY_HANDLE_QUERY` — Collection with products
- `CREATE_CART_MUTATION` — Create cart
- `ADD_TO_CART_MUTATION` — Add to cart
- `GET_CART_QUERY` — Retrieve cart

### Data Flow

1. Server Component fetches data via `shopifyFetch()`
2. Data cached with `revalidate: 3600` (1 hour ISR)
3. Client Components render interactive UI

---

## Performance

**Target Lighthouse Scores:**
- Desktop: 95+
- Mobile: 90+
- First Contentful Paint: <1s
- Time to Interactive: <2s

**Optimizations:**
- Next.js Image optimization
- Server-side rendering
- Static generation where possible
- Lazy loading images
- Code splitting

---

## Brand Consistency

**Parallel to contrall.ai:**
- Same visual identity (dark + gold + grain)
- Same performance standards
- Same attention to detail

**Differences:**
- Backend: Shopify (not Gateway)
- Purpose: E-commerce (not LLM platform)
- Target: B2C + B2B (not SaaS users)

---

## Contact

**UTTILL S.A.**  
Part of CIVEK Empire

- Web: https://uttill.com
- WhatsApp: +506 8410 5999
- Email: info@uttill.com

---

**Built with ❤️ by CIVEK Empire**
