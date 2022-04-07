import { DropResult } from 'react-beautiful-dnd'
import { mockData } from '../constants/mockup'
import { defaultName, defaultPass } from '../constants/userinfo'
import { Ticket, TicketGroup } from '../types'

const loginDelay = 2000
const delay = 1000
// sessionStorage.removeItem('board')
const boardDataStr = sessionStorage.getItem('board')
let boardData: TicketGroup[] = []

if (boardDataStr) {
  try {
    boardData = JSON.parse(boardDataStr)
  } catch {
    boardData = mockData
  }
} else {
  boardData = mockData
}

let newId = getMaxId(boardData)

function getMaxId(boardData: TicketGroup[]) {
  let max = -1
  boardData.forEach((panel) => {
    panel.tickets.forEach(({ id }) => (max = id > max ? id : max))
  })
  return max + 1
}

function authorize(username: string, password: string) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      if (username === defaultName && password === defaultPass) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, loginDelay)
  })
}

function updateBoardData(newData) {
  boardData = newData
  sessionStorage.setItem('board', JSON.stringify(boardData))
}

function getBoard() {
  return new Promise<TicketGroup[]>((resolve) => {
    setTimeout(() => {
      resolve(boardData)
    }, delay)
  })
}

function reorderBoard(result: DropResult) {
  return new Promise<TicketGroup[]>((resolve) => {
    const { destination } = result
    const { index: sourceCardIndex, droppableId: sourceId } = result.source
    const destinationCardIndex = destination ? destination.index : -1
    const destinationId = destination ? destination.droppableId : '0'
    const sourceColumnIndex = parseInt(sourceId)
    const destinationColumnIndex = parseInt(destinationId)

    const newBoardData = boardData.map((panel, currentColumnIndex) => {
      if (destinationColumnIndex === currentColumnIndex) {
        const [sourceCard] = boardData[sourceColumnIndex].tickets.splice(
          sourceCardIndex,
          1
        )
        const destinationTickets = Array.from(
          boardData[destinationColumnIndex].tickets
        )
        destinationTickets.splice(destinationCardIndex, 0, sourceCard)
        panel.tickets = destinationTickets
      }

      return panel
    })
    updateBoardData(newBoardData)
    resolve(boardData)
  })
}

function removeTicket(ticket: Ticket) {
  return new Promise<TicketGroup[]>((resolve) => {
    setTimeout(() => {
      const newData = boardData.map((panel) => ({
        ...panel,
        tickets: panel.tickets.filter((item) => item.id !== ticket.id)
      }))
      updateBoardData(newData)
      resolve(newData)
    }, delay)
  })
}

function getTicket(id: number) {
  return new Promise<Ticket>((resolve, reject) => {
    setTimeout(() => {
      boardData.forEach((panel) => {
        panel.tickets.forEach((ticket) => {
          if (ticket.id === id) {
            resolve(ticket)
          }
        })
      })
      reject()
    }, delay)
  })
}

function updateTicket(data: Ticket) {
  return new Promise<TicketGroup[]>((resolve) => {
    setTimeout(() => {
      const newBoardData = boardData.map((panel) => ({
        ...panel,
        tickets: panel.tickets.map((ticket) =>
          ticket.id == data.id ? data : ticket
        )
      }))
      updateBoardData(newBoardData)
      resolve(boardData)
    }, delay)
  })
}

function addTicket(panelId: number, ticket: Ticket) {
  return new Promise<TicketGroup[]>((resolve) => {
    setTimeout(() => {
      const newTicket = { ...ticket, id: newId }
      const newBoardData = boardData.map((panel) => ({
        ...panel,
        tickets:
          panelId == panel.id ? [...panel.tickets, newTicket] : panel.tickets
      }))
      newId++
      updateBoardData(newBoardData)
      resolve(boardData)
    }, delay)
  })
}

export default {
  authorize,
  getBoard,
  reorderBoard,
  removeTicket,
  getTicket,
  updateTicket,
  addTicket
}
