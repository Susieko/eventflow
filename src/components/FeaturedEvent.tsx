import type { LucideIcon } from 'lucide-react'

import {
  ArrowUpRight,
  CalendarDays,
  Dice5,
  Gamepad2,
  Gem,
  Joystick,
  MapPin,
  Sparkles,
  WandSparkles,
  Zap,
} from 'lucide-react'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'

type FeaturedEventProps = {
  event: EventItem
  onOpen: (event: EventItem) => void
}

type FeaturedVisual = {
  Icon: LucideIcon
  gradient: string
  accent: string
  label: string
}

const featuredVisuals: Record<
  EventCategory,
  FeaturedVisual
> = {
  Fantasy: {
    Icon: WandSparkles,
    gradient:
      'from-amber-300 via-orange-200 to-fuchsia-300',
    accent: 'text-amber-200',
    label: 'ENTER THE REALM',
  },

  'Comic Con': {
    Icon: Zap,
    gradient:
      'from-red-300 via-orange-200 to-yellow-300',
    accent: 'text-red-200',
    label: 'HERO MODE',
  },

  Gaming: {
    Icon: Gamepad2,
    gradient:
      'from-cyan-300 via-blue-300 to-violet-400',
    accent: 'text-cyan-200',
    label: 'PRESS START',
  },

  Retro: {
    Icon: Joystick,
    gradient:
      'from-fuchsia-300 via-purple-300 to-cyan-300',
    accent: 'text-fuchsia-200',
    label: 'PLAYER ONE',
  },

  'Anime & Cosplay': {
    Icon: Sparkles,
    gradient:
      'from-pink-300 via-rose-200 to-violet-300',
    accent: 'text-pink-200',
    label: 'TRANSFORM',
  },

  Tabletop: {
    Icon: Dice5,
    gradient:
      'from-emerald-300 via-lime-200 to-amber-200',
    accent: 'text-emerald-200',
    label: 'ROLL FOR ADVENTURE',
  },

  Collectibles: {
    Icon: Gem,
    gradient:
      'from-violet-300 via-purple-300 to-pink-300',
    accent: 'text-violet-200',
    label: 'RARE FIND',
  },
}

function FeaturedEvent({
  event,
  onOpen,
}: FeaturedEventProps) {
  const visual = featuredVisuals[event.category]
  const CategoryIcon = visual.Icon

  return (
    <article
      onClick={() => onOpen(event)}
      className="group relative mt-8 cursor-pointer overflow-hidden rounded-[30px] bg-[#151515] text-white sm:rounded-[36px]"
    >
      <div className="grid min-h-[360px] lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT SIDE */}
        <div className="relative z-20 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
                Featured · {event.category}
              </span>

              <span
                className={`text-[11px] font-semibold tracking-[0.2em] ${visual.accent}`}
              >
                {visual.label}
              </span>
            </div>

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl">
              {event.title}
            </h2>

            {event.description && (
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                {event.description}
              </p>
            )}
          </div>

          <div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/65">
              <div className="flex items-center gap-2">
                <CalendarDays size={17} />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={17} />
                <span>{event.location}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-7 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#171717] transition duration-300 group-hover:gap-4"
            >
              View event
              <ArrowUpRight size={17} />
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative order-first h-[240px] overflow-hidden sm:h-[300px] lg:order-none lg:h-auto lg:p-6">
          {event.image ? (
            <div className="relative h-full overflow-hidden lg:rounded-[28px]">
              <img
                src={event.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              {/* Photo overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                SIDE QUEST
              </div>

              {event.tags && (
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {event.tags
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}
            </div>
          ) : (
            /* FALLBACK CATEGORY ART */
            <div
              className={`relative h-full overflow-hidden bg-gradient-to-br lg:rounded-[28px] ${visual.gradient}`}
            >
              <div className="absolute left-5 top-5 rounded-full border border-black/10 bg-white/40 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-black/60 backdrop-blur">
                SIDE QUEST
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <CategoryIcon
                  size={108}
                  strokeWidth={1.15}
                  className="relative z-10 text-black/75 transition duration-500 group-hover:scale-110 group-hover:-rotate-6"
                />
              </div>

              <CategoryIcon
                size={290}
                strokeWidth={0.7}
                className="absolute -bottom-24 -right-20 rotate-12 text-black opacity-[0.07]"
              />

              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                {event.tags
                  ?.slice(0, 3)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/45 px-3 py-1.5 text-[11px] font-medium text-black/65 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="absolute right-5 top-5 h-3 w-3 rounded-full bg-black/20" />
              <div className="absolute right-10 top-9 h-2 w-2 rounded-full bg-black/15" />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default FeaturedEvent