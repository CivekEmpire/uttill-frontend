#!/bin/bash
# UTTILL.COM — Automated Deploy Script
# Run: bash deploy.sh

set -e

echo "🚀 UTTILL.COM DEPLOY AUTOMATION"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is configured
if ! git config user.email > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Git user not configured${NC}"
    git config user.email "civek.empire@civeksa.com"
    git config user.name "CIVEK Empire"
    echo -e "${GREEN}✓ Git configured${NC}"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  No GitHub remote configured${NC}"
    echo ""
    echo "Please create GitHub repo first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: uttill-frontend"
    echo "3. Visibility: Private"
    echo "4. Create repository"
    echo ""
    read -p "Enter GitHub repo URL: " REPO_URL
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✓ Remote added${NC}"
else
    echo -e "${GREEN}✓ GitHub remote exists${NC}"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main --force

echo -e "${GREEN}✓ Code pushed to GitHub${NC}"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not installed${NC}"
    echo ""
    echo "Install Vercel CLI:"
    echo "npm i -g vercel"
    echo ""
    echo "Then run:"
    echo "vercel login"
    echo "vercel"
    echo ""
    exit 1
fi

echo ""
echo "🔐 Vercel Environment Variables Required:"
echo ""
echo "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=uttill.myshopify.com"
read -p "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=" SHOPIFY_TOKEN
echo ""

if [ -z "$SHOPIFY_TOKEN" ]; then
    echo -e "${RED}✗ Token required${NC}"
    exit 1
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod \
    -e NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=uttill.myshopify.com \
    -e NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="$SHOPIFY_TOKEN"

echo ""
echo -e "${GREEN}✓✓✓ DEPLOY COMPLETE ✓✓✓${NC}"
echo ""
echo "Next steps:"
echo "1. Go to Vercel dashboard"
echo "2. Settings → Domains → Add uttill.com"
echo "3. Update DNS in Hostinger (see DEPLOY_STEPS.md)"
echo ""
