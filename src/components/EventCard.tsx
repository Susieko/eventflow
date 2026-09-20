import type { LucideIcon } from 'lucide-react'

import {
  Bookmark,
  CalendarDays,
  Clock,
  Dice5,
  Gamepad2,
  Gem,
  Joystick,
  MapPin,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'

type EventCardProps = {
  event: EventItem
  isSaved: boolean
  onToggleSave: (id: number) => void
  onOpen: (event: EventItem) => void
  variant?: 'default' | 'compact' | 'mobile'
  selected?: boolean
}

type CategoryVisual = {
  Icon: LucideIcon
  background: string
  badge: string
}

const categoryVisuals: Record<
  EventCategory,
  CategoryVisual
> = {
  Fantasy: {
    Icon: Sparkles,
    background:
      'from-amber-100 via-orange-50 to-stone-100',
    badge: 'bg-amber-100 text-amber-800',
  },

  'Comic Con': {
    Icon: Zap,
    background:
      'from-red-100 via-orange-50 to-yellow-50',
    badge: 'bg-red-100 text-red-700',
  },

  Gaming: {
    Icon: Gamepad2,
    background:
      'from-blue-100 via-indigo-50 to-violet-100',
    badge: 'bg-blue-100 text-blue-700',
  },

  Retro: {
    Icon: Joystick,
    background:
      'from-fuchsia-100 via-purple-50 to-cyan-50',
    badge: 'bg-fuchsia-100 text-fuchsia-700',
  },

  'Anime & Cosplay': {
    Icon: Sparkles,
    background:
      'from-pink-100 via-rose-50 to-violet-100',
    badge: 'bg-pink-100 text-pink-700',
  },

  Tabletop: {
    Icon: Dice5,
    background:
      'from-emerald-100 via-lime-50 to-amber-50',
    badge: 'bg-emerald-100 text-emerald-700',
  },

  Collectibles: {
    Icon: Gem,
    background:
      'from-violet-100 via-purple-50 to-pink-50',
    badge: 'bg-violet-100 text-violet-700',
  },
}

function EventCard({
  event,
  isSaved,
  onToggleSave,
  onOpen,
  variant = 'default',
  selected = false,
}: EventCardProps) {
  const visual = categoryVisuals[event.category]
  const CategoryIcon = visual.Icon

  /*
   * MOBILE CARD
   * Horizontal layout for phone/tablet.
   */
  if (variant === 'mobile') {
    return (
      <article
        onClick={() => onOpen(event)}
        className="flex w-full cursor-pointer gap-3 rounded-2xl border border-[#e1e5f0] bg-white p-3 transition duration-200 active:scale-[0.99]"
      >
        <div
          className={`relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${visual.background}`}
        >
          <CategoryIcon
            size={32}
            strokeWidth={1.4}
            className="relative z-10 text-[#252839]"
          />

          <CategoryIcon
            size={85}
            strokeWidth={0.8}
            className="absolute -bottom-7 -right-6 rotate-12 opacity-[0.06]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${visual.badge}`}
              >
                {event.category}
              </span>

              <h3 className="mt-2 text-sm font-semibold leading-snug text-[#161c33]">
                {event.title}
              </h3>
            </div>

            <button
              type="button"
              aria-label={
                isSaved
                  ? `Unsave ${event.title}`
                  : `Save ${event.title}`
              }
              aria-pressed={isSaved}
              onClick={(clickEvent) => {
                clickEvent.stopPropagation()
                onToggleSave(event.id)
              }}
              className={`shrink-0 rounded-full p-2 transition ${
                isSaved
                  ? 'bg-[#6374f3] text-white'
                  : 'bg-[#f6f7fb] text-[#777e91]'
              }`}
            >
              <Bookmark
                size={14}
                fill={
                  isSaved
                    ? 'currentColor'
                    : 'none'
                }
              />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-[#777e91]">
            <span className="flex items-center gap-1">
              <CalendarDays size={11} />
              {event.date}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={11} />
              {event.time}
            </span>

            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {event.location}
            </span>
          </div>

          {event.tags && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {event.tags
                .slice(0, 2)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f3f5fa] px-2 py-1 text-[9px] text-[#777e91]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </article>
    )
  }

  /*
   * COMPACT CARD
   * Used in the large desktop Explore/Saved grid.
   */
  if (variant === 'compact') {
    return (
      <article
        onClick={() => onOpen(event)}
        className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
          selected
            ? 'border-[#6374f3] -translate-y-0.5 shadow-[0_0_0_3px_rgba(99,116,243,0.10)]'
            : 'border-[#e1e5f0] hover:border-[#cdd4ec]'
        }`}
      >
        <div
          className={`relative h-28 overflow-hidden bg-gradient-to-br ${visual.background}`}
        >
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium ${visual.badge}`}
          >
            {event.category}
          </span>

          <button
            type="button"
            aria-label={
              isSaved
                ? `Unsave ${event.title}`
                : `Save ${event.title}`
            }
            aria-pressed={isSaved}
            onClick={(clickEvent) => {
              clickEvent.stopPropagation()
              onToggleSave(event.id)
            }}
            className={`absolute right-3 top-3 rounded-full p-2 transition ${
              isSaved
                ? 'bg-[#6374f3] text-white'
                : 'bg-white/80 text-[#697087] hover:bg-white'
            }`}
          >
            <Bookmark
              size={14}
              fill={
                isSaved
                  ? 'currentColor'
                  : 'none'
              }
            />
          </button>

          <div className="flex h-full items-center justify-center">
            <CategoryIcon
              size={40}
              strokeWidth={1.4}
              className="text-[#252839] transition duration-300 group-hover:scale-110"
            />
          </div>

          <CategoryIcon
            size={120}
            strokeWidth={0.8}
            className="absolute -bottom-10 -right-7 rotate-12 opacity-[0.06]"
          />
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold leading-snug text-[#161c33]">
            {event.title}
          </h3>

          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-[#777e91]">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin size={13} />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users size={13} />
              <span>{event.attendees}</span>
            </div>
          </div>

          {event.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {event.tags
                .slice(0, 2)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f3f5fa] px-2 py-1 text-[10px] text-[#747b8e]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </div>
      </article>
    )
  }

  /*
   * DEFAULT CARD
   * Large decorative Home card.
   */
  return (
    <article
      onClick={() => onOpen(event)}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-[#dedcd7] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${visual.background}`}
      >
        <CategoryIcon
          size={54}
          strokeWidth={1.4}
          className="relative z-10 text-[#292725] transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
        />

        <CategoryIcon
          size={150}
          strokeWidth={0.8}
          className="absolute -bottom-10 -right-8 rotate-12 opacity-[0.06]"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${visual.badge}`}
        >
          {event.category}
        </span>

        <button
          type="button"
          onClick={(clickEvent) => {
            clickEvent.stopPropagation()
            onToggleSave(event.id)
          }}
          aria-label={
            isSaved
              ? `Unsave ${event.title}`
              : `Save ${event.title}`
          }
          aria-pressed={isSaved}
          className={`absolute right-4 top-4 rounded-full p-2.5 backdrop-blur-sm transition ${
            isSaved
              ? 'bg-[#6374f3] text-white'
              : 'bg-white/70 text-[#66645f] hover:bg-white hover:text-[#171717]'
          }`}
        >
          <Bookmark
            size={17}
            fill={
              isSaved
                ? 'currentColor'
                : 'none'
            }
          />
        </button>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold leading-snug">
          {event.title}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-[#66645f]">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={15} />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={15} />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={15} />
            <span>{event.attendees}</span>
          </div>
        </div>

        {event.tags && (
          <div className="mt-5 flex flex-wrap gap-2">
            {event.tags
              .slice(0, 2)
              .map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#f5f4f1] px-2.5 py-1 text-[11px] text-[#77746f]"
                >
                  {tag}
                </span>
              ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default EventCard