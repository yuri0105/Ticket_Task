import React, { useState } from 'react'
import { notification } from 'antd'
import Api from '../services/Api'
import { defaultName } from '../constants/userinfo'

export const AuthContainer: React.FC = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  const checkAuth = (value: any) => {
    const { username, password } = value
    setLoggingIn(true)

    Api.authorize(username, password)
      .then((data) => {
        if (data === true) {
          sessionStorage.setItem('username', username)
          setLoggedIn(true)
          notification.success({ message: 'Login Successful!' })
        } else {
          setLoggedIn(false)
          notification.warn({ message: 'Wrong username and password!' })
        }
        setLoggingIn(false)
      })
      .catch(() => {
        setLoggedIn(false)
        setLoggedIn(false)
        notification.warn({ message: 'Error connecting Server' })
      })
  }

  const checkSession = () => {
    const sessionName = sessionStorage.getItem('username')

    if (sessionName === defaultName) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ loggedIn, loggingIn, checkAuth, checkSession }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export type AuthContextShape = {
  loggedIn: boolean
  loggingIn: boolean
  checkAuth: (value: any) => void
  checkSession: () => void
}

export const AuthContext = React.createContext({} as AuthContextShape)
