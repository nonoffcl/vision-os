'use client'

import { useState } from 'react'
import { Bell, Cast, Ellipsis, Home, Library, PlusCircle, Search, Zap } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const CHIPS = ['All', 'K-pop', 'Mukbang', 'Vlogs', 'Gaming', 'Music', 'Live', 'Film']

const VIDEOS = [
  { title: 'A Day in Seoul ☔ rainy cafe hopping in Seongsu-dong', channel: 'Seoul Diaries', meta: '1.2M views · 3 days ago', dur: '18:42', img: photo(0) },
  { title: 'HUNTR/X "Golden" Dance Practice (Mirrored)', channel: 'K-Dance Lab', meta: '8.4M views · 2 weeks ago', dur: '3:21', img: photo(3) },
  { title: 'Korean Fried Chicken Tier List 🍗 (we tried 12 brands)', channel: 'Eat with Jun', meta: '640K views · 5 days ago', dur: '24:10', img: photo(5) },
  { title: 'Jeju Island travel guide 2026 — everything you need', channel: 'Wander KR', meta: '312K views · 1 month ago', dur: '31:05', img: photo(4) },
  { title: 'Hiking Bukhansan in autumn 🍁 4K', channel: 'Trail Seoul', meta: '98K views · 1 week ago', dur: '12:47', img: photo(7) },
]

export function YouTubeApp() {
  const [chip, setChip] = useState('All')
  return (
    <AppScreen bg="#0F0F0F">
      <header className="flex items-center justify-between px-3 pt-[58px] pb-2">
        <span className="flex items-center gap-1">
          <span
            aria-hidden
            className="h-6 w-8"
            style={{ background: '#FF0033', WebkitMaskImage: 'url(/icons/youtube.svg)', maskImage: 'url(/icons/youtube.svg)', WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
          />
          <span className="text-[20px] font-bold tracking-tighter">YouTube</span>
          <span className="sr-only">Home</span>
        </span>
        <span className="flex items-center gap-5">
          <Cast className="size-6" aria-hidden />
          <Bell className="size-6" aria-hidden />
          <Search className="size-6" aria-hidden />
        </span>
      </header>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-3">
        {CHIPS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChip(c)}
            className={cn('shrink-0 rounded-lg px-3 py-1.5 text-[14px] font-medium', chip === c ? 'bg-white text-black' : 'bg-white/10')}
          >
            {c}
          </button>
        ))}
      </div>
      <ScrollArea className="pb-28">
        {VIDEOS.slice(0, 2).map((v) => (
          <Video key={v.title} v={v} />
        ))}
        <section className="py-3">
          <h2 className="flex items-center gap-2 px-3 pb-2 text-[18px] font-bold">
            <Zap className="size-5 fill-[#FF0033] text-[#FF0033]" aria-hidden /> Shorts
          </h2>
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-3">
            {[6, 1, 2, 3].map((p, i) => (
              <li key={p} className="relative w-[150px] shrink-0">
                <img src={photo(p) || '/placeholder.svg'} alt="" className="aspect-[9/16] w-full rounded-xl object-cover" />
                <p className="absolute right-2 bottom-6 left-2 line-clamp-2 text-[13px] font-semibold drop-shadow">
                  {['my cat vs. the rain', 'best croissant in seoul?', 'han river picnic essentials', 'concert POV 🎤'][i]}
                </p>
                <p className="absolute bottom-2 left-2 text-[11px] drop-shadow">{['2.1M', '890K', '412K', '3.3M'][i]} views</p>
              </li>
            ))}
          </ul>
        </section>
        {VIDEOS.slice(2).map((v) => (
          <Video key={v.title} v={v} />
        ))}
      </ScrollArea>
      <nav className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-white/10 bg-[#0F0F0F] pt-2 pb-8 text-[10px]">
        <span className="flex flex-col items-center gap-0.5">
          <Home className="size-6 fill-white" aria-hidden />
          Home
        </span>
        <span className="flex flex-col items-center gap-0.5 text-white/70">
          <Zap className="size-6" aria-hidden />
          Shorts
        </span>
        <PlusCircle className="size-9 text-white/80" strokeWidth={1.2} aria-hidden />
        <span className="flex flex-col items-center gap-0.5 text-white/70">
          <Library className="size-6" aria-hidden />
          Subscriptions
        </span>
        <span className="flex flex-col items-center gap-0.5 text-white/70">
          <Avatar name="Minji Park" src={photo(4)} size={24} />
          You
        </span>
      </nav>
    </AppScreen>
  )
}

function Video({ v }: { v: (typeof VIDEOS)[number] }) {
  return (
    <article className="pb-4">
      <div className="relative">
        <img src={v.img || '/placeholder.svg'} alt="" className="aspect-video w-full object-cover" />
        <span className="absolute right-2 bottom-2 rounded bg-black/80 px-1 text-[12px] font-medium">{v.dur}</span>
      </div>
      <div className="flex gap-3 px-3 pt-2.5">
        <Avatar name={v.channel} size={36} />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[15px] leading-snug font-medium">{v.title}</p>
          <p className="mt-0.5 text-[12px] text-white/55">
            {v.channel} · {v.meta}
          </p>
        </div>
        <Ellipsis className="size-5 rotate-90 text-white/70" aria-hidden />
      </div>
    </article>
  )
}
