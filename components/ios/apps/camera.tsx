'use client'

import { useState } from 'react'
import { RotateCw } from 'lucide-react'
import { usePhone } from '@/lib/ios-context'
import { AppScreen } from '../primitives'

export function CameraApp() {
  const { openApp } = usePhone()
  const [frontCamera, setFrontCamera] = useState(false)
  const [captured, setCaptured] = useState(false)

  return (
    <AppScreen bg="#000">
      <img
        src="https://i.pinimg.com/1200x/3c/6d/45/3c6d450710c9abd0bc9887d9344e6e0b.jpg"
        alt="Camera viewfinder"
        className="absolute inset-0 size-full object-cover"
        style={{ transform: frontCamera ? 'scale(1.2) scaleX(-1)' : 'scale(1.2)' }}
      />
      {captured && <div className="pointer-events-none absolute inset-0 bg-white/70" />}

      <button
        type="button"
        onClick={() => openApp('photos')}
        aria-label="Open Photos"
        className="absolute bottom-[3.5%] left-[8%] size-12 overflow-hidden rounded-full border-2 border-white/80 transition hover:border-white hover:brightness-75"
      >
        <img src="https://i.pinimg.com/1200x/3c/6d/45/3c6d450710c9abd0bc9887d9344e6e0b.jpg" alt="Latest photo" className="size-full object-cover" />
      </button>
      <button
        type="button"
        onClick={() => {
          setCaptured(true)
          window.setTimeout(() => setCaptured(false), 120)
        }}
        aria-label="Take photo"
        className="group absolute bottom-[14%] left-1/2 flex size-[84px] -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white bg-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition hover:bg-white/25 active:scale-95"
      >
        <span className="size-[62px] rounded-full bg-white transition-colors group-hover:bg-gray-300 group-active:bg-gray-400" />
      </button>
      <button
        type="button"
        onClick={() => setFrontCamera((current) => !current)}
        aria-label="Switch camera"
        className="absolute right-[8%] bottom-[3.5%] flex size-12 items-center justify-center rounded-full transition hover:bg-white/20 active:bg-white/35"
      >
        <RotateCw className="size-6 text-white" />
      </button>
    </AppScreen>
  )
}
