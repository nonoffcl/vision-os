import { useState } from 'react'
import { Bell, CalendarDays, ChevronLeft, CircleUserRound, Clapperboard, Home, Info, Music2, Play, Plus, Search, UserRound, Video } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { usePhone } from '@/lib/ios-context'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const PROFILE_TABS = ['Home', 'About', 'Schedule', 'Videos', 'Clips'] as const
type ProfileTab = (typeof PROFILE_TABS)[number]

export function TwitchApp() {
  const { goHome } = usePhone()
  const [activeTab, setActiveTab] = useState<ProfileTab>('Home')

  return (
    <AppScreen bg="#0E0E10">
      <ScrollArea className="pb-[92px]">
        <section className="relative h-[198px]">
          <img src={photo(5)} alt="" className="size-full object-cover" />
          <span className="absolute inset-0 bg-gradient-to-b from-[#F18CA8]/60 via-[#99436F]/30 to-black/20" />
          <div className="absolute inset-x-4 top-[56px] flex items-center justify-between">
            <button type="button" onClick={goHome} aria-label="Back to Home" className="flex size-8 items-center justify-center rounded-full bg-black/45"><ChevronLeft className="size-5" /></button>
            <button type="button" className="rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-semibold">Edit Profile</button>
          </div>
          <Avatar name="Katastrophic Kimm" src={photo(4)} size={80} className="absolute bottom-[-34px] left-4 border-2 border-[#0E0E10]" />
        </section>

        <div className="px-4 pt-10">
          <h1 className="text-[21px] font-bold leading-tight">katastrophickimm</h1>
          <p className="mt-0.5 text-[12px] text-white/55">Last live 20h ago</p>
          <p className="mt-4 text-[13px] leading-[1.45] text-white/80">🎮 Mom &amp; Fortnite Gamer 🏆✨ New Streamer ✨🎮<br />Cashapp Donations $Katastrophickimm 🐻</p>
          <p className="mt-3 text-[13px] font-semibold">29 followers</p>
          <div className="mt-2 flex items-center gap-2 text-[12px] text-[#D6B5FF]"><Music2 className="size-4" />TikTok</div>
          <button type="button" className="mt-3 flex h-8 w-full items-center justify-center rounded-[4px] bg-[#29272E] text-[12px] font-semibold">Stream Manager</button>
        </div>

        <nav aria-label="Profile sections" className="no-scrollbar mt-3 flex h-10 items-stretch justify-between overflow-x-auto border-b border-white/10 px-3">
          {PROFILE_TABS.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative shrink-0 px-2 text-[13px] font-semibold ${activeTab === tab ? 'text-[#BF94FF]' : 'text-white/70'}`}>
              {tab}
              {activeTab === tab && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#BF94FF]" />}
            </button>
          ))}
        </nav>

        {activeTab === 'Home' ? <ProfileHome /> : <ProfileTabContent tab={activeTab} />}
      </ScrollArea>

      <nav aria-label="Twitch navigation" className="absolute inset-x-0 bottom-0 z-10 flex h-[76px] items-start justify-around border-t border-white/10 bg-[#111114] pt-2 text-[10px] text-white/75">
        <BottomItem icon={Home} label="Home" />
        <BottomItem icon={Search} label="Browse" />
        <button type="button" aria-label="Create" className="-mt-1 flex size-10 items-center justify-center rounded-full bg-[#29272E]"><Plus className="size-6" /></button>
        <BottomItem icon={Bell} label="Activity" />
        <BottomItem icon={UserRound} label="Profile" active />
      </nav>
    </AppScreen>
  )
}

function ProfileHome() {
  return (
    <section className="px-3 pt-3">
      <button type="button" className="block w-full text-left">
        <div className="relative aspect-video overflow-hidden rounded-[3px] bg-[#202024]">
          <img src={photo(3)} alt="Recent Fortnite stream" className="size-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/10"><Play className="size-12 fill-white drop-shadow" /></span>
          <span className="absolute top-2 left-2 rounded-[3px] bg-black/70 px-1.5 py-0.5 text-[10px] font-medium">01:35:37</span>
          <span className="absolute bottom-2 left-2 rounded-[3px] bg-black/75 px-1.5 py-0.5 text-[10px]">3 views</span>
        </div>
        <p className="mt-2 text-[14px] font-semibold">Past Broadcast</p>
        <h2 className="mt-1 text-[15px] font-bold">Fortnite 🔥 Ranked Grind</h2>
        <p className="text-[12px] text-white/55">Fortnite · Yesterday</p>
      </button>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <StreamTile image={photo(1)} duration="01:06" icon={Video} />
        <StreamTile image={photo(6)} duration="27:00" icon={Clapperboard} />
      </div>
    </section>
  )
}

function StreamTile({ image, duration, icon: Icon }: { image: string; duration: string; icon: typeof Video }) {
  return (
    <button type="button" className="relative aspect-video overflow-hidden rounded-[3px] bg-[#202024] text-left">
      <img src={image} alt="" className="size-full object-cover" />
      <span className="absolute top-1.5 left-1.5 rounded-[3px] bg-black/70 px-1.5 py-0.5 text-[10px]">{duration}</span>
      <Icon className="absolute right-2 bottom-2 size-4 text-white drop-shadow" />
    </button>
  )
}

function BottomItem({ icon: Icon, label, active = false }: { icon: typeof Home; label: string; active?: boolean }) {
  return (
    <button type="button" aria-current={active ? 'page' : undefined} className={`flex min-w-12 flex-col items-center gap-1 ${active ? 'text-[#BF94FF]' : ''}`}>
      <Icon className="size-[21px]" />
      <span>{label}</span>
    </button>
  )
}

function ProfileTabContent({ tab }: { tab: Exclude<ProfileTab, 'Home'> }) {
  const icons = { About: Info, Schedule: CalendarDays, Videos: Video, Clips: Clapperboard }
  const Icon = icons[tab]
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center text-white/60">
      <Icon className="size-7" />
      <p className="mt-3 text-[14px]">{tab}</p>
    </div>
  )
}
