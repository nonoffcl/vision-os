import type { MetadataRoute } from 'next'
import { publicAssetPath } from '@/lib/ios-data'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: publicAssetPath('/'),
    name: 'iPhone — iOS 26',
    short_name: 'iOS 26',
    description: 'An interactive iOS 26 iPhone experience.',
    start_url: publicAssetPath('/'),
    scope: publicAssetPath('/'),
    display: 'standalone',
    display_override: ['fullscreen', 'standalone'],
    orientation: 'portrait',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: publicAssetPath('/apple-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
