import React from 'react'
import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { Ticket } from '../../types'
import { useHistory } from 'react-router-dom'

const TicketCard: React.FC<{
  data: Ticket
  index: number
  onRemove: (ticket: Ticket) => void
}> = ({ data, index, onRemove }) => {
  const history = useHistory()
  const onEditTicket = () => {
    history.push(`/ticket/${data.id}`)
  }

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(providedDraggable: DraggableProvided) => (
        <div
          className="flex items-center justify-between shadow-md mb-2 leading-[19px] whitespace-normal bg-white rounded p-3"
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
        >
          <span>{data.title}</span>
          <div
            // onClick={onRemove.bind(this, panelIndex, cartIndex)}
            className="flex items-center justify-center h-[24px] cursor-pointer rounded-sm"
          >
            <EditOutlined className="mr-2" onClick={onEditTicket} />
            <CloseOutlined onClick={() => onRemove(data)} />
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TicketCard
