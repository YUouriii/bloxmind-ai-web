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
  metadataBase: new URL('https://bloxmind.ai'),
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
    icon: '/Gemini_Generated_Image_83425d83425d8342-removebg-preview.png',
    apple: '/Gemini_Generated_Image_83425d83425d8342-removebg-preview.png',
  },
  openGraph: {
    title: 'BloxMind - Create Roblox Games with AI for Free',
    description: 'Create Roblox games with AI for free. Generate maps, scripts, and 3D environments with BloxMind AI game generator.',
    url: 'https://bloxmind.ai',
    siteName: 'BloxMind',
    images: [
      {
        url: '/icon.svg',
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
    images: ['/icon.svg'],
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
    canonical: 'https://bloxmind.ai',
  },
  verification: {
    google: 'gX4YmSOyfvbnhIz7zCzguO2zVbadZ7Fn1mvbI7TN0sI',
  },
}

export const viewport: Viewport = {
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
              '@type': 'WebApplication',
              name: 'BloxMind',
              url: 'https://bloxmind.ai',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Windows, macOS, Linux',
              description:
                'Create Roblox games with AI for free. BloxMind is an AI Roblox game generator that creates maps, scripts, and 3D environments for Roblox Studio.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1200',
              },
              author: {
                '@type': 'Organization',
                name: 'BloxMind Team',
              },
              publisher: {
                '@type': 'Organization',
                name: 'BloxMind',
              },
              keywords:
                'create game with ai for free, create roblox games with ai, roblox ai game generator, bloxmind',
            }),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
