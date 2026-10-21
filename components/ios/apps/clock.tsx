'use client'

import { useState } from 'react'
import { BedDouble, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AppScreen, GlassButton, ScrollArea, Toggle } from '../primitives'

type Alarm = { id: string; time: string; period: 'AM' | 'PM'; label: string; repeat?: string; on: boolean }

const INITIAL: Alarm[] = [
  { id: '1', time: '6:30', period: 'AM', label: 'Gym 💪', repeat: 'Weekdays', on: true },
  { id: '2', time: '7:00', period: 'AM', label: 'Alarm', repeat: 'Weekdays', on: true },
  { id: '3', time: '7:10', period: 'AM', label: 'Snooze backup', on: false },
  { id: '4', time: '9:00', period: 'AM', label: 'Weekend', repeat: 'Sat, Sun', on: false },
  { id: '5', time: '12:30', period: 'PM', label: 'Lunch with Haneul', on: true },
  { id: '6', time: '7:30', period: 'PM', label: 'Leave for movie night 🎬', on: true },
  { id: '7', time: '11:00', period: 'PM', label: 'Wind down', repeat: 'Every day', on: false },
]

export function ClockApp() {
  const [alarms, setAlarms] = useState(INITIAL)
  const [editing, setEditing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newTime, setNewTime] = useState('08:00')
  const [newLabel, setNewLabel] = useState('')

  const add = () => {
    const [h, min] = newTime.split(':').map(Number)
    const alarm: Alarm = {
      id: String(Date.now()),
      time: `${h % 12 || 12}:${String(min).padStart(2, '0')}`,
      period: h >= 12 ? 'PM' : 'AM',
      label: newLabel.trim() || 'Alarm',
      on: true,
    }
    const minutes = (a: Alarm) => {
      const [hh, mm] = a.time.split(':').map(Number)
      return ((hh % 12) + (a.period === 'PM' ? 12 : 0)) * 60 + mm
    }
    setAlarms((as) => [...as, alarm].sort((a, b) => minutes(a) - minutes(b)))
    setAdding(false)
    setNewLabel('')
  }

  return (
    <AppScreen>
      <header className="flex items-center justify-between px-4 pt-[58px]">
        <GlassButton label={editing ? 'Done editing' : 'Edit alarms'} onClick={() => setEditing((e) => !e)} className="px-4 text-[17px]">
          {editing ? 'Done' : 'Edit'}
        </GlassButton>
        <GlassButton icon={Plus} label="Add alarm" onClick={() => setAdding(true)} />
      </header>

      <ScrollArea className="pb-10">
        <h1 className="px-4 pt-2 text-[34px] font-bold">Alarms</h1>

        <section className="mt-4 px-4">
          <h2 className="flex items-center gap-1.5 text-[20px] font-semibold">
            <BedDouble className="size-5" aria-hidden />
            Sleep | Wake Up
          </h2>
          <div className="mt-2 flex items-center justify-between border-b border-white/15 pb-3">
            <p className="text-[15px] text-white/55">No Alarm</p>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[15px] font-semibold text-[#FF9F0A]">SET UP</span>
          </div>
        </section>

        <h2 className="mt-6 px-4 text-[20px] font-semibold">Other</h2>
        <ul className="mt-1">
          {alarms.map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-4">
              {editing && (
                <button
                  type="button"
                  onClick={() => setAlarms((as) => as.filter((x) => x.id !== a.id))}
                  aria-label={`Delete ${a.label} alarm`}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#FF453A]"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
              <div className="flex flex-1 items-center justify-between border-b border-white/15 py-2.5">
                <div className={cn('transition', !a.on && 'text-white/45')}>
                  <p className="leading-none">
                    <span className="text-[56px] font-light tracking-tight tabular-nums">{a.time}</span>
                    <span className="ml-1 text-[28px] font-light">{a.period}</span>
                  </p>
                  <p className="mt-0.5 text-[15px]">
                    {a.label}
                    {a.repeat ? `, ${a.repeat}` : ''}
                  </p>
                </div>
                {!editing && (
                  <Toggle
                    on={a.on}
                    label={`${a.time} ${a.period} ${a.label}`}
                    onChange={(v) => setAlarms((as) => as.map((x) => (x.id === a.id ? { ...x, on: v } : x)))}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>

      {adding && (
        <div className="absolute inset-0 z-40 flex items-end bg-black/50" onClick={() => setAdding(false)}>
          <div
            role="dialog"
            aria-label="Add Alarm"
            onClick={(e) => e.stopPropagation()}
            className="w-full animate-in rounded-t-[34px] bg-[#1c1c1e] px-4 pt-4 pb-12 slide-in-from-bottom duration-300"
          >
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setAdding(false)} className="text-[17px] text-[#FF9F0A]">
                Cancel
              </button>
              <p className="text-[17px] font-semibold">Add Alarm</p>
              <button type="button" onClick={add} className="text-[17px] font-semibold text-[#FF9F0A]">
                Save
              </button>
            </div>
            <label htmlFor="alarm-time" className="sr-only">
              Alarm time
            </label>
            <input
              id="alarm-time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="mt-6 w-full rounded-2xl bg-white/[0.06] py-4 text-center text-[44px] font-light text-white [color-scheme:dark] outline-none"
            />
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.06] px-4 py-3">
              <label htmlFor="alarm-label" className="text-[17px]">
                Label
              </label>
              <input
                id="alarm-label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Alarm"
                className="bg-transparent text-right text-[17px] text-white/70 outline-none placeholder:text-white/40"
              />
            </div>
          </div>
        </div>
      )}
    </AppScreen>
  )
}
