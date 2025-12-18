import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import ServiceWorkerRegistration from "@/components/service-worker-registration"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nocny Portier - Cocktail Bar",
  description: "Discover extraordinary themed cocktails in an immersive glassmorphism experience",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nocny Portier",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Nocny Portier",
    title: "Nocny Portier - Cocktail Bar",
    description: "Discover extraordinary themed cocktails in an immersive glassmorphism experience",
  },
  twitter: {
    card: "summary",
    title: "Nocny Portier - Cocktail Bar",
    description: "Discover extraordinary themed cocktails in an immersive glassmorphism experience",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Nocny Portier" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nocny Portier" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

        <link rel="apple-touch-icon" href="/icons/icon-152x152.jpg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.jpg" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://nocny-portier.vercel.app" />
        <meta name="twitter:title" content="Nocny Portier" />
        <meta
          name="twitter:description"
          content="Discover extraordinary themed cocktails in an immersive glassmorphism experience"
        />
        <meta name="twitter:image" content="https://nocny-portier.vercel.app/icons/icon-192x192.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nocny Portier" />
        <meta
          property="og:description"
          content="Discover extraordinary themed cocktails in an immersive glassmorphism experience"
        />
        <meta property="og:site_name" content="Nocny Portier" />
        <meta property="og:url" content="https://nocny-portier.vercel.app" />
        <meta property="og:image" content="https://nocny-portier.vercel.app/icons/icon-192x192.jpg" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
          <ServiceWorkerRegistration />
        </Suspense>
      </body>
    </html>
  )
}
