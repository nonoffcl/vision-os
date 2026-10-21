'use client'

import { useState } from 'react'
import { BookOpen, ChevronLeft, Copy, Ellipsis, Mic, Search, Shield } from 'lucide-react'
import { AppScreen, GlassButton, ScrollArea } from '../primitives'

const FAVORITES = [
  { name: 'Naver', color: '#03C75A', letter: 'N' },
  { name: 'Apple', color: '#1c1c1e', letter: '' },
  { name: 'Coupang', color: '#E52528', letter: 'C' },
  { name: 'Musinsa', color: '#000', letter: 'M' },
  { name: 'Wikipedia', color: '#fff', letter: 'W', dark: true },
  { name: 'Letterboxd', color: '#14181C', letter: '•••' },
  { name: 'Netflix', color: '#000', letter: 'N', red: true },
  { name: 'GitHub', color: '#24292f', letter: 'G' },
]

export function SafariApp() {
  const [query, setQuery] = useState('')
  return (
    <AppScreen bg="#1c1c1e">
      <ScrollArea className="px-5 pt-[70px] pb-36">
        <h1 className="text-[22px] font-bold">Favorites</h1>
        <ul className="mt-3 grid grid-cols-4 gap-y-5">
          {FAVORITES.map((f) => (
            <li key={f.name} className="flex flex-col items-center gap-1.5">
              <span
                className="flex size-[62px] items-center justify-center rounded-[14px] text-[24px] font-bold"
                style={{ background: f.color, color: f.red ? '#E50914' : f.dark ? '#000' : '#fff' }}
              >
                {f.letter || ''}
              </span>
              <span className="text-[12px] text-white/80">{f.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 text-[22px] font-bold">Privacy Report</h2>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4">
          <Shield className="size-7 text-white/80" aria-hidden />
          <p className="text-[15px] text-white/80">
            In the last seven days, Safari has prevented <b className="text-white">48 trackers</b> from profiling you.
          </p>
        </div>

        <h2 className="mt-8 text-[22px] font-bold">Reading List</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {['Best cafes in Seongsu 2026', 'How to shoot film in low light', 'Jeju 3-day itinerary'].map((t) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
              <BookOpen className="size-5 text-[#0A84FF]" aria-hidden />
              <span className="text-[15px]">{t}</span>
            </li>
          ))}
        </ul>
      </ScrollArea>

      <div className="absolute inset-x-3 bottom-8 flex items-center gap-2">
        <GlassButton icon={ChevronLeft} label="Back" />
        <form onSubmit={(e) => e.preventDefault()} className="glass flex h-12 flex-1 items-center gap-2 rounded-full px-4">
          <Search className="size-4 text-white/60" aria-hidden />
          <label htmlFor="safari-q" className="sr-only">
            Search or enter website
          </label>
          <input
            id="safari-q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or enter website"
            className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-white/55"
          />
          <Mic className="size-4 text-white/60" aria-hidden />
        </form>
        <GlassButton icon={Copy} label="Tabs" />
        <GlassButton icon={Ellipsis} label="More" />
      </div>
    </AppScreen>
  )
}
