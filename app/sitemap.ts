import { MetadataRoute } from 'next'
import { vehicleDatabase } from './lib/vehicleDatabase'

// Helper to convert vehicle name to slug
function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

// Helper to convert brand name to slug
function brandToSlug(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, '-')
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autowizard.org'
  
  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/quiz`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/results`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/compare`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/consultation`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/expertise`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/guide`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/value`, changeFrequency: 'monthly' as const, priority: 0.7 },
  ]
  
  // Best pages
  const bestPages = [
    { url: `${baseUrl}/best`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/electric`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/family`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/luxury`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/sedans`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/sports-cars`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/suvs`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/trucks`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/under-30k`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/best/under-40k`, changeFrequency: 'weekly' as const, priority: 0.8 },
  ]
  
  // Blog articles
  const blogArticles = [
    '2026-corvette-e-ray-record-breaker',
    '2026-toyota-rav4-guide',
    'awd-vs-4wd',
    'best-car-redesigns-2026',
    'best-cars-for-gas-mileage',
    'best-cars-under-30k',
    'best-commuter-cars',
    'best-family-suvs',
    'best-first-car-for-teens',
    'best-hybrid-cars-2026',
    'best-selling-cars-2025',
    'best-suvs-2026',
    'best-time-to-buy-car',
    'best-used-cars-2026',
    'car-financing-guide',
    'car-tariffs-guide-2026',
    'consumer-reports-top-10-2026',
    'dodge-charger-hemi-v8-return',
    'electric-vs-hybrid',
    'ev-tax-credit-guide-2026',
    'first-car-buying-guide',
    'honda-civic-vs-camry-hybrid',
    'how-long-should-car-loan-be',
    'how-much-car-can-i-afford',
    'how-to-choose-a-car',
    'lease-vs-buy-car',
    'most-improved-cars-2026',
    'most-reliable-cars-2026',
    'suv-vs-sedan',
    'used-ev-buying-guide-2026',
    'used-vs-new-car',
    'what-car-should-i-buy',
    'what-credit-score-to-buy-car',
  ]
  
  const blogPages = [
    { url: `${baseUrl}/blog`, changeFrequency: 'daily' as const, priority: 0.9 },
    ...blogArticles.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
  
  // Extract unique brands from vehicle database
  const uniqueBrands = Array.from(new Set(vehicleDatabase.map(v => v.brand)))
  
  const brandPages = [
    { url: `${baseUrl}/brands`, changeFrequency: 'weekly' as const, priority: 0.8 },
    ...uniqueBrands.map(brand => ({
      url: `${baseUrl}/brands/${brandToSlug(brand)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
  
  // Generate car pages from vehicle database (446 vehicles)
  const carPages = vehicleDatabase.map(vehicle => ({
    url: `${baseUrl}/cars/${toSlug(vehicle.name)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [
    ...staticPages,
    ...bestPages,
    ...blogPages,
    ...brandPages,
    ...carPages,
  ]
}
