'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { PhoneContext } from '@/lib/ios-context'
import { SONGS, type AppId } from '@/lib/ios-data'
import { HomeScreen } from './home-screen'
import { LockScreen } from './lock-screen'
import { HomeIndicator, StatusBar } from './status-bar'
import { BeRealApp } from './apps/bereal'
import { CameraApp } from './apps/camera'
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
  camera: CameraApp,
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
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = SONGS[0].src
    audio.load()
  }, [])

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
      audioError,
      currentTime,
      duration,
      playSong: (i: number) => {
        const audio = audioRef.current
        setSongIndex(i)
        setAudioError(false)
        setCurrentTime(0)
        setDuration(0)
        if (!audio) return
        audio.pause()
        audio.src = SONGS[i].src
        audio.load()
        void audio.play().catch(() => {
          setPlaying(false)
        })
      },
      togglePlay: () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
          void audio.play().catch(() => {
            setPlaying(false)
          })
        } else {
          audio.pause()
        }
      },
      seekTo: (time: number) => {
        if (audioRef.current) audioRef.current.currentTime = time
      },
    }),
    [songIndex, playing, audioError, currentTime, duration],
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
        <StatusBar hideTime={locked} dark={app === 'kakaotalk'} />
        {!locked && <HomeIndicator onClick={() => setApp(null)} dark={app === 'kakaotalk'} />}
        <audio
          ref={audioRef}
          preload="metadata"
          onPlaying={() => setAudioError(false)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onError={() => {
            setPlaying(false)
            setAudioError(true)
          }}
          className="hidden"
        />
      </div>
    </PhoneContext.Provider>
  )
}
