'use client'

import { useState } from 'react'
import { MessageCircle, Smile, Users } from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const POSTS = [
  { user: 'jisoo.kim', where: 'Hongdae, Seoul', late: '', main: photo(1), front: photo(0), caption: 'bday coffee ☕️🎂', comments: 8 },
  { user: 'haneul_ee', where: 'Mapo-gu', late: '1 hr late', main: photo(2), front: photo(7), caption: 'picnic part 2', comments: 3 },
  { user: 'dohyun.lee', where: 'Jamsil', late: '', main: photo(3), front: photo(5), caption: '', comments: 12 },
  { user: 'yuna.choi', where: 'Sinchon', late: '3 hrs late', main: photo(6), front: photo(1), caption: 'studying w/ my cat', comments: 2 },
]

export function BeRealApp() {
  const [tab, setTab] = useState<'friends' | 'discovery'>('friends')
  return (
    <AppScreen>
      <header className="flex items-center justify-between px-4 pt-[58px] pb-2">
        <Users className="size-6" aria-hidden />
        <span className="text-[24px] font-extrabold tracking-tight">BeReal.</span>
        <Avatar name={USER.name} src={photo(4)} size={30} />
      </header>
      <div className="flex justify-center gap-5 pb-2 text-[15px] font-semibold">
        {(['friends', 'discovery'] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} className={cn(tab === t ? 'text-white' : 'text-white/40')}>
            {t === 'friends' ? 'My Friends' : 'Discovery'}
          </button>
        ))}
      </div>
      <ScrollArea className="pb-10">
        <div className="flex flex-col items-center pt-2 pb-5">
          <div className="relative h-[140px] w-[105px] overflow-hidden rounded-xl ring-2 ring-white/10">
            <img src={photo(5) || '/placeholder.svg'} alt="Your BeReal" className="size-full object-cover" />
            <img src={photo(4) || '/placeholder.svg'} alt="" className="absolute top-1.5 left-1.5 h-[42px] w-[32px] rounded-md border border-black object-cover" />
          </div>
          <p className="mt-2 text-[13px] font-semibold">Add a caption...</p>
          <p className="text-[12px] text-white/50">View comment · Jeju · 2 min late</p>
        </div>
        {(tab === 'friends' ? POSTS : [...POSTS].reverse()).map((p) => (
          <BeRealPost key={p.user} post={p} />
        ))}
      </ScrollArea>
    </AppScreen>
  )
}

function BeRealPost({ post }: { post: (typeof POSTS)[number] }) {
  const [swapped, setSwapped] = useState(false)
  const [reacted, setReacted] = useState(false)
  const big = swapped ? post.front : post.main
  const small = swapped ? post.main : post.front
  return (
    <article className="mb-6">
      <div className="flex items-center gap-2.5 px-3 pb-2">
        <Avatar name={post.user} size={36} />
        <div className="flex-1 leading-tight">
          <p className="text-[14px] font-semibold">{post.user}</p>
          <p className="text-[12px] text-white/50">
            {post.where} · {post.late || 'on time'}
          </p>
        </div>
        <span className="text-white/60" aria-hidden>
          •••
        </span>
      </div>
      <div className="relative mx-1 aspect-[3/4] overflow-hidden rounded-2xl">
        <img src={big || '/placeholder.svg'} alt={`${post.user}'s BeReal`} className="size-full object-cover" />
        <button
          type="button"
          onClick={() => setSwapped((s) => !s)}
          aria-label="Swap cameras"
          className="absolute top-3 left-3 h-[150px] w-[112px] overflow-hidden rounded-xl border-2 border-black"
        >
          <img src={small || '/placeholder.svg'} alt="" className="size-full object-cover" />
        </button>
        <div className="absolute right-3 bottom-3 flex flex-col gap-3">
          <button type="button" onClick={() => setReacted((r) => !r)} aria-label="React" aria-pressed={reacted}>
            <Smile className={cn('size-8 drop-shadow', reacted && 'fill-[#FFD60A] text-black')} />
          </button>
          <MessageCircle className="size-8 drop-shadow" aria-hidden />
        </div>
      </div>
      <div className="px-3 pt-2 text-[14px]">
        {post.caption && <p>{post.caption}</p>}
        <p className="text-white/50">View all {post.comments} comments</p>
      </div>
    </article>
  )
}
