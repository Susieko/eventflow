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
  Zap,
} from 'lucide-react'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'

type EventDetailPanelProps = {
  event: EventItem
  isSaved: boolean
  onToggleSave: (id: number) => void
}

type DetailVisual = {
  Icon: LucideIcon
  gradient: string
}

const detailVisuals: Record<
  EventCategory,
  DetailVisual
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

function EventDetailPanel({
  event,
  isSaved,
  onToggleSave,
}: EventDetailPanelProps) {
  const visual = detailVisuals[event.category]
  const CategoryIcon = visual.Icon

  return (
    <aside className="overflow-hidden rounded-[24px] border border-[#e1e4ee] bg-white">
      {/* EVENT VISUAL */}
      {event.image ? (
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.image}
            alt={`${event.title} artwork`}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10" />

          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            {event.category}
          </span>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Featured adventure
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${visual.gradient}`}
        >
          <span className="absolute left-4 top-4 rounded-full bg-white/65 px-3 py-1 text-[11px] font-medium text-black/65 backdrop-blur">
            {event.category}
          </span>

          <CategoryIcon
            size={76}
            strokeWidth={1.2}
            className="relative z-10 text-black/75"
          />

          <CategoryIcon
            size={230}
            strokeWidth={0.7}
            className="absolute -bottom-20 -right-14 rotate-12 text-black opacity-[0.06]"
          />
        </div>
      )}

      {/* EVENT DETAILS */}
      <div className="p-6">
        <span className="text-xs font-medium text-[#68708b]">
          {event.category}
        </span>

        <h2 className="mt-2 text-2xl font-semibold text-[#161c33]">
          {event.title}
        </h2>

        <div className="mt-6 flex flex-col gap-3 text-sm text-[#697087]">
          <div className="flex items-center gap-3">
            <CalendarDays size={17} />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={17} />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={17} />

            <span>
              {event.venue
                ? `${event.venue}, ${event.location}`
                : event.location}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Users size={17} />
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

        {event.tags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f1f4ff] px-3 py-1.5 text-[11px] font-medium text-[#59658d]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              onToggleSave(event.id)
            }
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
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

            {isSaved ? 'Saved' : 'Save'}
          </button>

          {event.website ? (
            <a
              href={event.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#6374f3] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#5364e5]"
            >
              Visit event
              <ExternalLink size={16} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="rounded-xl bg-[#eef0f6] px-4 py-3 text-sm text-[#9ba1b3]"
            >
              No website
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}

export default EventDetailPanel