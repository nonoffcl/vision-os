'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Cake,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Gift,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Music2,
  Pencil,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  User,
  UserPlus,
  Users,
  Video,
  X,
  Archive,
  Ellipsis,
  Smartphone,
} from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, BackButton, GlassButton, GlassTabBar, ScrollArea, type Tab } from '../primitives'

type Friend = { id: string; name: string; status?: string; music?: string; img?: string; bg: string; favorite?: boolean }
type Msg = { id: string; from: string; text: string; time: string }
type Chat = {
  id: string
  name?: string
  members: string[]
  kind: 'direct' | 'group' | 'channel' | 'self'
  messages: Msg[]
  unread: number
  pinned?: boolean
  muted?: boolean
}

const FRIENDS: Friend[] = [
  { id: 'jisoo', name: 'Jisoo 지수', status: '🎂 birthday girl', music: 'Golden', img: photo(0), bg: photo(0), favorite: true },
  { id: 'haneul', name: 'Haneul', status: 'han river > everything', img: photo(2), bg: photo(2), favorite: true },
  { id: 'mom', name: 'Mom 엄마', status: '건강이 최고', bg: photo(7), favorite: true },
  { id: 'dohyun', name: 'Dohyun Lee', status: 'concert recovery mode 🎤', music: 'Supernova', bg: photo(3) },
  { id: 'yuna', name: 'Yuna Choi', status: '📚 exam season', img: photo(1), bg: photo(1) },
  { id: 'sungmin', name: 'Sungmin Park', status: 'gym 6am', bg: photo(7) },
  { id: 'dad', name: 'Dad 아빠', bg: photo(4) },
  { id: 'eunji', name: 'Eunji', status: 'jeju 🍊', bg: photo(4) },
  { id: 'taeyang', name: 'Taeyang Kim', status: 'busy', bg: photo(0) },
  { id: 'seoyeon', name: 'Seoyeon', status: 'coffee addict ☕', music: 'Ditto', img: photo(1), bg: photo(1) },
  { id: 'minho', name: 'Minho', bg: photo(5) },
  { id: 'sora', name: 'Sora Han', status: 'film photography 📷', bg: photo(6) },
]

const ME: Friend = { id: 'me', name: USER.name, status: USER.status, music: 'Golden', img: photo(4), bg: photo(4) }
const findFriend = (id: string) => (id === 'me' ? ME : FRIENDS.find((f) => f.id === id)!)

const m = (id: string, from: string, text: string, time: string): Msg => ({ id, from, text, time })

const INITIAL_CHATS: Chat[] = [
  {
    id: 'c-jisoo',
    members: ['jisoo'],
    kind: 'direct',
    pinned: true,
    unread: 2,
    messages: [
      m('1', 'me', 'happy birthday jisoo!! 🎉🎂', '9:02 AM'),
      m('2', 'jisoo', 'THANK YOUUU 🥹💛', '9:15 AM'),
      m('3', 'me', 'dinner + movie tonight right?', '9:16 AM'),
      m('4', 'jisoo', 'yesss 8pm at CGV', '6:40 PM'),
      m('5', 'jisoo', 'are we still on for tonight?? 🍿', '6:41 PM'),
    ],
  },
  {
    id: 'c-movie',
    name: '🎬 Movie Club',
    members: ['jisoo', 'haneul', 'dohyun', 'yuna'],
    kind: 'group',
    unread: 5,
    messages: [
      m('1', 'dohyun', 'ok what are we watching friday', '5:10 PM'),
      m('2', 'haneul', 'something scary pls 👻', '5:12 PM'),
      m('3', 'yuna', 'no 😭 last time i couldnt sleep', '5:12 PM'),
      m('4', 'jisoo', 'its my bday i pick 😤', '5:20 PM'),
      m('5', 'jisoo', 'logging it on letterboxd after obviously', '5:21 PM'),
    ],
  },
  {
    id: 'c-family',
    name: 'Family 가족 ❤️',
    members: ['mom', 'dad', 'minho'],
    kind: 'group',
    unread: 3,
    messages: [
      m('1', 'mom', '밥 먹었니?', '12:30 PM'),
      m('2', 'me', '응 먹었어!', '12:45 PM'),
      m('3', 'dad', '이번 주말에 집에 오니?', '3:02 PM'),
      m('4', 'minho', 'noona bring chicken 🍗', '3:05 PM'),
      m('5', 'mom', '조심히 다녀 💐', '4:11 PM'),
    ],
  },
  {
    id: 'c-uni',
    name: 'Uni friends 22학번',
    members: ['yuna', 'sungmin', 'eunji', 'taeyang', 'seoyeon', 'sora', 'minho'],
    kind: 'group',
    muted: true,
    unread: 128,
    messages: [
      m('1', 'sungmin', 'who has the notes from tuesday', '2:15 PM'),
      m('2', 'seoyeon', 'me! sending now', '2:16 PM'),
      m('3', 'eunji', 'lifesaver 🙏', '2:20 PM'),
      m('4', 'taeyang', 'study cafe tomorrow 10am?', '4:58 PM'),
    ],
  },
  {
    id: 'c-haneul',
    members: ['haneul'],
    kind: 'direct',
    unread: 0,
    messages: [
      m('1', 'haneul', 'sent you the picnic pics!', 'Yesterday'),
      m('2', 'me', 'omg they look so good', 'Yesterday'),
    ],
  },
  {
    id: 'c-me',
    members: ['me'],
    kind: 'self',
    unread: 0,
    messages: [m('1', 'me', 'buy gift for jisoo 🎁\ncall dentist\nreturn library books', 'Mon')],
  },
  {
    id: 'c-dohyun',
    members: ['dohyun'],
    kind: 'direct',
    unread: 0,
    messages: [m('1', 'dohyun', 'that concert was insane', 'Sun'), m('2', 'me', 'my ears are still ringing lol', 'Sun')],
  },
  {
    id: 'c-pay',
    name: 'kakaopay',
    members: [],
    kind: 'channel',
    unread: 1,
    messages: [m('1', 'kakaopay', 'You received ₩15,000 from Haneul.', 'Sat')],
  },
  {
    id: 'c-starbucks',
    name: 'Starbucks Korea',
    members: [],
    kind: 'channel',
    unread: 0,
    messages: [m('1', 'Starbucks Korea', '🎃 New autumn drinks are here! Get a free size-up this week.', 'Fri')],
  },
]

const REPLIES = ['ㅋㅋㅋㅋㅋ', 'omg yes', 'wait really?', 'okok 👍', 'hahaha', 'I’m on my way!', 'love that 💛', 'ㅇㅋ']

type TabId = 'friends' | 'chats' | 'openchat' | 'more'
const TABS: Tab<TabId>[] = [
  { id: 'friends', label: 'Friends', icon: User },
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'openchat', label: 'Open Chat', icon: MessagesSquare },
  { id: 'more', label: 'More', icon: Ellipsis },
]

type View = { type: 'tabs' } | { type: 'profile'; id: string } | { type: 'chat'; id: string }

export function KakaoTalkApp() {
  const [tab, setTab] = useState<TabId>('chats')
  const [view, setView] = useState<View>({ type: 'tabs' })
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS)

  const openChat = (id: string) => {
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
    setView({ type: 'chat', id })
  }

  const startDirect = (friendId: string) => {
    const existing = chats.find((c) => (c.kind === 'direct' || c.kind === 'self') && c.members[0] === friendId)
    if (existing) return openChat(existing.id)
    const id = `c-${friendId}-${Date.now()}`
    setChats((cs) => [{ id, members: [friendId], kind: 'direct', unread: 0, messages: [] }, ...cs])
    setView({ type: 'chat', id })
  }

  const send = (chatId: string, text: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, m(String(Date.now()), 'me', text, time)] } : c)))
    const chat = chats.find((c) => c.id === chatId)
    if (!chat || chat.kind === 'channel' || chat.kind === 'self') return
    const responder = chat.members[Math.floor(Math.random() * chat.members.length)]
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
      setChats((cs) =>
        cs.map((c) => (c.id === chatId ? { ...c, messages: [...c.messages, m(String(Date.now()), responder, reply, time)] } : c)),
      )
    }, 1400)
  }

  if (view.type === 'profile') {
    return (
      <ProfileView
        friend={findFriend(view.id)}
        onClose={() => setView({ type: 'tabs' })}
        onChat={() => startDirect(view.id)}
      />
    )
  }

  if (view.type === 'chat') {
    const chat = chats.find((c) => c.id === view.id)!
    return (
      <ChatRoom
        chat={chat}
        onBack={() => setView({ type: 'tabs' })}
        onSend={(t) => send(chat.id, t)}
        onProfile={(id) => setView({ type: 'profile', id })}
      />
    )
  }

  const totalUnread = chats.reduce((s, c) => s + (c.muted ? 0 : c.unread), 0)

  return (
    <AppScreen bg="#111">
      {tab === 'friends' && <FriendsTab onProfile={(id) => setView({ type: 'profile', id })} />}
      {tab === 'chats' && <ChatsTab chats={chats} onOpen={openChat} />}
      {tab === 'openchat' && <OpenChatTab />}
      {tab === 'more' && <MoreTab onProfile={() => setView({ type: 'profile', id: 'me' })} />}
      <GlassTabBar
        tabs={TABS.map((t) => (t.id === 'chats' && totalUnread ? { ...t, label: `Chats · ${totalUnread}` } : t))}
        active={tab}
        onChange={setTab}
        accent="#FEE500"
      />
    </AppScreen>
  )
}

function TabHeader({ title, icons }: { title: string; icons: React.ComponentType<{ className?: string }>[] }) {
  return (
    <header className="flex items-center justify-between px-5 pt-[62px] pb-3">
      <h1 className="text-[24px] font-bold">{title}</h1>
      <span className="flex items-center gap-4">
        {icons.map((I, i) => (
          <I key={i} className="size-[22px] text-white/90" />
        ))}
      </span>
    </header>
  )
}

function FriendRow({ f, size = 44, onClick }: { f: Friend; size?: number; onClick: () => void }) {
  return (
    <li>
      <button type="button" onClick={onClick} className="flex w-full items-center gap-3 px-5 py-2 text-left active:bg-white/5">
        <Avatar name={f.name} size={size} src={f.img} rounded="squircle" />
        <span className="min-w-0 flex-1">
          <span className={cn('block truncate', size > 50 ? 'text-[17px] font-semibold' : 'text-[15px]')}>{f.name}</span>
          {f.status && <span className="block truncate text-[12px] text-white/50">{f.status}</span>}
        </span>
        {f.music && (
          <span className="flex max-w-[110px] items-center gap-1 rounded-full border border-[#1ED760]/50 px-2 py-0.5 text-[11px] text-[#1ED760]">
            <Music2 className="size-3 shrink-0" aria-hidden />
            <span className="truncate">{f.music}</span>
          </span>
        )}
      </button>
    </li>
  )
}

function FriendsTab({ onProfile }: { onProfile: (id: string) => void }) {
  const favorites = FRIENDS.filter((f) => f.favorite)
  return (
    <ScrollArea className="pb-28">
      <TabHeader title="Friends" icons={[Search, UserPlus, Music2, Settings]} />
      <ul>
        <FriendRow f={ME} size={58} onClick={() => onProfile('me')} />
      </ul>
      <div className="mx-5 my-2 h-px bg-white/10" />

      <button
        type="button"
        onClick={() => onProfile('jisoo')}
        className="mx-5 mb-2 flex w-[calc(100%-40px)] items-center gap-3 rounded-2xl bg-white/[0.06] p-3 text-left"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-[#FF375F]/20">
          <Cake className="size-5 text-[#FF375F]" aria-hidden />
        </span>
        <span className="flex-1">
          <span className="block text-[14px] font-semibold">Jisoo&apos;s birthday is today</span>
          <span className="block text-[12px] text-white/50">Send a gift or a message 🎁</span>
        </span>
        <ChevronRight className="size-4 text-white/40" aria-hidden />
      </button>

      <p className="px-5 pt-3 pb-1 text-[12px] text-white/50">Favorites {favorites.length}</p>
      <ul>
        {favorites.map((f) => (
          <FriendRow key={f.id} f={f} onClick={() => onProfile(f.id)} />
        ))}
      </ul>
      <p className="px-5 pt-4 pb-1 text-[12px] text-white/50">Friends {FRIENDS.length}</p>
      <ul>
        {FRIENDS.map((f) => (
          <FriendRow key={f.id} f={f} onClick={() => onProfile(f.id)} />
        ))}
      </ul>
    </ScrollArea>
  )
}

function ChatAvatar({ chat, size = 50 }: { chat: Chat; size?: number }) {
  if (chat.kind === 'channel') {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-[38%] text-[13px] font-black"
        style={{
          width: size,
          height: size,
          background: chat.name === 'kakaopay' ? '#FEE500' : '#00704A',
          color: chat.name === 'kakaopay' ? '#000' : '#fff',
        }}
      >
        {chat.name === 'kakaopay' ? 'pay' : '★'}
      </span>
    )
  }
  if (chat.kind === 'group') {
    const ms = chat.members.slice(0, 4).map(findFriend)
    return (
      <span className="grid shrink-0 grid-cols-2 gap-[2px] overflow-hidden rounded-[38%]" style={{ width: size, height: size }}>
        {ms.map((f, i) => (
          <span key={f.id} className={cn(ms.length === 3 && i === 0 && 'col-span-2')}>
            <Avatar name={f.name} src={f.img} size={size / 2} rounded="squircle" className="!size-full rounded-none" />
          </span>
        ))}
      </span>
    )
  }
  const f = findFriend(chat.members[0])
  return <Avatar name={f.name} src={f.img} size={size} rounded="squircle" />
}

const chatTitle = (c: Chat) =>
  c.name ?? (c.kind === 'self' ? `${USER.firstName} (Me)` : c.members.map((id) => findFriend(id).name).join(', '))

function ChatsTab({ chats, onOpen }: { chats: Chat[]; onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'group' | 'channel'>('all')
  const visible = chats
    .filter((c) => {
      if (filter === 'unread') return c.unread > 0
      if (filter === 'group') return c.kind === 'group'
      if (filter === 'channel') return c.kind === 'channel'
      return true
    })
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))

  return (
    <ScrollArea className="pb-28">
      <TabHeader title="Chats" icons={[Search, Plus, Settings]} />
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3">
        {(
          [
            ['all', 'All'],
            ['unread', 'Unread'],
            ['group', 'Groups'],
            ['channel', 'Channels'],
          ] as const
        ).map(([id, l]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              'shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium',
              filter === id ? 'bg-white text-black' : 'bg-white/10 text-white/80',
            )}
          >
            {l}
          </button>
        ))}
      </div>
      <ul>
        {visible.map((c) => {
          const last = c.messages.at(-1)
          return (
            <li key={c.id}>
              <button type="button" onClick={() => onOpen(c.id)} className="flex w-full items-center gap-3 px-5 py-2.5 text-left active:bg-white/5">
                <ChatAvatar chat={c} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[15px] font-semibold">{chatTitle(c)}</span>
                    {c.kind === 'group' && <span className="text-[14px] text-white/40">{c.members.length + 1}</span>}
                    {c.muted && <Bell className="size-3 text-white/40 line-through" aria-label="Muted" />}
                  </span>
                  <span className="line-clamp-1 text-[13px] text-white/55">{last?.text ?? 'Start a conversation'}</span>
                </span>
                <span className="flex flex-col items-end gap-1.5 self-start pt-0.5">
                  <span className="text-[11px] text-white/40">{last?.time}</span>
                  {c.unread > 0 && (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF5A3C] px-1.5 text-[11px] font-semibold">
                      {c.unread > 99 ? '99+' : c.unread}
                    </span>
                  )}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </ScrollArea>
  )
}

function ChatRoom({
  chat,
  onBack,
  onSend,
  onProfile,
}: {
  chat: Chat
  onBack: () => void
  onSend: (t: string) => void
  onProfile: (id: string) => void
}) {
  const [text, setText] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [chat.messages.length])

  const submit = () => {
    if (!text.trim()) return
    onSend(text.trim())
    setText('')
  }

  return (
    <AppScreen bg="#1B2836">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center gap-2 bg-gradient-to-b from-[#1B2836] via-[#1B2836]/90 to-transparent px-3 pt-[56px] pb-4">
        <BackButton onClick={onBack} />
        <div className="glass min-w-0 flex-1 rounded-full px-4 py-1.5 text-center">
          <p className="truncate text-[15px] font-semibold">{chatTitle(chat)}</p>
          {chat.kind === 'group' && <p className="text-[11px] text-white/55">{chat.members.length + 1} members</p>}
        </div>
        <GlassButton icon={Search} label="Search chat" />
        <GlassButton icon={Menu} label="Chat menu" />
      </header>

      <ScrollArea className="px-3 pt-[120px] pb-3">
        <p className="mx-auto mb-4 w-fit rounded-full bg-black/25 px-3 py-1 text-[11px] text-white/70">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <ul className="flex flex-col gap-1.5">
          {chat.messages.map((msg, i) => {
            const prev = chat.messages[i - 1]
            const next = chat.messages[i + 1]
            const mine = msg.from === 'me'
            const firstOfRun = !prev || prev.from !== msg.from
            const lastOfRun = !next || next.from !== msg.from || next.time !== msg.time
            const sender = !mine && chat.kind !== 'channel' ? findFriend(msg.from) : null
            const isLastMine = mine && i === chat.messages.length - 1 && chat.kind !== 'self'

            if (mine) {
              return (
                <li key={msg.id} className={cn('flex items-end justify-end gap-1.5', firstOfRun && 'mt-2')}>
                  <span className="flex flex-col items-end text-[10px] leading-tight">
                    {isLastMine && <span className="font-semibold text-[#FEE500]">1</span>}
                    {lastOfRun && <span className="text-white/45">{msg.time}</span>}
                  </span>
                  <p className="max-w-[72%] rounded-[16px] rounded-tr-[4px] bg-[#FEE500] px-3 py-2 text-[15px] whitespace-pre-line text-black">
                    {msg.text}
                  </p>
                </li>
              )
            }
            return (
              <li key={msg.id} className={cn('flex gap-2', firstOfRun && 'mt-2')}>
                <span className="w-10 shrink-0">
                  {firstOfRun &&
                    (sender ? (
                      <button type="button" onClick={() => onProfile(sender.id)} aria-label={`View ${sender.name}'s profile`}>
                        <Avatar name={sender.name} src={sender.img} size={40} rounded="squircle" />
                      </button>
                    ) : (
                      <ChatAvatar chat={chat} size={40} />
                    ))}
                </span>
                <span className="flex min-w-0 flex-col">
                  {firstOfRun && <span className="mb-1 text-[12px] text-white/70">{sender?.name ?? chat.name}</span>}
                  <span className="flex items-end gap-1.5">
                    <p className="max-w-[230px] rounded-[16px] rounded-tl-[4px] bg-[#3A3F47] px-3 py-2 text-[15px] whitespace-pre-line">
                      {msg.text}
                    </p>
                    {lastOfRun && <span className="shrink-0 text-[10px] text-white/45">{msg.time}</span>}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
        <div ref={endRef} />
      </ScrollArea>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="flex items-center gap-2 px-3 pt-2 pb-9"
      >
        <GlassButton icon={Plus} label="Attach" />
        <div className="glass flex min-w-0 flex-1 items-center rounded-full pr-1 pl-4">
          <label htmlFor="kakao-input" className="sr-only">
            Message
          </label>
          <input
            id="kakao-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
            }}
            placeholder="Message"
            className="h-11 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-white/45"
          />
          {text.trim() ? (
            <button type="submit" aria-label="Send" className="flex size-9 items-center justify-center rounded-full bg-[#FEE500] text-black">
              <Send className="size-4" />
            </button>
          ) : (
            <Smile className="mr-2 size-6 text-white/70" aria-hidden />
          )}
        </div>
      </form>
    </AppScreen>
  )
}

function ProfileView({ friend, onClose, onChat }: { friend: Friend; onClose: () => void; onChat: () => void }) {
  const isMe = friend.id === 'me'
  const actions = isMe
    ? [
        { icon: MessageCircle, label: 'My Chatroom', onClick: onChat },
        { icon: Pencil, label: 'Edit Profile' },
        { icon: Archive, label: 'Kakao Story' },
      ]
    : [
        { icon: MessageCircle, label: '1:1 Chat', onClick: onChat },
        { icon: Phone, label: 'Voice Talk' },
        { icon: Video, label: 'Face Talk' },
      ]
  return (
    <AppScreen className="animate-in fade-in slide-in-from-bottom-8 duration-300">
      <img src={friend.bg || '/placeholder.svg'} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
      <header className="relative flex items-center justify-between px-4 pt-[58px]">
        <GlassButton icon={X} label="Close profile" onClick={onClose} />
        <span className="flex gap-2">
          <GlassButton icon={Gift} label="Send gift" />
          <GlassButton icon={Settings} label="Profile settings" />
        </span>
      </header>
      <div className="relative mt-auto flex flex-col items-center px-6 pb-8">
        <Avatar name={friend.name} src={friend.img} size={104} rounded="squircle" className="ring-2 ring-white/20" />
        <h2 className="mt-3 text-[22px] font-bold">{friend.name}</h2>
        {friend.status && <p className="mt-1 text-[14px] text-white/75">{friend.status}</p>}
        {friend.music && (
          <span className="glass mt-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px]">
            <Music2 className="size-3.5 text-[#1ED760]" aria-hidden />
            {friend.music}
          </span>
        )}
        <div className="mt-6 h-px w-full bg-white/15" />
        <div className="mt-5 flex w-full justify-around pb-6">
          {actions.map((a) => (
            <button key={a.label} type="button" onClick={a.onClick} className="flex flex-col items-center gap-2 text-[12px]">
              <span className="glass flex size-14 items-center justify-center rounded-full">
                <a.icon className="size-6" aria-hidden />
              </span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </AppScreen>
  )
}

function OpenChatTab() {
  const rooms = [
    ['K-pop dance covers 🕺', '1,204 members · "who’s learning Golden?"', 3],
    ['Seoul cafe hunters ☕', '856 members · "new spot in Seongsu!!"', 1],
    ['Letterboxd Korea 🎬', '432 members · "rate the new Bong Joon-ho"', 4],
    ['Study with me 📚', '3,021 members · "pomodoro starts in 5"', 2],
    ['Jeju travel tips 🍊', '689 members · "best hanok stays?"', 5],
  ] as const
  return (
    <ScrollArea className="pb-28">
      <TabHeader title="Open Chat" icons={[Search, Plus]} />
      <div className="mx-5 mb-4 overflow-hidden rounded-2xl">
        <img src={photo(3) || '/placeholder.svg'} alt="" className="h-32 w-full object-cover" />
        <div className="bg-white/[0.06] p-3">
          <p className="text-[15px] font-semibold">Trending now</p>
          <p className="text-[12px] text-white/55">Join live conversations about concerts this weekend</p>
        </div>
      </div>
      <p className="px-5 pb-2 text-[12px] text-white/50">My Open Chats</p>
      <ul>
        {rooms.map(([name, sub, p]) => (
          <li key={name} className="flex items-center gap-3 px-5 py-2.5">
            <img src={photo(p) || '/placeholder.svg'} alt="" className="size-[50px] rounded-[38%] object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold">{name}</span>
              <span className="block truncate text-[13px] text-white/55">{sub}</span>
            </span>
            <Users className="size-4 text-white/35" aria-hidden />
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}

function MoreTab({ onProfile }: { onProfile: () => void }) {
  const services = [
    [Mail, 'Mail'],
    [CalendarDays, 'Calendar'],
    [Archive, 'Drawer'],
    [CreditCard, 'Pay'],
    [Gift, 'Gifts'],
    [Smile, 'Emoticons'],
    [Smartphone, 'Wallet'],
    [Bell, 'Notices'],
  ] as const
  return (
    <ScrollArea className="pb-28">
      <TabHeader title="More" icons={[Search, Settings]} />
      <button type="button" onClick={onProfile} className="mx-5 flex w-[calc(100%-40px)] items-center gap-3 rounded-2xl bg-white/[0.06] p-3 text-left">
        <Avatar name={ME.name} src={ME.img} size={48} rounded="squircle" />
        <span className="flex-1">
          <span className="block text-[16px] font-semibold">{ME.name}</span>
          <span className="block text-[12px] text-white/55">{USER.appleId.replace('icloud.com', 'kakao.com')}</span>
        </span>
        <ChevronRight className="size-4 text-white/40" aria-hidden />
      </button>
      <div className="mx-5 mt-4 rounded-2xl bg-white/[0.06] p-4">
        <p className="text-[12px] text-white/55">kakaopay balance</p>
        <p className="text-[22px] font-bold">₩248,500</p>
      </div>
      <ul className="mt-4 grid grid-cols-4 gap-y-5 px-5">
        {services.map(([I, l]) => (
          <li key={l} className="flex flex-col items-center gap-1.5 text-[12px] text-white/85">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.08]">
              <I className="size-6" aria-hidden />
            </span>
            {l}
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
