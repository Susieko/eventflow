import {
  Bell,
  ChevronDown,
  Search,
  Zap,
} from 'lucide-react'

type TopbarProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
}

function Topbar({
  searchTerm,
  onSearchChange,
}: TopbarProps) {
  return (
    <header className="border-b border-[#e7e9f2] bg-white/75 backdrop-blur-xl">
      {/* Main bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-7 lg:py-4">
        {/* Mobile brand */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eef1ff] text-[#6374f3]">
            <Zap
              size={17}
              fill="currentColor"
            />
          </div>

          <span className="text-sm font-semibold text-[#161c33]">
            EventFlow
          </span>
        </div>

        {/* Desktop search */}
        <div className="hidden w-full max-w-xl items-center gap-3 rounded-xl border border-[#e3e6ef] bg-[#f8f9fd] px-4 py-3 lg:flex">
          <Search
            size={18}
            className="text-[#8b91a7]"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search events, categories or locations..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#a3a8b8]"
          />

          <span className="rounded-md bg-white px-2 py-1 text-[10px] text-[#999fb1] shadow-sm">
            ⌘ K
          </span>
        </div>

        {/* Utilities */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-[#60677c] transition hover:bg-[#f3f5fa]"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#6675ff]" />
          </button>

          <div className="hidden h-8 w-px bg-[#e7e9f2] lg:block" />

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-[#f3f5fa] lg:px-2 lg:py-1.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7eaff] text-sm font-semibold text-[#4f5fd7]">
              S
            </div>

            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold text-[#1b2138]">
                Susan
              </p>

              <p className="text-[11px] text-[#8b91a7]">
                Event explorer
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-[#8b91a7] lg:block"
            />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 lg:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-[#e3e6ef] bg-[#f8f9fd] px-3 py-2.5">
          <Search
            size={16}
            className="shrink-0 text-[#8b91a7]"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search events..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a3a8b8]"
          />
        </div>
      </div>
    </header>
  )
}

export default Topbar