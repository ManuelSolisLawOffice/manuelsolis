import type { Metadata } from 'next';
import { LanguageProvider } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import AIChatButton from '../components/AIChatButton';
import { translations, Language } from '../lib/translations';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../globals.css'; 

interface LayoutParams {
  lang: Language; 
}

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const t = translations[currentLang];
  
  const baseUrl = 'https://manuelsolis.com';

  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    authors: [{ name: 'Manuel Solis Law Offices' }],
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: baseUrl,
      siteName: 'Manuel Solis',
      locale: currentLang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t.seo.home.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
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
    alternates: {
      canonical: `${baseUrl}/${currentLang}`,
      languages: {
        'es-MX': `${baseUrl}/es`,
        'en-US': `${baseUrl}/en`,
      },
    },
    other: {
      'og:site_name': 'Manuel Solis',
      'article:publisher': 'https://www.facebook.com/manuelsolis',
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const t = translations[currentLang];
  
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Law Offices of Manuel Solis',
    alternateName: 'Manuel Solis',
    description: t.seo.home.description,
    url: 'https://manuelsolis.com',
    telephone: '+1-866-979-5146',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '29.7604',
      longitude: '-95.3698',
    },
    areaServed: ['US', 'MX'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    sameAs: [
      'https://facebook.com/manuelsolis',
      'https://twitter.com/manuelsolis',
      'https://linkedin.com/company/manuelsolis',
      'https://instagram.com/manuelsolis',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immigration Law',
            description: 'Immigration legal services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Injury',
            description: 'Accident and injury cases',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Criminal Law',
            description: 'Criminal defense services',
          },
        },
      ],
    },
    parentOrganization: {
      '@type': 'LegalService',
      name: 'Manuel Solis',
      url: 'https://manuelsolis.com',
    },
  };
  
  return (
    <html lang={currentLang} suppressHydrationWarning>
      <head>
        {/* 1. SCHEMA ORG */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          strategy="beforeInteractive"
        />
        
        {/* 2. GOOGLE ANALYTICS (GA4) - ID REAL IMPLEMENTADO */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V5F8J8QMZ4"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V5F8J8QMZ4'); 
            `,
          }}
        />

        {/* 3. META PIXEL (Facebook & Instagram) - ID REAL IMPLEMENTADO */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1679590710105917');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* 4. TIKTOK PIXEL - ID REAL IMPLEMENTADO */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                
                ttq.load('CVERFVJC77U9L0C1P6O0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </head>
      
      <body suppressHydrationWarning>
        {/* Fallback para Meta Pixel (si el usuario no tiene JS) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1679590710105917&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <LanguageProvider initialLanguage={currentLang}>
          {children}
          <WhatsAppButton />
          <AIChatButton />
          
          {/* Herramientas de Vercel */}
          <Analytics />
          <SpeedInsights />
          
        </LanguageProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}