import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../../context/AuthContext'

const AuthRoute: React.FC<{ path: string; component: React.FC }> = ({
  path,
  component: Component,
  ...rest
}: any) => {
  const { loggedIn } = useContext(AuthContext)
  if (!loggedIn && path !== '/') {
    return <Redirect to="/" />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default AuthRoute
