import { publicAssetPath, type AppId } from '@/lib/ios-data'

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
  camera: 'Camera',
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
      return <Mask src={publicAssetPath('/icons/bereal.svg')} color="#fff" size="78%" />
    case 'instagram':
      return <img src="https://play-lh.googleusercontent.com/yHi59jmO_lVamcyJ1i3rM1_E8bAiAspShnGjjURq05ipQQSUksO3QVEsXTegRSqul038-4YNA7O644XAcx251Q" alt="" className="size-full object-cover" />
    case 'letterboxd':
      return (
        <span className="flex items-center -space-x-1.5" aria-hidden>
          <span className="size-[30%] min-h-3 min-w-3 rounded-full bg-[#FF8000]" />
          <span className="z-10 size-[30%] min-h-3 min-w-3 rounded-full bg-[#00E054] mix-blend-screen" />
          <span className="size-[30%] min-h-3 min-w-3 rounded-full bg-[#40BCF4] mix-blend-screen" />
        </span>
      )
    case 'coupang':
      return <img src="https://play-lh.googleusercontent.com/CBkhhaayZnh_KbjEcNjUwicICY8BPhzkpM_FTEinbFTPuE8L4ptnYBNCKjbTw6f34KSgvKyhI99BclOkhy0R" alt="" className="size-full object-cover" />
    case 'discord':
      return <Mask src={publicAssetPath('/icons/discord.svg')} color="#fff" />
    case 'twitch':
      return <Mask src={publicAssetPath('/icons/twitch.svg')} color="#fff" size="55%" />
    case 'youtube':
      return <Mask src={publicAssetPath('/icons/youtube.svg')} color="#FF0033" size="66%" />
    case 'spotify':
      return <Mask src={publicAssetPath('/icons/spotify.svg')} color="#1ED760" size="66%" />
    case 'safari':
      return <img src="https://ipcdn-web.apple.com/assets/v2/web/c6d93db1-d714-47ae-a19b-0ffd7095280e" alt="" className="size-full object-cover" />
    case 'phone':
      return <img src="https://help.apple.com/assets/69022D37F8883CCD0800AD11/69022D39A66C612A5405F6B8/en_US/abf196bfb9b2a65bd64ed7ad0bfdb333.png" alt="" className="size-full object-cover" />
    case 'settings':
      return <img src="https://cdn.iconscout.com/icon/free/png-256/free-apple-settings-icon-svg-download-png-493162.png?f=webp" alt="" className="size-full object-cover" />
    case 'kakaotalk':
      return <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" alt="" className="size-full object-contain p-1" />
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
      return <img src="https://play-lh.googleusercontent.com/c38n8qhzFrfe621ksvaatXnrciFwwipWOrdMrfrujdqZo5OSLHfeakicVrDMNj5YdJBnJVQ84QXTHaOuQccz" alt="" className="size-full object-cover" />
    case 'camera':
      return (
        <span className="block size-full bg-[#D2D3D5]">
          <img
            src="https://i.redd.it/0cp237gqve3h1.png"
            alt=""
            className="size-full rounded-[24%] bg-[#D2D3D5] object-cover opacity-100"
          />
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
  coupang: '#FFFFFF',
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
  camera: '#D2D3D5',
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
