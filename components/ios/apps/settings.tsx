import {
  Accessibility,
  AlarmClock,
  Antenna,
  BatteryFull,
  Bell,
  Bluetooth,
  Camera,
  ChevronRight,
  Cloud,
  Gamepad2,
  Hand,
  Hourglass,
  LayoutGrid,
  Link2,
  Mic,
  Moon,
  Plane,
  ScanFace,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Volume2,
  Wallet,
  Wallpaper,
  Wifi,
  type LucideIcon,
} from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { AppScreen, Avatar, ScrollArea, Toggle } from '../primitives'

type Row = { icon: LucideIcon; color: string; label: string; value?: string; toggle?: boolean }

const GROUPS: Row[][] = [
  [
    { icon: Plane, color: '#FF9F0A', label: 'Airplane Mode', toggle: true },
    { icon: Wifi, color: '#0A84FF', label: 'Wi-Fi', value: 'Minji_5G' },
    { icon: Bluetooth, color: '#0A84FF', label: 'Bluetooth', value: 'On' },
    { icon: Antenna, color: '#30D158', label: 'Cellular' },
    { icon: Link2, color: '#30D158', label: 'Personal Hotspot', value: 'Off' },
    { icon: BatteryFull, color: '#30D158', label: 'Battery' },
  ],
  [
    { icon: Settings, color: '#8E8E93', label: 'General' },
    { icon: Accessibility, color: '#0A84FF', label: 'Accessibility' },
    { icon: Hand, color: '#0A84FF', label: 'Action Button' },
    { icon: Sparkles, color: '#5E5CE6', label: 'Apple Intelligence & Siri' },
    { icon: Camera, color: '#8E8E93', label: 'Camera' },
    { icon: SlidersHorizontal, color: '#8E8E93', label: 'Control Center' },
    { icon: Sun, color: '#0A84FF', label: 'Display & Brightness' },
    { icon: LayoutGrid, color: '#5E5CE6', label: 'Home Screen & App Library' },
    { icon: Search, color: '#8E8E93', label: 'Search' },
    { icon: AlarmClock, color: '#1c1c1e', label: 'StandBy' },
    { icon: Wallpaper, color: '#64D2FF', label: 'Wallpaper' },
  ],
  [
    { icon: Bell, color: '#FF453A', label: 'Notifications' },
    { icon: Volume2, color: '#FF375F', label: 'Sounds & Haptics' },
    { icon: Moon, color: '#5E5CE6', label: 'Focus' },
    { icon: Hourglass, color: '#5E5CE6', label: 'Screen Time' },
  ],
  [
    { icon: ScanFace, color: '#30D158', label: 'Face ID & Passcode' },
    { icon: Mic, color: '#FF453A', label: 'Emergency SOS' },
    { icon: Hand, color: '#0A84FF', label: 'Privacy & Security' },
  ],
  [
    { icon: Gamepad2, color: '#FF375F', label: 'Game Center' },
    { icon: Cloud, color: '#0A84FF', label: 'iCloud', value: '200 GB' },
    { icon: Wallet, color: '#1c1c1e', label: 'Wallet & Apple Pay' },
  ],
  [{ icon: LayoutGrid, color: '#5E5CE6', label: 'Apps' }],
]

export function SettingsApp() {
  return (
    <AppScreen>
      <ScrollArea className="cursor-default pt-[64px] pb-12 select-none">
        <h1 className="px-5 text-[34px] font-bold">Settings</h1>
        <div className="mx-4 mt-2 flex items-center gap-2 rounded-[12px] bg-[#1c1c1e] px-3 py-2 text-[17px] text-white/45">
          <Search className="size-4" aria-hidden />
          Search
          <Mic className="ml-auto size-4" aria-hidden />
        </div>

        <div className="mx-4 mt-5 overflow-hidden rounded-[26px] bg-[#1c1c1e]">
          <div className="flex items-center gap-3.5 px-4 py-3">
            <Avatar name={USER.name} size={60} src={photo(4)} />
            <div className="min-w-0 flex-1">
              <p className="text-[20px] font-semibold">{USER.name}</p>
              <p className="text-[13px] text-white/55">Apple Account, iCloud+, and more</p>
            </div>
            <ChevronRight className="size-5 text-white/30" aria-hidden />
          </div>
          <div className="ml-4 h-px bg-white/10" />
          <div className="flex items-center justify-between px-4 py-3 text-[17px]">
            <span>Family</span>
            <span className="flex items-center -space-x-2">
              {['Mom 엄마', 'Dad 아빠', 'Minho'].map((n) => (
                <Avatar key={n} name={n} size={28} className="ring-2 ring-[#1c1c1e]" />
              ))}
              <ChevronRight className="ml-3 size-5 text-white/30" aria-hidden />
            </span>
          </div>
        </div>

        <div className="mx-4 mt-5 rounded-[26px] bg-[#1c1c1e] px-4 py-3">
          <p className="text-[17px]">iCloud storage almost full</p>
          <p className="mt-0.5 text-[13px] text-white/55">{USER.appleId} · 184.2 GB of 200 GB used</p>
          <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10">
            <span className="w-[52%] bg-[#FF9F0A]" />
            <span className="w-[24%] bg-[#0A84FF]" />
            <span className="w-[16%] bg-[#30D158]" />
          </div>
        </div>

        {GROUPS.map((group, gi) => (
          <ul key={gi} className="mx-4 mt-5 overflow-hidden rounded-[26px] bg-[#1c1c1e]">
            {group.map((r, i) => (
              <li key={r.label} className="flex items-center gap-3.5 pl-4">
                <span className="flex size-[30px] items-center justify-center rounded-[8px]" style={{ background: r.color }}>
                  <r.icon className="size-[18px] text-white" aria-hidden />
                </span>
                <span className={`flex flex-1 items-center justify-between py-3 pr-4 ${i < group.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="text-[17px]">{r.label}</span>
                  {r.toggle ? (
                    <Toggle on={false} label={r.label} readOnly />
                  ) : (
                    <span className="flex items-center gap-1.5 text-[17px] text-white/50">
                      {r.value}
                      <ChevronRight className="size-5 text-white/30" aria-hidden />
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </ScrollArea>
    </AppScreen>
  )
}
