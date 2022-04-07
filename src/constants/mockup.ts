import { TicketGroup } from '../types'
export const mockData: TicketGroup[] = [
  {
    id: 0,
    title: 'Open Tasks',
    tickets: [
      {
        id: 0,
        title: 'Draggable 1',
        description: 'Very good implementation',
        timestamp: '2020/01/17 19:00:00'
      }
    ]
  },
  {
    id: 1,
    title: 'In-progress Tasks',
    tickets: [
      {
        id: 1,
        title: 'Draggable 2',
        description: 'Very good implementation',
        timestamp: '2020/01/17 19:00:00'
      }
    ]
  },
  {
    id: 2,
    title: 'Completed Tasks',
    tickets: [
      {
        id: 2,
        title: 'Draggable 3',
        description: 'Very good implementation',
        timestamp: '2020/01/17 19:00:00'
      },
      {
        id: 3,
        title: 'Draggable 4',
        description: 'Very good implementation',
        timestamp: '2020/01/17 19:00:00'
      }
    ]
  }
]
