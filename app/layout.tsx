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
    default: 'BloxMind — Build Roblox Games at the Speed of Thought',
    template: '%s · BloxMind',
  },
  description:
    'The context-aware desktop AI agent integrated directly with Roblox Studio and Rojo live sync. Code, debug, and orchestrate project mechanics using natural language.',
  generator: 'v0.app',
  applicationName: 'BloxMind',
  keywords: [
    'BloxMind',
    'Roblox',
    'Roblox Studio',
    'AI coding assistant',
    'Luau',
    'Rojo',
    'MCP',
    'AI game development',
    'Roblox AI',
  ],
  authors: [{ name: 'BloxMind' }],
  creator: 'BloxMind',
  publisher: 'BloxMind',
  icons: {
    icon: '/Gemini_Generated_Image_83425d83425d8342.png',
    apple: '/Gemini_Generated_Image_83425d83425d8342.png',
  },
  openGraph: {
    title: 'BloxMind — Build Roblox Games at the Speed of Thought',
    description:
      'A context-aware desktop AI agent for Roblox Studio with Rojo live sync, tool execution, and checkpoints.',
    type: 'website',
    locale: 'en_US',
    url: 'https://bloxmind.ai',
    siteName: 'BloxMind',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'BloxMind logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'BloxMind — Build Roblox Games at the Speed of Thought',
    description:
      'A context-aware desktop AI agent for Roblox Studio with Rojo live sync, tool execution, and checkpoints.',
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
