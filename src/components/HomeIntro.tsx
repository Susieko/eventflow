import {
  ArrowUpRight,
  MapPin,
  Sparkles,
} from 'lucide-react'

type HomeIntroProps = {
  city: string
  eventCount: number
  isLoading: boolean
  onExplore: () => void
}

function HomeIntro({
  city,
  eventCount,
  isLoading,
  onExplore,
}: HomeIntroProps) {
  return (
    <section className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5d64d8]">
          <Sparkles size={14} />
          Your next side quest
        </div>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] lg:text-6xl">
          Find something weird,
          <br />

          <span className="text-[#77746f]">
            wonderful or wonderfully nerdy.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-6 text-[#77746f]">
          Fantasy fairs, retro games, dice rolls, cosplay,
          collectibles and whatever else is worth leaving
          the house for.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-[#dedcd7] bg-white px-4 py-2.5 text-sm">
          <MapPin
            size={15}
            className="text-[#77746f]"
          />

          <span>{city}</span>
        </div>

        <div className="rounded-full bg-[#eeede9] px-4 py-2.5 text-sm text-[#66645f]">
          {isLoading
            ? 'Finding adventures...'
            : `${eventCount} events waiting`}
        </div>

        <button
          type="button"
          onClick={onExplore}
          className="flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:gap-3"
        >
          Explore
          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  )
}

export default HomeIntro