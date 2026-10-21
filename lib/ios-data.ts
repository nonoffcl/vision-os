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

export const PHOTOS = [
  '/images/p1.png',
  '/images/p2.png',
  '/images/p3.png',
  '/images/p4.png',
  '/images/p5.png',
  '/images/p6.png',
  '/images/p7.png',
  '/images/p8.png',
]

export const photo = (i: number) => PHOTOS[((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length]

export type Song = { title: string; artist: string; duration: string; cover: string }

export const SONGS: Song[] = [
  { title: 'Golden', artist: 'HUNTR/X, EJAE, AUDREY NUNA', duration: '3:14', cover: photo(3) },
  { title: 'APT.', artist: 'ROSÉ, Bruno Mars', duration: '2:49', cover: photo(0) },
  { title: 'Supernova', artist: 'aespa', duration: '2:58', cover: photo(7) },
  { title: 'Ditto', artist: 'NewJeans', duration: '3:05', cover: photo(4) },
  { title: 'Die With A Smile', artist: 'Lady Gaga, Bruno Mars', duration: '4:11', cover: photo(2) },
  { title: 'Love wins all', artist: 'IU', duration: '4:31', cover: photo(6) },
  { title: 'Espresso', artist: 'Sabrina Carpenter', duration: '2:55', cover: photo(1) },
  { title: 'Magnetic', artist: 'ILLIT', duration: '2:40', cover: photo(5) },
  { title: 'BIRDS OF A FEATHER', artist: 'Billie Eilish', duration: '3:30', cover: photo(4) },
  { title: 'Whiplash', artist: 'aespa', duration: '3:03', cover: photo(0) },
  { title: 'Soda Pop', artist: 'Saja Boys', duration: '2:30', cover: photo(3) },
  { title: 'How Sweet', artist: 'NewJeans', duration: '3:39', cover: photo(6) },
  { title: 'Seven (feat. Latto)', artist: 'Jung Kook', duration: '3:04', cover: photo(7) },
  { title: 'Drama', artist: 'aespa', duration: '3:34', cover: photo(2) },
  { title: 'Super Shy', artist: 'NewJeans', duration: '2:34', cover: photo(1) },
]

export function hueFromString(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
}
