'use client'

import { useState } from 'react'
import { ChevronLeft, Search, Send } from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

type Message = { user: string; text: string; time: string }
type Chat = { id: string; name: string; avatar: string; preview: string; messages: Message[] }

const CHATS: Chat[] = [
  {
    id: 'jisoo',
    name: 'Jisoo Kim',
    avatar: photo(0),
    preview: 'are we still on for tonight??',
    messages: [
      { user: 'Jisoo', text: 'hey! are we still on for tonight??', time: '6:41 PM' },
      { user: 'me', text: 'yes, see you at 8 🍿', time: '6:43 PM' },
    ],
  },
  {
    id: 'movie-club',
    name: 'Movie Club',
    avatar: photo(3),
    preview: 'I’ll bring snacks at least',
    messages: [
      { user: 'Dohyun', text: 'ok what are we watching friday', time: '5:10 PM' },
      { user: 'Haneul', text: 'something scary pls 👻', time: '5:12 PM' },
      { user: 'Yuna', text: 'no 😭 last time i couldnt sleep', time: '5:15 PM' },
      { user: 'me', text: 'I’ll bring snacks at least', time: '5:18 PM' },
    ],
  },
]

export function DiscordApp() {
  const [chatId, setChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => Object.fromEntries(CHATS.map((chat) => [chat.id, chat.messages])))
  const [text, setText] = useState('')
  const chat = CHATS.find((item) => item.id === chatId)

  if (chat) {
    return (
      <AppScreen bg="#313338">
        <header className="flex items-center gap-3 border-b border-black/10 px-4 pt-[58px] pb-3">
          <button type="button" onClick={() => setChatId(null)} aria-label="Back to chats">
            <ChevronLeft className="size-7" />
          </button>
          <Avatar name={chat.name} src={chat.avatar} size={34} rounded="squircle" />
          <span className="text-[17px] font-semibold">{chat.name}</span>
          <Search className="ml-auto size-5 text-white/70" aria-hidden />
        </header>
        <ScrollArea className="px-4 py-4">
          <ul className="flex flex-col gap-4">
            {messages[chat.id].map((message, index) => {
              const mine = message.user === 'me'
              return (
                <li key={`${message.time}-${index}`} className={`flex items-start gap-3 ${mine ? 'flex-row-reverse' : ''}`}>
                  {!mine && <Avatar name={message.user} size={34} />}
                  <div className={`max-w-[80%] ${mine ? 'text-right' : ''}`}>
                    {!mine && <p className="mb-1 text-[12px] font-semibold text-white/60">{message.user}</p>}
                    <p className={`rounded-2xl px-3 py-2 text-left text-[14px] ${mine ? 'bg-[#5865F2] text-white' : 'bg-[#232428] text-white/90'}`}>{message.text}</p>
                    <p className="mt-1 text-[10px] text-white/40">{message.time}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </ScrollArea>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const value = text.trim()
            if (!value) return
            setMessages((current) => ({
              ...current,
              [chat.id]: [...current[chat.id], { user: 'me', text: value, time: 'Now' }],
            }))
            setText('')
          }}
          className="flex items-center gap-2 px-3 pt-2 pb-9"
        >
          <label htmlFor="discord-message" className="sr-only">Message {chat.name}</label>
          <input
            id="discord-message"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={`Message ${chat.name}`}
            className="h-11 min-w-0 flex-1 rounded-full bg-[#383A40] px-4 text-[15px] outline-none placeholder:text-white/45"
          />
          <button type="submit" aria-label="Send message" className="flex size-10 items-center justify-center rounded-full bg-[#5865F2]">
            <Send className="size-4" />
          </button>
        </form>
      </AppScreen>
    )
  }

  return (
    <AppScreen bg="#2B2D31">
      <header className="flex items-center justify-between px-5 pt-[62px] pb-4">
        <h1 className="text-[22px] font-bold">Messages</h1>
        <Search className="size-5 text-white/70" aria-hidden />
      </header>
      <ScrollArea>
        <ul>
          {CHATS.map((item, index) => (
            <li key={item.id}>
              <button type="button" onClick={() => setChatId(item.id)} className="flex w-full items-center gap-3 px-5 py-3 text-left active:bg-white/5">
                <span className="relative">
                  <Avatar name={item.name} src={item.avatar} size={52} rounded="squircle" />
                  {index === 0 && <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-[#2B2D31] bg-[#23A55A]" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold">{item.name}</span>
                  <span className="block truncate text-[13px] text-white/55">{item.preview}</span>
                </span>
                <span className="size-2 rounded-full bg-[#5865F2]" aria-label="Unread" />
              </button>
              </li>
          ))}
        </ul>
      </ScrollArea>
    </AppScreen>
  )
}
