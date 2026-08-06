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
    default: 'BloxMind - Build Roblox Maps with AI | AI Roblox Generator',
    template: '%s · BloxMind',
  },
  description:
    'BloxMind is the ultimate AI tool to build Roblox maps, scripts, and 3D environments effortlessly with artificial intelligence.',
  generator: 'v0.app',
  applicationName: 'BloxMind',
  keywords: [
    'BloxMind',
    'bloxmind ai',
    'build roblox map with ai',
    'roblox ai studio',
    'ai roblox generator',
    'roblox map creator ai',
    'roblox studio ai',
  ],
  authors: [{ name: 'BloxMind Team' }],
  creator: 'BloxMind',
  publisher: 'BloxMind',
  icons: {
    icon: '/Gemini_Generated_Image_83425d83425d8342-removebg-preview.png',
    apple: '/Gemini_Generated_Image_83425d83425d8342-removebg-preview.png',
  },
  openGraph: {
    title: 'BloxMind - Build Roblox Maps with AI',
    description: 'Create and generate Roblox maps using AI in seconds with BloxMind.',
    url: 'https://bloxmind.ai',
    siteName: 'BloxMind',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'BloxMind AI Roblox Map Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BloxMind - Build Roblox Maps with AI',
    description: 'Create and generate Roblox maps using AI in seconds with BloxMind.',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
