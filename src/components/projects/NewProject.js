import React, { useState, useContext } from 'react'
import projectContext from '../../context/projects/projectContext'

const NewProject = () => {
  const projectsContext = useContext(projectContext)
  const { form, showForm, errorForm, addProject, showError } = projectsContext

  const [project, setProject] = useState({
    name: ''
  })
  const { name } = project

  const onChangeProject = event => {
    setProject({
      ...project,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitProject = event => {
    event.preventDefault()
    if (name === '') {
      showError()
      return
    }
    addProject(project)
    setProject({ name: '' })
  }

  return (
    <>
      <button className="btn btn-block btn-primario" onClick={showForm}>
        Nuevo proyecto
      </button>
      {form && (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProject}>
          <input
            type="text"
            name="name"
            className="input-text"
            placeholder="Nombre del proyecto"
            value={name}
            onChange={onChangeProject}
          />
          <button type="submit" className="btn btn-primario btn-block">
            Agregar proyecto
          </button>
        </form>
      )}
      {errorForm && (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      )}
    </>
  )
}

export default NewProject
