import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Atelier Diamonds | Bespoke Diamond Jewellery',
  description:
    'Atelier Diamonds creates one-of-a-kind diamond pieces through custom cutting, curated sourcing, and artisanal craftsmanship. Where imagination takes form.',
  openGraph: {
    title: 'Atelier Diamonds',
    description: 'Where imagination takes form.',
    url: 'https://atelierdiamonds.com',
    siteName: 'Atelier Diamonds',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
