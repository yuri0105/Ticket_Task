import React, { useRef } from 'react'
import { Modal, Button, Form, Input, InputRef } from 'antd'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'

const { TextArea } = Input
const AddTicketModal: React.FC<{
  visible: boolean
  onCancel: () => void
  onSubmit: (value: any) => void
}> = ({ visible, onCancel, onSubmit }) => {
  const titleRef = useRef<InputRef>(null)
  const descriptionRef = useRef<InputRef>(null)
  const handleSave = () => {
    onSubmit({
      title: titleRef.current?.input?.value,
      description: descriptionRef.current?.input?.value
    })
  }
  return (
    <Modal
      visible={visible}
      title="Add Ticket"
      onOk={onCancel}
      onCancel={onCancel}
      footer={[
        <Button
          type="primary"
          key="save"
          icon={<SaveOutlined />}
          onClick={handleSave}
        >
          Save
        </Button>,
        <Button key="cancel" icon={<CloseOutlined />} onClick={onCancel}>
          Cancel
        </Button>
      ]}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="detail-form"
      >
        <Form.Item name="title" label="Title">
          <Input ref={titleRef} placeholder="Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea ref={descriptionRef} placeholder="Title" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddTicketModal
