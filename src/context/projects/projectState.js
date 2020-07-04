import React, { useReducer } from 'react'
import {
  PROJECT_FORM,
  GET_PROJECTS,
  ADD_PROJECT,
  ERROR_PROJECTS,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT
} from '../../types'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import axiosClient from '../../config/axios'

const ProjectState = ({ children }) => {
  const initialState = {
    projects: [],
    form: false,
    errorForm: false,
    project: null,
    message: null
  }

  const [state, dispatch] = useReducer(projectReducer, initialState)

  const showForm = () => {
    dispatch({ type: PROJECT_FORM })
  }

  const getProjects = async () => {
    try {
      const result = await axiosClient.get('/api/projects')
      dispatch({ type: GET_PROJECTS, payload: result.data.projects })
    } catch (error) {
      const alert = {
        message: 'Hubo un error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECTS,
        payload: alert
      })
    }
  }

  const addProject = async project => {
    try {
      const result = await axiosClient.post('/api/projects', project)
      dispatch({ type: ADD_PROJECT, payload: result.data })
    } catch (error) {
      const alert = {
        message: 'Hubo un error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECTS,
        payload: alert
      })
    }
  }

  const showError = () => {
    dispatch({ type: VALIDATE_FORM })
  }

  const actualProject = projectId => {
    dispatch({ type: ACTUAL_PROJECT, payload: projectId })
  }

  const deleteProject = async projectId => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`)
      dispatch({ type: DELETE_PROJECT, payload: projectId })
    } catch (error) {
      const alert = {
        message: 'Hubo un error',
        category: 'alerta-error'
      }

      dispatch({
        type: ERROR_PROJECTS,
        payload: alert
      })
    }
  }

  return (
    <projectContext.Provider
      value={{
        form: state.form,
        projects: state.projects,
        errorForm: state.errorForm,
        project: state.project,
        message: state.message,
        getProjects,
        showForm,
        addProject,
        showError,
        actualProject,
        deleteProject
      }}
    >
      {children}
    </projectContext.Provider>
  )
}

export default ProjectState
