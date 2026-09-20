import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Clock,
  MapPin,
} from 'lucide-react'

import type { EventItem } from '../types/Event'

type NearbySectionProps = {
  events: EventItem[]
  city: string
  savedEventIds: number[]
  onToggleSave: (id: number) => void
  onOpen: (event: EventItem) => void
  onExplore: () => void
}

function NearbySection({
  events,
  city,
  savedEventIds,
  onToggleSave,
  onOpen,
  onExplore,
}: NearbySectionProps) {
  if (events.length === 0) {
    return null
  }

  return (
    <section className="mt-12 grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
      <div className="relative overflow-hidden rounded-[30px] bg-[#171717] p-7 text-white">
        <div className="relative z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <MapPin size={20} />
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Near you
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            {city}
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
            {events.length === 1
              ? 'One side quest nearby.'
              : `${events.length} side quests nearby.`}
          </p>

          <button
            type="button"
            onClick={onExplore}
            className="mt-7 flex items-center gap-2 text-sm font-medium text-white/80 transition hover:gap-3 hover:text-white"
          >
            Explore nearby
            <ArrowRight size={16} />
          </button>
        </div>

        <MapPin
          size={190}
          strokeWidth={0.7}
          className="absolute -bottom-12 -right-12 rotate-12 text-white opacity-[0.04]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {events.map((event) => {
          const isSaved = savedEventIds.includes(event.id)

          return (
            <article
              key={event.id}
              onClick={() => onOpen(event)}
              className="group cursor-pointer rounded-[26px] border border-[#dedcd7] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-[#f1f0ec] px-3 py-1 text-[11px] font-medium text-[#66645f]">
                  {event.category}
                </span>

                <button
                  type="button"
                  aria-label={
                    isSaved
                      ? `Unsave ${event.title}`
                      : `Save ${event.title}`
                  }
                  onClick={(clickEvent) => {
                    clickEvent.stopPropagation()
                    onToggleSave(event.id)
                  }}
                  className={`rounded-full p-2 transition ${
                    isSaved
                      ? 'bg-[#171717] text-white'
                      : 'text-[#77746f] hover:bg-[#f1f0ec] hover:text-[#171717]'
                  }`}
                >
                  <Bookmark
                    size={16}
                    fill={isSaved ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {event.title}
              </h3>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#77746f]">
                <div className="flex items-center gap-2">
                  <CalendarDays size={15} />
                  {event.date}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  {event.time}
                </div>
              </div>

              {event.tags && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {event.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f5f4f1] px-2.5 py-1 text-[11px] text-[#77746f]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default NearbySection