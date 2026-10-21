'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { AppId } from './ios-data'

export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
  return now
}

export function formatTime(d: Date | null) {
  if (!d) return '9:41'
  const h = d.getHours() % 12 || 12
  return `${h}:${String(d.getMinutes()).padStart(2, '0')}`
}

type PhoneState = {
  openApp: (id: AppId) => void
  goHome: () => void
  lock: () => void
  songIndex: number
  playing: boolean
  playSong: (i: number) => void
  togglePlay: () => void
}

export const PhoneContext = createContext<PhoneState | null>(null)

export function usePhone() {
  const ctx = useContext(PhoneContext)
  if (!ctx) throw new Error('usePhone must be used inside <Phone>')
  return ctx
}
