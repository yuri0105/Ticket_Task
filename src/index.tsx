import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthContainer } from './context/AuthContext'
import { BoardContainer } from './context/BoardContext'

ReactDOM.render(
  <AuthContainer>
    <BoardContainer>
      <App />
    </BoardContainer>
  </AuthContainer>,
  document.getElementById('root')
)
