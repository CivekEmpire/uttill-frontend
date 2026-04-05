# UTTILL.COM — DEPLOY SUMMARY FOR CARLOS

**Status:** Code ready, waiting for GitHub + Vercel setup

---

## WHAT'S DONE ✅

- ✅ Frontend code complete (53 files)
- ✅ Git initialized + committed (2 commits)
- ✅ vercel.json configured
- ✅ Environment variables documented
- ✅ Deploy guide created (DEPLOY_STEPS.md)
- ✅ Automation script created (deploy.sh)

---

## WHAT'S NEEDED (Carlos) 🎯

### Option A: Manual Deploy (35 min)

**Follow:** `DEPLOY_STEPS.md` (step-by-step guide)

**Steps:**
1. Create Shopify Storefront Token (5 min)
2. Create GitHub repo `uttill-frontend` (3 min)
3. Push code to GitHub (2 min)
4. Import to Vercel (5 min)
5. Configure env vars (2 min)
6. Update DNS uttill.com (5 min)
7. Wait propagation + verify (10 min)

**Result:** uttill.com LIVE on Vercel

### Option B: Semi-Automated (15 min)

**Prerequisites:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login
```

**Then run:**
```bash
cd C:/Users/civek/uttill-frontend
bash deploy.sh
```

Script will:
- Push to GitHub (will ask for repo URL)
- Deploy to Vercel (will ask for Shopify token)
- Set environment variables automatically

**Manual after:** DNS configuration (5 min)

---

## REQUIRED CREDENTIALS

### 1. Shopify Storefront Token

**Where:** Shopify Admin → Settings → Apps → Development  
**Format:** `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`  
**Scopes needed:**
- unauthenticated_read_product_listings
- unauthenticated_read_product_inventory
- unauthenticated_write_checkouts
- unauthenticated_read_checkouts

**Guide:** See DEPLOY_STEPS.md Section "PRE-REQUISITO"

### 2. GitHub Account

**Need:** Access to create repositories  
**Org:** Use personal account or civekempire org

### 3. Vercel Account

**Signup:** https://vercel.com/signup (use GitHub)  
**Cost:** Free tier OK for now (upgrade to Pro $20/mo recommended)

---

## DNS CONFIGURATION

**Current (Shopify):**
```
A     @     23.227.38.65
CNAME www   shops.myshopify.com
```

**Change to (Vercel):**
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

**Where:** Hostinger hPanel → uttill.com → DNS Zone

---

## VERIFICATION CHECKLIST

After deploy, verify:

- [ ] https://uttill.com loads (HTTPS active)
- [ ] Landing page shows dark + gold theme
- [ ] /shop shows products from Shopify
- [ ] Product images load correctly
- [ ] Prices show in CRC (₡)
- [ ] WhatsApp CTAs work
- [ ] Mobile responsive
- [ ] Lighthouse score 90+

---

## SUPPORT

**Full Guide:** `DEPLOY_STEPS.md` (detailed step-by-step)  
**Automation:** `deploy.sh` (semi-automated script)  
**Troubleshooting:** See DEPLOY_STEPS.md Section "TROUBLESHOOTING"

**Questions?** Check documentation first, then ask.

---

## TIMELINE

| Step | Time |
|------|------|
| Shopify token | 5 min |
| GitHub repo | 3 min |
| Code push | 2 min |
| Vercel import | 5 min |
| Env vars | 2 min |
| DNS change | 5 min |
| Propagation | 10 min |
| Verification | 5 min |
| **TOTAL** | **~35 min** |

---

## AFTER DEPLOY

1. Update `ESTADO_ACTUAL.md`:
   ```
   uttill.com headless: ✅ LIVE Vercel
   ```

2. Update `TAREAS_PENDIENTES.md`:
   ```
   ✅ uttill.com deploy Vercel
   ✅ DNS uttill.com → Vercel
   ```

3. Test first purchase flow

4. Setup Analytics (optional):
   - Google Analytics
   - Vercel Analytics (built-in)

5. Launch announcement:
   - Social media (FB, IG)
   - WhatsApp contacts
   - Email list

---

**UTTILL.COM — READY TO DEPLOY**

All code complete. Waiting for Carlos to execute deploy steps.

Target: LIVE in production within 35 minutes of starting.

🚀
