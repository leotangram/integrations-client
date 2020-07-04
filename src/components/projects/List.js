import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Project from './Project'
import projectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertContext'

const List = () => {
  const projectsContext = useContext(projectContext)
  const { projects, getProjects, message } = projectsContext

  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  useEffect(() => {
    if (message) {
      showAlert(message.message, message.category)
    }

    getProjects()
    // eslint-disable-next-line
  }, [message])

  if (projects.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>

  return (
    <ul className="listado-proyectos">
      {alert && (
        <div className={`alerta ${alert.category}`}>{alert.message}</div>
      )}
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition key={project._id} timeout={200} classNames="proyecto">
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}

export default List
