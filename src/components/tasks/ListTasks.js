import React, { useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'
import Task from './Task'

const ListTasks = () => {
  const projectsContext = useContext(projectContext)
  const { project, deleteProject } = projectsContext
  const tasksContext = useContext(taskContext)
  const { projectTasks } = tasksContext

  if (!project) return <h2>Selecciona un proyecto</h2>

  const [actualProject] = project

  const onDeleteProject = () => {
    deleteProject(actualProject._id)
  }

  return (
    <>
      <h2>Proyecto: {actualProject.name}</h2>
      <ul className="listado-tareas">
        {projectTasks.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {projectTasks.map(
              task =>
                task && (
                  <CSSTransition
                    key={task._id}
                    timeout={200}
                    classNames="tarea"
                  >
                    <Task task={task} />
                  </CSSTransition>
                )
            )}
          </TransitionGroup>
        )}
      </ul>
      <button className="btn btn-eliminar" onClick={onDeleteProject}>
        Eliminar proyecto &times;
      </button>
    </>
  )
}

export default ListTasks
