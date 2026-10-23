import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { publicAssetPath } from '@/lib/ios-data'
import './globals.css'

export const metadata: Metadata = {
  title: 'iPhone — iOS 26',
  description: 'An interactive iOS 26 iPhone experience in dark mode with KakaoTalk, Instagram, Spotify and more.',
  generator: 'v0.app',
  manifest: publicAssetPath('/manifest.webmanifest'),
  applicationName: 'iOS 26',
  appleWebApp: {
    capable: true,
    title: 'iOS 26',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      { url: publicAssetPath('/icon-light-32x32.png'), media: '(prefers-color-scheme: light)' },
      { url: publicAssetPath('/icon-dark-32x32.png'), media: '(prefers-color-scheme: dark)' },
      { url: publicAssetPath('/icon.svg'), type: 'image/svg+xml' },
    ],
    apple: publicAssetPath('/apple-icon.png'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
