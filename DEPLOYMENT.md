# UTTILL.COM — Deployment Guide

**Guía completa para deploy a producción**

---

## Pre-requisitos

### 1. Shopify Storefront Access Token

**Crear token en Shopify Admin:**

```
1. Ir a: Settings → Apps and sales channels
2. Click: Develop apps
3. Click: Create an app
   - App name: "Uttill Headless Frontend"
   - App developer: tu email
4. Click: Configure Storefront API scopes
5. Seleccionar permisos:
   ✓ unauthenticated_read_product_listings
   ✓ unauthenticated_read_product_inventory
   ✓ unauthenticated_write_checkouts
   ✓ unauthenticated_read_checkouts
6. Click: Save
7. Click: Install app
8. Click: Reveal token once (COPIAR Y GUARDAR)
```

**Token format:**
```
shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Verificar productos en Shopify

```bash
# Test query manual:
curl -X POST \
  https://uttill.myshopify.com/api/2024-01/graphql.json \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Storefront-Access-Token: [TU_TOKEN]" \
  -d '{"query": "{ shop { name } }"}'
```

**Respuesta esperada:**
```json
{
  "data": {
    "shop": {
      "name": "uttill"
    }
  }
}
```

---

## Deploy a Vercel

### Opción 1: Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy desde directorio del proyecto
cd uttill-frontend
vercel

# 4. Responder preguntas:
# - Set up and deploy? Yes
# - Which scope? [tu cuenta]
# - Link to existing project? No
# - What's your project's name? uttill-frontend
# - In which directory is your code located? ./
# - Want to override settings? No

# 5. Deploy a producción
vercel --prod
```

### Opción 2: GitHub + Vercel (Automático)

```bash
# 1. Push a GitHub
git init
git add .
git commit -m "feat: UTTILL headless frontend complete"
git branch -M main
git remote add origin https://github.com/civekempire/uttill-frontend.git
git push -u origin main

# 2. Ir a vercel.com
# 3. Import Git Repository
# 4. Seleccionar uttill-frontend
# 5. Configure Project:
#    - Framework Preset: Next.js
#    - Root Directory: ./
#    - Build Command: (default)
#    - Output Directory: (default)
# 6. Agregar Environment Variables (ver abajo)
# 7. Deploy
```

### Environment Variables en Vercel

**Settings → Environment Variables:**

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=uttill.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=[TU_TOKEN_AQUI]
```

**IMPORTANTE:**
- Production: Aplica a rama `main`
- Preview: Aplica a otras ramas
- Development: Para `vercel dev` local

---

## Conectar Dominio Custom

### uttill.com → Vercel

**DNS ya configurado (5-Abr-2026):**
```
uttill.com
├─ A record → Shopify (temporal)
└─ CNAME www → Shopify (temporal)
```

**Cambiar a Vercel:**

1. **En Vercel:**
   - Settings → Domains
   - Add Domain: `uttill.com`
   - Add Domain: `www.uttill.com`
   - Copiar valores DNS

2. **En Hostinger:**
   - DNS Zone Editor
   - **Eliminar records Shopify actuales**
   - Agregar nuevos records Vercel:
     ```
     A     @     76.76.21.21
     CNAME www   cname.vercel-dns.com
     ```

3. **Verificar propagación:**
   ```bash
   nslookup uttill.com
   # Debe apuntar a 76.76.21.21
   ```

4. **TLS automático:**
   - Vercel genera certificado SSL en ~5 minutos
   - uttill.com funciona con HTTPS

---

## Post-Deploy Checklist

### 1. Verificar URLs principales

```bash
# Landing
curl -I https://uttill.com
# Debe retornar: 200 OK

# Shop
curl -I https://uttill.com/shop
# Debe retornar: 200 OK

# Producto ejemplo (ajustar handle real)
curl -I https://uttill.com/products/spc-2836-monterrey
# Debe retornar: 200 OK
```

### 2. Test Shopify API

- Abrir https://uttill.com/shop
- Verificar que productos cargan
- Verificar imágenes
- Verificar precios en CRC

### 3. Lighthouse Audit

```bash
# Chrome DevTools
1. Abrir uttill.com
2. F12 → Lighthouse tab
3. Generate report (Desktop + Mobile)
4. Target: 95+ Desktop, 90+ Mobile
```

### 4. Google Analytics (opcional)

**Agregar env vars:**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Actualizar layout.tsx:**
```tsx
// Agregar script Google Analytics en <head>
```

---

## Troubleshooting

### Error: "Shopify API error"

**Causa:** Token inválido o expirado  
**Fix:**
1. Regenerar token en Shopify Admin
2. Actualizar en Vercel env vars
3. Redeploy

### Error: "Products not loading"

**Causa:** GraphQL query syntax error  
**Fix:**
1. Verificar query en `lib/shopify/queries.ts`
2. Test query manual con curl
3. Revisar logs en Vercel dashboard

### Imágenes no cargan

**Causa:** Domain no permitido en next.config.js  
**Fix:**
```js
// next.config.js
images: {
  domains: ['cdn.shopify.com', 'uttill.myshopify.com'],
}
```

### DNS no propaga

**Causa:** Caché DNS  
**Fix:**
```bash
# Flush DNS local
ipconfig /flushdns  # Windows
sudo dscacheutil -flushcache  # Mac

# Esperar 5-10 minutos propagación
# Verificar: https://dnschecker.org/#A/uttill.com
```

---

## Rollback

**Si algo falla:**

1. **Vercel Dashboard:**
   - Deployments → Seleccionar deployment anterior
   - ⋮ → Promote to Production

2. **DNS rollback a Shopify:**
   ```
   A     @     23.227.38.65 (Shopify IP)
   CNAME www   shops.myshopify.com
   ```

---

## Monitoreo

### Vercel Analytics

- Settings → Analytics
- Ver métricas en tiempo real
- Core Web Vitals
- Traffic patterns

### Uptime Monitoring

**Opciones:**
- UptimeRobot (gratis, check cada 5 min)
- Pingdom
- StatusCake

**Endpoint a monitorear:**
```
https://uttill.com
```

---

## Próximos Pasos

1. ✅ Deploy a Vercel production
2. ✅ Conectar uttill.com custom domain
3. ⬜ Configurar Google Analytics
4. ⬜ Primera venta test
5. ⬜ Meta Ads setup
6. ⬜ Launch público

---

**UTTILL.COM — READY FOR PRODUCTION 🚀**
