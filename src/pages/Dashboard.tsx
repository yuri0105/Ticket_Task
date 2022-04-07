import React, { useContext, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { BoardContext } from '../context/BoardContext'
import Panel from '../components/trello/Panel'

const Dashboard: React.FC = () => {
  const {
    loadBoard,
    loadingBoard,
    boardData,
    reorderBoard,
    removeTicket,
    addTicket
  } = useContext(BoardContext)
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return
    }
    reorderBoard(result)
  }
  // Loads board data when did mount
  useEffect(() => {
    loadBoard()
  }, [])

  return (
    <div className="dashboard-page relative min-h-full w-fit min-w-full">
      {loadingBoard ? (
        <div className="absolute top-0 left-0 w-full h-full bg-blackbrown/40 flex items-center justify-center z-20">
          <ReactLoading type="balls" color="#74edc7" height={100} width={50} />
        </div>
      ) : (
        <></>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center">
          <div className="flex flex-wrap w-full justify-center">
            {boardData.map((item) => (
              <Panel
                key={item.id}
                data={item}
                onRemoveTicket={removeTicket}
                onAddTicket={addTicket}
              ></Panel>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default Dashboard
