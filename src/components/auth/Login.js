import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = ({ history }) => {
  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  const authContext = useContext(AuthContext)
  const { message, authenticated, login } = authContext

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user

  useEffect(() => {
    if (authenticated) history.push('/projects')
    if (message) showAlert(message.message, message.category)
    // eslint-disable-next-line
  }, [message, authenticated, history])

  const changeLoginField = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    if (email.trim() === '' || password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error')
      return
    }
    login({ email, password })
  }

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.message}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu email"
              onChange={changeLoginField}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Tu password"
              onChange={changeLoginField}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <Link to={'/new-account'} className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired
}

export default Login
