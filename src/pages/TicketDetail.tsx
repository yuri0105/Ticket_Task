import React, { useContext, useEffect } from 'react'
import ReactLoading from 'react-loading'
import { Form, Input, Button } from 'antd'
import { SaveOutlined, HomeFilled } from '@ant-design/icons'
import { BoardContext } from '../context/BoardContext'
import { useHistory } from 'react-router-dom'

const { TextArea } = Input
const TicketDetail: React.FC<any> = (props) => {
  const {
    loadingBoard,
    updatingTicket,
    gettingTicket,
    currentTicket,
    getTicket,
    updateTicket
  } = useContext(BoardContext)
  const history = useHistory()
  const onSave = (result) => {
    updateTicket({ ...currentTicket, ...result })
  }
  useEffect(() => {
    const { id } = props.match.params
    if (id) {
      getTicket(Number.parseInt(id))
    }
  }, [props.match.params])
  return (
    <div className="dashboard-page relative flex justify-center items-center min-h-screen">
      {updatingTicket || gettingTicket ? (
        <div className="absolute top-0 left-0 w-full h-full bg-blackbrown/40 flex items-center justify-center z-20">
          <ReactLoading type="balls" color="#74edc7" height={100} width={50} />
        </div>
      ) : (
        <></>
      )}
      <div className="w-full font-sans md:max-w-[700px] min-h-[400px] m-auto h-fit bg-white shadow-md rounded-md p-5 relative">
        {currentTicket && (
          <div>
            <p className="text-center text-large">Ticket Detail</p>
            {!gettingTicket && (
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="detail-form"
                initialValues={currentTicket}
                onFinish={onSave}
              >
                <Form.Item name="title" label="Title">
                  <Input placeholder="Title" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <TextArea placeholder="Title" />
                </Form.Item>
                <Form.Item label="Created At">
                  <span>{currentTicket.timestamp}</span>
                </Form.Item>
                <Form.Item className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="h-[42px] tracking-[1px] rounded-[6px]"
                    icon={<SaveOutlined />}
                    loading={loadingBoard}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        )}
        <Button
          className="btn-home right-3 top-2 text-black"
          type="link"
          shape="circle"
          icon={<HomeFilled />}
          onClick={() => history.push('/dashboard')}
        />
      </div>
    </div>
  )
}

export default TicketDetail
