function EventCardSkeleton() {
  return (
    <article className="animate-pulse rounded-2xl border border-[#dedcd7] bg-white p-5">
      <div className="h-3 w-20 rounded bg-[#e5e3de]" />

      <div className="mt-3 h-6 w-3/4 rounded bg-[#e5e3de]" />

      <div className="mt-6 flex flex-col gap-3">
        <div className="h-4 w-32 rounded bg-[#e5e3de]" />
        <div className="h-4 w-24 rounded bg-[#e5e3de]" />
        <div className="h-4 w-28 rounded bg-[#e5e3de]" />
        <div className="h-4 w-36 rounded bg-[#e5e3de]" />
      </div>
    </article>
  )
}

export default EventCardSkeleton