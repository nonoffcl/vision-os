'use client'

import { formatTime, useNow } from '@/lib/ios-context'
import { cn } from '@/lib/utils'

export function StatusBar({ hideTime = false, dark = false }: { hideTime?: boolean; dark?: boolean }) {
  const now = useNow()
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between px-8 pt-1 text-[17px] font-semibold',
        dark ? 'text-black' : 'text-white',
      )}
    >
      <span className={cn('w-[92px] text-center tabular-nums', hideTime && 'invisible')}>{formatTime(now)}</span>
      <span className="absolute top-[11px] left-1/2 h-[37px] w-[124px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      <span className="flex w-[92px] items-center justify-center gap-1.5" aria-label="Full signal, Wi-Fi connected, battery 82%">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.3 10.3 0 0 0 8 .6C5.2.6 2.7 1.7.8 3.5L2 4.8a8.5 8.5 0 0 1 6-2.4Z" />
          <path d="M8 5.8c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 4a7 7 0 0 0-4.8 1.9l1.2 1.3c1-.9 2.2-1.4 3.6-1.4Z" />
          <path d="M8 9.2c.5 0 1 .2 1.3.5L8 11.5 6.7 9.7c.3-.3.8-.5 1.3-.5Z" />
        </svg>
        <span className="relative flex h-[13px] w-[27px] items-center rounded-[4px] border border-current/40 p-[1.5px]">
          <span className="h-full w-[82%] rounded-[2px] bg-current" />
          <span className="absolute -right-[3.5px] h-[4px] w-[1.5px] rounded-r bg-current/40" />
        </span>
      </span>
    </div>
  )
}

export function HomeIndicator({ onClick, dark = false }: { onClick?: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go to Home Screen"
      className="absolute inset-x-0 bottom-0 z-[60] flex h-6 items-end justify-center pb-2"
    >
      <span className={cn('h-[5px] w-[139px] rounded-full', dark ? 'bg-black' : 'bg-white')} />
    </button>
  )
}
