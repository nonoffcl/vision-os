'use client'

import { Pause, Play } from 'lucide-react'
import { usePhone, useNow } from '@/lib/ios-context'
import { SONGS } from '@/lib/ios-data'

export function SpotifyWidget() {
  const { openApp, songIndex, playing, togglePlay } = usePhone()
  const song = SONGS[songIndex]
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative size-[158px] overflow-hidden rounded-[24px] shadow-xl ring-1 ring-white/10">
        <button type="button" onClick={() => openApp('spotify')} className="absolute inset-0" aria-label={`Open Spotify. Now playing ${song.title} by ${song.artist}`}>
          <img src={song.cover || '/placeholder.svg'} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-xl" />
          <span className="absolute inset-0 bg-black/45" />
          <span className="relative flex h-full flex-col p-3 text-left">
            <span className="flex items-start justify-between">
              <img src={song.cover || '/placeholder.svg'} alt="" className="size-[62px] rounded-lg object-cover shadow-lg" />
              <span
                aria-hidden
                className="size-5"
                style={{
                  background: '#1ED760',
                  WebkitMaskImage: 'url(/icons/spotify.svg)',
                  maskImage: 'url(/icons/spotify.svg)',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                }}
              />
            </span>
            <span className="mt-auto pr-9">
              <span className="block truncate text-[14px] leading-tight font-semibold text-white">{song.title}</span>
              <span className="block truncate text-[12px] text-white/70">{song.artist}</span>
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          className="absolute right-3 bottom-3 z-10 flex size-8 items-center justify-center rounded-full bg-white text-black"
        >
          {playing ? <Pause className="size-4 fill-black" /> : <Play className="ml-0.5 size-4 fill-black" />}
        </button>
      </div>
      <span className="text-[12px] font-medium text-white">Spotify</span>
    </div>
  )
}

export function CalendarWidget() {
  const now = useNow(60_000)
  const weekday = now ? now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase() : 'WEDNESDAY'
  const day = now ? now.getDate() : 21
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex size-[158px] flex-col rounded-[24px] bg-[#1c1c1e] p-3.5 shadow-xl ring-1 ring-white/10">
        <span className="text-[11px] font-bold tracking-wide text-[#FF453A]">{weekday}</span>
        <span className="text-[44px] leading-none font-light text-white">{day}</span>
        <span className="mt-auto flex gap-2">
          <span className="w-[3px] rounded-full bg-[#BF5AF2]" />
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-white">Movie night 🎬</span>
            <span className="block text-[12px] text-white/55">8:00 – 10:30 PM</span>
          </span>
        </span>
        <span className="mt-1.5 flex gap-2">
          <span className="w-[3px] rounded-full bg-[#30D158]" />
          <span className="block truncate text-[13px] font-semibold text-white/80">Jisoo&apos;s birthday</span>
        </span>
      </div>
      <span className="text-[12px] font-medium text-white">Calendar</span>
    </div>
  )
}
