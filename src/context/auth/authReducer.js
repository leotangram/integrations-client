import {
  SUCCESSFUL_REGISTRATION,
  ERROR_REGISTRATION,
  GET_USER,
  SUCCESSFUL_LOGIN,
  ERROR_LOGIN,
  LOGOUT
} from '../../types'

export default (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_REGISTRATION:
    case SUCCESSFUL_LOGIN:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('authenticated', true)
      return {
        ...state,
        authenticated: true,
        message: null,
        loading: false
      }
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false
      }
    case ERROR_REGISTRATION:
    case ERROR_LOGIN:
    case LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('authenticated')
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
        loading: false
      }
    default:
      return state
  }
}
