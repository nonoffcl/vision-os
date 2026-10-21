'use client'

import { useState } from 'react'
import { Heart, Menu, Search, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const FILMS = [
  { title: 'Past Lives', year: 2023, colors: ['#1d3b53', '#c98b5b'] },
  { title: 'Decision to Leave', year: 2022, colors: ['#0f3d3e', '#7fb7a4'] },
  { title: 'Parasite', year: 2019, colors: ['#222', '#6b6b6b'] },
  { title: 'Aftersun', year: 2022, colors: ['#1e4f7a', '#e8b07a'] },
  { title: 'Perfect Days', year: 2023, colors: ['#2f4b2f', '#c9d6a3'] },
  { title: 'The Handmaiden', year: 2016, colors: ['#3b1020', '#c76a7a'] },
  { title: 'Burning', year: 2018, colors: ['#4a1d0a', '#f08a3a'] },
  { title: 'Oldboy', year: 2003, colors: ['#1a1a2e', '#7c3aed'] },
]

const REVIEWS = [
  { user: 'jisoo.kim', film: 0, rating: 5, liked: true, text: 'cried for 3 business days. in-yun is real and it ruined me 😭' },
  { user: 'dohyun.lee', film: 6, rating: 4.5, liked: false, text: 'that greenhouse scene… still thinking about it' },
  { user: 'haneul_ee', film: 4, rating: 4, liked: true, text: 'wanted to quit my job and clean toilets in tokyo afterwards' },
  { user: 'yuna.choi', film: 1, rating: 5, liked: true, text: 'park chan-wook you will always be famous' },
]

function Poster({ i, className }: { i: number; className?: string }) {
  const f = FILMS[i % FILMS.length]
  return (
    <div
      className={cn('flex aspect-[2/3] flex-col justify-end overflow-hidden rounded-md p-2 ring-1 ring-white/10', className)}
      style={{ background: `linear-gradient(160deg, ${f.colors[0]}, ${f.colors[1]})` }}
      role="img"
      aria-label={`${f.title} poster`}
    >
      <p className="text-[11px] leading-tight font-bold text-white drop-shadow">{f.title}</p>
      <p className="text-[9px] text-white/70">{f.year}</p>
    </div>
  )
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center" aria-label={`${value} stars`}>
      {Array.from({ length: Math.floor(value) }).map((_, i) => (
        <Star key={i} className="size-3 fill-[#00E054] text-[#00E054]" />
      ))}
      {value % 1 ? <span className="text-[11px] font-bold text-[#00E054]">½</span> : null}
    </span>
  )
}

export function LetterboxdApp() {
  const [tab, setTab] = useState('Films')
  return (
    <AppScreen bg="#14181C">
      <header className="flex items-center justify-between px-4 pt-[58px] pb-2">
        <Menu className="size-6 text-[#9ab]" aria-hidden />
        <span className="flex items-center gap-1.5">
          <span className="flex -space-x-1">
            <span className="size-3.5 rounded-full bg-[#FF8000]" />
            <span className="size-3.5 rounded-full bg-[#00E054] mix-blend-screen" />
            <span className="size-3.5 rounded-full bg-[#40BCF4] mix-blend-screen" />
          </span>
          <span className="text-[19px] font-bold tracking-tight">Letterboxd</span>
        </span>
        <Search className="size-6 text-[#9ab]" aria-hidden />
      </header>
      <nav className="flex justify-around border-b border-white/10 text-[14px] font-semibold">
        {['Films', 'Reviews', 'Lists', 'Journal'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn('border-b-2 px-2 py-2.5', tab === t ? 'border-[#00E054] text-white' : 'border-transparent text-[#9ab]')}
          >
            {t}
          </button>
        ))}
      </nav>
      <ScrollArea className="pb-10">
        <section className="px-4 pt-4">
          <h2 className="mb-2 text-[13px] font-semibold tracking-wide text-[#9ab] uppercase">Popular this week</h2>
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4">
            {FILMS.map((_, i) => (
              <Poster key={i} i={i} className="w-[100px] shrink-0" />
            ))}
          </div>
        </section>
        <section className="px-4 pt-5">
          <h2 className="mb-2 text-[13px] font-semibold tracking-wide text-[#9ab] uppercase">New from friends</h2>
          <div className="grid grid-cols-4 gap-2">
            {REVIEWS.map((r) => (
              <div key={r.user}>
                <Poster i={r.film} />
                <div className="mt-1 flex items-center gap-1">
                  <Avatar name={r.user} size={14} />
                  <Stars value={r.rating} />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="px-4 pt-6">
          <h2 className="mb-2 text-[13px] font-semibold tracking-wide text-[#9ab] uppercase">Popular reviews with friends</h2>
          <ul className="divide-y divide-white/10">
            {REVIEWS.map((r) => (
              <li key={r.user} className="flex gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold">
                    {FILMS[r.film].title} <span className="font-normal text-[#9ab]">{FILMS[r.film].year}</span>
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[#9ab]">
                    <Avatar name={r.user} size={16} />
                    {r.user}
                    <Stars value={r.rating} />
                    {r.liked && <Heart className="size-3 fill-[#FF8000] text-[#FF8000]" aria-label="Liked" />}
                  </p>
                  <p className="mt-1.5 text-[14px] text-white/85">{r.text}</p>
                </div>
                <Poster i={r.film} className="w-[60px] shrink-0 self-start" />
              </li>
            ))}
          </ul>
        </section>
      </ScrollArea>
    </AppScreen>
  )
}
