'use client'

import { useMemo, useState } from 'react'
import { PhoneContext } from '@/lib/ios-context'
import type { AppId } from '@/lib/ios-data'
import { HomeScreen } from './home-screen'
import { LockScreen } from './lock-screen'
import { HomeIndicator, StatusBar } from './status-bar'
import { BeRealApp } from './apps/bereal'
import { ClockApp } from './apps/clock'
import { CoupangApp } from './apps/coupang'
import { DiscordApp } from './apps/discord'
import { InstagramApp } from './apps/instagram'
import { KakaoTalkApp } from './apps/kakaotalk'
import { LetterboxdApp } from './apps/letterboxd'
import { NotesApp } from './apps/notes'
import { PhoneApp } from './apps/phone-app'
import { PhotosApp } from './apps/photos'
import { SafariApp } from './apps/safari'
import { SettingsApp } from './apps/settings'
import { SpotifyApp } from './apps/spotify'
import { TwitchApp } from './apps/twitch'
import { YouTubeApp } from './apps/youtube'

const APPS: Record<AppId, () => React.JSX.Element> = {
  bereal: BeRealApp,
  instagram: InstagramApp,
  letterboxd: LetterboxdApp,
  coupang: CoupangApp,
  discord: DiscordApp,
  twitch: TwitchApp,
  youtube: YouTubeApp,
  clock: ClockApp,
  notes: NotesApp,
  photos: PhotosApp,
  settings: SettingsApp,
  phone: PhoneApp,
  safari: SafariApp,
  kakaotalk: KakaoTalkApp,
  spotify: SpotifyApp,
}

export function Phone() {
  const [locked, setLocked] = useState(true)
  const [app, setApp] = useState<AppId | null>(null)
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const ctx = useMemo(
    () => ({
      openApp: (id: AppId) => setApp(id),
      goHome: () => setApp(null),
      lock: () => {
        setApp(null)
        setLocked(true)
      },
      songIndex,
      playing,
      playSong: (i: number) => {
        setSongIndex(i)
        setPlaying(true)
      },
      togglePlay: () => setPlaying((p) => !p),
    }),
    [songIndex, playing],
  )

  const ActiveApp = app ? APPS[app] : null

  return (
    <PhoneContext.Provider value={ctx}>
      <div className="relative h-dvh w-full overflow-hidden bg-black sm:h-[min(852px,calc(100dvh-32px))] sm:w-[393px] sm:rounded-[55px] sm:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_120px_rgba(0,0,0,0.8)]">
        <HomeScreen />
        {ActiveApp && (
          <div key={app} className="absolute inset-0 z-20 animate-in fade-in zoom-in-75 duration-300 ease-out">
            <ActiveApp />
          </div>
        )}
        {locked && <LockScreen onUnlock={() => setLocked(false)} />}
        <StatusBar hideTime={locked} />
        {!locked && <HomeIndicator onClick={() => setApp(null)} />}
      </div>
    </PhoneContext.Provider>
  )
}
