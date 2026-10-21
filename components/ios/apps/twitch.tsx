import { Compass, Heart, Inbox, MessageSquare, Search, User } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const LIVE = [
  { name: 'Faker', title: 'Ranked grind before Worlds 🏆', game: 'League of Legends', viewers: '84.2K', img: photo(3) },
  { name: 'Hanryang_', title: 'just chatting + coupang eats mukbang 🍗', game: 'Just Chatting', viewers: '12.4K', img: photo(5) },
  { name: 'seoulwalks', title: 'IRL rainy night walk in Hongdae ☔', game: 'IRL', viewers: '3.1K', img: photo(0) },
  { name: 'lofi_cafe_kr', title: 'study with me · 4hr pomodoro', game: 'Music', viewers: '1.8K', img: photo(1) },
]

const CATEGORIES = [
  { name: 'Just Chatting', viewers: '402K', img: photo(2) },
  { name: 'League of Legends', viewers: '211K', img: photo(3) },
  { name: 'VALORANT', viewers: '128K', img: photo(0) },
  { name: 'IRL', viewers: '64K', img: photo(7) },
]

export function TwitchApp() {
  return (
    <AppScreen bg="#0E0E10">
      <header className="flex items-center justify-between px-4 pt-[58px] pb-3">
        <Avatar name="Minji Park" src={photo(4)} size={30} />
        <h1 className="text-[22px] font-bold">Following</h1>
        <span className="flex gap-4">
          <Inbox className="size-6" aria-hidden />
          <MessageSquare className="size-6" aria-hidden />
        </span>
      </header>
      <ScrollArea className="pb-28">
        <h2 className="px-4 pb-2 text-[17px] font-bold">Live channels</h2>
        <ul className="flex flex-col gap-4 px-4">
          {LIVE.map((l) => (
            <li key={l.name} className="flex gap-3">
              <div className="relative w-[150px] shrink-0">
                <img src={l.img || '/placeholder.svg'} alt="" className="aspect-video w-full rounded-md object-cover" />
                <span className="absolute top-1.5 left-1.5 rounded bg-[#EB0400] px-1 text-[10px] font-bold">LIVE</span>
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1 text-[10px]">{l.viewers} viewers</span>
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[14px] font-semibold">
                  <Avatar name={l.name} size={18} />
                  {l.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[13px] text-white/75">{l.title}</p>
                <p className="mt-0.5 text-[12px] text-[#BF94FF]">{l.game}</p>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="px-4 pt-6 pb-2 text-[17px] font-bold">Categories you follow</h2>
        <ul className="no-scrollbar flex gap-3 overflow-x-auto px-4">
          {CATEGORIES.map((c) => (
            <li key={c.name} className="w-[110px] shrink-0">
              <img src={c.img || '/placeholder.svg'} alt="" className="aspect-[3/4] w-full rounded-md object-cover" />
              <p className="mt-1 truncate text-[13px] font-semibold">{c.name}</p>
              <p className="text-[12px] text-white/55">{c.viewers} viewers</p>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <nav className="absolute inset-x-0 bottom-0 flex justify-around border-t border-white/10 bg-[#18181B] pt-2.5 pb-8 text-[10px]">
        {[
          [Heart, 'Following', true],
          [Compass, 'Discover', false],
          [Search, 'Browse', false],
          [User, 'Activity', false],
        ].map(([I, l, a]) => {
          const Icon = I as typeof Heart
          return (
            <span key={l as string} className={`flex flex-col items-center gap-0.5 ${a ? 'text-[#BF94FF]' : 'text-white/55'}`}>
              <Icon className={`size-6 ${a ? 'fill-[#BF94FF]' : ''}`} aria-hidden />
              {l as string}
            </span>
          )
        })}
      </nav>
    </AppScreen>
  )
}
