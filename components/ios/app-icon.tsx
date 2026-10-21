import { Compass, MessageCircle, Phone, Settings } from 'lucide-react'
import type { AppId } from '@/lib/ios-data'

export const APP_LABELS: Record<AppId, string> = {
  bereal: 'BeReal.',
  instagram: 'Instagram',
  letterboxd: 'Letterboxd',
  coupang: 'Coupang Eats',
  discord: 'Discord',
  twitch: 'Twitch',
  youtube: 'YouTube',
  clock: 'Clock',
  notes: 'Notes',
  photos: 'Photos',
  settings: 'Settings',
  phone: 'Phone',
  safari: 'Safari',
  kakaotalk: 'KakaoTalk',
  spotify: 'Spotify',
}

function Mask({ src, color, size = '62%' }: { src: string; color: string; size?: string }) {
  return (
    <span
      aria-hidden
      className="block"
      style={{
        width: size,
        height: size,
        background: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

function Glyph({ id }: { id: AppId }) {
  switch (id) {
    case 'bereal':
      return <Mask src="/icons/bereal.svg" color="#fff" size="78%" />
    case 'instagram':
      return <Mask src="/icons/instagram.svg" color="#fff" />
    case 'letterboxd':
      return (
        <span className="flex items-center -space-x-1.5" aria-hidden>
          <span className="size-[30%] min-h-3 min-w-3 rounded-full bg-[#FF8000]" />
          <span className="z-10 size-[30%] min-h-3 min-w-3 rounded-full bg-[#00E054] mix-blend-screen" />
          <span className="size-[30%] min-h-3 min-w-3 rounded-full bg-[#40BCF4] mix-blend-screen" />
        </span>
      )
    case 'coupang':
      return (
        <span className="flex flex-col items-center leading-none" aria-hidden>
          <span className="text-[0.62em] font-black tracking-tight text-white">eats</span>
          <span className="mt-0.5 h-[3px] w-[60%] rounded-full bg-white/80" />
        </span>
      )
    case 'discord':
      return <Mask src="/icons/discord.svg" color="#fff" />
    case 'twitch':
      return <Mask src="/icons/twitch.svg" color="#fff" size="55%" />
    case 'youtube':
      return <Mask src="/icons/youtube.svg" color="#FF0033" size="66%" />
    case 'spotify':
      return <Mask src="/icons/spotify.svg" color="#1ED760" size="66%" />
    case 'safari':
      return <Compass aria-hidden className="size-[70%] text-white" strokeWidth={1.4} />
    case 'phone':
      return <Phone aria-hidden className="size-[52%] fill-white text-white" strokeWidth={0} />
    case 'settings':
      return <Settings aria-hidden className="size-[72%] text-[#3a3a3c]" strokeWidth={1.6} />
    case 'kakaotalk':
      return (
        <span className="relative flex size-full items-center justify-center" aria-hidden>
          <MessageCircle className="size-[74%] fill-[#3A1D1D] text-[#3A1D1D]" strokeWidth={0} />
          <span className="absolute text-[0.24em] font-black tracking-tight text-[#FEE500]">TALK</span>
        </span>
      )
    case 'clock':
      return (
        <span className="relative block size-[84%] rounded-full bg-white" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-[4%] left-1/2 h-[46%] w-px origin-bottom -translate-x-1/2"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <span className="block h-[14%] w-full bg-black/70" />
            </span>
          ))}
          <span className="absolute bottom-1/2 left-1/2 h-[28%] w-[6%] origin-bottom -translate-x-1/2 rotate-[300deg] rounded-full bg-black" />
          <span className="absolute bottom-1/2 left-1/2 h-[38%] w-[4%] origin-bottom -translate-x-1/2 rotate-[60deg] rounded-full bg-black" />
          <span className="absolute bottom-1/2 left-1/2 h-[42%] w-[2%] origin-bottom -translate-x-1/2 rotate-[200deg] bg-[#FF9F0A]" />
          <span className="absolute top-1/2 left-1/2 size-[8%] -translate-1/2 rounded-full bg-[#FF9F0A]" />
        </span>
      )
    case 'notes':
      return (
        <span className="flex size-full flex-col" aria-hidden>
          <span className="h-[26%] bg-gradient-to-b from-[#FFD52E] to-[#F8C100]" />
          <span className="flex flex-1 flex-col justify-evenly bg-[#F5F5F7] px-[12%] pb-[10%]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-px bg-[#c7c7cc]" />
            ))}
          </span>
        </span>
      )
    case 'photos':
      return (
        <span className="relative block size-[78%]" aria-hidden>
          {['#FF9F0A', '#FFD60A', '#30D158', '#64D2FF', '#0A84FF', '#BF5AF2', '#FF375F', '#FF453A'].map((c, i) => (
            <span
              key={c}
              className="absolute top-0 left-[33%] h-1/2 w-[34%] origin-bottom rounded-full opacity-85 mix-blend-multiply"
              style={{ background: c, transform: `rotate(${i * 45}deg)` }}
            />
          ))}
        </span>
      )
  }
}

const BG: Record<AppId, string> = {
  bereal: '#000',
  instagram: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
  letterboxd: '#14181C',
  coupang: 'linear-gradient(160deg, #3DD4F5, #00A9E8)',
  discord: '#5865F2',
  twitch: '#9146FF',
  youtube: '#fff',
  spotify: '#000',
  safari: 'linear-gradient(180deg, #4FB5FF, #1171F5)',
  phone: 'linear-gradient(180deg, #5BF675, #2CC94A)',
  settings: 'linear-gradient(180deg, #D1D1D6, #8E8E93)',
  kakaotalk: '#FEE500',
  clock: '#000',
  notes: '#fff',
  photos: '#fff',
}

export function AppIcon({ id, size = 62 }: { id: AppId; size?: number }) {
  return (
    <span
      className="relative flex items-center justify-center overflow-hidden rounded-[24%] shadow-[0_4px_14px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/10 ring-inset"
      style={{ width: size, height: size, background: BG[id], fontSize: size * 0.42 }}
    >
      <Glyph id={id} />
    </span>
  )
}
