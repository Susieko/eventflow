import {
  Bookmark,
  CalendarDays,
  Compass,
  Home,
} from 'lucide-react'

import type { Page } from '../types/Page'

type MobileNavProps = {
  activePage: Page
  onPageChange: (page: Page) => void
}

const navItems = [
  {
    label: 'Home',
    page: 'Home' as Page,
    icon: Home,
  },
  {
    label: 'Explore',
    page: 'Explore' as Page,
    icon: Compass,
  },
  {
    label: 'Saved',
    page: 'Saved' as Page,
    icon: Bookmark,
  },
  {
    label: 'My Events',
    page: 'My Events' as Page,
    icon: CalendarDays,
  },
]

function MobileNav({
  activePage,
  onPageChange,
}: MobileNavProps) {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-4 rounded-2xl border border-[#e2e6f2] bg-white/95 p-2 shadow-[0_12px_40px_rgba(65,78,130,0.18)] backdrop-blur-xl lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activePage === item.page

        return (
          <button
            key={item.page}
            type="button"
            onClick={() => onPageChange(item.page)}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium transition ${
              isActive
                ? 'bg-[#eef1ff] text-[#6374f3]'
                : 'text-[#81879a]'
            }`}
          >
            <Icon
              size={18}
              strokeWidth={isActive ? 2.2 : 1.8}
            />

            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default MobileNav