import { Bike, ChevronDown, Coffee, Drumstick, Fish, Heart, Home, Pizza, Receipt, Sandwich, Search, Soup, Star, User, UtensilsCrossed } from 'lucide-react'
import { photo } from '@/lib/ios-data'
import { AppScreen, ScrollArea } from '../primitives'

const CATEGORIES = [
  [Drumstick, 'Chicken'],
  [Pizza, 'Pizza'],
  [Soup, 'Korean'],
  [UtensilsCrossed, 'Chinese'],
  [Sandwich, 'Burger'],
  [Fish, 'Japanese'],
  [Coffee, 'Cafe'],
  [Bike, 'Express'],
] as const

const RESTAURANTS = [
  { name: 'BBQ Chicken 홍대점', img: photo(5), rating: 4.9, reviews: '12,401', time: '18-28 min', fee: 'Free delivery', tags: 'Chicken · Fried' },
  { name: 'Onion Bakery 성수', img: photo(1), rating: 4.8, reviews: '3,210', time: '25-35 min', fee: '₩1,500', tags: 'Cafe · Bakery' },
  { name: '엽기떡볶이 신촌', img: photo(5), rating: 4.7, reviews: '8,932', time: '20-30 min', fee: 'Free delivery', tags: 'Bunsik · Spicy' },
  { name: 'Han River Kimbap', img: photo(2), rating: 4.6, reviews: '1,104', time: '15-25 min', fee: '₩2,000', tags: 'Korean · Snacks' },
]

export function CoupangApp() {
  return (
    <AppScreen bg="#0E0F11">
      <ScrollArea className="pt-[58px] pb-28">
        <header className="flex items-center justify-between px-4">
          <span className="flex items-center gap-1 text-[18px] font-bold">
            Home <ChevronDown className="size-4" aria-hidden />
          </span>
          <Receipt className="size-6 text-white/80" aria-hidden />
        </header>
        <p className="px-4 text-[12px] text-white/50">123 Wausan-ro, Mapo-gu, Seoul</p>
        <div className="mx-4 mt-3 flex items-center gap-2 rounded-full border-2 border-[#00A9E8] px-4 py-2.5 text-[15px] text-white/50">
          <Search className="size-4 text-[#00A9E8]" aria-hidden />
          Search for food or restaurants
        </div>

        <ul className="mt-5 grid grid-cols-4 gap-y-4 px-4">
          {CATEGORIES.map(([I, l]) => (
            <li key={l} className="flex flex-col items-center gap-1.5 text-[12px] text-white/85">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-white/[0.07]">
                <I className="size-7 text-[#3DD4F5]" aria-hidden />
              </span>
              {l}
            </li>
          ))}
        </ul>

        <div className="relative mx-4 mt-5 overflow-hidden rounded-2xl">
          <img src={photo(5) || '/placeholder.svg'} alt="Fried chicken and tteokbokki" className="h-36 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent" />
          <div className="absolute top-4 left-4">
            <p className="text-[12px] font-semibold text-[#3DD4F5]">WOW members only</p>
            <p className="text-[20px] leading-tight font-bold">Free delivery
              <br />
              on every order 🛵
            </p>
          </div>
        </div>

        <h2 className="mt-6 px-4 text-[18px] font-bold">Popular near you</h2>
        <ul className="mt-2 flex flex-col gap-5 px-4">
          {RESTAURANTS.map((r) => (
            <li key={r.name}>
              <div className="relative overflow-hidden rounded-2xl">
                <img src={r.img || '/placeholder.svg'} alt="" className="h-40 w-full object-cover" />
                <Heart className="absolute top-3 right-3 size-6 text-white drop-shadow" aria-hidden />
                {r.fee === 'Free delivery' && (
                  <span className="absolute bottom-3 left-3 rounded-md bg-[#00A9E8] px-2 py-0.5 text-[11px] font-bold">FREE DELIVERY</span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[16px] font-bold">{r.name}</p>
                <span className="flex items-center gap-1 text-[13px]">
                  <Star className="size-3.5 fill-[#FFD60A] text-[#FFD60A]" aria-hidden />
                  {r.rating} <span className="text-white/45">({r.reviews})</span>
                </span>
              </div>
              <p className="text-[13px] text-white/55">
                {r.tags} · {r.time} · {r.fee}
              </p>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <nav className="absolute inset-x-0 bottom-0 flex justify-around border-t border-white/10 bg-[#0E0F11] pt-2.5 pb-8 text-[10px]">
        {[
          [Home, 'Home', true],
          [Search, 'Search', false],
          [Heart, 'Favorites', false],
          [Receipt, 'Orders', false],
          [User, 'My Eats', false],
        ].map(([I, l, active]) => {
          const Icon = I as typeof Home
          return (
            <span key={l as string} className={`flex flex-col items-center gap-0.5 ${active ? 'text-[#3DD4F5]' : 'text-white/55'}`}>
              <Icon className="size-6" aria-hidden />
              {l as string}
            </span>
          )
        })}
      </nav>
    </AppScreen>
  )
}
