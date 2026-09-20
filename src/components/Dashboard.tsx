import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Pencil,
  Trash2,
} from 'lucide-react'
import { motion } from 'motion/react'

import EventCard from './EventCard'
import EventCardSkeleton from './EventCardSkeleton'
import EventModal from './EventModal'
import CreateEventModal from './CreateEventModal'
import FeaturedEvent from './FeaturedEvent'
import HomeIntro from './HomeIntro'
import NearbySection from './NearbySection'
import Topbar from './Topbar'
import EventDetailPanel from './EventDetailPanel'
import BrowseHeader from './BrowseHeader'
import SavedEmptyState from './SavedEmptyState'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'
import type { Page } from '../types/Page'

type FilterCategory = 'All' | EventCategory

const categories: FilterCategory[] = [
  'All',
  'Fantasy',
  'Comic Con',
  'Gaming',
  'Retro',
  'Anime & Cosplay',
  'Tabletop',
  'Collectibles',
]

type DashboardProps = {
  activePage: Page
  savedEventIds: number[]
  onToggleSave: (id: number) => void
  onPageChange: (page: Page) => void
}

const pageContent = {
  Home: {
    title: 'Welcome back',
    subtitle: 'Here’s what’s happening around you.',
  },

  Explore: {
    title: 'Discover events',
    subtitle: 'Find something worth showing up for.',
  },

  Saved: {
    title: 'Saved events',
    subtitle: 'Everything you wanted to come back to.',
  },

  'My Events': {
    title: 'My events',
    subtitle: 'Manage the events you organise.',
  },
}

function getStoredCreatedEvents(): EventItem[] {
  const storedEvents = localStorage.getItem(
    'eventflow-created-events'
  )

  if (!storedEvents) {
    return []
  }

  try {
    return JSON.parse(storedEvents) as EventItem[]
  } catch {
    return []
  }
}

function Dashboard({
  activePage,
  savedEventIds,
  onToggleSave,
  onPageChange,
}: DashboardProps) {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>('All')

  const [searchTerm, setSearchTerm] = useState('')

  const [events, setEvents] =
    useState<EventItem[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [selectedEvent, setSelectedEvent] =
    useState<EventItem | null>(null)

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false)

  const [editingEvent, setEditingEvent] =
    useState<EventItem | null>(null)

  const [createdEvents, setCreatedEvents] =
    useState<EventItem[]>(
      getStoredCreatedEvents
    )

  const currentPage = pageContent[activePage]

  const showEventContent =
    activePage !== 'My Events'

  const showSearchAndFilters =
    activePage === 'Explore' ||
    activePage === 'Saved'

  useEffect(() => {
    async function loadEvents() {
      try {
        const response =
          await fetch('/events.json')

        if (!response.ok) {
          throw new Error(
            'Could not load events'
          )
        }

        const data: EventItem[] =
          await response.json()

        const storedCreatedEvents =
          getStoredCreatedEvents()

        const uniqueCreatedEvents =
          storedCreatedEvents.filter(
            (createdEvent) =>
              !data.some(
                (event) =>
                  event.id ===
                  createdEvent.id
              )
          )

        setEvents([
          ...data,
          ...uniqueCreatedEvents,
        ])
      } catch (error) {
        console.error(error)

        setError(
          'Something went wrong while loading events.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'eventflow-created-events',
      JSON.stringify(createdEvents)
    )
  }, [createdEvents])

  // Prevent an event selected on Explore
  // from unexpectedly opening as a modal
  // after changing pages.
  useEffect(() => {
    setSelectedEvent(null)
  }, [activePage])

  const filteredEvents = events.filter(
    (event) => {
      const matchesPage =
        activePage !== 'Saved' ||
        savedEventIds.includes(event.id)

      const matchesCategory =
        !showSearchAndFilters ||
        activeCategory === 'All' ||
        event.category === activeCategory

      const matchesSearch =
        !showSearchAndFilters ||
        event.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        event.location
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        event.category
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      return (
        matchesPage &&
        matchesCategory &&
        matchesSearch
      )
    }
  )

  const savedEvents = events.filter((event) =>
    savedEventIds.includes(event.id)
  )

  const detailEvent =
    filteredEvents.find(
      (event) =>
        event.id === selectedEvent?.id
    ) ?? filteredEvents[0]

  const featuredEvent = events[0]

  const upcomingEvents =
    events.slice(1, 4)

  const nearbyEvents = events
    .filter(
      (event) =>
        event.location === 'Tilburg' &&
        !upcomingEvents.some(
          (upcomingEvent) =>
            upcomingEvent.id === event.id
        )
    )
    .slice(0, 3)

  function createEvent(
    newEvent: EventItem
  ) {
    setEvents((currentEvents) => [
      ...currentEvents,
      newEvent,
    ])

    setCreatedEvents(
      (currentEvents) => [
        ...currentEvents,
        newEvent,
      ]
    )
  }

  function updateEvent(
    updatedEvent: EventItem
  ) {
    setCreatedEvents(
      (currentEvents) =>
        currentEvents.map((event) =>
          event.id === updatedEvent.id
            ? updatedEvent
            : event
        )
    )

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === updatedEvent.id
          ? updatedEvent
          : event
      )
    )

    setSelectedEvent((currentEvent) =>
      currentEvent?.id ===
      updatedEvent.id
        ? updatedEvent
        : currentEvent
    )

    setEditingEvent(null)
  }

  function deleteEvent(id: number) {
    const eventToDelete =
      createdEvents.find(
        (event) => event.id === id
      )

    if (!eventToDelete) {
      return
    }

    const shouldDelete =
      window.confirm(
        `Delete "${eventToDelete.title}"?`
      )

    if (!shouldDelete) {
      return
    }

    if (savedEventIds.includes(id)) {
      onToggleSave(id)
    }

    setCreatedEvents(
      (currentEvents) =>
        currentEvents.filter(
          (event) =>
            event.id !== id
        )
    )

    setEvents((currentEvents) =>
      currentEvents.filter(
        (event) =>
          event.id !== id
      )
    )

    if (selectedEvent?.id === id) {
      setSelectedEvent(null)
    }

    if (editingEvent?.id === id) {
      setEditingEvent(null)
    }
  }

  function openCreateModal() {
    setEditingEvent(null)
    setIsCreateModalOpen(true)
  }

  function openEditModal(
    event: EventItem
  ) {
    setEditingEvent(event)
    setIsCreateModalOpen(true)
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false)
    setEditingEvent(null)
  }

  function handleTopbarSearch(
    value: string
  ) {
    setSearchTerm(value)

    if (
      value.trim() &&
      activePage !== 'Explore' &&
      activePage !== 'Saved'
    ) {
      onPageChange('Explore')
    }
  }

  return (
    <section className="min-w-0 flex-1">
      <Topbar
        searchTerm={searchTerm}
        onSearchChange={
          handleTopbarSearch
        }
      />

      <div className="p-4 pb-28 sm:p-6 sm:pb-28 lg:p-7 lg:pb-7">
        {/* PAGE HEADING */}
        {activePage === 'Home' ? (
          <HomeIntro
            city="Tilburg"
            eventCount={events.length}
            isLoading={isLoading}
            onExplore={() =>
              onPageChange('Explore')
            }
          />
        ) : activePage === 'Explore' ||
          activePage === 'Saved' ? (
          <BrowseHeader
            title={
              activePage === 'Explore'
                ? 'Upcoming adventures'
                : 'Saved adventures'
            }
            subtitle={
              activePage === 'Explore'
                ? 'Find your next convention, fair or side quest.'
                : 'Everything you bookmarked for later.'
            }
            eventCount={
              filteredEvents.length
            }
          />
        ) : (
          <div>
            <h1 className="text-3xl font-semibold">
              {currentPage.title}
            </h1>

            <p className="mt-2 text-sm text-[#77746f]">
              {currentPage.subtitle}
            </p>
          </div>
        )}

        {/* CATEGORY FILTERS */}
        {showSearchAndFilters && (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
            {categories.map(
              (category) => {
                const isActive =
                  category ===
                  activeCategory

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`relative shrink-0 overflow-hidden rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? 'border-[#6374f3] text-white'
                        : 'border-[#e1e5f0] bg-white text-[#68708b] hover:border-[#cdd4ec] hover:bg-[#f8f9fd]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-category"
                        className="absolute inset-0 rounded-full bg-[#6374f3]"
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}

                    <span className="relative z-10">
                      {category}
                    </span>
                  </button>
                )
              }
            )}
          </div>
        )}

        {/* MY EVENTS — EMPTY */}
        {activePage === 'My Events' &&
          createdEvents.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-[#cbc8c1] bg-white p-8 text-center sm:p-10">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeede9]">
                <CalendarDays
                  size={22}
                />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                No events yet
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77746f]">
                Events you organise
                will appear here.
              </p>

              <button
                type="button"
                onClick={
                  openCreateModal
                }
                className="mt-5 rounded-xl bg-[#6374f3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5364e5]"
              >
                Create an event
              </button>
            </div>
          )}

        {/* MY EVENTS — CREATED */}
        {activePage === 'My Events' &&
          createdEvents.length > 0 && (
            <>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={
                    openCreateModal
                  }
                  className="rounded-xl bg-[#6374f3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5364e5]"
                >
                  Create another event
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {createdEvents.map(
                  (event) => (
                    <div
                      key={event.id}
                      className="overflow-hidden rounded-2xl border border-[#e1e5f0] bg-white"
                    >
                      <div className="[&>article]:rounded-none [&>article]:border-0">
                        <EventCard
                          event={event}
                          isSaved={savedEventIds.includes(
                            event.id
                          )}
                          onToggleSave={
                            onToggleSave
                          }
                          onOpen={
                            setSelectedEvent
                          }
                          variant="compact"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 border-t border-[#edf0f6] bg-[#fafbfe] px-3 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              event
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#6374f3] transition hover:bg-[#eef1ff]"
                        >
                          <Pencil
                            size={14}
                          />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteEvent(
                              event.id
                            )
                          }
                          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2
                            size={14}
                          />
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}

        {/* LOADING */}
        {showEventContent &&
          isLoading && (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <EventCardSkeleton
                  key={index}
                />
              ))}
            </div>
          )}

        {/* ERROR */}
        {showEventContent &&
          error && (
            <div className="mt-16 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="font-medium text-red-700">
                Couldn't load events
              </p>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>
            </div>
          )}

        {/* HOME */}
        {!isLoading &&
          !error &&
          activePage === 'Home' && (
            <>
              {featuredEvent && (
                <FeaturedEvent
                  event={
                    featuredEvent
                  }
                  onOpen={
                    setSelectedEvent
                  }
                />
              )}

              <NearbySection
                events={
                  nearbyEvents
                }
                city="Tilburg"
                savedEventIds={
                  savedEventIds
                }
                onToggleSave={
                  onToggleSave
                }
                onOpen={
                  setSelectedEvent
                }
                onExplore={() =>
                  onPageChange(
                    'Explore'
                  )
                }
              />

              <div className="mt-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#77746f]">
                    Coming up
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    More adventures
                    await
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onPageChange(
                      'Explore'
                    )
                  }
                  className="shrink-0 text-sm font-medium text-[#66645f] transition hover:text-[#171717]"
                >
                  View all →
                </button>
              </div>

              <div className="mt-5">
                {/* Home — Mobile */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {upcomingEvents.map(
                    (event) => (
                      <EventCard
                        key={
                          event.id
                        }
                        event={
                          event
                        }
                        isSaved={savedEventIds.includes(
                          event.id
                        )}
                        onToggleSave={
                          onToggleSave
                        }
                        onOpen={
                          setSelectedEvent
                        }
                        variant="mobile"
                      />
                    )
                  )}
                </div>

                {/* Home — Tablet/Desktop */}
                <div className="hidden gap-5 sm:grid sm:grid-cols-2 xl:grid-cols-3">
                  {upcomingEvents.map(
                    (event) => (
                      <EventCard
                        key={
                          event.id
                        }
                        event={
                          event
                        }
                        isSaved={savedEventIds.includes(
                          event.id
                        )}
                        onToggleSave={
                          onToggleSave
                        }
                        onOpen={
                          setSelectedEvent
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </>
          )}

        {/* EXPLORE + SAVED */}
        {!isLoading &&
          !error &&
          (activePage === 'Explore' ||
            activePage === 'Saved') && (
            <>
              {filteredEvents.length === 0 ? (
  activePage === 'Saved' &&
  savedEvents.length === 0 ? (
    <SavedEmptyState
      onExplore={() =>
        onPageChange('Explore')
      }
    />
  ) : (
    <div className="mt-16 text-center">
      <p className="text-lg font-medium">
        No events found
      </p>

      <p className="mt-2 text-sm text-[#77746f]">
        Try another search or category.
      </p>
    </div>
  )
) : (
                <div className="mt-8">
                  {/* Phone + tablet */}
                  <div className="flex flex-col gap-3 xl:hidden">
                    {filteredEvents.map(
                      (
                        event,
                        index
                      ) => (
                        <div
                          key={`${activeCategory}-${event.id}`}
                          className="event-card-enter"
                          style={{
                            animationDelay: `${
                              index *
                              45
                            }ms`,
                          }}
                        >
                          <EventCard
                            event={
                              event
                            }
                            isSaved={savedEventIds.includes(
                              event.id
                            )}
                            onToggleSave={
                              onToggleSave
                            }
                            onOpen={
                              setSelectedEvent
                            }
                            variant="mobile"
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* Large desktop */}
                  <div className="hidden gap-6 xl:grid xl:grid-cols-[minmax(0,1fr)_360px]">
                    <div className="grid grid-cols-2 gap-4">
                      {filteredEvents.map(
                        (
                          event,
                          index
                        ) => (
                          <div
                            key={`${activeCategory}-${event.id}`}
                            className="event-card-enter"
                            style={{
                              animationDelay: `${
                                index *
                                45
                              }ms`,
                            }}
                          >
                            <EventCard
                              event={
                                event
                              }
                              isSaved={savedEventIds.includes(
                                event.id
                              )}
                              onToggleSave={
                                onToggleSave
                              }
                              onOpen={
                                setSelectedEvent
                              }
                              variant="compact"
                              selected={
                                detailEvent?.id ===
                                event.id
                              }
                            />
                          </div>
                        )
                      )}
                    </div>

                    {detailEvent && (
                      <div className="sticky top-6 self-start">
                        <div
                          key={
                            detailEvent.id
                          }
                          className="event-detail-enter"
                        >
                          <EventDetailPanel
                            event={
                              detailEvent
                            }
                            isSaved={savedEventIds.includes(
                              detailEvent.id
                            )}
                            onToggleSave={
                              onToggleSave
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
      </div>

      {/* HOME + MY EVENTS MODAL */}
      {selectedEvent &&
        activePage !== 'Explore' &&
        activePage !== 'Saved' && (
          <EventModal
            event={selectedEvent}
            isSaved={savedEventIds.includes(
              selectedEvent.id
            )}
            onToggleSave={
              onToggleSave
            }
            onClose={() =>
              setSelectedEvent(
                null
              )
            }
          />
        )}

      {/* EXPLORE + SAVED MODAL ON SMALLER SCREENS */}
      {selectedEvent &&
        (activePage === 'Explore' ||
          activePage === 'Saved') && (
          <div className="xl:hidden">
            <EventModal
              event={selectedEvent}
              isSaved={savedEventIds.includes(
                selectedEvent.id
              )}
              onToggleSave={
                onToggleSave
              }
              onClose={() =>
                setSelectedEvent(
                  null
                )
              }
            />
          </div>
        )}

      {/* CREATE / EDIT EVENT MODAL */}
      {isCreateModalOpen && (
        <CreateEventModal
          eventToEdit={
            editingEvent
          }
          onClose={
            closeCreateModal
          }
          onCreate={
            createEvent
          }
          onUpdate={
            updateEvent
          }
        />
      )}
    </section>
  )
}

export default Dashboard