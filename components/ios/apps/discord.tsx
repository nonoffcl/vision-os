'use client'

import { useState } from 'react'
import { ChevronLeft, Hash, Plus, Search, Send, Volume2 } from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const SERVERS = [
  { id: 'movie', name: 'Movie Club', img: photo(3) },
  { id: 'uni', name: '22학번 CS', img: photo(7) },
  { id: 'valo', name: 'Valorant KR', img: photo(0) },
  { id: 'art', name: 'Film Photo', img: photo(6) },
]

const CHANNELS: Record<string, { text: string[]; voice: string[] }> = {
  movie: { text: ['general', 'recommendations', 'spoilers', 'friday-watch'], voice: ['Watch Party', 'Lounge'] },
  uni: { text: ['announcements', 'homework-help', 'memes', 'study-group'], voice: ['Study Room 1', 'Study Room 2'] },
  valo: { text: ['general', 'lfg', 'clips'], voice: ['Squad 1', 'Squad 2'] },
  art: { text: ['general', 'film-stocks', 'show-your-work'], voice: ['Darkroom'] },
}

type Msg = { user: string; text: string; time: string }

const SEED: Msg[] = [
  { user: 'dohyun', text: 'friday watch list is up, vote in #friday-watch', time: 'Today at 5:02 PM' },
  { user: 'haneul', text: 'can we pls not do horror again 😭', time: 'Today at 5:10 PM' },
  { user: 'jisoo', text: 'its my birthday week, horror it is 😈', time: 'Today at 5:11 PM' },
  { user: 'yuna', text: 'i’ll bring snacks at least', time: 'Today at 5:15 PM' },
]

export function DiscordApp() {
  const [server, setServer] = useState('movie')
  const [channel, setChannel] = useState<string | null>(null)
  const [msgs, setMsgs] = useState<Msg[]>(SEED)
  const [text, setText] = useState('')
  const s = SERVERS.find((x) => x.id === server)!

  if (channel) {
    return (
      <AppScreen bg="#1A1A1E">
        <header className="flex items-center gap-2 border-b border-white/10 px-3 pt-[58px] pb-3">
          <button type="button" onClick={() => setChannel(null)} aria-label="Back to channels">
            <ChevronLeft className="size-7" />
          </button>
          <Hash className="size-5 text-white/50" aria-hidden />
          <span className="text-[17px] font-semibold">{channel}</span>
          <Search className="ml-auto size-5 text-white/70" aria-hidden />
        </header>
        <ScrollArea className="px-4 py-3">
          <p className="pb-4 text-[24px] font-bold">Welcome to #{channel}!</p>
          <ul className="flex flex-col gap-4">
            {msgs.map((m, i) => (
              <li key={i} className="flex gap-3">
                <Avatar name={m.user} size={40} src={m.user === USER.firstName ? photo(4) : undefined} />
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold">
                    {m.user} <span className="text-[11px] font-normal text-white/40">{m.time}</span>
                  </p>
                  <p className="text-[15px] text-white/85">{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!text.trim()) return
            setMsgs((ms) => [...ms, { user: USER.firstName, text: text.trim(), time: 'Just now' }])
            setText('')
          }}
          className="flex items-center gap-2 px-3 pt-2 pb-9"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
            <Plus className="size-5" aria-hidden />
          </span>
          <label htmlFor="discord-input" className="sr-only">
            Message #{channel}
          </label>
          <input
            id="discord-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
            }}
            placeholder={`Message #${channel}`}
            className="h-10 min-w-0 flex-1 rounded-full bg-white/10 px-4 text-[15px] outline-none placeholder:text-white/40"
          />
          <button type="submit" aria-label="Send" className="flex size-10 items-center justify-center rounded-full bg-[#5865F2]">
            <Send className="size-4" />
          </button>
        </form>
      </AppScreen>
    )
  }

  return (
    <AppScreen bg="#121214">
      <div className="flex flex-1 overflow-hidden pt-[54px]">
        <nav aria-label="Servers" className="no-scrollbar flex w-[72px] flex-col items-center gap-2 overflow-y-auto py-2">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-[#5865F2]">
            <span
              aria-hidden
              className="size-7"
              style={{ background: '#fff', WebkitMaskImage: 'url(/icons/discord.svg)', maskImage: 'url(/icons/discord.svg)', WebkitMaskSize: 'contain', maskSize: 'contain' }}
            />
          </span>
          <span className="h-px w-8 bg-white/15" />
          {SERVERS.map((sv) => (
            <button key={sv.id} type="button" onClick={() => setServer(sv.id)} aria-label={sv.name} className="relative">
              {server === sv.id && <span className="absolute top-1/2 -left-3 h-9 w-1 -translate-y-1/2 rounded-r bg-white" />}
              <img
                src={sv.img || '/placeholder.svg'}
                alt=""
                className={cn('size-12 object-cover transition-all', server === sv.id ? 'rounded-2xl' : 'rounded-full')}
              />
            </button>
          ))}
          <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-[#23A55A]">
            <Plus className="size-6" aria-hidden />
          </span>
        </nav>
        <div className="no-scrollbar flex-1 overflow-y-auto rounded-tl-2xl bg-[#1A1A1E] pb-10">
          <div className="relative">
            <img src={s.img || '/placeholder.svg'} alt="" className="h-24 w-full rounded-tl-2xl object-cover opacity-70" />
            <h1 className="absolute bottom-2 left-4 text-[20px] font-bold drop-shadow">{s.name}</h1>
          </div>
          <div className="mx-3 mt-3 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 text-[14px] text-white/45">
            <Search className="size-4" aria-hidden />
            Search
          </div>
          <p className="px-4 pt-4 pb-1 text-[12px] font-semibold text-white/45 uppercase">Text Channels</p>
          <ul>
            {CHANNELS[server].text.map((c) => (
              <li key={c}>
                <button type="button" onClick={() => setChannel(c)} className="flex w-full items-center gap-2 px-4 py-2 text-left text-[16px] text-white/75 active:bg-white/5">
                  <Hash className="size-5 text-white/45" aria-hidden />
                  {c}
                </button>
              </li>
            ))}
          </ul>
          <p className="px-4 pt-4 pb-1 text-[12px] font-semibold text-white/45 uppercase">Voice Channels</p>
          <ul>
            {CHANNELS[server].voice.map((c, i) => (
              <li key={c} className="px-4 py-2">
                <span className="flex items-center gap-2 text-[16px] text-white/75">
                  <Volume2 className="size-5 text-white/45" aria-hidden />
                  {c}
                </span>
                {i === 0 && (
                  <span className="mt-1.5 ml-7 flex items-center gap-2 text-[13px] text-white/60">
                    <Avatar name="jisoo" size={20} /> jisoo
                    <Avatar name="dohyun" size={20} /> dohyun
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppScreen>
  )
}
