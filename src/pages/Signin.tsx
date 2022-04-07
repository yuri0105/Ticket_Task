import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Form, Button, Input, Checkbox } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { AuthContext } from '../context/AuthContext'

const FormItem = Form.Item
const { Password } = Input

const SignIn: React.FC = () => {
  const { checkAuth, loggedIn, loggingIn } = useContext(AuthContext)
  const history = useHistory()
  useEffect(() => {
    if (loggedIn) {
      history.push('/dashboard')
    }
  }, [loggedIn])

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d9edff]">
      <div className="flex justify-between items-center flex-col lg:flex-row-reverse lg:max-h-[1000px] bg-white shadow-none lg:shadow-sm overflow-hidden mx-0 my-auto rounded-[12px]">
        <div className="flex items-end min-h-fit lg:min-h-full max-w-full lg:max-w-[800px] bg-[#fffdf2]">
          <img
            className="block w-full"
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form
          className="login-form flex-[1_0_100%] max-w-full lg:max-w-[480px] w-full"
          initialValues={{ remember: true }}
          onFinish={checkAuth}
        >
          <p className="text-title font-title text-large font-bold leading-[1] mb-0">
            Welcome Back
          </p>
          <p>Login to the Dashboard</p>
          <FormItem
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </FormItem>

          <FormItem
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Password placeholder="Password" />
          </FormItem>

          <FormItem name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[42px] tracking-[1px] rounded-[6px]"
              icon={<LoginOutlined />}
              loading={loggingIn}
            >
              LOGIN
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
