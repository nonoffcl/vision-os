'use client'

import { useEffect, useState } from 'react'
import {
  Clock,
  Delete,
  Grip,
  Info,
  Mic,
  MicOff,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Star,
  UserPlus,
  UserRound,
  Video,
  Voicemail,
  Volume2,
  Users,
} from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, GlassTabBar, ScrollArea, type Tab } from '../primitives'

type Recent = { id: string; name: string; label: string; time: string; type: 'in' | 'out' | 'missed'; count?: number; img?: string }

const RECENTS: Recent[] = [
  { id: '1', name: 'Jisoo 지수', label: 'mobile', time: '6:38 PM', type: 'missed', count: 2, img: photo(0) },
  { id: '2', name: 'Mom 엄마', label: 'mobile', time: '4:12 PM', type: 'in' },
  { id: '3', name: 'Haneul', label: 'FaceTime Audio', time: '1:05 PM', type: 'out', img: photo(2) },
  { id: '4', name: '+82 10-4821-0937', label: 'Seoul, KR', time: '11:47 AM', type: 'missed' },
  { id: '5', name: 'Dad 아빠', label: 'mobile', time: 'Yesterday', type: 'in' },
  { id: '6', name: 'Dohyun Lee', label: 'mobile', time: 'Yesterday', type: 'out' },
  { id: '7', name: 'Coupang Eats Rider', label: 'Seoul, KR', time: 'Yesterday', type: 'in' },
  { id: '8', name: 'Yuna Choi', label: 'iPhone', time: 'Monday', type: 'out', img: photo(1) },
  { id: '9', name: 'Seoul Dental Clinic', label: 'work', time: 'Monday', type: 'missed' },
  { id: '10', name: 'Sungmin Park', label: 'mobile', time: 'Sunday', type: 'in', count: 3 },
  { id: '11', name: 'Mom 엄마', label: 'mobile', time: 'Saturday', type: 'out' },
]

const CONTACTS = ['Dad 아빠', 'Dohyun Lee', 'Eunji', 'Haneul', 'Jisoo 지수', 'Minho', 'Mom 엄마', 'Seoyeon', 'Sora Han', 'Sungmin Park', 'Taeyang Kim', 'Yuna Choi']

type TabId = 'favorites' | 'recents' | 'contacts' | 'keypad' | 'voicemail'
const TABS: Tab<TabId>[] = [
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'recents', label: 'Recents', icon: Clock },
  { id: 'contacts', label: 'Contacts', icon: UserRound },
  { id: 'keypad', label: 'Keypad', icon: Grip },
  { id: 'voicemail', label: 'Voicemail', icon: Voicemail },
]

type Callee = { name: string; img?: string; label?: string }

export function PhoneApp() {
  const [tab, setTab] = useState<TabId>('recents')
  const [call, setCall] = useState<Callee | null>(null)

  if (call) return <CallScreen callee={call} onEnd={() => setCall(null)} />

  return (
    <AppScreen>
      {tab === 'recents' && <Recents onCall={setCall} />}
      {tab === 'favorites' && (
        <SimpleList
          title="Favorites"
          items={['Mom 엄마', 'Jisoo 지수', 'Haneul', 'Dad 아빠'].map((n) => ({ name: n, sub: 'mobile' }))}
          onCall={setCall}
        />
      )}
      {tab === 'contacts' && <SimpleList title="Contacts" items={CONTACTS.map((n) => ({ name: n }))} onCall={setCall} />}
      {tab === 'keypad' && <Keypad onCall={setCall} />}
      {tab === 'voicemail' && (
        <ScrollArea className="px-4 pt-[64px] pb-28">
          <h1 className="text-[34px] font-bold">Voicemail</h1>
          <div className="mt-24 flex flex-col items-center gap-2 text-white/50">
            <Voicemail className="size-12" aria-hidden />
            <p>No Voicemail</p>
          </div>
        </ScrollArea>
      )}
      <GlassTabBar tabs={TABS} active={tab} onChange={setTab} />
    </AppScreen>
  )
}

function Recents({ onCall }: { onCall: (c: Callee) => void }) {
  const [filter, setFilter] = useState<'all' | 'missed'>('all')
  const list = filter === 'all' ? RECENTS : RECENTS.filter((r) => r.type === 'missed')
  return (
    <ScrollArea className="pt-[58px] pb-28">
      <div className="flex items-center justify-between px-4">
        <span className="text-[17px] text-[#0A84FF]">Edit</span>
        <div className="glass flex rounded-full p-0.5" role="tablist" aria-label="Filter calls">
          {(['all', 'missed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn('rounded-full px-4 py-1 text-[13px] font-semibold capitalize', filter === f && 'bg-white/20')}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="w-8" />
      </div>
      <h1 className="px-4 pt-3 pb-2 text-[34px] font-bold">Recents</h1>
      <ul>
        {list.map((r) => {
          const Icon = r.type === 'missed' ? PhoneMissed : r.type === 'in' ? PhoneIncoming : PhoneOutgoing
          return (
            <li key={r.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onCall({ name: r.name, img: r.img, label: r.label })}
                className="flex min-w-0 flex-1 items-center gap-3 py-2 pl-4 text-left active:bg-white/5"
                aria-label={`Call ${r.name}`}
              >
                <Avatar name={r.name.startsWith('+') ? '#' : r.name} size={42} src={r.img} />
                <span className="min-w-0 flex-1 border-b border-white/10 pb-2">
                  <span className={cn('block truncate text-[17px] font-semibold', r.type === 'missed' && 'text-[#FF453A]')}>
                    {r.name}
                    {r.count ? <span className="font-normal"> ({r.count})</span> : null}
                  </span>
                  <span className="flex items-center gap-1 text-[14px] text-white/55">
                    <Icon className="size-3.5" aria-hidden />
                    {r.label}
                  </span>
                </span>
              </button>
              <span className="flex items-center gap-2 self-stretch border-b border-white/10 pr-4 pb-2 text-[15px] text-white/55">
                {r.time}
                <Info className="size-5 text-[#0A84FF]" aria-hidden />
              </span>
            </li>
          )
        })}
      </ul>
    </ScrollArea>
  )
}

function SimpleList({
  title,
  items,
  onCall,
}: {
  title: string
  items: { name: string; sub?: string }[]
  onCall: (c: Callee) => void
}) {
  return (
    <ScrollArea className="pt-[64px] pb-28">
      <h1 className="px-4 pb-2 text-[34px] font-bold">{title}</h1>
      <ul>
        {items.map((i) => (
          <li key={i.name}>
            <button
              type="button"
              onClick={() => onCall({ name: i.name, label: i.sub ?? 'mobile' })}
              className="flex w-full items-center gap-3 px-4 py-2 text-left active:bg-white/5"
            >
              <Avatar name={i.name} size={42} />
              <span className="flex-1 border-b border-white/10 pb-2">
                <span className="block text-[17px]">{i.name}</span>
                {i.sub && <span className="block text-[14px] text-white/55">{i.sub}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

const PAD: [string, string][] = [
  ['1', ''],
  ['2', 'ABC'],
  ['3', 'DEF'],
  ['4', 'GHI'],
  ['5', 'JKL'],
  ['6', 'MNO'],
  ['7', 'PQRS'],
  ['8', 'TUV'],
  ['9', 'WXYZ'],
  ['*', ''],
  ['0', '+'],
  ['#', ''],
]

function Keypad({ onCall }: { onCall: (c: Callee) => void }) {
  const [num, setNum] = useState('')
  return (
    <div className="flex flex-1 flex-col items-center px-8 pt-[130px] pb-28">
      <p className="h-12 text-[36px] tracking-wide tabular-nums" aria-live="polite">
        {num}
      </p>
      <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-4">
        {PAD.map(([d, l]) => (
          <button
            key={d}
            type="button"
            onClick={() => setNum((n) => (n + d).slice(0, 15))}
            className="flex size-[78px] flex-col items-center justify-center rounded-full bg-[#333] transition active:bg-[#737373]"
          >
            <span className="text-[34px] leading-none">{d}</span>
            {l && <span className="text-[10px] font-semibold tracking-[0.18em] text-white/80">{l}</span>}
          </button>
        ))}
        <span />
        <button
          type="button"
          onClick={() => num && onCall({ name: num, label: 'mobile' })}
          aria-label="Call"
          className="flex size-[78px] items-center justify-center rounded-full bg-[#30D158] active:brightness-90"
        >
          <Phone className="size-8 fill-white text-white" strokeWidth={0} />
        </button>
        {num ? (
          <button type="button" onClick={() => setNum((n) => n.slice(0, -1))} aria-label="Delete digit" className="flex items-center justify-center">
            <Delete className="size-7 text-white/80" />
          </button>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}

function CallScreen({ callee, onEnd }: { callee: Callee; onEnd: () => void }) {
  const [seconds, setSeconds] = useState<number | null>(null)
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(false)
  const [ending, setEnding] = useState(false)

  useEffect(() => {
    const pickup = setTimeout(() => setSeconds(0), 2200)
    return () => clearTimeout(pickup)
  }, [])

  const connected = seconds !== null
  useEffect(() => {
    if (!connected || ending) return
    const id = setInterval(() => setSeconds((s) => (s ?? 0) + 1), 1000)
    return () => clearInterval(id)
  }, [connected, ending])

  const end = () => {
    setEnding(true)
    setTimeout(onEnd, 700)
  }

  const status = ending
    ? 'Call Ended'
    : seconds === null
      ? `calling ${callee.label ?? 'mobile'}…`
      : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  const buttons = [
    { label: 'Speaker', icon: Volume2, active: speaker, onClick: () => setSpeaker((s) => !s) },
    { label: 'FaceTime', icon: Video },
    { label: 'Mute', icon: muted ? MicOff : Mic, active: muted, onClick: () => setMuted((m) => !m) },
    { label: 'Add', icon: UserPlus },
    { label: 'Keypad', icon: Grip },
    { label: 'Contacts', icon: Users },
  ]

  return (
    <AppScreen className="animate-in fade-in duration-300">
      {callee.img ? (
        <img src={callee.img || '/placeholder.svg'} alt="" className="absolute inset-0 size-full scale-125 object-cover blur-3xl" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a3a5c] via-[#1d1d2e] to-black" />
      )}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative flex h-full flex-col items-center px-8 pt-[96px] pb-14">
        <p className="text-[15px] text-white/70" aria-live="polite">
          {status}
        </p>
        <h2 className="mt-1 text-center text-[34px] font-semibold">{callee.name}</h2>
        <span className={cn('mt-8 rounded-full', seconds === null && !ending && 'animate-ring')}>
          <Avatar name={callee.name.startsWith('+') || /^\d/.test(callee.name) ? '#' : callee.name} size={120} src={callee.img} />
        </span>

        <div className="mt-auto grid grid-cols-3 gap-x-7 gap-y-6">
          {buttons.map((b) => (
            <button key={b.label} type="button" onClick={b.onClick} className="flex flex-col items-center gap-2 text-[13px]" aria-pressed={b.active}>
              <span
                className={cn(
                  'flex size-[76px] items-center justify-center rounded-full transition',
                  b.active ? 'bg-white text-black' : 'glass text-white',
                )}
              >
                <b.icon className="size-8" strokeWidth={1.8} aria-hidden />
              </span>
              {b.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={end}
          aria-label="End call"
          className="mt-8 flex size-[76px] items-center justify-center rounded-full bg-[#FF3B30] active:brightness-90"
        >
          <Phone className="size-8 rotate-[135deg] fill-white text-white" strokeWidth={0} />
        </button>
      </div>
    </AppScreen>
  )
}
