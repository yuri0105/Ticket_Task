import React, { useState } from 'react'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import TicketCard from './TicketCard'
import { Ticket, TicketGroup } from '../../types'
import AddTicketModal from '../modal/AddTicketModal'

const Panel: React.FC<{
  data: TicketGroup
  onRemoveTicket: (ticket: Ticket) => void
  onAddTicket: (panelId: number, ticket: Ticket) => void
}> = ({ data, onRemoveTicket, onAddTicket }) => {
  const [modalVisiable, setModal] = useState<boolean>(false)
  const handleAddTicket = ({ title, description }) => {
    const timestamp = moment(moment.now()).format('YYYY-MM-DD hh:mm:ss')
    setModal(false)
    onAddTicket(data.id, { id: -1, title, description, timestamp })
  }
  return (
    <>
      <Droppable droppableId={data.id.toString()}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="pane-container flex flex-col relative bg-[#eef3d1] box-border shadow-md whitespace-normal w-full sm:max-w-[300px] h-fit min-h-[400px] m-4 pb-[40px] rounded-[20px]"
          >
            <div className="flex items-center text-white bg-[#1f0717] justify-between mb-2 text-xl rounded-t-[15px] p-2">
              <span>{data.title}</span>
            </div>
            <div className="p-[5px_6px]">
              {data.tickets.map((item: Ticket, index) => (
                <TicketCard
                  data={item}
                  key={item.id}
                  index={index}
                  onRemove={onRemoveTicket}
                />
              ))}
            </div>
            {provided.placeholder}
            <div className="absolute right-2 bottom-2">
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => setModal(true)}
              />
            </div>
          </div>
        )}
      </Droppable>
      <AddTicketModal
        visible={modalVisiable}
        onCancel={() => setModal(false)}
        onSubmit={handleAddTicket}
      />
    </>
  )
}

export default Panel
