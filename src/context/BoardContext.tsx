import React, { useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import api from '../services/Api'
import { Ticket, TicketGroup } from '../types'

export const BoardContainer: React.FC = (props) => {
  const [loadingBoard, setLoading] = useState<boolean>(false)
  const [updatingTicket, setUpdating] = useState<boolean>(false)
  const [gettingTicket, setGetting] = useState<boolean>(false)
  const [boardData, setBoardData] = useState<TicketGroup[]>([])
  const [currentTicket, setTicket] = useState<Ticket | undefined>(undefined)
  const loadBoard = () => {
    setLoading(true)
    api.getBoard().then((data) => {
      setLoading(false)
      setBoardData(data)
    })
  }
  const reorderBoard = (result: DropResult) => {
    if (
      result.destination &&
      result.destination.droppableId === '1' &&
      result.source.droppableId === '2'
    )
      return
    setLoading(true)
    api.reorderBoard(result).then((newBoardData) => {
      setLoading(false)
      setBoardData(newBoardData)
    })
  }
  const removeTicket = (ticket: Ticket) => {
    setLoading(true)
    api.removeTicket(ticket).then((newBoardData) => {
      setLoading(false)
      setBoardData(newBoardData)
    })
  }
  const getTicket = (id: number) => {
    setGetting(true)
    api
      .getTicket(id)
      .then((ticket) => {
        setTicket(ticket)
        setGetting(false)
      })
      .catch(() => {
        setGetting(false)
      })
  }
  const updateTicket = (ticket: Ticket) => {
    setUpdating(true)
    api.updateTicket(ticket).then((newBoardData) => {
      setUpdating(false)
      setBoardData(newBoardData)
    })
  }
  const addTicket = (panelId: number, ticket: Ticket) => {
    setLoading(true)
    api.addTicket(panelId, ticket).then((newBoardData) => {
      setLoading(false)
      setBoardData(newBoardData)
    })
  }

  return (
    <BoardContext.Provider
      value={{
        loadingBoard,
        boardData,
        currentTicket,
        updatingTicket,
        gettingTicket,
        loadBoard,
        reorderBoard,
        removeTicket,
        getTicket,
        updateTicket,
        addTicket
      }}
    >
      {props.children}
    </BoardContext.Provider>
  )
}

export type BoardContextShape = {
  loadingBoard: boolean
  updatingTicket: boolean
  gettingTicket: boolean
  boardData: TicketGroup[]
  currentTicket: Ticket | undefined
  loadBoard: () => void
  reorderBoard: (result: DropResult) => void
  removeTicket: (ticket: Ticket) => void
  getTicket: (id: number) => void
  updateTicket: (ticket: Ticket) => void
  addTicket: (panelId: number, ticket: Ticket) => void
}

export const BoardContext = React.createContext({} as BoardContextShape)
