# UTTILL.COM — DEPLOY VERCEL PASO A PASO

**Carlos: sigue estos pasos EXACTAMENTE en orden**

---

## ✅ PRE-REQUISITO: Shopify Storefront Token

**CRÍTICO:** Necesitas crear token antes de empezar

### Crear Token en Shopify Admin

1. Ir a: https://uttill.myshopify.com/admin/settings/apps/development
2. Click: **"Create an app"**
3. App name: `Uttill Headless Frontend`
4. App developer: tu email
5. Click: **"Create app"**

6. Tab: **"Configuration"**
7. Sección: **"Storefront API integration"**
8. Click: **"Configure"**

9. Seleccionar permisos (checkboxes):
   - ✓ `unauthenticated_read_product_listings`
   - ✓ `unauthenticated_read_product_inventory`
   - ✓ `unauthenticated_write_checkouts`
   - ✓ `unauthenticated_read_checkouts`

10. Click: **"Save"**

11. Tab: **"API credentials"**
12. Sección: **"Storefront API access token"**
13. Click: **"Install app"** (si aparece)
14. Click: **"Reveal token once"**

15. **COPIAR TOKEN** (formato: `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
16. **GUARDAR EN LUGAR SEGURO** (no se puede ver de nuevo)

**Token copiado:** ______________________________________

---

## PASO 1: Crear Repositorio en GitHub

### Opción A: GitHub Web (recomendado)

1. Ir a: https://github.com/new
2. Repository name: `uttill-frontend`
3. Description: `UTTILL.com - Headless E-Commerce Next.js + Shopify`
4. Visibility: **Private** (por ahora)
5. **NO** inicializar con README, .gitignore o license
6. Click: **"Create repository"**

7. **COPIAR URL** que aparece:
   ```
   https://github.com/[TU_USERNAME]/uttill-frontend.git
   ```

### Opción B: Usar cuenta CIVEK Empire

Si ya tienes organización GitHub:
1. https://github.com/organizations/civekempire/repositories/new
2. Repository name: `uttill-frontend`
3. Private
4. Create repository

**URL copiada:** ______________________________________

---

## PASO 2: Push Código a GitHub

**Abrir Git Bash o terminal:**

```bash
# 1. Ir al directorio del proyecto
cd C:/Users/civek/uttill-frontend

# 2. Verificar commit existe
git log --oneline

# 3. Agregar remote (usar URL del paso anterior)
git remote add origin https://github.com/[TU_USERNAME]/uttill-frontend.git

# 4. Verificar remote
git remote -v

# 5. Rename branch a main
git branch -M main

# 6. Push a GitHub
git push -u origin main
```

**Si pide credenciales:**
- Username: tu usuario GitHub
- Password: usa **Personal Access Token** (no tu password)
  - Crear token: https://github.com/settings/tokens
  - Scopes: `repo` (full control)

**Verificar:** Ir a `https://github.com/[TU_USERNAME]/uttill-frontend` → código debe aparecer

---

## PASO 3: Deploy a Vercel

### 3.1 Crear Cuenta Vercel

1. Ir a: https://vercel.com/signup
2. Sign up with GitHub
3. Autorizar Vercel en GitHub

### 3.2 Import Proyecto

1. Dashboard Vercel: https://vercel.com/new
2. Click: **"Import Git Repository"**
3. Buscar: `uttill-frontend`
4. Click: **"Import"**

### 3.3 Configure Project

**Framework Preset:** Next.js (auto-detecta)

**Root Directory:** `./` (default)

**Build Settings:**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**NO tocar** esas opciones, dejar default.

### 3.4 Environment Variables

**MUY IMPORTANTE:**

Click: **"Environment Variables"**

Agregar 2 variables:

**Variable 1:**
```
Name: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
Value: uttill.myshopify.com
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
Value: [PEGAR TOKEN DEL PRE-REQUISITO]
```

**Environments:** Seleccionar las 3 (Production, Preview, Development)

### 3.5 Deploy

Click: **"Deploy"**

**Esperar 2-3 minutos** mientras construye...

---

## PASO 4: Verificar Deploy

### 4.1 Check Build Success

- Ver logs en tiempo real
- Debe terminar con: ✓ Build successful
- URL temporal: `https://uttill-frontend-xxxxx.vercel.app`

### 4.2 Test Vercel URL

1. Click en: **"Visit"**
2. Verificar:
   - ✓ Landing page carga
   - ✓ Dark theme + gold
   - ✓ Ir a `/shop` → productos deben cargar
   - ✓ Click en un producto → detalle carga
   - ✓ Imágenes muestran correctamente
   - ✓ Precios en CRC

**Si productos NO cargan:**
- Dashboard Vercel → Settings → Environment Variables
- Verificar token Shopify correcto
- Redeploy: Deployments → ⋮ → Redeploy

---

## PASO 5: Conectar Dominio uttill.com

### 5.1 Agregar Domain en Vercel

1. Dashboard Vercel → Project uttill-frontend
2. Tab: **"Settings"**
3. Sidebar: **"Domains"**
4. Click: **"Add"**
5. Domain: `uttill.com`
6. Click: **"Add"**
7. Repetir para `www.uttill.com`

### 5.2 Copiar Valores DNS

Vercel te mostrará:

**Para uttill.com:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para www.uttill.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**COPIAR estos valores**

### 5.3 Actualizar DNS en Hostinger

1. Ir a: https://hpanel.hostinger.com
2. Domains → uttill.com → DNS / Name Servers
3. Click: **"DNS Zone"**

4. **ELIMINAR records actuales** (Shopify):
   - A record @ → 23.227.38.65 (DELETE)
   - CNAME www → shops.myshopify.com (DELETE)

5. **AGREGAR nuevos records** (Vercel):

   **A Record:**
   - Type: A
   - Name: @
   - Points to: `76.76.21.21`
   - TTL: 3600 (default)

   **CNAME Record:**
   - Type: CNAME
   - Name: www
   - Points to: `cname.vercel-dns.com`
   - TTL: 3600

6. Click: **"Add Record"** para cada uno

### 5.4 Verificar DNS

**Esperar 5-10 minutos propagación**

Verificar en terminal:
```bash
nslookup uttill.com
# Debe retornar: 76.76.21.21
```

O usar: https://dnschecker.org/#A/uttill.com

### 5.5 TLS Certificate

**Automático:** Vercel genera certificado SSL en ~5 minutos

Dashboard Vercel → Domains → uttill.com:
- Status: **Valid Configuration** ✓
- SSL: **Active** ✓

---

## PASO 6: Verificar Producción

### 6.1 Test uttill.com

1. Abrir: https://uttill.com
2. Verificar:
   - ✓ HTTPS activo (candado verde)
   - ✓ Landing carga
   - ✓ /shop → productos
   - ✓ /products/[producto] → detalle
   - ✓ /b2b → hub B2B
   - ✓ /contact → info contacto
   - ✓ Mobile responsive

### 6.2 Lighthouse Audit

Chrome DevTools:
1. F12 → Lighthouse tab
2. Categories: Performance, Accessibility, Best Practices, SEO
3. Device: Desktop
4. Generate report

**Targets:**
- Performance: 95+ ✓
- Accessibility: 90+ ✓
- Best Practices: 90+ ✓
- SEO: 95+ ✓

Repetir para Mobile (target: 90+)

---

## PASO 7: Post-Deploy

### 7.1 Update TAREAS_PENDIENTES

```
✅ uttill.com headless — LIVE en Vercel
✅ DNS conectado — uttill.com → Vercel
✅ TLS activo — HTTPS certificado válido
✅ Shopify API conectado — productos cargan
```

### 7.2 Notificar Equipo

WhatsApp / Email:
"🚀 UTTILL.COM HEADLESS LIVE
- URL: https://uttill.com
- Stack: Next.js 14 + Shopify API
- Performance: <1s load time
- Status: PRODUCTION ✓"

### 7.3 Monitoreo

**Setup UptimeRobot (opcional):**
1. https://uptimerobot.com/signUp
2. Add Monitor
3. URL: https://uttill.com
4. Interval: 5 minutes
5. Alert: email cuando down

---

## TROUBLESHOOTING

### Productos no cargan

**Causa:** Token Shopify inválido

**Fix:**
1. Vercel → Settings → Environment Variables
2. Editar `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
3. Pegar token correcto
4. Deployments → Latest → Redeploy

### DNS no propaga

**Causa:** Caché DNS local

**Fix:**
```bash
# Windows
ipconfig /flushdns

# Esperar 5-10 min
# Verificar: https://dnschecker.org
```

### Build falla en Vercel

**Causa:** Dependencias faltantes

**Fix:**
1. Vercel → Logs → Ver error específico
2. Si es `npm install` error:
   - Local: `cd uttill-frontend && npm install`
   - Commit: `git add package-lock.json && git commit -m "fix: update dependencies" && git push`
3. Vercel auto-redeploy

### Imágenes no cargan

**Causa:** Dominio no permitido

**Fix:**
Ya está en `next.config.js`:
```js
images: {
  domains: ['cdn.shopify.com', 'uttill.myshopify.com'],
}
```

Si persiste:
1. Vercel → Settings → Environment Variables
2. Agregar: `NEXT_PUBLIC_SHOPIFY_CDN_DOMAIN=cdn.shopify.com`
3. Redeploy

---

## CHECKLIST COMPLETO

**Pre-Deploy:**
- [ ] Token Shopify creado
- [ ] Repo GitHub creado
- [ ] Código pusheado

**Deploy:**
- [ ] Proyecto importado a Vercel
- [ ] Env vars configuradas (2 variables)
- [ ] Build exitoso
- [ ] Vercel URL funciona

**Domain:**
- [ ] uttill.com agregado en Vercel
- [ ] DNS actualizado en Hostinger
- [ ] DNS propagado (nslookup)
- [ ] TLS activo (HTTPS)
- [ ] uttill.com carga correctamente

**Verification:**
- [ ] Productos cargan en /shop
- [ ] Imágenes muestran
- [ ] Precios CRC correctos
- [ ] Mobile responsive
- [ ] Lighthouse 95+ desktop

**Post:**
- [ ] TAREAS_PENDIENTES actualizado
- [ ] Equipo notificado
- [ ] Monitoreo setup (opcional)

---

## TIEMPO ESTIMADO

- Token Shopify: 5 min
- GitHub repo: 3 min
- Push código: 2 min
- Vercel import: 5 min
- DNS cambio: 5 min
- Propagación: 10 min
- Verificación: 5 min

**TOTAL: ~35 minutos → UTTILL.COM LIVE** 🚀

---

**UTTILL.COM — READY FOR PRODUCTION DEPLOY**
**Fecha: 5 Abril 2026**
