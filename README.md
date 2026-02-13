# Auto Wizard - New Features Installation Guide

## Overview of New Features

Based on your 3-Year Monetization Strategy, these files add:

1. **Email Collection System** - Saves emails to JSON database you can export
2. **Wizard Pro Pricing Page** - Premium subscription tiers ($29/mo Pro, $199 Concierge)
3. **Financing Calculator** - Interactive loan calculator with affiliate links
4. **Insurance Estimator** - Estimate premiums with email capture + affiliate links
5. **Newsletter Popup** - Exit intent popup with email capture
6. **Improved Footer** - Newsletter signup + affiliate disclosure
7. **Ad Slot Components** - Ready for Google AdSense

---

## Installation Steps

### Step 1: Copy Files to Your Project

Copy these folders/files into your `autowizard` project:

```
app/
├── api/
│   ├── subscribe/
│   │   └── route.ts          # Email collection API
│   └── subscribers/
│       └── export/
│           └── route.ts      # CSV export API
├── components/
│   ├── AdSlot.tsx            # Google AdSense components
│   ├── FinancingCalculator.tsx
│   ├── Footer.tsx            # New footer with newsletter + disclosure
│   ├── InsuranceEstimator.tsx
│   └── NewsletterPopup.tsx
└── pro/
    └── page.tsx              # Wizard Pro pricing page
```

### Step 2: Create Data Directory

Create a `data/` folder in your project root (same level as `app/`):

```bash
mkdir data
echo "[]" > data/subscribers.json
```

Add to `.gitignore`:
```
/data/subscribers.json
```

### Step 3: Update Your Layout

In `app/layout.tsx`, add the Newsletter Popup:

```tsx
// At the top, import:
import NewsletterPopup from './components/NewsletterPopup';

// In the body, add:
<body className="font-sans">
  {children}
  <NewsletterPopup delay={30000} exitIntent={true} />
</body>
```

### Step 4: Update Your Footer

Replace your current footer component with the new one. In any page that has a footer, import:

```tsx
import Footer from '../components/Footer';

// Then use:
<Footer />
```

### Step 5: Add Financing Calculator to Car Pages

In `app/cars/[slug]/page.tsx`, add to the sidebar:

```tsx
import FinancingCalculator from '../../components/FinancingCalculator';

// In the sidebar section, add:
<FinancingCalculator 
  vehiclePrice={vehicle.price} 
  vehicleName={vehicle.name} 
/>
```

### Step 6: Add Insurance Estimator to Quiz Results

In your quiz results section (in `app/quiz/page.tsx`), after the results:

```tsx
import InsuranceEstimator from '../components/InsuranceEstimator';

// Add after the results card:
<InsuranceEstimator
  vehicleName={result.vehicles[0]}
  vehiclePrice={35} // Get from database
  vehicleType={result.vehicleType}
/>
```

### Step 7: Add Ad Slots (When AdSense Approved)

```tsx
import { InArticleAd, SidebarAd, BannerAd } from '../components/AdSlot';

// In blog articles:
<InArticleAd />

// In sidebars:
<SidebarAd />

// At top/bottom of pages:
<BannerAd />
```

---

## Environment Variables

Add to `.env.local`:

```env
# For subscriber export API authentication
ADMIN_API_KEY=your-secret-admin-key-here

# Google AdSense (when approved)
# Add your publisher ID to the AdSlot component
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

---

## Accessing Your Subscriber Data

### Option 1: Direct JSON File
Your subscribers are stored in `data/subscribers.json`. You can open this file directly.

### Option 2: Export as CSV
```bash
curl -H "Authorization: Bearer your-secret-admin-key-here" \
  http://localhost:3000/api/subscribers/export \
  > subscribers.csv
```

### Option 3: View Stats
```bash
curl -H "Authorization: Bearer your-secret-admin-key-here" \
  http://localhost:3000/api/subscribe
```

Returns:
```json
{
  "subscribers": [...],
  "total": 150,
  "bySource": {
    "quiz": 80,
    "newsletter": 40,
    "footer": 20,
    "popup": 10
  }
}
```

---

## Revenue Stream Checklist

Based on your strategy document, here's what to set up next:

### Immediate (This Week)
- [ ] Apply for Google AdSense: https://www.google.com/adsense
- [ ] Sign up for CJ Affiliate: https://www.cj.com
- [ ] Apply for ShareASale: https://www.shareasale.com
- [ ] Apply for Impact: https://impact.com

### Auto Insurance Affiliates
- [ ] Liberty Mutual: https://www.libertymutual.com/affiliates
- [ ] Root Insurance: https://www.joinroot.com/partners
- [ ] Allstate: Contact through CJ Affiliate

### Auto Loan Affiliates
- [ ] Caribou: https://www.caribou.com/partners
- [ ] LightStream: https://www.lightstream.com/affiliates
- [ ] myAutoloan: Available through CJ Affiliate

### Update Affiliate Links
Once approved, update these files with your actual affiliate links:
- `FinancingCalculator.tsx` - Line 120 (lenderLinks array)
- `InsuranceEstimator.tsx` - Line 75 (insuranceProviders array)

---

## Next Steps

1. **Deploy these changes** - Push to GitHub, Vercel auto-deploys
2. **Test email collection** - Submit test emails, check `data/subscribers.json`
3. **Apply for affiliates** - While waiting for approval, the UI is ready
4. **Apply for AdSense** - Needs ~50k pageviews for Mediavine/Raptive later
5. **Set up Stripe** - For Wizard Pro subscriptions (separate integration)

---

## Questions?

The components are designed to work out of the box. If you need help integrating:
- Stripe for payments
- ConvertKit/Mailchimp instead of local storage
- Custom affiliate tracking

Just ask!
