import { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import MobileNav from './components/MobileNav'

import type { Page } from './types/Page'

function App() {
  const [activePage, setActivePage] =
    useState<Page>('Home')

  const [savedEventIds, setSavedEventIds] =
    useState<number[]>(() => {
      const savedIds = localStorage.getItem(
        'eventflow-saved-events'
      )

      return savedIds
        ? JSON.parse(savedIds)
        : []
    })

  useEffect(() => {
    localStorage.setItem(
      'eventflow-saved-events',
      JSON.stringify(savedEventIds)
    )
  }, [savedEventIds])

  function toggleSavedEvent(id: number) {
    setSavedEventIds((currentSavedIds) => {
      if (currentSavedIds.includes(id)) {
        return currentSavedIds.filter(
          (savedId) => savedId !== id
        )
      }

      return [...currentSavedIds, id]
    })
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef2ff] p-0 text-[#161c33] md:p-6">
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#cfd8ff] opacity-60 blur-[110px]" />

      <div className="pointer-events-none absolute -right-32 top-20 h-[520px] w-[520px] rounded-full bg-[#e5d7ff] opacity-50 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-[#ccecff] opacity-45 blur-[120px]" />

      {/* Nerdy dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #8290d8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Tiny pixel-star details */}
      <div className="pointer-events-none absolute left-[7%] top-[18%] h-2 w-2 rotate-45 bg-[#7785e8] opacity-30" />

      <div className="pointer-events-none absolute right-[8%] top-[35%] h-3 w-3 rotate-45 border border-[#7785e8] opacity-25" />

      <div className="pointer-events-none absolute bottom-[12%] left-[12%] h-2 w-2 rotate-45 bg-[#a68be8] opacity-25" />

      <div className="pointer-events-none absolute bottom-[22%] right-[5%] h-2 w-2 rotate-45 bg-[#66a7d9] opacity-30" />

      {/* ONE app shell */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] overflow-hidden rounded-none border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(74,92,160,0.16)] backdrop-blur-xl md:min-h-[calc(100vh-48px)] md:rounded-[32px]">
        <Sidebar
          activePage={activePage}
          onPageChange={setActivePage}
        />

        <Dashboard
          activePage={activePage}
          savedEventIds={savedEventIds}
          onToggleSave={toggleSavedEvent}
          onPageChange={setActivePage}
        />
      </div>

      {/* Only visible below lg */}
      <MobileNav
        activePage={activePage}
        onPageChange={setActivePage}
      />
    </main>
  )
}

export default App