import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthRoute from './components/routing/AuthRoute'
import { AuthContext } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/Signin'
import TicketDetail from './pages/TicketDetail'
import './styles/global.css'
import './styles/trello.scss'

const App: React.FC = () => {
  const { checkSession } = useContext(AuthContext)
  useEffect(() => checkSession(), [])
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <AuthRoute path="/dashboard" component={Dashboard} />
        <AuthRoute path="/ticket/:id" component={TicketDetail} />
      </Switch>
    </Router>
  )
}

export default App
