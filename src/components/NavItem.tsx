import type { LucideIcon } from 'lucide-react'

type NavItemProps = {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick: () => void
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
        active
          ? 'bg-[#eef1ff] font-medium text-[#5365e8]'
          : 'text-[#697087] hover:bg-white/70 hover:text-[#161c33]'
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
          active
            ? 'bg-white text-[#5365e8] shadow-sm'
            : 'text-[#7b8194] group-hover:bg-white'
        }`}
      >
        <Icon size={17} strokeWidth={1.8} />
      </span>

      <span>{label}</span>

      {active && (
        <span className="absolute right-0 h-5 w-[3px] rounded-full bg-[#6475f3]" />
      )}
    </button>
  )
}

export default NavItem