import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import FormTask from '../tasks/FormTask'
import ListTasks from '../tasks/ListTasks'

const Projects = () => {
  const authContext = useContext(AuthContext)
  const { authenticatedUser } = authContext

  useEffect(() => {
    authenticatedUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Header />
        <main>
          <FormTask />
          <div className="contenedor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Projects
