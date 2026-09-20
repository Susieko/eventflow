import {
  Bookmark,
  CalendarDays,
  Compass,
  Home,
  Sparkles,
} from 'lucide-react'

import NavItem from './NavItem'
import type { Page } from '../types/Page'

import eventFlowLogo from '../assets/eventflow-logo.png'

type SidebarProps = {
  activePage: Page
  onPageChange: (page: Page) => void
}

function Sidebar({
  activePage,
  onPageChange,
}: SidebarProps) {
  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[#e5e9f5] bg-[#f2f5ff] px-4 py-5 lg:flex">
      {/* Logo */}
      <div className="px-2">
        <img
          src={eventFlowLogo}
          alt="EventFlow"
          className="h-auto w-[220px]"
        />
      </div>

      {/* Navigation */}
      <nav className="mt-9 flex flex-col gap-1.5">
        <NavItem
          icon={Home}
          label="Home"
          active={activePage === 'Home'}
          onClick={() => onPageChange('Home')}
        />

        <NavItem
          icon={Compass}
          label="Explore"
          active={activePage === 'Explore'}
          onClick={() => onPageChange('Explore')}
        />

        <NavItem
          icon={Bookmark}
          label="Saved"
          active={activePage === 'Saved'}
          onClick={() => onPageChange('Saved')}
        />

        <NavItem
          icon={CalendarDays}
          label="My Events"
          active={activePage === 'My Events'}
          onClick={() => onPageChange('My Events')}
        />
      </nav>

      {/* Bottom card */}
      <div className="mt-auto">
        <div className="rounded-2xl border border-[#e1e6f4] bg-white p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef1ff] text-[#6171ef]">
            <Sparkles size={17} />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#161c33]">
            Find your next side quest.
          </p>

          <p className="mt-1 text-xs leading-5 text-[#858b9c]">
            New nerdy adventures are always waiting.
          </p>

          <button
            type="button"
            onClick={() => onPageChange('Explore')}
            className="mt-4 w-full rounded-xl bg-[#6374f3] px-3 py-2.5 text-xs font-medium text-white transition hover:bg-[#5364e5]"
          >
            Explore events
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar