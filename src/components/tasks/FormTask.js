import React, { useContext, useState, useEffect } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const FormTask = () => {
  const [task, setTask] = useState({
    name: ''
  })

  const { name } = task

  const projectsContext = useContext(projectContext)
  const { project } = projectsContext

  const tasksContext = useContext(taskContext)
  const {
    addTask,
    validateTask,
    taskError,
    getTasks,
    selectedTask,
    updateTask,
    cleanTask
  } = tasksContext

  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask)
    } else {
      setTask({
        name: ''
      })
    }
  }, [selectedTask])

  if (!project) return null

  const [actualProject] = project

  const handleChange = event => {
    setTask({
      ...task,
      [event.target.name]: event.target.value
    })
  }

  const onSumbit = event => {
    event.preventDefault()
    if (name.trim() === '') {
      validateTask()
      return
    }
    if (selectedTask === null) {
      task.project = actualProject._id
      addTask(task)
    } else {
      updateTask(task)
      cleanTask()
    }

    getTasks(actualProject._id)
    setTask({
      name: ''
    })
  }

  return (
    <div className="formulario">
      <form onSubmit={onSumbit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <button
            type="submit"
            className="btn btn-primario btn-submit btn-block"
          >
            {selectedTask ? 'Editar tarea' : 'Agregar tarea'}
          </button>
        </div>
      </form>
      {taskError && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  )
}

export default FormTask
