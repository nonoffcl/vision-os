'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowUpLeft, ChevronLeft, Copy, Ellipsis, Mic, Search, X } from 'lucide-react'
import { AppScreen, GlassButton, ScrollArea } from '../primitives'

const INITIAL_SEARCHES = [
  'address the elephant in the room',
  'adresss the elphant j the room',
  'yeojun hello kitty',
  'jaehyun hello kitty',
  'yushi hello kitty',
  'gunwook hello kitty',
  'younghoon hello kitty',
]

export function SafariApp() {
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState(INITIAL_SEARCHES)

  const search = (value: string) => {
    const term = value.trim()
    if (!term) return
    setRecentSearches((searches) => [term, ...searches.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 8))
    setQuery('')
  }

  return (
    <AppScreen bg="#0F0F0F">
      <header className="flex items-center gap-2 px-3 pt-[58px] pb-3">
        <ArrowLeft className="size-7 shrink-0 text-white" aria-hidden />
        <form
          onSubmit={(event) => {
            event.preventDefault()
            search(query)
          }}
          className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#272727] px-3"
        >
          <label htmlFor="safari-q" className="sr-only">Search or enter website name</label>
          <input
            id="safari-q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search or enter website name"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/55"
          />
          <Mic className="size-5 shrink-0 text-white" aria-hidden />
        </form>
        <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#272727]">
          <X className="size-5" />
        </button>
      </header>
      <ScrollArea className="mt-6 pb-36 text-white">
        <div className="flex items-center justify-between px-5 pb-3">
          <h1 className="text-[17px] font-semibold text-white/75">Recent Searches</h1>
          {recentSearches.length > 0 && (
            <button type="button" onClick={() => setRecentSearches([])} className="text-[14px] text-white/55">Clear All</button>
          )}
        </div>
        {recentSearches.length ? (
          <ul className="px-3">
            {recentSearches.map((term) => (
              <li key={term} className="flex min-h-[55px] items-center gap-3 px-2">
                <Search className="size-6 shrink-0 text-white" aria-hidden />
                <button type="button" onClick={() => setQuery(term)} className="min-w-0 flex-1 truncate py-3 text-left text-[15px]">{term}</button>
                <button type="button" onClick={() => setQuery(term)} aria-label={`Use recent search ${term}`} className="flex size-9 shrink-0 items-center justify-center text-white/55">
                  <ArrowUpLeft className="size-5" />
                </button>
                <button type="button" onClick={() => setRecentSearches((searches) => searches.filter((item) => item !== term))} aria-label={`Remove ${term} from recent searches`} className="flex size-8 shrink-0 items-center justify-center text-white/45">
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-6 text-[14px] text-white/50">No recent searches</p>
        )}
      </ScrollArea>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-white/10 bg-[#0F0F0F] px-2 pt-2 pb-8">
        <GlassButton icon={ChevronLeft} label="Back" className="bg-transparent text-white/75 shadow-none" />
        <GlassButton icon={Copy} label="Tabs" className="bg-transparent text-white/75 shadow-none" />
        <GlassButton icon={Ellipsis} label="More" className="bg-transparent text-white/75 shadow-none" />
      </div>
    </AppScreen>
  )
}
