import React from 'react'
import authToken from './config/token'
import ProjectState from './context/projects/projectState'
import TaskState from './context/tasks/taskState'
import AlertState from './context/alerts/alertState'
import AuthState from './context/auth/authState'
import Routes from './routes/Routes'

const token = localStorage.getItem('token')
if (token) authToken(token)

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Routes />
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  )
}

export default App
