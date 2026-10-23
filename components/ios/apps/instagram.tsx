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
  Plus,
  PlusSquare,
  Search,
  Send,
  SquareUser,
} from 'lucide-react'
import { photo, publicAssetPath, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

const YUNJI_PROFILE = publicAssetPath('/images/afad361409399f83108438c1bfa05d0f.jpg')
const YOSTEPH_PROFILE = publicAssetPath('/images/262d63f224bff8cabf245b4e51d49b91.jpg')
const FINN_PROFILE = publicAssetPath('/images/Screenshot-2025-02-26-at-12.52.48-PM-914x1280.jpg')
const IMNAVELY_PROFILE = publicAssetPath('/images/myunghyungseo_2026-05-30_02-15-41_3908266783770108114_75130635644_1.jpg')
const KELLY_PROFILE = publicAssetPath('/images/HNgpjoIbEAAlPAF.jpeg')
const MINJI_PROFILE = publicAssetPath('/images/F1D320DC-DD92-44B6-8BE1-1A803A60C0AC_1_201_a.jpeg')

type Post = {
  id: string
  user: string
  image: string
  caption: string
  likes: number
  liked: boolean
  saved: boolean
  time: string
  comments: { user: string; text: string }[]
  audio?: { title: string; artist: string; previewUrl: string }
  images?: string[]
}

const FEED: Post[] = [
  {
    id: 'f1',
    user: 'yunji.ee',
    image: publicAssetPath('/images/madebyheroine_2026-08-14_12-08-08_3963647684464520702_57273942319_1.png'),
    caption: 'rainy nights in the city hit different 🌧️',
    likes: 1284,
    liked: false,
    saved: false,
    time: '2h',
    comments: [
      { user: 'yosteph', text: 'the colors 😭😭' },
      { user: USER.handle, text: 'take me with you next time!!' },
      { user: 'finnchung', text: 'shot on iphone?? no way' },
    ],
  },
  {
    id: 'f2',
    user: 'cafe.onion',
    image: photo(1),
    caption: 'Our autumn menu is here 🍂 Iced pumpkin latte + butter croissant.',
    likes: 5621,
    liked: true,
    saved: false,
    time: '5h',
    comments: [
      { user: 'imnavely', text: 'going this weekend!' },
      { user: 'kelly.ha', text: 'best croissant in seoul fr' },
    ],
  },
  {
    id: 'f3',
    user: 'yosteph',
    image: publicAssetPath('/images/GyO5k_Ks_400x400-1.jpg'),
    caption: 'picnic szn with the best people 💛',
    likes: 842,
    liked: false,
    saved: true,
    time: '1d',
    audio: {
      title: 'Flashing Lights',
      artist: 'Kanye West',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4c/be/8e/4cbe8e05-1130-8697-6775-8e52408e857a/mzaf_10845907730040426322.plus.aac.p.m4a',
    },
    comments: [
      { user: USER.handle, text: 'best day ever' },
      { user: 'yunji.ee', text: 'we need to do this again' },
    ],
  },
  {
    id: 'f4',
    user: 'finnchung',
    image: publicAssetPath('/images/6eba242d690bce5742bac75724d91c62.jpg'),
    caption: 'still not over last night 🎤🔥',
    likes: 2310,
    liked: false,
    saved: false,
    time: '2d',
    comments: [{ user: 'imnavely', text: 'jealous!!!' }],
  },
]

const MY_POSTS: Post[] = [5, 4, 7, 6, 2, 1, 0, 3]
  .map((p, i) => ({
    id: `m${i}`,
    user: USER.handle,
    image:
      i === 7
        ? publicAssetPath('/images/50fd797e6eccc85ef7dc83e66f763c31.jpg')
        : i === 0
          ? publicAssetPath('/images/79E727D2-B753-430C-A919-C6DCA5D2E39F.jpeg')
          : p === 1
            ? publicAssetPath('/images/DF254856-78A8-450A-82C6-D7D0CFCDAE38.jpeg')
            : p === 2
              ? publicAssetPath('/images/F6728ABD-64BD-43F0-A9F7-9EEA3201A816.jpeg')
              : p === 4
                ? publicAssetPath('/images/17EC0BDE-DBB1-4043-BEB5-58334EBFA7AF.jpeg')
                : p === 7
                  ? publicAssetPath('/images/d2b7d717e4641566f74f345ab1149d7b.jpg')
                  : photo(p),
    caption: ['golden hour in jeju 🌅', 'late night eats', 'hiking > everything', 'my roommate 🐈', 'sunday reset'][i % 5],
    likes: 120 + i * 37,
    liked: false,
    saved: false,
    time: `${i + 1}w`,
    ...(i === 7
      ? {
          images: [
            publicAssetPath('/images/50fd797e6eccc85ef7dc83e66f763c31.jpg'),
            publicAssetPath('/images/5a3b7bce158e09c177c757d7a404c1e2.jpg'),
          ],
          audio: {
            title: 'Video Games',
            artist: 'Lana Del Rey',
            previewUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/67/07/50/670750ec-42f9-fcf2-feef-9c4faa873ce8/mzaf_16864780503903222714.plus.aac.p.m4a',
          },
        }
      : {}),
    ...(p === 2
      ? {
          images: [
            publicAssetPath('/images/F6728ABD-64BD-43F0-A9F7-9EEA3201A816.jpeg'),
            publicAssetPath('/images/26147F95-44EF-45FF-A0FA-B706C988828C.jpeg'),
            publicAssetPath('/images/558AAC82-7072-4A34-A25A-C90FA3C7725A.jpeg'),
          ],
        }
      : {}),
    comments: [
      { user: 'yunji.ee', text: 'obsessed 😍' },
      { user: 'yosteph', text: 'wow!!' },
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
  .filter((_, index) => index !== 3)
  .concat([
    {
      id: 'm8',
      user: USER.handle,
      image: publicAssetPath('/images/IMG_9804.jpg'),
      caption: 'a little moment 📸',
      likes: 416,
      liked: false,
      saved: false,
      time: '9w',
      comments: [],
    },
  ])

const STORIES = ['Your story', 'yunji.ee', 'yosteph', 'finnchung', 'imnavely', 'kelly.ha', 'cafe.onion']

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
        <nav
          aria-label="Instagram"
          className="glass-dark absolute inset-x-4 bottom-7 z-40 flex items-center justify-around rounded-full px-2 py-2"
        >
          <button
            type="button"
            onClick={() => setTab('home')}
            aria-label="Home"
            aria-current={tab === 'home' ? 'page' : undefined}
            className={cn(
              'flex size-10 items-center justify-center rounded-full transition',
              tab === 'home' && 'bg-white/15',
            )}
          >
            <Home className={cn('size-6', tab === 'home' && 'fill-white')} strokeWidth={tab === 'home' ? 2.4 : 1.8} />
          </button>
          <span className="flex size-10 items-center justify-center rounded-full text-white/75" aria-hidden>
            <Clapperboard className="size-6" strokeWidth={1.8} />
          </span>
          <span className="flex size-10 items-center justify-center rounded-full text-white/75" aria-hidden>
            <Send className="size-6" strokeWidth={1.8} />
          </span>
          <span className="flex size-10 items-center justify-center rounded-full text-white/75" aria-hidden>
            <Search className="size-6" strokeWidth={1.8} />
          </span>
          <button
            type="button"
            onClick={() => setTab('profile')}
            aria-label="Profile"
            aria-current={tab === 'profile' ? 'page' : undefined}
            className={cn(
              'flex size-10 items-center justify-center rounded-full transition',
              tab === 'profile' && 'bg-white/15',
            )}
          >
            <span className={cn('block rounded-full p-[2px]', tab === 'profile' && 'ring-2 ring-white')}>
              <Avatar name={USER.name} size={28} src={MINJI_PROFILE} />
            </span>
          </button>
        </nav>
      )}
    </AppScreen>
  )
}

function HomeFeed({
  posts,
  onLike,
  onSave,
  expandedComments,
  onToggleComments,
}: {
  posts: Post[]
  onLike: (id: string) => void
  onSave: (id: string) => void
  expandedComments: string[]
  onToggleComments: (id: string) => void
}) {
  return (
    <ScrollArea className="pt-[54px] pb-32">
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
        <Heart className="size-[26px]" aria-hidden />
      </header>

      <ul className="no-scrollbar flex gap-3.5 overflow-x-auto px-3 pt-1 pb-3">
        {STORIES.map((s, i) => (
          <li key={s} className="flex w-[74px] shrink-0 flex-col items-center gap-1">
            <span className="relative">
              <span
                className="block rounded-full p-[2.5px]"
                style={{
                  background: i === 0 ? 'transparent' : 'linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)',
                }}
              >
                <span className="block rounded-full border-[3px] border-black">
                  <Avatar
                    name={i === 0 ? USER.name : s}
                    size={66}
                    src={
                      i === 0
                        ? MINJI_PROFILE
                        : s === 'yunji.ee'
                          ? YUNJI_PROFILE
                          : s === 'yosteph'
                            ? YOSTEPH_PROFILE
                          : s === 'finnchung'
                            ? FINN_PROFILE
                            : s === 'imnavely'
                              ? IMNAVELY_PROFILE
                              : s === 'kelly.ha'
                                ? KELLY_PROFILE
                              : i % 2
                                ? photo(i)
                                : undefined
                    }
                  />
                </span>
              </span>
              {i === 0 && (
                <span className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border-2 border-black bg-[#0095f6] text-white" aria-hidden>
                  <Plus className="size-4" strokeWidth={3} />
                </span>
              )}
            </span>
            <span className="w-full truncate text-center text-[12px] text-white/90">{s}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10">
        {posts.map((p) => (
          <article key={p.id} className="pb-4">
            <PostHeader post={p} showMusicSymbol={Boolean(p.audio)} />
            {p.audio && <AudioPreview track={p.audio} whenVisible />}
            <PostMedia post={p} showCarouselIcon />
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
      <span
        className={
          post.user === USER.handle
            ? 'shrink-0'
            : 'shrink-0 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-[2px]'
        }
      >
        <Avatar
          name={post.user}
          size={34}
          className={post.user === USER.handle ? undefined : 'border-2 border-black'}
          src={
            post.user === USER.handle
              ? MINJI_PROFILE
              : post.user === 'yunji.ee'
                ? YUNJI_PROFILE
                : post.user === 'yosteph'
                  ? YOSTEPH_PROFILE
                : post.user === 'finnchung'
                  ? FINN_PROFILE
                  : undefined
          }
        />
      </span>
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
        ) : null}
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

function PostMedia({ post, showCarouselIcon = false }: { post: Post; showCarouselIcon?: boolean }) {
  if (post.images && post.images.length > 1) {
    return <PhotoCarousel images={post.images} label={post.caption} showCarouselIcon={showCarouselIcon} />
  }

  return (
    <div>
      <img
        src={post.image || publicAssetPath('/placeholder.svg')}
        alt={post.caption}
        className="block h-auto w-full object-contain"
      />
    </div>
  )
}

function PhotoCarousel({
  images,
  label,
  showCarouselIcon = false,
}: {
  images: string[]
  label: string
  showCarouselIcon?: boolean
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      <div
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        aria-label={`${images.length} photos`}
        onScroll={(event) => {
          const width = event.currentTarget.clientWidth
          if (width > 0) setActiveIndex(Math.round(event.currentTarget.scrollLeft / width))
        }}
      >
        {images.map((src, index) => (
          <div key={src} className="w-full shrink-0 snap-center">
            <img
              src={src}
              alt={`${label}, photo ${index + 1} of ${images.length}`}
              className="block h-auto w-full"
            />
          </div>
        ))}
      </div>
      {showCarouselIcon && (
        <img
          src={publicAssetPath('/icons/Screenshot 2026-10-21 at 11.02.52 PM 2.png')}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-2 right-2 size-[45px]"
        />
      )}
      <div className="flex justify-center gap-1.5 py-2" aria-label={`Photo ${activeIndex + 1} of ${images.length}`}>
        {images.map((src, index) => (
          <span
            key={src}
            className={cn('size-1.5 rounded-full', activeIndex === index ? 'bg-[#0095F6]' : 'bg-white/35')}
          />
        ))}
      </div>
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
      <header className="mt-[58px] flex items-center border-b border-white/10 px-2 pb-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="p-1"
        >
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
        <PostMedia post={post} />
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

function AudioPreview({
  track,
  whenVisible = false,
}: {
  track: NonNullable<Post['audio']>
  whenVisible?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playbackStart = useRef<number | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cancelled = false
    let active = !whenVisible
    let observer: IntersectionObserver | undefined

    const startPreview = async () => {
      if (cancelled || !active || !Number.isFinite(audio.duration)) return
      if (!audio.paused) return
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

    const handleMetadata = () => {
      if (active) void startPreview()
    }

    audio.addEventListener('loadedmetadata', handleMetadata)
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata()

    if (whenVisible) {
      const target = audio.closest('article')
      if (target) {
        observer = new IntersectionObserver(
          ([entry]) => {
            active = entry.isIntersecting && entry.intersectionRatio >= 0.2
            if (active) {
              handleMetadata()
            } else {
              audio.pause()
              playbackStart.current = null
            }
          },
          { threshold: [0, 0.2] },
        )
        observer.observe(target)
      }
    }

    return () => {
      cancelled = true
      observer?.disconnect()
      audio.removeEventListener('loadedmetadata', handleMetadata)
      audio.pause()
      playbackStart.current = null
    }
  }, [track.previewUrl, whenVisible])

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
    <ScrollArea className="pt-[54px] pb-32">
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
        <Avatar name={USER.name} size={86} src={MINJI_PROFILE} />
        <div className="flex flex-1 justify-around text-center">
          {[
            [posts.length, 'posts'],
            ['3,310', 'followers'],
            ['118', 'following'],
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
      <div className="mt-4 flex border-t border-white/10">
        <span className="flex flex-1 justify-center border-b border-white py-2.5">
          <Grid3x3 className="size-6" aria-label="Posts" />
        </span>
        <span className="flex flex-1 justify-center py-2.5 text-white/50">
          <Clapperboard className="size-6" aria-hidden />
        </span>
        <span className="flex flex-1 justify-center py-2.5 text-white/50">
          <SquareUser className="size-6" aria-hidden />
        </span>
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-0.5 pb-4">
        {posts.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => onOpen(p.id)} className="relative block w-full" aria-label={`Open post: ${p.caption}${p.images ? ', carousel' : ''}`}>
              <img src={p.image || publicAssetPath('/placeholder.svg')} alt="" className="aspect-[3/4] w-full object-cover" />
              {p.images && (
                <img
                    src={publicAssetPath('/icons/Screenshot 2026-10-21 at 11.02.52 PM.png')}
                  alt="Carousel post"
                  className="absolute top-0.5 -right-0.5 size-8"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
