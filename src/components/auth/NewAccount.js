import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/auth/authContext'

const NewAccount = ({ history }) => {
  const alertContext = useContext(AlertContext)
  const { alert, showAlert } = alertContext

  const authContext = useContext(AuthContext)
  const { message, authenticated, signUpUser } = authContext

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { name, email, password, confirmPassword } = user

  useEffect(() => {
    if (authenticated) history.push('/projects')
    if (message) showAlert(message.message, message.category)
    // eslint-disable-next-line
  }, [message, authenticated, history])

  const changeNewAccountField = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = event => {
    event.preventDefault()
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    )
      return showAlert('Todos los campos son obligatorios', 'alerta-error')

    if (password.length < 6)
      return showAlert(
        'La contraseña debe ser al menos de 6 carácteres',
        'alerta-error'
      )

    if (password !== confirmPassword)
      return showAlert('Las contraseñas no son iguales', 'alerta-error')

    signUpUser({
      name,
      email,
      password
    })
  }

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.message}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Tu nombre"
              onChange={changeNewAccountField}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Tu email"
              onChange={changeNewAccountField}
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
              onChange={changeNewAccountField}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Repite tu password"
              onChange={changeNewAccountField}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Registrarme
            </button>
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Iniciar sesión
        </Link>
      </div>
    </div>
  )
}

NewAccount.propTypes = {
  history: PropTypes.object.isRequired
}

export default NewAccount
