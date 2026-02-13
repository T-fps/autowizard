# Auto Wizard - Complete Project

Your complete car research and matchmaking platform with 400+ vehicles, quiz, comparison tools, blog, and monetization features built-in.

## Quick Start

### 1. Install Dependencies

```bash
cd autowizard-complete
npm install
```

### 2. Set Up Environment

```bash
# Copy example env file
cp .env.local.example .env.local

# Edit .env.local and add your admin key
# Generate a secure key: openssl rand -hex 32
```

### 3. Create Data Folder

```bash
mkdir -p data
echo "[]" > data/subscribers.json
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Project Structure

```
autowizard-complete/
├── app/
│   ├── api/
│   │   ├── subscribe/          # Email collection API
│   │   └── subscribers/export/ # CSV export API
│   ├── blog/                   # 20+ blog articles
│   ├── brands/                 # Brand pages
│   ├── cars/[slug]/           # Individual car pages
│   ├── compare/               # Vehicle comparison
│   ├── consultation/          # Consultation booking
│   ├── guide/                 # Wizard's Guide
│   ├── pro/                   # Wizard Pro pricing
│   ├── quiz/                  # Car matchmaking quiz
│   ├── results/               # Quiz results
│   ├── services/              # Premium services
│   ├── components/
│   │   ├── AdSlot.tsx         # Google AdSense ready
│   │   ├── CarImage.tsx       # Wikipedia car images
│   │   ├── FinancingCalculator.tsx
│   │   ├── Footer.tsx         # Newsletter + disclosure
│   │   ├── InsuranceEstimator.tsx
│   │   ├── NewsletterPopup.tsx
│   │   ├── TrimSelector.tsx
│   │   └── UsedPriceEstimator.tsx
│   └── lib/
│       ├── vehicleDatabase.ts # 446 vehicles
│       ├── vehicleScoring.ts  # Quiz algorithm
│       ├── vehicleTrims.ts    # Trim levels
│       └── vehicleHeritage.ts # Vehicle descriptions
├── data/
│   └── subscribers.json       # Email collection
└── public/                    # Add your images here
```

---

## Features Included

### Free Tools
- **Car Matchmaking Quiz** - 20 questions, AI-powered recommendations
- **Vehicle Database** - 446 vehicles with specs
- **Compare Tool** - Side-by-side comparison
- **Blog** - 20+ SEO-optimized articles
- **Brand Pages** - All major manufacturers

### Monetization (Ready to Go)
- **Email Collection** - Quiz, popup, footer, newsletter
- **Wizard Pro Page** - $29/mo subscription tier
- **Financing Calculator** - Affiliate-ready
- **Insurance Estimator** - Lead capture
- **Ad Slots** - Google AdSense ready
- **Affiliate Disclosure** - In footer

---

## Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/autowizard.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `ADMIN_API_KEY`: Your secure key
5. Deploy!

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## Add Your Branding

### Required Files (add to /public/)

```
/public/
├── logo.png          # Your logo (recommended: 200x50)
├── favicon.ico       # Browser tab icon
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── og-image.png      # Social sharing image (1200x630)
└── manifest.json
```

### Update Metadata

Edit `app/layout.tsx`:
- Site title
- Description
- Social media URLs
- Google Analytics ID (replace G-87XM9FX4TP)

---

## Monetization Setup

### 1. Email Collection (Working Now)
Emails are saved to `data/subscribers.json`

Export as CSV:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_KEY" \
  https://yoursite.com/api/subscribers/export > emails.csv
```

### 2. Google AdSense
1. Apply at [google.com/adsense](https://www.google.com/adsense)
2. Add your publisher ID to `app/components/AdSlot.tsx`
3. Set `testMode={false}` in production

### 3. Affiliate Links
Update these files with your affiliate URLs:
- `FinancingCalculator.tsx` - Auto loan affiliates
- `InsuranceEstimator.tsx` - Insurance affiliates

### 4. Stripe (Wizard Pro)
To enable payments:
1. Create Stripe account
2. Add Stripe keys to `.env.local`
3. Update `/app/pro/page.tsx` checkout links

---

## Customize Quiz

The quiz algorithm is in `app/lib/vehicleScoring.ts`.

To adjust recommendations:
- Modify score weights for different factors
- Add new matching criteria
- Update `matchReasons` messages

---

## Add More Vehicles

Edit `app/lib/vehicleDatabase.ts`:

```typescript
{
  name: 'New Car Name',
  brand: 'Brand',
  price: 35,  // in thousands
  bodyType: 'suv',
  size: 'midsize',
  powertrain: 'gas', // gas, hybrid, phev, ev
  seats: 5,
  hp: 250,
  mpgCity: 25,
  mpgHighway: 32,
  reliability: 4,  // 1-5
  segment: 'mainstream', // mainstream, premium, luxury, exotic
  features: ['awd', 'cargo', 'tech'],
  useCases: ['family', 'commute'],
}
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ADMIN_API_KEY` | Protects subscriber export API |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense publisher ID |

---

## Support

This is a complete, production-ready project. All features work out of the box.

For customizations or questions, the code is well-documented and follows Next.js 14 best practices.
