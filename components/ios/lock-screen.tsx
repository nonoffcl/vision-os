'use client'

import { useEffect, useRef, useState } from 'react'
import { Camera, Flashlight, Lock, LockOpen } from 'lucide-react'
import { formatTime, useNow } from '@/lib/ios-context'
import { cn } from '@/lib/utils'
import { AppIcon } from './app-icon'

const PASSCODE = '0808'
const KEYS: [string, string][] = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
]

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useNow()
  const [showPad, setShowPad] = useState(false)
  const [code, setCode] = useState('')
  const [shake, setShake] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const dragStart = useRef<number | null>(null)

  const press = (d: string) => {
    if (unlocking || code.length >= 4) return
    const next = code + d
    setCode(next)
    if (next.length === 4) {
      if (next === PASSCODE) {
        setUnlocking(true)
        setTimeout(onUnlock, 350)
      } else {
        setTimeout(() => {
          setShake(true)
          setTimeout(() => {
            setShake(false)
            setCode('')
          }, 420)
        }, 120)
      }
    }
  }

  const pressRef = useRef(press)
  pressRef.current = press

  useEffect(() => {
    if (!showPad) return
    const onKey = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) pressRef.current(e.key)
      else if (e.key === 'Backspace') setCode((c) => c.slice(0, -1))
      else if (e.key === 'Escape') {
        setShowPad(false)
        setCode('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showPad])

  const dateLabel = now
    ? now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : 'Wednesday, October 21'

  return (
    <div
      className={cn(
        'absolute inset-0 z-40 select-none overflow-hidden bg-black transition-all duration-300',
        unlocking && 'scale-110 opacity-0',
      )}
      onPointerDown={(e) => {
        if (!showPad) dragStart.current = e.clientY
      }}
      onPointerUp={(e) => {
        if (dragStart.current !== null && dragStart.current - e.clientY > 40) setShowPad(true)
        dragStart.current = null
      }}
    >
      <img src="/images/wallpaper.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div
        className={cn(
          'absolute inset-0 transition-all duration-300',
          showPad ? 'bg-black/45 backdrop-blur-2xl' : 'bg-black/10',
        )}
      />

      {!showPad ? (
        <div className="relative flex h-full flex-col items-center pt-[64px]">
          <Lock className="size-5 text-white/90" aria-hidden />
          <p className="mt-3 text-[20px] font-semibold text-white/85">{dateLabel}</p>
          <p
            className="-mt-1 text-[104px] leading-none font-semibold tracking-[-0.04em] text-white/90 tabular-nums"
            style={{ textShadow: '0 2px 30px rgba(120,100,255,0.35)' }}
          >
            {formatTime(now)}
          </p>

          <div className="mt-auto mb-6 flex w-full flex-col gap-2 px-3">
            <Notification app="kakaotalk" title="Jisoo" time="now" body="are we still on for tonight?? 🍿" />
            <Notification app="bereal" title="BeReal." time="12m ago" body="⚠️ Time to BeReal. ⚠️ 2 min left to capture a BeReal." />
          </div>

          <div className="mb-14 flex w-full items-center justify-between px-11">
            <span className="glass flex size-[50px] items-center justify-center rounded-full">
              <Flashlight className="size-5 text-white" aria-hidden />
              <span className="sr-only">Flashlight</span>
            </span>
            <span className="glass flex size-[50px] items-center justify-center rounded-full">
              <Camera className="size-5 text-white" aria-hidden />
              <span className="sr-only">Camera</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPad(true)}
            className="absolute inset-x-0 bottom-0 flex h-16 flex-col items-center justify-end gap-2 pb-2 text-[13px] text-white/70"
          >
            Swipe up or tap to unlock
            <span className="h-[5px] w-[139px] rounded-full bg-white" />
          </button>
        </div>
      ) : (
        <div className="relative flex h-full animate-in flex-col items-center fade-in pt-[110px] duration-200">
          {unlocking ? (
            <LockOpen className="size-6 text-white" aria-hidden />
          ) : (
            <Lock className="size-6 text-white" aria-hidden />
          )}
          <p className="mt-4 text-[20px] text-white">Enter Passcode</p>
          <div className={cn('mt-5 flex gap-6', shake && 'animate-shake')} aria-live="polite" aria-label={`${code.length} of 4 digits entered`}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  'size-[13px] rounded-full border-[1.5px] border-white transition',
                  i < code.length && 'bg-white',
                )}
              />
            ))}
          </div>

          <div className="mt-14 grid grid-cols-3 gap-x-6 gap-y-4">
            {KEYS.map(([d, l]) => (
              <Key key={d} digit={d} letters={l} onPress={press} />
            ))}
            <span />
            <Key digit="0" letters="" onPress={press} />
            <span />
          </div>

          <div className="absolute inset-x-0 bottom-12 flex justify-between px-12 text-[17px] text-white">
            <span>Emergency</span>
            {code.length > 0 ? (
              <button type="button" onClick={() => setCode((c) => c.slice(0, -1))}>
                Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowPad(false)
                  setCode('')
                }}
              >
                Cancel
              </button>
            )}
          </div>
          <p className="absolute bottom-[86px] text-[12px] text-white/40">Hint: 0808</p>
        </div>
      )}
    </div>
  )
}

function Key({ digit, letters, onPress }: { digit: string; letters: string; onPress: (d: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPress(digit)}
      aria-label={digit}
      className="flex size-[78px] flex-col items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition active:bg-white/45"
    >
      <span className="text-[36px] leading-none font-normal">{digit}</span>
      {letters && <span className="mt-0.5 text-[10px] font-semibold tracking-[0.18em]">{letters}</span>}
    </button>
  )
}

function Notification({
  app,
  title,
  time,
  body,
}: {
  app: 'kakaotalk' | 'bereal'
  title: string
  time: string
  body: string
}) {
  return (
    <div className="glass flex items-center gap-3 rounded-[24px] p-3">
      <AppIcon id={app} size={38} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-white">{title}</p>
          <p className="text-[13px] text-white/60">{time}</p>
        </div>
        <p className="truncate text-[15px] text-white/90">{body}</p>
      </div>
    </div>
  )
}
