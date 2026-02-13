import type { Metadata } from 'next'
import './globals.css'
import NewsletterPopup from './components/NewsletterPopup'

export const metadata: Metadata = {
  title: 'Auto Wizard | Car Matchmaking & Research',
  description: 'Your complete car research destination. Compare 400+ vehicles, get personalized recommendations, read expert buying guides, and find your perfect match. Everything you need to make the right car decision.',
  keywords: [
    'car research',
    'car matchmaking',
    'vehicle comparison',
    'car finder quiz',
    'vehicle recommendation',
    'what car should I buy',
    'car matching tool',
    'best car for me',
    'car buying guide',
    'vehicle assessment',
    'car comparison tool',
    'find my perfect car',
    'car recommendation quiz',
    'auto wizard',
    'car finder',
    'vehicle finder',
    'car quiz',
    'which car should I buy',
    'car consultant',
    'car choosing guide',
    'help me choose a car',
    'car selection tool',
    'best car for commuting',
    'best first car',
    'car buying tips',
    'how to choose a car',
    'electric vs hybrid',
    'best family SUV',
    'best cars under 30k',
    'car buying checklist',
    'vehicle matching quiz',
    'personalized car recommendations',
    'car reviews',
    'new car research',
    'used car guide'
  ],
  authors: [{ name: 'Auto Wizard' }],
  creator: 'Auto Wizard',
  publisher: 'Auto Wizard',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autowizard.org',
    siteName: 'Auto Wizard',
    title: 'Auto Wizard | Car Matchmaking & Research',
    description: 'Your complete car research destination. Compare 400+ vehicles, get personalized recommendations, read expert buying guides, and find your perfect match.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Wizard - Car Matchmaking & Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Wizard | Car Matchmaking & Research',
    description: 'Your complete car research destination. Compare 400+ vehicles, get personalized recommendations, and find your perfect match.',
    images: ['/og-image.png'],
    creator: '@autowizard',
  },
  alternates: {
    canonical: 'https://autowizard.org',
  },
  category: 'automotive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Auto Wizard",
    "description": "Your complete car research destination. Compare 400+ vehicles, get personalized recommendations, and find your perfect match.",
    "url": "https://autowizard.org",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1247"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Auto Wizard",
    "alternateName": ["AutoWizard", "Auto Wizard Car Research", "Auto Wizard Car Matchmaking"],
    "url": "https://autowizard.org"
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Auto Wizard",
    "url": "https://autowizard.org",
    "logo": "https://autowizard.org/logo.png",
    "sameAs": [
      "https://twitter.com/autowizard",
      "https://facebook.com/autowizard",
      "https://instagram.com/autowizard",
      "https://tiktok.com/@autowizard"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Auto Wizard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Auto Wizard is your complete car research destination. We help you compare 400+ vehicles, get personalized recommendations through our car matchmaking quiz, read expert buying guides, and find your perfect vehicle match."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Auto Wizard car matchmaking quiz work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our quiz asks questions about your lifestyle, budget, preferences, and needs. Our algorithm then analyzes your responses to match you with the perfect vehicles from our database of 400+ models across 16 categories."
        }
      },
      {
        "@type": "Question",
        "name": "Is Auto Wizard free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Auto Wizard is completely free. You can browse vehicles, compare specs, read buying guides, and take our car matchmaking quiz at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "What car should I buy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best car for you depends on your budget, lifestyle, daily driving needs, and preferences. Auto Wizard helps you research vehicles, compare options, and our free quiz analyzes these factors to recommend vehicles that match your specific requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose the right car for my needs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consider your budget (including insurance and fuel costs), how you'll use the car (commuting, family, adventure), fuel preference (gas, hybrid, electric), and must-have features. Auto Wizard's research tools and car matchmaking quiz help you weigh all these factors systematically."
        }
      },
      {
        "@type": "Question",
        "name": "Should I buy an electric car or hybrid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Choose electric if you can charge at home and drive under 250 miles daily. Choose hybrid if you need unlimited range, can't install a charger, or take frequent long trips. Both offer fuel savings over traditional gas vehicles."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best car for first-time buyers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First-time buyers should prioritize reliability, low insurance costs, and good resale value. Top picks include Honda Civic, Toyota Corolla, Mazda3, and Hyundai Elantra. Our quiz can help match you with the best option for your budget."
        }
      },
      {
        "@type": "Question",
        "name": "How many vehicles can I research on Auto Wizard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Auto Wizard's database includes over 400 vehicles across 16 categories including sedans, SUVs, trucks, electric vehicles, luxury cars, sports cars, and more. You can compare specs, read reviews, and find the perfect match for your needs."
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="application-name" content="Auto Wizard" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-87XM9FX4TP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-87XM9FX4TP');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      </head>
      <body className="font-sans">
        {children}
        {/* Newsletter Popup - triggers after 30s or on exit intent */}
        <NewsletterPopup delay={30000} exitIntent={true} />
      </body>
    </html>
  )
}
