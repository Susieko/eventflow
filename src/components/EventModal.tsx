import { useEffect } from 'react'
import type { LucideIcon } from 'lucide-react'

import {
  Bookmark,
  CalendarDays,
  Clock,
  Dice5,
  ExternalLink,
  Gamepad2,
  Gem,
  Joystick,
  MapPin,
  Sparkles,
  Users,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'

type EventModalProps = {
  event: EventItem
  isSaved: boolean
  onClose: () => void
  onToggleSave: (id: number) => void
}

type ModalVisual = {
  Icon: LucideIcon
  gradient: string
}

const modalVisuals: Record<
  EventCategory,
  ModalVisual
> = {
  Fantasy: {
    Icon: WandSparkles,
    gradient:
      'from-amber-300 via-orange-200 to-fuchsia-300',
  },

  'Comic Con': {
    Icon: Zap,
    gradient:
      'from-red-300 via-orange-200 to-yellow-300',
  },

  Gaming: {
    Icon: Gamepad2,
    gradient:
      'from-cyan-300 via-blue-300 to-violet-400',
  },

  Retro: {
    Icon: Joystick,
    gradient:
      'from-fuchsia-300 via-purple-300 to-cyan-300',
  },

  'Anime & Cosplay': {
    Icon: Sparkles,
    gradient:
      'from-pink-300 via-rose-200 to-violet-300',
  },

  Tabletop: {
    Icon: Dice5,
    gradient:
      'from-emerald-300 via-lime-200 to-amber-200',
  },

  Collectibles: {
    Icon: Gem,
    gradient:
      'from-violet-300 via-purple-300 to-pink-300',
  },
}

function EventModal({
  event,
  isSaved,
  onClose,
  onToggleSave,
}: EventModalProps) {
  const visual = modalVisuals[event.category]
  const CategoryIcon = visual.Icon

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )

      document.body.style.overflow =
        previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111526]/55 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-white/60 bg-white shadow-[0_30px_80px_rgba(17,21,38,0.30)]"
        onMouseDown={(clickEvent) =>
          clickEvent.stopPropagation()
        }
      >
        {/* IMAGE / CATEGORY VISUAL */}
        {event.image ? (
          <div className="relative h-56 overflow-hidden sm:h-64">
            <img
              src={event.image}
              alt={`${event.title} artwork`}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/20" />

            <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
              {event.category}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close event details"
              className="absolute right-4 top-4 rounded-full bg-black/30 p-2.5 text-white backdrop-blur-md transition hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <X size={19} />
            </button>

            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                EventFlow adventure
              </p>

              <h2
                id="event-modal-title"
                className="mt-1 text-2xl font-semibold text-white"
              >
                {event.title}
              </h2>
            </div>
          </div>
        ) : (
          <div
            className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-56 ${visual.gradient}`}
          >
            <span className="absolute left-5 top-5 rounded-full bg-white/60 px-3 py-1.5 text-[11px] font-medium text-black/65 backdrop-blur">
              {event.category}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close event details"
              className="absolute right-4 top-4 rounded-full bg-white/60 p-2.5 text-black/60 backdrop-blur transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              <X size={19} />
            </button>

            <CategoryIcon
              size={76}
              strokeWidth={1.2}
              className="relative z-10 text-black/70"
            />

            <CategoryIcon
              size={230}
              strokeWidth={0.7}
              className="absolute -bottom-20 -right-14 rotate-12 text-black opacity-[0.06]"
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="p-5 sm:p-7">
          {!event.image && (
            <>
              <span className="text-xs font-medium text-[#68708b]">
                {event.category}
              </span>

              <h2
                id="event-modal-title"
                className="mt-2 text-2xl font-semibold text-[#161c33]"
              >
                {event.title}
              </h2>
            </>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-[#697087] sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />

              <span>
                {event.venue
                  ? `${event.venue}, ${event.location}`
                  : event.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} />

              <span>
                {event.attendees} interested
              </span>
            </div>
          </div>

          {event.description && (
            <p className="mt-6 text-sm leading-6 text-[#697087]">
              {event.description}
            </p>
          )}

          {(event.price || event.venue) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {event.price && (
                <span className="rounded-full bg-[#f3f5fa] px-3 py-1.5 text-xs text-[#68708b]">
                  Entry: {event.price}
                </span>
              )}

              {event.venue && (
                <span className="rounded-full bg-[#f3f5fa] px-3 py-1.5 text-xs text-[#68708b]">
                  {event.venue}
                </span>
              )}
            </div>
          )}

          {event.tags && (
            <div className="mt-5 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#eef1ff] px-3 py-1.5 text-[11px] font-medium text-[#59658d]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                onToggleSave(event.id)
              }
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#6374f3]/30 ${
                isSaved
                  ? 'border-[#6374f3] bg-[#6374f3] text-white'
                  : 'border-[#dfe3ef] text-[#48516d] hover:bg-[#f6f7fb]'
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

              {isSaved
                ? 'Saved'
                : 'Save event'}
            </button>

            {event.website && (
              <a
                href={event.website}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6374f3] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5364e5] focus:outline-none focus:ring-2 focus:ring-[#6374f3]/30"
              >
                Visit event
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventModal