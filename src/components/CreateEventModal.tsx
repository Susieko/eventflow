import {
  useEffect,
  useState,
} from 'react'

import {
  CalendarDays,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react'

import type {
  EventCategory,
  EventItem,
} from '../types/Event'

type CreateEventModalProps = {
  onClose: () => void
  onCreate: (event: EventItem) => void
  onUpdate: (event: EventItem) => void
  eventToEdit?: EventItem | null
}

const categories: EventCategory[] = [
  'Fantasy',
  'Comic Con',
  'Gaming',
  'Retro',
  'Anime & Cosplay',
  'Tabletop',
  'Collectibles',
]

function formatDate(dateValue: string) {
  if (!dateValue) {
    return ''
  }

  const date = new Date(
    `${dateValue}T12:00:00`
  )

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
    }
  ).format(date)
}

function getDateValue(
  event?: EventItem | null
) {
  if (!event) {
    return ''
  }

  if (event.dateValue) {
    return event.dateValue
  }

  // Fallback for events created before dateValue existed.
  const guessedDate = new Date(
    `${event.date} ${new Date().getFullYear()}`
  )

  if (
    Number.isNaN(
      guessedDate.getTime()
    )
  ) {
    return ''
  }

  const year = guessedDate.getFullYear()

  const month = String(
    guessedDate.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    guessedDate.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function CreateEventModal({
  onClose,
  onCreate,
  onUpdate,
  eventToEdit = null,
}: CreateEventModalProps) {
  const isEditing =
    Boolean(eventToEdit)

  const [title, setTitle] =
    useState(
      eventToEdit?.title ?? ''
    )

  const [category, setCategory] =
    useState<EventCategory>(
      eventToEdit?.category ??
        'Fantasy'
    )

  const [date, setDate] =
    useState(
      getDateValue(eventToEdit)
    )

  const [time, setTime] =
    useState(
      eventToEdit?.time ?? ''
    )

  const [location, setLocation] =
    useState(
      eventToEdit?.location ?? ''
    )

  const [
    description,
    setDescription,
  ] = useState(
    eventToEdit?.description ?? ''
  )

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow =
      'hidden'

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )

      document.body.style.overflow =
        previousOverflow
    }
  }, [onClose])

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (
      !title.trim() ||
      !date ||
      !time ||
      !location.trim()
    ) {
      return
    }

    const eventData: EventItem = {
      id:
        eventToEdit?.id ??
        Date.now(),

      title: title.trim(),
      category,

      date: formatDate(date),
      dateValue: date,

      time,

      location:
        location.trim(),

      attendees:
        eventToEdit?.attendees ??
        0,

      description:
        description.trim() ||
        'Your EventFlow adventure.',

      venue:
        eventToEdit?.venue,

      price:
        eventToEdit?.price,

      website:
        eventToEdit?.website,

      tags:
        eventToEdit?.tags,
    }

    if (isEditing) {
      onUpdate(eventData)
    } else {
      onCreate(eventData)
    }

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#14182a]/45 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-event-title"
        className="w-full max-w-xl overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(20,24,42,0.25)]"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-[#edf0f7] px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6374f3]">
              <Sparkles size={14} />

              {isEditing
                ? 'Edit adventure'
                : 'Create adventure'}
            </div>

            <h2
              id="create-event-title"
              className="mt-2 text-2xl font-semibold text-[#161c33]"
            >
              {isEditing
                ? 'Update your event'
                : 'Add your event'}
            </h2>

            <p className="mt-1 text-sm text-[#858ba0]">
              {isEditing
                ? 'Change the details of your adventure.'
                : 'Give your next gathering a place in EventFlow.'}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-xl p-2 text-[#8990a4] transition hover:bg-[#f3f5fb] hover:text-[#161c33] focus:outline-none focus:ring-2 focus:ring-[#6374f3]/30"
          >
            <X size={19} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto px-6 py-5"
        >
          <label className="block">
            <span className="text-sm font-medium text-[#252b42]">
              Event name
            </span>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
              placeholder="e.g. Dungeon & Dragons Night"
              required
              className="mt-2 w-full rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm text-[#161c33] outline-none transition placeholder:text-[#a6abba] focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-[#252b42]">
              Category
            </span>

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target
                    .value as EventCategory
                )
              }
              className="mt-2 w-full rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm text-[#161c33] outline-none transition focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
            >
              {categories.map(
                (categoryOption) => (
                  <option
                    key={
                      categoryOption
                    }
                    value={
                      categoryOption
                    }
                  >
                    {categoryOption}
                  </option>
                )
              )}
            </select>
          </label>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className="flex items-center gap-2 text-sm font-medium text-[#252b42]">
                <CalendarDays
                  size={15}
                />
                Date
              </span>

              <input
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value
                  )
                }
                required
                className="mt-2 w-full rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm text-[#161c33] outline-none transition focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-[#252b42]">
                Time
              </span>

              <input
                type="time"
                value={time}
                onChange={(event) =>
                  setTime(
                    event.target.value
                  )
                }
                required
                className="mt-2 w-full rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm text-[#161c33] outline-none transition focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="flex items-center gap-2 text-sm font-medium text-[#252b42]">
              <MapPin size={15} />
              Location
            </span>

            <input
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value
                )
              }
              placeholder="e.g. Tilburg"
              required
              className="mt-2 w-full rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm text-[#161c33] outline-none transition placeholder:text-[#a6abba] focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-medium text-[#252b42]">
              Description
            </span>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="What's happening at your event?"
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-[#dfe3ee] bg-[#fafbfe] px-4 py-3 text-sm leading-6 text-[#161c33] outline-none transition placeholder:text-[#a6abba] focus:border-[#6374f3] focus:bg-white focus:ring-4 focus:ring-[#6374f3]/10"
            />
          </label>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#dfe3ee] px-5 py-3 text-sm font-medium text-[#666d82] transition hover:bg-[#f6f7fb] focus:outline-none focus:ring-2 focus:ring-[#6374f3]/30"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#6374f3] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_20px_rgba(99,116,243,0.25)] transition hover:-translate-y-0.5 hover:bg-[#5667e8] focus:outline-none focus:ring-2 focus:ring-[#6374f3]/30"
            >
              {isEditing
                ? 'Save changes'
                : 'Create adventure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal