import React, { useReducer } from 'react'
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOGOUT
} from '../../types'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axiosClient from '../../config/axios'
import authToken from '../../config/token'

const AuthState = props => {
  const initialState = {
    token: null,
    authenticated: null,
    user: null,
    message: null,
    loading: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const signUpUser = async data => {
    try {
      const response = await axiosClient.post('/api/users', data)
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: response.data
      })
      authenticatedUser()
    } catch (error) {
      const alert = {
        message: error.response.data.message,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_REGISTRATION,
        payload: alert
      })
    }
  }

  const authenticatedUser = async () => {
    const token = localStorage.getItem('token')
    const authenticated = localStorage.getItem('authenticated')
    if (token && authenticated) {
      authToken(token)
    }
    try {
      const response = await axiosClient.get('/api/auth')
      dispatch({
        type: GET_USER,
        payload: response.data.user
      })
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN
      })
    }
  }

  const login = async data => {
    try {
      const response = await axiosClient.post('/api/auth', data)
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: response.data
      })
      authenticatedUser()
    } catch (error) {
      const alert = {
        message: error.response.data.message,
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_LOGIN,
        payload: alert
      })
    }
  }

  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        signUpUser,
        login,
        authenticatedUser,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
