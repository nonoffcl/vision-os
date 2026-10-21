'use client'

import { useState } from 'react'
import { ChevronLeft, Ellipsis, Heart, Info, Search, Share, Trash2 } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, GlassButton, ScrollArea } from '../primitives'

type Item = { id: number; src: string; year: number; month: number; day: number }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const LIBRARY: Item[] = (() => {
  const items: Item[] = []
  let id = 0
  const spans: [number, number, number][] = [
    [2026, 10, 14],
    [2026, 9, 9],
    [2026, 8, 12],
    [2026, 6, 6],
    [2026, 4, 8],
    [2026, 1, 5],
    [2025, 12, 10],
    [2025, 10, 7],
    [2025, 7, 11],
    [2025, 3, 6],
    [2024, 11, 8],
    [2024, 8, 9],
    [2024, 5, 5],
    [2023, 12, 6],
  ]
  for (const [year, month, count] of spans) {
    for (let i = 0; i < count; i++) {
      items.push({ id: id++, src: photo(id * 3 + month), year, month, day: count - i })
    }
  }
  return items
})()

type Mode = 'years' | 'months' | 'all'

export function PhotosApp() {
  const [mode, setMode] = useState<Mode>('all')
  const [filter, setFilter] = useState<{ year?: number; month?: number }>({})
  const [viewer, setViewer] = useState<Item | null>(null)
  const [favorites, setFavorites] = useState<Set<number>>(new Set([2, 7]))

  if (viewer) {
    const fav = favorites.has(viewer.id)
    return (
      <AppScreen className="animate-in fade-in zoom-in-95 duration-200">
        <header className="flex items-center justify-between px-3 pt-[58px] pb-2">
          <GlassButton icon={ChevronLeft} label="Back" onClick={() => setViewer(null)} />
          <div className="glass rounded-full px-4 py-1 text-center leading-tight">
            <p className="text-[15px] font-semibold">
              {MONTHS[viewer.month - 1]} {viewer.day}
            </p>
            <p className="text-[11px] text-white/60">{viewer.year}</p>
          </div>
          <GlassButton icon={Ellipsis} label="More" />
        </header>
        <div className="flex flex-1 items-center">
          <img src={viewer.src || '/placeholder.svg'} alt="" className="w-full object-contain" />
        </div>
        <div className="flex items-center justify-between px-4 pb-10">
          <GlassButton icon={Share} label="Share" />
          <div className="glass flex items-center gap-1 rounded-full p-1">
            <button
              type="button"
              aria-pressed={fav}
              aria-label={fav ? 'Unfavorite' : 'Favorite'}
              onClick={() =>
                setFavorites((f) => {
                  const n = new Set(f)
                  if (n.has(viewer.id)) n.delete(viewer.id)
                  else n.add(viewer.id)
                  return n
                })
              }
              className="flex size-9 items-center justify-center"
            >
              <Heart className={cn('size-5', fav && 'fill-white')} />
            </button>
            <span className="flex size-9 items-center justify-center">
              <Info className="size-5" aria-hidden />
            </span>
          </div>
          <GlassButton icon={Trash2} label="Delete" />
        </div>
      </AppScreen>
    )
  }

  const shown = LIBRARY.filter((p) => (!filter.year || p.year === filter.year) && (!filter.month || p.month === filter.month))
  const years = [...new Set(LIBRARY.map((p) => p.year))]
  const months = [...new Map(shown.map((p) => [`${p.year}-${p.month}`, p])).values()]

  const switchMode = (m: Mode) => {
    setMode(m)
    setFilter({})
  }

  const title =
    mode === 'years'
      ? 'Years'
      : mode === 'months'
        ? filter.year ?? 'Months'
        : filter.month
          ? `${MONTHS[filter.month - 1]} ${filter.year}`
          : 'Library'

  return (
    <AppScreen>
      <ScrollArea className="pt-[54px] pb-32">
        <div className="flex items-end justify-between px-4 pt-3 pb-3">
          <div>
            <h1 className="text-[32px] font-bold">{title}</h1>
            <p className="text-[13px] text-white/55">{shown.length.toLocaleString()} Photos</p>
          </div>
          <span className="flex gap-2">
            <GlassButton icon={Search} label="Search photos" />
            <GlassButton label="Select" className="px-4 text-[15px]">
              Select
            </GlassButton>
          </span>
        </div>

        {mode === 'all' && (
          <ul className="grid grid-cols-3 gap-[2px]">
            {shown.map((p) => (
              <li key={p.id} className="relative">
                <button type="button" onClick={() => setViewer(p)} className="block w-full" aria-label={`Photo from ${MONTHS[p.month - 1]} ${p.day}, ${p.year}`}>
                  <img src={p.src || '/placeholder.svg'} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </button>
                {favorites.has(p.id) && <Heart className="pointer-events-none absolute bottom-1 left-1 size-3.5 fill-white text-white" aria-hidden />}
              </li>
            ))}
          </ul>
        )}

        {mode === 'months' && (
          <ul className="flex flex-col gap-3 px-3">
            {months.map((p) => {
              const count = LIBRARY.filter((x) => x.year === p.year && x.month === p.month).length
              return (
                <li key={`${p.year}-${p.month}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter({ year: p.year, month: p.month })
                      setMode('all')
                    }}
                    className="relative block w-full overflow-hidden rounded-[22px] text-left"
                  >
                    <img src={p.src || '/placeholder.svg'} alt="" className="h-[210px] w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />
                    <span className="absolute top-3 left-4">
                      <span className="block text-[22px] font-bold">{MONTHS[p.month - 1]}</span>
                      <span className="block text-[13px] text-white/80">
                        {p.year} · {count} photos
                      </span>
                    </span>
                    <span className="glass absolute top-3 right-3 flex size-8 items-center justify-center rounded-full">
                      <Ellipsis className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {mode === 'years' && (
          <ul className="flex flex-col gap-3 px-3">
            {years.map((y) => {
              const cover = LIBRARY.find((p) => p.year === y)!
              const count = LIBRARY.filter((p) => p.year === y).length
              return (
                <li key={y}>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('months')
                      setFilter({ year: y })
                    }}
                    className="relative block w-full overflow-hidden rounded-[26px] text-left"
                  >
                    <img src={cover.src || '/placeholder.svg'} alt="" className="h-[280px] w-full object-cover" />
                    <span className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
                    <span className="absolute top-4 left-5">
                      <span className="block text-[34px] font-bold">{y}</span>
                      <span className="block text-[13px] text-white/80">{count} photos</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </ScrollArea>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <div className="glass-dark flex rounded-full p-1" role="tablist" aria-label="Library view">
          {(
            [
              ['years', 'Years'],
              ['months', 'Months'],
              ['all', 'All Photos'],
            ] as const
          ).map(([m, l]) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={cn('rounded-full px-5 py-2 text-[14px] font-semibold transition', mode === m ? 'bg-white/20' : 'text-white/75')}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </AppScreen>
  )
}
