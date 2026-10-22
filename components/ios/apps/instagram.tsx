'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  Clapperboard,
  Grid3x3,
  Heart,
  Home,
  Menu,
  MessageCircle,
  Music2,
  PlusSquare,
  Search,
  Send,
  SquareUser,
} from 'lucide-react'
import { photo, publicAssetPath, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

type Post = {
  id: string
  user: string
  location?: string
  image: string
  caption: string
  likes: number
  liked: boolean
  saved: boolean
  time: string
  comments: { user: string; text: string }[]
  audio?: { title: string; artist: string; previewUrl: string }
}

const FEED: Post[] = [
  {
    id: 'f1',
    user: 'jisoo.kim',
    location: 'Hongdae, Seoul',
    image: photo(0),
    caption: 'rainy nights in the city hit different 🌧️',
    likes: 1284,
    liked: false,
    saved: false,
    time: '2h',
    comments: [
      { user: 'haneul_ee', text: 'the colors 😭😭' },
      { user: USER.handle, text: 'take me with you next time!!' },
      { user: 'dohyun.lee', text: 'shot on iphone?? no way' },
    ],
  },
  {
    id: 'f2',
    user: 'cafe.onion',
    location: 'Seongsu-dong',
    image: photo(1),
    caption: 'Our autumn menu is here 🍂 Iced pumpkin latte + butter croissant.',
    likes: 5621,
    liked: true,
    saved: false,
    time: '5h',
    comments: [
      { user: 'yuna.choi', text: 'going this weekend!' },
      { user: 'sungmin_p', text: 'best croissant in seoul fr' },
    ],
  },
  {
    id: 'f3',
    user: 'haneul_ee',
    location: 'Hangang Park',
    image: photo(2),
    caption: 'picnic szn with the best people 💛',
    likes: 842,
    liked: false,
    saved: true,
    time: '1d',
    comments: [
      { user: USER.handle, text: 'best day ever' },
      { user: 'jisoo.kim', text: 'we need to do this again' },
    ],
  },
  {
    id: 'f4',
    user: 'dohyun.lee',
    image: photo(3),
    caption: 'still not over last night 🎤🔥',
    likes: 2310,
    liked: false,
    saved: false,
    time: '2d',
    comments: [{ user: 'yuna.choi', text: 'jealous!!!' }],
  },
]

const MY_POSTS: Post[] = [5, 4, 7, 6, 2, 1, 0, 3, 5].map((p, i) => ({
  id: `m${i}`,
  user: USER.handle,
  location: ['Jeju Island', 'Seoul', 'Bukhansan', 'Home'][i % 4],
  image: photo(p),
  caption: ['golden hour in jeju 🌅', 'late night eats', 'hiking > everything', 'my roommate 🐈', 'sunday reset'][i % 5],
  likes: 120 + i * 37,
  liked: false,
  saved: false,
  time: `${i + 1}w`,
  comments: [
    { user: 'jisoo.kim', text: 'obsessed 😍' },
    { user: 'haneul_ee', text: 'wow!!' },
  ],
  ...(i === 0
    ? {
        audio: {
          title: 'Video Games',
          artist: 'Lana Del Rey',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/67/07/50/670750ec-42f9-fcf2-feef-9c4faa873ce8/mzaf_16864780503903222714.plus.aac.p.m4a',
        },
      }
    : {}),
}))

const STORIES = ['Your story', 'jisoo.kim', 'haneul_ee', 'dohyun.lee', 'yuna.choi', 'sungmin_p', 'cafe.onion']

export function InstagramApp() {
  const [tab, setTab] = useState<'home' | 'profile'>('home')
  const [posts, setPosts] = useState<Post[]>([...FEED, ...MY_POSTS])
  const [openPost, setOpenPost] = useState<string | null>(null)
  const [expandedComments, setExpandedComments] = useState<string[]>([])

  const update = (id: string, fn: (p: Post) => Post) => setPosts((ps) => ps.map((p) => (p.id === id ? fn(p) : p)))
  const toggleLike = (id: string) => update(id, (p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }))
  const toggleSave = (id: string) => update(id, (p) => ({ ...p, saved: !p.saved }))

  const current = posts.find((p) => p.id === openPost)

  return (
    <AppScreen>
      {current ? (
        <PostDetail
          post={current}
          onBack={() => setOpenPost(null)}
          onLike={() => toggleLike(current.id)}
          onComment={() =>
            setExpandedComments((ids) =>
              ids.includes(current.id) ? ids.filter((id) => id !== current.id) : [...ids, current.id],
            )
          }
          onSave={() => toggleSave(current.id)}
          commentsExpanded={expandedComments.includes(current.id)}
        />
      ) : tab === 'home' ? (
        <HomeFeed
          posts={posts.filter((p) => p.id.startsWith('f'))}
          onOpen={setOpenPost}
          onLike={toggleLike}
          onSave={toggleSave}
          expandedComments={expandedComments}
          onToggleComments={(id) =>
            setExpandedComments((ids) => (ids.includes(id) ? ids.filter((commentId) => commentId !== id) : [...ids, id]))
          }
        />
      ) : (
        <Profile posts={posts.filter((p) => p.id.startsWith('m'))} onOpen={setOpenPost} />
      )}

      {!current && (
        <nav aria-label="Instagram" className="flex items-center justify-around border-t border-white/10 bg-black px-2 pt-2.5 pb-8">
          <button type="button" onClick={() => setTab('home')} aria-label="Home" aria-current={tab === 'home' ? 'page' : undefined}>
            <Home className={cn('size-7', tab === 'home' && 'fill-white')} strokeWidth={tab === 'home' ? 2.4 : 1.8} />
          </button>
          <Search className="size-7 opacity-40" strokeWidth={1.8} aria-hidden />
          <PlusSquare className="size-7 opacity-40" strokeWidth={1.8} aria-hidden />
          <Clapperboard className="size-7 opacity-40" strokeWidth={1.8} aria-hidden />
          <button type="button" onClick={() => setTab('profile')} aria-label="Profile" aria-current={tab === 'profile' ? 'page' : undefined}>
            <span className={cn('block rounded-full p-[2px]', tab === 'profile' && 'ring-2 ring-white')}>
              <Avatar name={USER.name} size={26} src={photo(4)} />
            </span>
          </button>
        </nav>
      )}
    </AppScreen>
  )
}

function HomeFeed({
  posts,
  onOpen,
  onLike,
  onSave,
  expandedComments,
  onToggleComments,
}: {
  posts: Post[]
  onOpen: (id: string) => void
  onLike: (id: string) => void
  onSave: (id: string) => void
  expandedComments: string[]
  onToggleComments: (id: string) => void
}) {
  return (
    <ScrollArea className="pt-[54px]">
      <header className="flex items-center justify-between px-4 pb-2">
        <span className="flex items-center gap-1">
          <span
            role="img"
            aria-label="Instagram"
            className="block h-[34px] w-[118px]"
            style={{
              background: '#fff',
              WebkitMaskImage: `url(${publicAssetPath('/icons/instagram-wordmark.svg')})`,
              maskImage: `url(${publicAssetPath('/icons/instagram-wordmark.svg')})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />
          <ChevronDown className="size-4" aria-hidden />
        </span>
        <span className="flex items-center gap-5">
          <Heart className="size-[26px]" aria-hidden />
          <span className="relative">
            <Send className="size-[26px]" aria-hidden />
            <span className="absolute -top-1.5 -right-2 flex size-[18px] items-center justify-center rounded-full bg-[#FF3040] text-[11px] font-bold">3</span>
          </span>
        </span>
      </header>

      <ul className="no-scrollbar flex gap-3.5 overflow-x-auto px-3 pt-1 pb-3">
        {STORIES.map((s, i) => (
          <li key={s} className="flex w-[74px] shrink-0 flex-col items-center gap-1">
            <span
              className="rounded-full p-[2.5px]"
              style={{
                background: i === 0 ? 'transparent' : 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)',
              }}
            >
              <span className="block rounded-full border-[3px] border-black">
                <Avatar name={i === 0 ? USER.name : s} size={66} src={i === 0 ? photo(4) : i % 2 ? photo(i) : undefined} />
              </span>
            </span>
            <span className="w-full truncate text-center text-[12px] text-white/90">{s}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10">
        {posts.map((p) => (
          <article key={p.id} className="pb-4">
            <PostHeader post={p} />
            <button type="button" onClick={() => onOpen(p.id)} className="block w-full" aria-label={`Open post by ${p.user}`}>
              <img src={p.image || publicAssetPath('/placeholder.svg')} alt={p.caption} className="aspect-square w-full object-cover" />
            </button>
            <PostActions
              post={p}
              onLike={() => onLike(p.id)}
              onComment={() => onToggleComments(p.id)}
              onSave={() => onSave(p.id)}
            />
            <div className="px-3.5 text-[14px]">
              <p className="font-semibold">{p.likes.toLocaleString()} likes</p>
              <p className="mt-0.5">
                <span className="font-semibold">{p.user}</span> {p.caption}
              </p>
              {p.comments.length > 0 && (
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => onToggleComments(p.id)}
                    aria-expanded={expandedComments.includes(p.id)}
                    className="text-white/55"
                  >
                    {expandedComments.includes(p.id) ? 'Hide comments' : `View all ${p.comments.length} comments`}
                  </button>
                  {expandedComments.includes(p.id) && (
                    <ul className="mt-1 flex flex-col gap-0.5 text-white/85">
                      {p.comments.map((comment, index) => (
                        <li key={`${comment.user}-${index}`}>
                          <span className="font-semibold">{comment.user}</span> {comment.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <p className="mt-0.5 text-[12px] text-white/45">{p.time} ago</p>
            </div>
          </article>
        ))}
      </div>
    </ScrollArea>
  )
}

function PostHeader({ post, showMusicSymbol = false }: { post: Post; showMusicSymbol?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <Avatar name={post.user} size={34} src={post.user === USER.handle ? photo(4) : undefined} />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-[14px] font-semibold">{post.user}</p>
        {post.audio ? (
          <p className="flex items-center gap-1 text-[12px] text-white/70">
            {showMusicSymbol && (
              <span className="shrink-0 font-semibold" aria-hidden>
                ♫
              </span>
            )}
            <span className="truncate">{post.audio.title} · {post.audio.artist}</span>
          </p>
        ) : (
          post.location && <p className="text-[12px] text-white/70">{post.location}</p>
        )}
      </div>
      <span className="text-[18px] tracking-widest text-white/80" aria-hidden>
        ···
      </span>
    </div>
  )
}

function PostActions({
  post,
  onLike,
  onComment,
  onSave,
}: {
  post: Post
  onLike: () => void
  onComment?: () => void
  onSave: () => void
}) {
  return (
    <div className="flex items-center gap-4 px-3.5 py-2.5">
      <button type="button" onClick={onLike} aria-label={post.liked ? 'Unlike' : 'Like'} aria-pressed={post.liked}>
        <Heart className={cn('size-[26px] transition active:scale-125', post.liked && 'fill-[#FF3040] text-[#FF3040]')} />
      </button>
      <button type="button" onClick={onComment} aria-label="Comments">
        <MessageCircle className="size-[26px] -scale-x-100" />
      </button>
      <Send className="size-[24px]" aria-hidden />
      <button type="button" onClick={onSave} className="ml-auto" aria-label={post.saved ? 'Unsave' : 'Save'} aria-pressed={post.saved}>
        <Bookmark className={cn('size-[26px]', post.saved && 'fill-white')} />
      </button>
    </div>
  )
}

function PostDetail({
  post,
  onBack,
  onLike,
  onComment,
  onSave,
  commentsExpanded,
}: {
  post: Post
  onBack: () => void
  onLike: () => void
  onComment: () => void
  onSave: () => void
  commentsExpanded: boolean
}) {
  return (
    <>
      <header className="flex items-center border-b border-white/10 px-2 pt-[58px] pb-2.5">
        <button type="button" onClick={onBack} aria-label="Back" className="p-1">
          <ChevronLeft className="size-7" />
        </button>
        <div className="flex-1 text-center leading-tight">
          <p className="text-[12px] text-white/60 uppercase">{post.user}</p>
          <p className="text-[16px] font-semibold">Post</p>
        </div>
        <span className="w-9" />
      </header>
      <ScrollArea>
        <PostHeader post={post} showMusicSymbol />
        {post.audio && <AudioPreview track={post.audio} />}
        <img src={post.image || publicAssetPath('/placeholder.svg')} alt={post.caption} className="aspect-square w-full object-cover" />
        <PostActions post={post} onLike={onLike} onComment={onComment} onSave={onSave} />
        <div className="px-3.5 pb-3 text-[14px]">
          <p className="font-semibold">{post.likes.toLocaleString()} likes</p>
          <p className="mt-0.5">
            <span className="font-semibold">{post.user}</span> {post.caption}
          </p>
          <p className="mt-1 text-[12px] text-white/45">{post.time} ago</p>
          {commentsExpanded && (
            <ul className="mt-2 flex flex-col gap-1 text-white/85">
              {post.comments.map((comment, index) => (
                <li key={`${comment.user}-${index}`}>
                  <span className="font-semibold">{comment.user}</span> {comment.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </>
  )
}

function AudioPreview({ track }: { track: NonNullable<Post['audio']> }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playbackStart = useRef<number | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cancelled = false
    const startPreview = async () => {
      if (cancelled) return
      const latestStart = Math.max(1, audio.duration - 5)
      const randomStart = 1 + Math.random() * Math.max(0, latestStart - 1)
      audio.currentTime = randomStart
      playbackStart.current = randomStart

      try {
        await audio.play()
      } catch (error) {
        console.warn('Audio preview autoplay was blocked by the browser.', error)
      }
    }

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      void startPreview()
    } else {
      audio.addEventListener('loadedmetadata', startPreview, { once: true })
    }

    return () => {
      cancelled = true
      audio.removeEventListener('loadedmetadata', startPreview)
      audio.pause()
      playbackStart.current = null
    }
  }, [track.previewUrl])

  const stopPreview = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    playbackStart.current = null
  }

  return (
    <audio
      ref={audioRef}
      src={track.previewUrl}
      preload="metadata"
      onError={() => console.error(`Unable to load audio preview: ${track.previewUrl}`)}
      onEnded={stopPreview}
      onTimeUpdate={() => {
        if (playbackStart.current !== null && audioRef.current && audioRef.current.currentTime - playbackStart.current >= 30) {
          stopPreview()
        }
      }}
    />
  )
}

function Profile({ posts, onOpen }: { posts: Post[]; onOpen: (id: string) => void }) {
  return (
    <ScrollArea className="pt-[54px]">
      <header className="flex items-center justify-between px-4 pb-3">
        <span className="flex items-center gap-1 text-[22px] font-bold">
          {USER.handle} <ChevronDown className="size-4" aria-hidden />
        </span>
        <span className="flex items-center gap-5">
          <PlusSquare className="size-[26px]" aria-hidden />
          <Menu className="size-[26px]" aria-hidden />
        </span>
      </header>
      <div className="flex items-center gap-6 px-4">
        <Avatar name={USER.name} size={86} src={photo(4)} />
        <div className="flex flex-1 justify-around text-center">
          {[
            [posts.length, 'posts'],
            ['612', 'followers'],
            ['487', 'following'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="text-[17px] font-semibold">{n}</p>
              <p className="text-[13px]">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pt-3 text-[14px]">
        <a href={`https://twitch.tv/${USER.handle}`} className="font-medium text-[#0095F6]">
          twitch.tv/{USER.handle}
        </a>
      </div>
      <div className="flex gap-1.5 px-4 pt-3">
        {['Edit profile', 'Share profile'].map((l) => (
          <span key={l} className="flex-1 rounded-lg bg-white/12 py-1.5 text-center text-[14px] font-semibold">
            {l}
          </span>
        ))}
      </div>
      <div className="flex border-t border-white/10">
        <span className="flex flex-1 justify-center border-b border-white py-2.5">
          <Grid3x3 className="size-6" aria-label="Posts" />
        </span>
        <span className="flex flex-1 justify-center py-2.5 text-white/40">
          <Clapperboard className="size-6" aria-hidden />
        </span>
        <span className="flex flex-1 justify-center py-2.5 text-white/40">
          <SquareUser className="size-6" aria-hidden />
        </span>
      </div>
      <ul className="grid grid-cols-3 gap-0.5 pb-4">
        {posts.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => onOpen(p.id)} className="block w-full" aria-label={`Open post: ${p.caption}`}>
              <img src={p.image || publicAssetPath('/placeholder.svg')} alt="" className="aspect-[3/4] w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
