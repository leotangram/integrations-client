import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import taskContext from '../../context/tasks/taskContext'
import projectContext from '../../context/projects/projectContext'

const Task = ({ task }) => {
  const { _id, name, state } = task
  const tasksContext = useContext(taskContext)
  const { deleteTask, getTasks, updateTask, saveActualTask } = tasksContext

  const projectsContext = useContext(projectContext)
  const { project } = projectsContext

  const [actualProject] = project

  const removeTask = () => {
    deleteTask(_id, actualProject._id)
    getTasks(actualProject._id)
  }

  const changeState = task => {
    if (task.state) {
      task.state = false
    } else {
      task.state = true
    }
    updateTask(task)
  }

  const selectTask = task => {
    saveActualTask(task)
  }

  return (
    <li className="tarea sombra">
      <p>{name}</p>
      <div className="estado">
        {state ? (
          <button className="completo" onClick={() => changeState(task)}>
            Completo
          </button>
        ) : (
          <button className="incompleto" onClick={() => changeState(task)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button className="btn btn-primario" onClick={() => selectTask(task)}>
          Editar
        </button>
        <button className="btn btn-secundario" onClick={removeTask}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired
  }).isRequired
}

export default Task
