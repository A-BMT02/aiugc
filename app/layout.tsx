import { AuthProvider } from '../contexts/AuthContext'
import Script from 'next/script'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://blobbi.ai'),
  title: {
    default: 'Blobbi - Create AI UGC Video Ads in Minutes',
    template: '%s | Blobbi',
  },
  description:
    'Create high-converting AI UGC video ads in minutes. Choose from realistic AI avatars, add your product, and generate scroll-stopping ad creatives — no actors, no studios.',
  keywords: [
    'AI UGC ads',
    'AI video ads',
    'UGC ad creator',
    'AI avatar ads',
    'AI UGC video',
    'AI ad generator',
    'UGC video maker',
    'AI content creator',
    'AI video creator',
    'user generated content AI',
  ],
  openGraph: {
    title: 'Blobbi - Create AI UGC Video Ads in Minutes',
    description:
      'Create high-converting AI UGC video ads in minutes. Realistic AI avatars, product placement, and scroll-stopping creatives — no actors needed.',
    url: 'https://blobbi.ai',
    siteName: 'Blobbi',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blobbi - Create AI UGC Video Ads in Minutes',
    description:
      'Create high-converting AI UGC video ads in minutes. Realistic AI avatars, product placement, and scroll-stopping creatives — no actors needed.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://blobbi.ai',
  },
}

export default function RootLayout({ children } : any) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2FPLZDS7EQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2FPLZDS7EQ');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','2139845240137111');
            fbq('track','PageView');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Blobbi',
              url: 'https://blobbi.ai',
              applicationCategory: 'MultimediaApplication',
              description:
                'Create high-converting AI UGC video ads in minutes with realistic AI avatars and product placement.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}