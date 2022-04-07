export interface Ticket {
  id: number
  title: string
  description: string
  timestamp: string
}
export interface TicketGroup {
  id: number
  title: string
  tickets: Ticket[]
}
