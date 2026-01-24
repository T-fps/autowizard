import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auto Wizard | Free Car Finder Quiz - Match Your Perfect Vehicle in Minutes',
  description: 'Take our free 3-5 minute car finder quiz to discover your perfect vehicle match. Compare 400+ models across 16 categories. Expert recommendations based on your lifestyle, budget, and preferences.',
  keywords: [
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
    'which car should I buy'
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
    title: 'Auto Wizard | Free Car Finder Quiz - Match Your Perfect Vehicle',
    description: 'Take our free 3-5 minute car finder quiz to discover your perfect vehicle match. Compare 400+ models across 16 categories.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Auto Wizard - Find Your Perfect Vehicle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Wizard | Free Car Finder Quiz',
    description: 'Take our free 3-5 minute quiz to find your perfect car match from 400+ models.',
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
    "description": "Free car finder quiz to match your perfect vehicle from 400+ models across 16 categories",
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
        "name": "How does the Auto Wizard car finder quiz work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our quiz asks 12 questions about your lifestyle, budget, preferences, and needs. Our algorithm then analyzes your responses to match you with the perfect vehicles from our database of 400+ models across 16 categories."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Auto Wizard car quiz free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our car finder quiz is 100% free. You can take the assessment and receive personalized vehicle recommendations at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the car finder assessment take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Auto Wizard assessment takes approximately 3-5 minutes to complete. You'll answer 12 quick questions and immediately receive your personalized vehicle matches."
        }
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
