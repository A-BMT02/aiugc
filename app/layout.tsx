import { AuthProvider } from '../contexts/AuthContext'
import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'UGC Builder - AI Video Platform',
  description: 'Create authentic UGC videos with AI',
}

export default function RootLayout({ children } : any) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-78YBJ1G8MF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-78YBJ1G8MF');
          `}
        </Script>
      </head>
      <body className="bg-black text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}