export type EventCategory =
  | 'Fantasy'
  | 'Comic Con'
  | 'Gaming'
  | 'Retro'
  | 'Anime & Cosplay'
  | 'Tabletop'
  | 'Collectibles'

export type EventItem = {
  id: number
  title: string
  category: EventCategory
  date: string
  time: string
  location: string
  attendees: number

  venue?: string
  description?: string
  price?: string
  website?: string
  tags?: string[]
  dateValue?: string
  image?: string
}