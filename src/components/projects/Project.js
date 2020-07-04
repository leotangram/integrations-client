import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({ project: { _id, name } }) => {
  const projectsContext = useContext(projectContext)
  const { actualProject } = projectsContext
  const tasksContext = useContext(taskContext)
  const { getTasks } = tasksContext
  const selectProject = id => {
    actualProject(id)
    getTasks(id)
  }

  return (
    <li>
      <button className="btn btn-blank" onClick={() => selectProject(_id)}>
        {name}
      </button>
    </li>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default Project
