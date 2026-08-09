import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bloxmindai.netlify.app'),
  title: {
    default: 'BloxMind - Create Roblox Games with AI for Free | AI Game Generator',
    template: '%s · BloxMind',
  },
  description:
    'Create Roblox games with AI for free using BloxMind. Generate Roblox maps, scripts, and 3D environments effortlessly with our AI Roblox game generator. Built for Roblox Studio.',
  generator: 'v0.app',
  applicationName: 'BloxMind',
  keywords: [
    'BloxMind',
    'bloxmind ai',
    'create game with ai for free',
    'create roblox games with ai',
    'roblox ai game generator',
    'build roblox map with ai',
    'roblox ai studio',
    'ai roblox generator',
    'roblox map creator ai',
    'roblox studio ai',
    'roblox game maker ai',
    'free ai game generator roblox',
  ],
  authors: [{ name: 'BloxMind Team' }],
  creator: 'BloxMind',
  publisher: 'BloxMind',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
    other: [{ rel: 'mask-icon', url: '/icon.svg', color: '#1c1917' }],
  },
  appleWebApp: {
    capable: true,
    title: 'BloxMind',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'BloxMind - Create Roblox Games with AI for Free',
    description: 'Create Roblox games with AI for free. Generate maps, scripts, and 3D environments with BloxMind AI game generator.',
    url: 'https://bloxmindai.netlify.app',
    siteName: 'BloxMind',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BloxMind AI Roblox Game Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BloxMind - Create Roblox Games with AI for Free',
    description: 'Create Roblox games with AI for free. Generate maps, scripts, and 3D environments with BloxMind.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bloxmindai.netlify.app',
  },
  verification: {
    google: 'gX4YmSOyfvbnhIz7zCzguO2zVbadZ7Fn1mvbI7TN0sI',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: '#1c1917',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://bloxmindai.netlify.app/#organization',
                  name: 'BloxMind',
                  url: 'https://bloxmindai.netlify.app',
                  logo: 'https://bloxmindai.netlify.app/icon-512x512.png',
                  description:
                    'BloxMind is an AI Roblox game generator that creates maps, scripts, and 3D environments for Roblox Studio.',
                  sameAs: ['https://github.com/YUouriii/app-BloxMind-ai'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://bloxmindai.netlify.app/#website',
                  url: 'https://bloxmindai.netlify.app',
                  name: 'BloxMind',
                  publisher: {
                    '@id': 'https://bloxmindai.netlify.app/#organization',
                  },
                },
                {
                  '@type': 'WebApplication',
                  name: 'BloxMind',
                  url: 'https://bloxmindai.netlify.app',
                  applicationCategory: 'DeveloperApplication',
                  operatingSystem: 'Windows, macOS, Linux',
                  softwareVersion: '0.9.0',
                  description:
                    'Create Roblox games with AI for free. BloxMind is an AI Roblox game generator that creates maps, scripts, and 3D environments for Roblox Studio.',
                  featureList: [
                    'AI Roblox map generator',
                    'Luau script generator',
                    'Rojo live sync',
                    '25+ AI providers',
                    'Checkpoint Engine',
                    '1-click Roblox Studio setup',
                  ],
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                  },
                  publisher: {
                    '@id': 'https://bloxmindai.netlify.app/#organization',
                  },
                  keywords:
                    'create game with ai for free, create roblox games with ai, roblox ai game generator, bloxmind',
                },
              ],
            }),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
