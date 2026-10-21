'use client'

import { ArrowDown, Ellipsis, Heart, Pause, Play, Shuffle } from 'lucide-react'
import { usePhone } from '@/lib/ios-context'
import { SONGS } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, ScrollArea } from '../primitives'

export function SpotifyApp() {
  const { songIndex, playing, playSong, togglePlay } = usePhone()
  const current = SONGS[songIndex]

  return (
    <AppScreen bg="#121212">
      <ScrollArea className="pb-40">
        <div className="bg-gradient-to-b from-[#5038A0] via-[#2a1f55] to-[#121212] px-4 pt-[70px] pb-4">
          <div className="mx-auto flex size-[200px] items-center justify-center rounded-md bg-gradient-to-br from-[#450AF5] to-[#C4EFD9] shadow-2xl">
            <Heart className="size-20 fill-white text-white" aria-hidden />
          </div>
          <h1 className="mt-6 text-[26px] font-bold">Liked Songs</h1>
          <p className="mt-1 text-[13px] text-white/65">{SONGS.length} songs</p>
          <div className="mt-3 flex items-center gap-5">
            <ArrowDown className="size-6 rounded-full border-2 border-white/60 p-0.5 text-white/70" aria-hidden />
            <Ellipsis className="size-6 text-white/70" aria-hidden />
            <Shuffle className="ml-auto size-6 text-[#1ED760]" aria-hidden />
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex size-14 items-center justify-center rounded-full bg-[#1ED760] text-black transition active:scale-95"
            >
              {playing ? <Pause className="size-6 fill-black" /> : <Play className="ml-1 size-6 fill-black" />}
            </button>
          </div>
        </div>

        <ol className="px-4">
          {SONGS.map((s, i) => {
            const active = i === songIndex
            return (
              <li key={s.title}>
                <button type="button" onClick={() => playSong(i)} className="flex w-full items-center gap-3 py-2 text-left active:opacity-70">
                  <img src={s.cover || '/placeholder.svg'} alt="" className="size-12 rounded object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className={cn('flex items-center gap-1.5 truncate text-[16px]', active && 'text-[#1ED760]')}>
                      {active && playing && <Equalizer />}
                      <span className="truncate">{s.title}</span>
                    </span>
                    <span className="block truncate text-[13px] text-white/60">{s.artist}</span>
                  </span>
                  <span className="text-[13px] text-white/45 tabular-nums">{s.duration}</span>
                  <Ellipsis className="size-5 text-white/60" aria-hidden />
                </button>
              </li>
            )
          })}
        </ol>
      </ScrollArea>

      <div className="absolute inset-x-2 bottom-8 z-20 overflow-hidden rounded-xl bg-[#3b2a6b]/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3 p-2">
          <img src={current.cover || '/placeholder.svg'} alt="" className="size-10 rounded object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold">{current.title}</p>
            <p className="truncate text-[12px] text-white/65">{current.artist}</p>
          </div>
          <Heart className="size-6 fill-[#1ED760] text-[#1ED760]" aria-hidden />
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} className="p-1">
            {playing ? <Pause className="size-6 fill-white" /> : <Play className="size-6 fill-white" />}
          </button>
        </div>
        <div className="mx-2 mb-1 h-[2px] rounded-full bg-white/20">
          <div className="h-full w-[38%] rounded-full bg-white" />
        </div>
      </div>
    </AppScreen>
  )
}

function Equalizer() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-label="Now playing">
      {[0, 150, 300].map((d) => (
        <span key={d} className="w-[3px] animate-pulse rounded-sm bg-[#1ED760]" style={{ height: `${50 + d / 10}%`, animationDelay: `${d}ms` }} />
      ))}
    </span>
  )
}
