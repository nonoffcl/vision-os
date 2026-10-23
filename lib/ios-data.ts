export type AppId =
  | 'bereal'
  | 'instagram'
  | 'letterboxd'
  | 'coupang'
  | 'discord'
  | 'twitch'
  | 'youtube'
  | 'clock'
  | 'notes'
  | 'camera'
  | 'photos'
  | 'settings'
  | 'phone'
  | 'safari'
  | 'kakaotalk'
  | 'spotify'

export const USER = {
  name: 'Minji Park',
  firstName: 'Minji',
  handle: 'minji.prk',
  appleId: 'minji.park@icloud.com',
  status: 'today was a good day ☁️',
}

export const publicAssetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

export const PHOTOS = [
  publicAssetPath('/images/651f54e5751642541664f670d342c312.jpg'),
  publicAssetPath('/images/p2.png'),
  publicAssetPath('/images/p3.png'),
  publicAssetPath('/images/p4.png'),
  publicAssetPath('/images/p5.png'),
  publicAssetPath('/images/p6.png'),
  publicAssetPath('/images/p7.png'),
  publicAssetPath('/images/p8.png'),
]

export const photo = (i: number) => PHOTOS[((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length]

export type Song = { title: string; artist: string; duration: string; cover: string; src: string }

export const SONGS: Song[] = [
  {
    title: 'Slow Dancing',
    artist: 'V',
    duration: '3:07',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/93/51/e0/9351e0b4-a565-4232-d797-f60ca3aba82f/196922580031_Cover.jpg/600x600bb.jpg',
    src: publicAssetPath("/audio/V%20(%E1%84%87%E1%85%B1)%20'Slow%20Dancing'%20Official%20Audio.mp3"),
  },
  {
    title: 'Hearing Damage',
    artist: 'Thom Yorke',
    duration: '5:03',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/9e/11/29/9e11294a-6f89-55a7-d870-035817c65014/191404102060.png/600x600bb.jpg',
    src: publicAssetPath('/audio/Hearing%20Damage.mp3'),
  },
  {
    title: 'There Is a Light That Never Goes Out',
    artist: 'The Smiths',
    duration: '4:04',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/e8/70/1ae870c3-b402-096b-c4c4-8022af5a2ed9/745099189662.jpg/600x600bb.jpg',
    src: publicAssetPath('/audio/The%20Smiths%20-%20There%20Is%20A%20Light%20That%20Never%20Goes%20Out%20(Official%20Audio).mp3'),
  },
  {
    title: "Jack's Flying Theme",
    artist: 'Jack and the Bear',
    duration: '4:38',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/1a/c7/13/1ac71336-2419-a895-53d1-1e32f1951ebd/artwork.jpg/600x600bb.jpg',
    src: publicAssetPath("/audio/Jack's%20Flying%20Theme.mp3"),
  },
  {
    title: 'Bitter Sweet Symphony',
    artist: 'The Verve',
    duration: '5:57',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5c/b1/85/5cb18512-9cbd-7b84-4042-37f23bc2ae45/17UMGIM89555.rgb.jpg/600x600bb.jpg',
    src: publicAssetPath('/audio/Bitter%20Sweet%20Symphony%20(Remastered%202016).mp3'),
  },
  {
    title: 'Song 2',
    artist: 'Blur',
    duration: '2:01',
    cover: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ed/73/cc/ed73cc61-8244-4f45-90fc-23ad8a3ee7e4/5099997227359.jpg/600x600bb.jpg',
    src: publicAssetPath('/audio/Song%202.mp3'),
  },
]

export function hueFromString(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
}
