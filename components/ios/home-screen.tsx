'use client'

import { Search } from 'lucide-react'
import { usePhone } from '@/lib/ios-context'
import type { AppId } from '@/lib/ios-data'
import { APP_LABELS, AppIcon } from './app-icon'
import { CalendarWidget, SpotifyWidget } from './widgets'

const GRID: AppId[] = [
  'bereal',
  'instagram',
  'letterboxd',
  'coupang',
  'discord',
  'twitch',
  'youtube',
  'clock',
  'photos',
  'notes',
  'settings',
]
const DOCK: AppId[] = ['phone', 'safari', 'kakaotalk', 'spotify']
const BADGES: Partial<Record<AppId, number>> = { kakaotalk: 12, instagram: 3, discord: 5, bereal: 1, phone: 2 }

export function HomeScreen() {
  const { openApp } = usePhone()
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src="/images/wallpaper.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative flex h-full flex-col px-[26px] pt-[70px]">
        <div className="grid grid-cols-2 justify-items-center gap-x-4">
          <SpotifyWidget />
          <CalendarWidget />
        </div>

        <ul className="mt-5 grid grid-cols-4 justify-items-center gap-y-5">
          {GRID.map((id) => (
            <li key={id}>
              <IconButton id={id} onOpen={openApp} />
            </li>
          ))}
        </ul>

        <div className="mt-auto mb-3 flex justify-center">
          <span className="glass flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white">
            <Search className="size-3.5" aria-hidden />
            Search
          </span>
        </div>

        <nav aria-label="Dock" className="glass mb-3 flex justify-between rounded-[34px] px-4 py-4">
          {DOCK.map((id) => (
            <IconButton key={id} id={id} onOpen={openApp} hideLabel />
          ))}
        </nav>
      </div>
    </div>
  )
}

function IconButton({ id, onOpen, hideLabel }: { id: AppId; onOpen: (id: AppId) => void; hideLabel?: boolean }) {
  const badge = BADGES[id]
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      className="flex w-[74px] flex-col items-center gap-1.5 transition active:scale-90 active:brightness-75"
      aria-label={badge ? `${APP_LABELS[id]}, ${badge} notifications` : APP_LABELS[id]}
    >
      <span className="relative">
        <AppIcon id={id} />
        {badge ? (
          <span className="absolute -top-1.5 -right-1.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#FF3B30] px-1.5 text-[13px] font-medium text-white">
            {badge}
          </span>
        ) : null}
      </span>
      {!hideLabel && (
        <span className="w-full truncate text-center text-[12px] font-medium text-white drop-shadow">{APP_LABELS[id]}</span>
      )}
    </button>
  )
}
