'use client'

import { useState } from 'react'
import { Check, ChevronDown, MapPin, Send, UserPlus, Users, VolumeX } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { usePhone } from '@/lib/ios-context'
import { AppScreen } from '../primitives'

export function BeRealApp() {
  const { goHome } = usePhone()
  const [caption, setCaption] = useState('')
  const [friendsOnly, setFriendsOnly] = useState(true)
  const [posted, setPosted] = useState(false)

  return (
    <AppScreen bg="#000">
      <header className="relative flex items-center justify-between px-5 pt-[58px] pb-2">
        <button type="button" onClick={goHome} aria-label="Close BeReal" className="flex size-10 items-center justify-center rounded-full bg-[#171717]">
          <ChevronDown className="size-6" />
        </button>
        <h1 className="text-[23px] font-extrabold">BeReal.</h1>
        <span className="size-10" />
      </header>

      <div className="flex-1 px-6 pt-7">
        <input
          id="bereal-caption"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder="Add a caption..."
          className="mb-3 w-full bg-transparent px-1 text-[15px] outline-none placeholder:text-white/65"
        />
        <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[18px]">
          <img src={photo(5)} alt="Your BeReal photo" className="size-full object-cover" />
          <img src={photo(4)} alt="Your front-camera photo" className="absolute top-[3%] left-[3%] h-[40%] w-[36%] rounded-[15px] border-2 border-black object-cover" />
          <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-1.5">
            <button type="button" aria-label="Tag friends" className="flex size-10 items-center justify-center rounded-full bg-black/60"><UserPlus className="size-[18px]" /></button>
            <button type="button" onClick={() => setFriendsOnly((value) => !value)} className="flex h-10 items-center gap-2 rounded-full bg-black/60 px-3 text-[12px] font-semibold">
              <Users className="size-4" />{friendsOnly ? 'My Friends' : 'Discovery'}
            </button>
            <button type="button" aria-label="Add location" className="flex h-10 items-center gap-2 rounded-full bg-black/60 px-3 text-[12px] font-medium"><MapPin className="size-4" />On</button>
            <button type="button" aria-label="Mute audio" className="flex size-10 items-center justify-center rounded-full bg-black/60"><VolumeX className="size-[18px]" /></button>
          </div>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-4 px-6 pt-4 pb-12">
        <button
          type="button"
          onClick={() => setPosted(true)}
          className="flex h-14 w-full items-center justify-center gap-2 text-[22px] font-extrabold tracking-wide"
        >
          {posted ? 'SENT' : 'SEND'}
          {posted ? <Check className="size-5" /> : <Send className="size-5 fill-white" />}
        </button>
      </footer>
    </AppScreen>
  )
}
