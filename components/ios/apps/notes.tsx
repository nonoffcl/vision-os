'use client'

import { useState } from 'react'
import { ChevronLeft, Folder, Mic, PenSquare, Pin, Search, Share, Ellipsis } from 'lucide-react'
import { AppScreen, GlassButton, ScrollArea } from '../primitives'

type Note = { id: string; text: string; date: string; pinned?: boolean }

const INITIAL: Note[] = [
  { id: '1', pinned: true, date: '6:12 PM', text: 'Jisoo bday 🎂\n- pick up cake from Tous Les Jours\n- card + polaroid\n- CGV 8pm, booked seats F7-F8' },
  { id: '2', pinned: true, date: 'Yesterday', text: 'Movies to watch\nPast Lives\nDecision to Leave\nAftersun\nPerfect Days\nThe Handmaiden' },
  { id: '3', date: 'Monday', text: 'Grocery\nmilk, eggs, kimchi, tofu, green onion, ramyeon x5, strawberries' },
  { id: '4', date: 'Sunday', text: 'Jeju trip ideas 🍊\nSeongsan sunrise peak, Udo island bikes, black pork bbq, Osulloc tea museum' },
  { id: '5', date: '10/12/26', text: 'Wifi password for cafe\nonion_guest / croissant2026' },
  { id: '6', date: '10/03/26', text: 'Gift ideas\nMom – hand cream\nDad – golf balls\nMinho – new game' },
]

export function NotesApp() {
  const [notes, setNotes] = useState(INITIAL)
  const [openId, setOpenId] = useState<string | null>(null)
  const open = notes.find((n) => n.id === openId)

  const create = () => {
    const id = String(Date.now())
    setNotes((ns) => [{ id, text: '', date: 'Now' }, ...ns])
    setOpenId(id)
  }

  const close = () => {
    setNotes((ns) => ns.filter((n) => n.text.trim() !== ''))
    setOpenId(null)
  }

  if (open) {
    return (
      <AppScreen>
        <header className="flex items-center justify-between px-3 pt-[58px] pb-2">
          <GlassButton label="Back to Notes" onClick={close} className="pr-3 text-[17px] text-[#FFD60A]">
            <ChevronLeft className="size-6" />
            Notes
          </GlassButton>
          <span className="flex gap-2">
            <GlassButton icon={Share} label="Share note" className="text-[#FFD60A]" />
            <GlassButton icon={Ellipsis} label="More" className="text-[#FFD60A]" />
          </span>
        </header>
        <p className="text-center text-[13px] text-white/45">{open.date}</p>
        <label htmlFor="note-body" className="sr-only">
          Note
        </label>
        <textarea
          id="note-body"
          autoFocus={!open.text}
          value={open.text}
          onChange={(e) => setNotes((ns) => ns.map((n) => (n.id === open.id ? { ...n, text: e.target.value } : n)))}
          placeholder="Start typing…"
          className="no-scrollbar flex-1 resize-none bg-transparent px-5 pt-3 pb-24 text-[17px] leading-relaxed text-white caret-[#FFD60A] outline-none placeholder:text-white/35 first-line:text-[28px] first-line:font-bold"
        />
      </AppScreen>
    )
  }

  const pinned = notes.filter((n) => n.pinned)
  const rest = notes.filter((n) => !n.pinned)

  return (
    <AppScreen>
      <header className="flex items-center justify-between px-3 pt-[58px]">
        <GlassButton label="Folders" className="pr-3 text-[17px] text-[#FFD60A]">
          <ChevronLeft className="size-6" />
          Folders
        </GlassButton>
        <GlassButton icon={Ellipsis} label="More" className="text-[#FFD60A]" />
      </header>
      <ScrollArea className="pb-32">
        <h1 className="px-5 pt-2 text-[34px] font-bold">Notes</h1>
        <div className="mx-4 mt-2 flex items-center gap-2 rounded-[12px] bg-[#1c1c1e] px-3 py-2 text-[17px] text-white/45">
          <Search className="size-4" aria-hidden />
          Search
          <Mic className="ml-auto size-4" aria-hidden />
        </div>
        <NoteGroup title="Pinned" icon notes={pinned} onOpen={setOpenId} />
        <NoteGroup title="Previous 30 Days" notes={rest} onOpen={setOpenId} />
      </ScrollArea>
      <div className="absolute inset-x-4 bottom-8 flex items-center justify-between">
        <span className="glass flex size-11 items-center justify-center rounded-full">
          <Folder className="size-5 text-[#FFD60A]" aria-hidden />
        </span>
        <span className="glass rounded-full px-4 py-2.5 text-[13px] text-white/80">{notes.length} Notes</span>
        <GlassButton icon={PenSquare} label="New note" onClick={create} className="text-[#FFD60A]" />
      </div>
    </AppScreen>
  )
}

function NoteGroup({
  title,
  notes,
  onOpen,
  icon,
}: {
  title: string
  notes: Note[]
  onOpen: (id: string) => void
  icon?: boolean
}) {
  if (!notes.length) return null
  return (
    <section className="mt-5 px-4">
      <h2 className="mb-2 flex items-center gap-1 px-1 text-[20px] font-bold">
        {icon && <Pin className="size-4 rotate-45 text-[#FFD60A]" aria-hidden />}
        {title}
      </h2>
      <ul className="overflow-hidden rounded-[22px] bg-[#1c1c1e]">
        {notes.map((n, i) => {
          const [first, ...lines] = n.text.split('\n')
          return (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => onOpen(n.id)}
                className={`w-full px-4 py-2.5 text-left active:bg-white/5 ${i < notes.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <span className="block truncate text-[17px] font-semibold">{first || 'New Note'}</span>
                <span className="block truncate text-[15px] text-white/55">
                  <span className="text-white/80">{n.date}</span> {lines.join(' ') || 'No additional text'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
