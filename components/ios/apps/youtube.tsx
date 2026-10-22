'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowUpLeft, Clock3, Mic, Search, X } from 'lucide-react'
import { AppScreen, ScrollArea } from '../primitives'

const INITIAL_SEARCHES = [
  'blur song 2 audio',
  'level 230 block out',
  'slow dancing v audio',
  'pop rock britain',
  'jack and the bear bear jack audio',
  'hearing damage thom yorke audio',
  'the verve - bitter sweet symphony audio',
  'british rock songs',
]

export function YouTubeApp() {
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
      <header className="flex items-center gap-2 px-3 pt-[58px] pb-3 text-white">
        <ArrowLeft className="size-7 shrink-0" aria-hidden />
        <form
          onSubmit={(event) => {
            event.preventDefault()
            search(query)
          }}
          className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#272727] px-3"
        >
          <label htmlFor="youtube-search" className="sr-only">Search YouTube</label>
          <input
            id="youtube-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search YouTube"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/55"
          />
          </form>
        <Mic className="size-6 shrink-0" aria-hidden />
      </header>

      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-white">
        <h1 className="text-[17px] font-semibold">Recent Searches</h1>
        {recentSearches.length > 0 && (
          <button type="button" onClick={() => setRecentSearches([])} className="text-[14px] text-white/60">
            Clear All
          </button>
        )}
      </div>

      <ScrollArea className="text-white">
        {recentSearches.length ? (
          <ul className="px-3">
            {recentSearches.map((term) => (
              <li key={term} className="flex min-h-[55px] items-center gap-3 px-2">
                <Clock3 className="size-6 shrink-0" aria-hidden />
                <button type="button" onClick={() => setQuery(term)} className="min-w-0 flex-1 truncate py-3 text-left text-[15px]">
                  {term}
                </button>
                <button
                  type="button"
                  onClick={() => setQuery(term)}
                  aria-label={`Use recent search ${term}`}
                  className="flex size-9 shrink-0 items-center justify-center"
                >
                  <ArrowUpLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setRecentSearches((searches) => searches.filter((item) => item !== term))}
                  aria-label={`Remove ${term} from recent searches`}
                  className="flex size-8 shrink-0 items-center justify-center text-white/45"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-5 mt-5 rounded-xl bg-white/[0.05] px-4 py-8 text-center">
            <Search className="mx-auto size-5 text-white/35" aria-hidden />
            <p className="mt-2 text-[14px] text-white/60">No recent searches</p>
          </div>
        )}
      </ScrollArea>

    </AppScreen>
  )
}
