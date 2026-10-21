'use client'

import { ChevronLeft, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { hueFromString } from '@/lib/ios-data'

export function Avatar({
  name,
  size = 40,
  src,
  className,
  rounded = 'full',
}: {
  name: string
  size?: number
  src?: string
  className?: string
  rounded?: 'full' | 'squircle'
}) {
  const hue = hueFromString(name)
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden font-semibold text-white',
        rounded === 'full' ? 'rounded-full' : 'rounded-[38%]',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, hsl(${hue} 55% 55%), hsl(${(hue + 40) % 360} 60% 38%))`,
      }}
      aria-hidden={!src}
    >
      {src ? <img src={src || '/placeholder.svg'} alt={name} className="size-full object-cover" /> : initials}
    </div>
  )
}

export function GlassButton({
  icon: Icon,
  label,
  onClick,
  className,
  children,
}: {
  icon?: LucideIcon
  label: string
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'glass flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 text-white transition active:scale-95',
        className,
      )}
    >
      {Icon && <Icon className="size-[22px]" strokeWidth={2.2} />}
      {children}
    </button>
  )
}

export function BackButton({ onClick, label = 'Back' }: { onClick: () => void; label?: string }) {
  return <GlassButton icon={ChevronLeft} label={label} onClick={onClick} />
}

export type Tab<T extends string> = { id: T; label: string; icon: LucideIcon; disabled?: boolean }

export function GlassTabBar<T extends string>({
  tabs,
  active,
  onChange,
  accent = '#0A84FF',
}: {
  tabs: Tab<T>[]
  active: T
  onChange: (id: T) => void
  accent?: string
}) {
  return (
    <nav
      aria-label="Tabs"
      className="glass-dark absolute inset-x-4 bottom-7 z-30 flex items-center justify-between rounded-full p-1"
    >
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            type="button"
            disabled={t.disabled}
            onClick={() => onChange(t.id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-medium transition',
              isActive ? 'bg-white/12' : 'text-white/85',
              t.disabled && 'cursor-default',
            )}
            style={isActive ? { color: accent } : undefined}
          >
            <t.icon className="size-[22px]" strokeWidth={isActive ? 2.4 : 1.9} />
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}

export function AppScreen({
  children,
  className,
  bg = '#000',
}: {
  children: React.ReactNode
  className?: string
  bg?: string
}) {
  return (
    <div className={cn('absolute inset-0 flex flex-col overflow-hidden text-white', className)} style={{ background: bg }}>
      {children}
    </div>
  )
}

export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('no-scrollbar flex-1 overflow-y-auto overscroll-contain', className)}>{children}</div>
}

export function Toggle({
  on,
  onChange,
  label,
  readOnly,
}: {
  on: boolean
  onChange?: (v: boolean) => void
  label: string
  readOnly?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={readOnly}
      onClick={() => onChange?.(!on)}
      className={cn(
        'relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors',
        on ? 'bg-[#30D158]' : 'bg-[#39393D]',
        readOnly && 'cursor-default',
      )}
    >
      <span
        className={cn(
          'absolute top-[2px] size-[27px] rounded-full bg-white shadow-md transition-all',
          on ? 'left-[22px]' : 'left-[2px]',
        )}
      />
    </button>
  )
}
