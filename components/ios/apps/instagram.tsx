'use client'

import { useState } from 'react'
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
  PlusSquare,
  Search,
  Send,
  SquareUser,
} from 'lucide-react'
import { photo, USER } from '@/lib/ios-data'
import { cn } from '@/lib/utils'
import { AppScreen, Avatar, ScrollArea } from '../primitives'

type Comment = { id: string; user: string; text: string; time: string; likes: number }
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
  comments: Comment[]
}

const c = (id: string, user: string, text: string, time: string, likes = 0): Comment => ({ id, user, text, time, likes })

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
      c('a', 'haneul_ee', 'the colors 😭😭', '1h', 12),
      c('b', USER.handle, 'take me with you next time!!', '58m', 4),
      c('c', 'dohyun.lee', 'shot on iphone?? no way', '40m', 2),
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
    comments: [c('a', 'yuna.choi', 'going this weekend!', '4h', 8), c('b', 'sungmin_p', 'best croissant in seoul fr', '3h', 21)],
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
    comments: [c('a', USER.handle, 'best day ever', '22h', 3), c('b', 'jisoo.kim', 'we need to do this again', '20h', 5)],
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
    comments: [c('a', 'yuna.choi', 'jealous!!!', '2d', 1)],
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
  comments: [c('a', 'jisoo.kim', 'obsessed 😍', `${i + 1}w`, 3), c('b', 'haneul_ee', 'wow!!', `${i + 1}w`, 1)],
}))

const STORIES = ['Your story', 'jisoo.kim', 'haneul_ee', 'dohyun.lee', 'yuna.choi', 'sungmin_p', 'cafe.onion']

export function InstagramApp() {
  const [tab, setTab] = useState<'home' | 'profile'>('home')
  const [posts, setPosts] = useState<Post[]>([...FEED, ...MY_POSTS])
  const [openPost, setOpenPost] = useState<string | null>(null)

  const update = (id: string, fn: (p: Post) => Post) => setPosts((ps) => ps.map((p) => (p.id === id ? fn(p) : p)))
  const toggleLike = (id: string) => update(id, (p) => ({ ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }))
  const toggleSave = (id: string) => update(id, (p) => ({ ...p, saved: !p.saved }))
  const addComment = (id: string, text: string) =>
    update(id, (p) => ({ ...p, comments: [...p.comments, c(String(Date.now()), USER.handle, text, 'now')] }))

  const current = posts.find((p) => p.id === openPost)

  return (
    <AppScreen>
      {current ? (
        <PostDetail
          post={current}
          onBack={() => setOpenPost(null)}
          onLike={() => toggleLike(current.id)}
          onSave={() => toggleSave(current.id)}
          onComment={(t) => addComment(current.id, t)}
        />
      ) : tab === 'home' ? (
        <HomeFeed
          posts={posts.filter((p) => p.id.startsWith('f'))}
          onOpen={setOpenPost}
          onLike={toggleLike}
          onSave={toggleSave}
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
}: {
  posts: Post[]
  onOpen: (id: string) => void
  onLike: (id: string) => void
  onSave: (id: string) => void
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
              WebkitMaskImage: 'url(/icons/instagram-wordmark.svg)',
              maskImage: 'url(/icons/instagram-wordmark.svg)',
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
            <MessageCircle className="size-[26px] -scale-x-100" aria-hidden />
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
              <img src={p.image || '/placeholder.svg'} alt={p.caption} className="aspect-square w-full object-cover" />
            </button>
            <PostActions post={p} onLike={() => onLike(p.id)} onComment={() => onOpen(p.id)} onSave={() => onSave(p.id)} />
            <div className="px-3.5 text-[14px]">
              <p className="font-semibold">{p.likes.toLocaleString()} likes</p>
              <p className="mt-0.5">
                <span className="font-semibold">{p.user}</span> {p.caption}
              </p>
              <button type="button" onClick={() => onOpen(p.id)} className="mt-1 text-white/55">
                View all {p.comments.length} comments
              </button>
              <p className="mt-0.5 text-[12px] text-white/45">{p.time} ago</p>
            </div>
          </article>
        ))}
      </div>
    </ScrollArea>
  )
}

function PostHeader({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <Avatar name={post.user} size={34} src={post.user === USER.handle ? photo(4) : undefined} />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-[14px] font-semibold">{post.user}</p>
        {post.location && <p className="text-[12px] text-white/70">{post.location}</p>}
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
  onComment: () => void
  onSave: () => void
}) {
  return (
    <div className="flex items-center gap-4 px-3.5 py-2.5">
      <button type="button" onClick={onLike} aria-label={post.liked ? 'Unlike' : 'Like'} aria-pressed={post.liked}>
        <Heart className={cn('size-[26px] transition active:scale-125', post.liked && 'fill-[#FF3040] text-[#FF3040]')} />
      </button>
      <button type="button" onClick={onComment} aria-label="Comment">
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
  onSave,
  onComment,
}: {
  post: Post
  onBack: () => void
  onLike: () => void
  onSave: () => void
  onComment: (t: string) => void
}) {
  const [text, setText] = useState('')
  const submit = () => {
    if (!text.trim()) return
    onComment(text.trim())
    setText('')
  }
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
        <PostHeader post={post} />
        <img src={post.image || '/placeholder.svg'} alt={post.caption} className="aspect-square w-full object-cover" />
        <PostActions post={post} onLike={onLike} onComment={() => {}} onSave={onSave} />
        <div className="px-3.5 pb-3 text-[14px]">
          <p className="font-semibold">{post.likes.toLocaleString()} likes</p>
          <p className="mt-0.5">
            <span className="font-semibold">{post.user}</span> {post.caption}
          </p>
          <p className="mt-1 text-[12px] text-white/45">{post.time} ago</p>
        </div>

        <section aria-label="Comments" className="border-t border-white/10 px-3.5 pt-3 pb-4">
          <h2 className="mb-3 text-center text-[15px] font-semibold">Comments</h2>
          <ul className="flex flex-col gap-4">
            {post.comments.map((cm) => (
              <CommentRow key={cm.id} comment={cm} />
            ))}
          </ul>
        </section>
      </ScrollArea>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="flex items-center gap-3 border-t border-white/10 bg-black px-3.5 pt-2.5 pb-8"
      >
        <Avatar name={USER.name} size={34} src={photo(4)} />
        <label className="sr-only" htmlFor="ig-comment">
          Add a comment
        </label>
        <input
          id="ig-comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) e.preventDefault()
          }}
          placeholder={`Add a comment for ${post.user}...`}
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2 text-[14px] outline-none placeholder:text-white/45"
        />
        <button type="submit" disabled={!text.trim()} className="text-[15px] font-semibold text-[#0095F6] disabled:opacity-40">
          Post
        </button>
      </form>
    </>
  )
}

function CommentRow({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false)
  return (
    <li className="flex gap-3">
      <Avatar name={comment.user} size={32} src={comment.user === USER.handle ? photo(4) : undefined} />
      <div className="min-w-0 flex-1 text-[14px]">
        <p>
          <span className="mr-1.5 font-semibold">{comment.user}</span>
          <span className="text-[12px] text-white/45">{comment.time}</span>
        </p>
        <p>{comment.text}</p>
        <p className="mt-1 text-[12px] font-medium text-white/50">
          {comment.likes + (liked ? 1 : 0) > 0 && `${comment.likes + (liked ? 1 : 0)} likes · `}Reply
        </p>
      </div>
      <button type="button" onClick={() => setLiked((l) => !l)} aria-label="Like comment" aria-pressed={liked}>
        <Heart className={cn('size-3.5 text-white/60', liked && 'fill-[#FF3040] text-[#FF3040]')} />
      </button>
    </li>
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
        <p className="font-semibold">{USER.name}</p>
        <p className="text-white/85">seoul ✈︎ jeju · film & coffee</p>
        <p className="text-white/85">🎧 currently looping Golden</p>
      </div>
      <div className="flex gap-1.5 px-4 pt-3">
        {['Edit profile', 'Share profile'].map((l) => (
          <span key={l} className="flex-1 rounded-lg bg-white/12 py-1.5 text-center text-[14px] font-semibold">
            {l}
          </span>
        ))}
      </div>
      <ul className="no-scrollbar flex gap-4 overflow-x-auto px-4 py-4">
        {['Jeju', 'Eats', 'Hikes', 'Mochi', 'Concerts'].map((h, i) => (
          <li key={h} className="flex shrink-0 flex-col items-center gap-1">
            <span className="rounded-full border border-white/20 p-[3px]">
              <img src={photo(i + 4) || '/placeholder.svg'} alt="" className="size-[60px] rounded-full object-cover" />
            </span>
            <span className="text-[12px]">{h}</span>
          </li>
        ))}
      </ul>
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
              <img src={p.image || '/placeholder.svg'} alt="" className="aspect-[3/4] w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
