import { Bookmark, Compass, Sparkles } from 'lucide-react'

type SavedEmptyStateProps = {
  onExplore: () => void
}

function SavedEmptyState({
  onExplore,
}: SavedEmptyStateProps) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-[#e2e6f2] bg-white">
      <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
        {/* Decoration */}
        <div className="absolute left-[15%] top-[20%] h-2 w-2 rotate-45 bg-[#dfe4ff]" />
        <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rotate-45 bg-[#e8dfff]" />

        <Sparkles
          size={20}
          className="absolute bottom-[22%] left-[23%] text-[#c5cdfd]"
        />

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef1ff] text-[#6374f3]">
          <Bookmark size={27} />
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#6374f3]">
          Your collection
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#161c33]">
          No adventures saved yet
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-[#7d8499]">
          Found something worth remembering?
          Bookmark it and it'll wait for you here.
        </p>

        <button
          type="button"
          onClick={onExplore}
          className="mt-6 flex items-center gap-2 rounded-xl bg-[#6374f3] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(99,116,243,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5667e8]"
        >
          <Compass size={16} />
          Explore events
        </button>
      </div>
    </div>
  )
}

export default SavedEmptyState