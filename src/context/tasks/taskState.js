import React, { useReducer } from 'react'
import {
  TASKS_PROJECT,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK
} from '../../types'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import axiosClient from '../../config/axios'

const TaskState = ({ children }) => {
  const initialState = {
    projectTasks: [],
    taskError: false,
    selectedTask: null
  }
  const [state, dispatch] = useReducer(TaskReducer, initialState)

  const getTasks = async project => {
    try {
      const result = await axiosClient.get('/api/tasks', {
        params: { project }
      })
      dispatch({
        type: TASKS_PROJECT,
        payload: result.data.tasks
      })
    } catch (error) {}
  }

  const addTask = async task => {
    try {
      const result = await axiosClient.post('/api/tasks', task)
      dispatch({
        type: ADD_TASK,
        payload: result.data.tasks
      })
    } catch (error) {}
  }

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK
    })
  }

  const deleteTask = async (id, project) => {
    try {
      await axiosClient.delete(`/api/tasks/${id}`, { params: { project } })
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    } catch (error) {}
  }

  const saveActualTask = task => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task
    })
  }

  const updateTask = async task => {
    try {
      const result = await axiosClient.put(`/api/tasks/${task._id}`, task)
      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task
      })
    } catch (error) {}
  }

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK
    })
  }

  return (
    <TaskContext.Provider
      value={{
        projectTasks: state.projectTasks,
        taskError: state.taskError,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveActualTask,
        updateTask,
        cleanTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskState
