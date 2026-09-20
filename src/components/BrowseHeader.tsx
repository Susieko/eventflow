type BrowseHeaderProps = {
  title: string
  subtitle: string
  eventCount: number
}

function BrowseHeader({
  title,
  subtitle,
  eventCount,
}: BrowseHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6374f3]">
          EventFlow discovery
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#161c33]">
          {title}
        </h1>

        <p className="mt-2 text-sm text-[#7a8195]">
          {subtitle}
        </p>
      </div>

      <div className="rounded-full border border-[#e1e5f0] bg-[#f7f8fd] px-4 py-2 text-xs font-medium text-[#68708b]">
        {eventCount} {eventCount === 1 ? 'event' : 'events'}
      </div>
    </div>
  )
}

export default BrowseHeader